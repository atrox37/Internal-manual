import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import {
  PDFDocument,
  StandardFonts,
  rgb,
} from "pdf-lib";

const repoRoot = process.cwd();
const distDir = path.join(repoRoot, "docs", ".vitepress", "dist");

const PORT = Number(process.env.PDF_PORT || 4173);
const BASE_URL = `http://127.0.0.1:${PORT}`;

// 输出：按语言分别生成“普通用户手册（normal-user）”PDF
const OUT_EN = path.join(repoRoot, "docs", "public", "downloads", "en", "user-manual.pdf");
const OUT_ZH = path.join(repoRoot, "docs", "public", "downloads", "zh-cn", "user-manual.pdf");

const HEADER_FOOTER_PDF = path.join(repoRoot, "tools", "pdf-assets", "header-footer-template.pdf");

// 模板渲染效果：更“灰 + 半透明”，不抢正文
// - opacity 越小越淡（0~1）
//
// 说明（很关键）：
// - 使用 Multiply 会导致“黑色文字”比“彩色图片”更明显变淡（视觉上不均匀），你现在感受到的就是这个。
// - 为了让模板（文字/图片）透明度更一致，这里默认改为 Normal，仅用 opacity 控制整体透明。
// - 但由于“文字抗锯齿 + 图片大面积实色”的差异，同一透明度下仍可能出现“文字更淡、图片更深”的体感。
//   为了让二者观感更接近：这里默认把 opacity 稍微调高（文字更深），并打开一层很轻的白色 wash（把图片深色区域拉浅一点）。
const PDF_TEMPLATE_OPACITY = Number(process.env.PDF_TEMPLATE_OPACITY || 0.5);
const PDF_TEMPLATE_BLEND_MODE = String(process.env.PDF_TEMPLATE_BLEND_MODE || "Normal");
// wash：覆盖一层浅色半透明“洗色”，用于降低图片/深色元素的视觉对比度，让“图片/文字”更接近同一透明度体感
const PDF_TEMPLATE_WASH_OPACITY = Number(process.env.PDF_TEMPLATE_WASH_OPACITY || 0.4);
const PDF_TEMPLATE_WASH_GRAY = Number(process.env.PDF_TEMPLATE_WASH_GRAY || 1); // 0~1, 1=纯白

// 1mm = 72 / 25.4 PDF points
function mmToPt(mm) {
  return (mm * 72) / 25.4;
}

// A4 页面宽度与左右边距：用于把网页正文宽度约束到接近“打印内容宽度”，减少分页抖动
const PDF_PAGE_W_MM = Number(process.env.PDF_PAGE_W_MM || 210); // A4 宽 210mm
const PDF_MARGIN_LEFT_MM = Number(process.env.PDF_MARGIN_LEFT_MM || 12);
const PDF_MARGIN_RIGHT_MM = Number(process.env.PDF_MARGIN_RIGHT_MM || 12);

// 正文上下安全区（确保正文落在页眉/页脚之间）
//
// 说明（很关键）：
// - 你截图里的 1.27cm 是 Word 的“页眉顶端距离/页脚底端距离”，它并不等于“页眉/页脚内容占用高度”。
// - 当前模板 PDF 的页眉/页脚区域较大，如果只预留 12.7mm，正文仍可能被模板文字遮挡。
// - 因此这里把默认值调大为更保守的安全区；如需精确对齐可用环境变量覆盖。
//
// 可通过环境变量覆盖：
// - PDF_CONTENT_TOP_MM
// - PDF_CONTENT_BOTTOM_MM
const PDF_CONTENT_TOP_MM = Number(process.env.PDF_CONTENT_TOP_MM || 32); // default: 32mm
const PDF_CONTENT_BOTTOM_MM = Number(process.env.PDF_CONTENT_BOTTOM_MM || 42); // default: 42mm

// 页码距离底部（mm）
// - 用户期望“最下面”，默认更贴近底部
// - 如果与模板页脚文字冲突，可用环境变量上调
const PDF_PAGE_NUMBER_BOTTOM_MM = Number(process.env.PDF_PAGE_NUMBER_BOTTOM_MM || 4);

// 你已确认“不需要 PDF 书签大纲”，所以这里不再解析标题/生成 outlines

async function ensureImagesLoaded(page) {
  // 禁用懒加载：确保导出前图片都能真正请求并完成解码
  await page.evaluate(() => {
    document.querySelectorAll("img").forEach((img) => {
      // @ts-ignore
      img.loading = "eager";
      // @ts-ignore
      img.decoding = "sync";
      img.removeAttribute("loading");
    });
  });

  // 关键：滚动整页触发“视口外”的图片加载（很多图片在 dist 里会带 loading=\"lazy\"）
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const step = 800;
    const maxY = Math.max(
      document.body?.scrollHeight || 0,
      document.documentElement?.scrollHeight || 0
    );
    for (let y = 0; y <= maxY; y += step) {
      window.scrollTo(0, y);
      await sleep(60);
    }
    window.scrollTo(0, 0);
    await sleep(60);
  });

  // 等待图片 complete + decode（更稳定）
  await page.evaluate(async () => {
    const imgs = Array.from(document.images || []);
    await Promise.all(
      imgs.map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) return resolve(true);
            img.onload = () => resolve(true);
            img.onerror = () => resolve(true);
          })
      )
    );
    await Promise.all(
      imgs.map(async (img) => {
        // @ts-ignore
        if (typeof img.decode === "function") {
          try {
            // @ts-ignore
            await img.decode();
          } catch {}
        }
      })
    );

    // 再校验一遍：如果 naturalWidth 仍为 0，尝试触发一次 reload（兜底）
    await Promise.all(
      imgs.map(async (img) => {
        const ok = img.naturalWidth > 0 && img.naturalHeight > 0;
        if (ok) return;
        const src = img.getAttribute("src");
        if (!src) return;
        img.setAttribute("src", src);
        // @ts-ignore
        if (typeof img.decode === "function") {
          try {
            // @ts-ignore
            await img.decode();
          } catch {}
        }
      })
    );
  });
}

/**
 * 以“覆盖（cover）”方式把模板页画到目标页上（不拉伸变形，必要时会裁切一点点边缘）
 * 说明：你的模板 PDF 目前可能是 Letter 尺寸，而导出页面是 A4。
 */
function drawBackgroundCover(targetPage, embeddedTemplatePage) {
  const pageW = targetPage.getWidth();
  const pageH = targetPage.getHeight();

  const tplW = embeddedTemplatePage.width;
  const tplH = embeddedTemplatePage.height;

  const scale = Math.max(pageW / tplW, pageH / tplH);
  const w = tplW * scale;
  const h = tplH * scale;

  const x = (pageW - w) / 2;
  const y = (pageH - h) / 2;

  targetPage.drawPage(embeddedTemplatePage, {
    x,
    y,
    width: w,
    height: h,
    opacity: PDF_TEMPLATE_OPACITY,
    // @ts-ignore: pdf-lib accepts known blend mode strings
    blendMode: PDF_TEMPLATE_BLEND_MODE,
  });

  // 再覆盖一层浅灰半透明，让模板整体更“灰 + 透明”，避免彩色/深色元素抢正文
  if (PDF_TEMPLATE_WASH_OPACITY > 0) {
    const g = Math.min(1, Math.max(0, PDF_TEMPLATE_WASH_GRAY));
    targetPage.drawRectangle({
      x: 0,
      y: 0,
      width: pageW,
      height: pageH,
      color: rgb(g, g, g),
      opacity: Math.min(1, Math.max(0, PDF_TEMPLATE_WASH_OPACITY)),
    });
  }
}

async function addPageNumbers(pdfDoc) {
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 10;
  const color = rgb(0.35, 0.35, 0.35);

  const total = pdfDoc.getPageCount();
  for (let i = 0; i < total; i++) {
    const page = pdfDoc.getPage(i);
    const text = String(i + 1);
    const textW = font.widthOfTextAtSize(text, fontSize);

    const x = (page.getWidth() - textW) / 2;
    const y = mmToPt(PDF_PAGE_NUMBER_BOTTOM_MM);

    page.drawText(text, { x, y, size: fontSize, font, color });
  }
}

// 非首页：去掉站点渐变背景，让模板露出来
const EXPORT_NON_HOME_TRANSPARENT_BG_CSS = `
  html, body {
    background: transparent !important;
    background-image: none !important;
  }

  body::before, body::after {
    content: none !important;
    display: none !important;
  }

  #app, .VPApp, .VPContent, .VPDoc, .vp-doc {
    background: transparent !important;
    background-image: none !important;
  }
`;

// Hide VitePress chrome for PDF output; keep only doc content.
const EXPORT_ONLY_DOC_CSS = `
  /* 无障碍：VitePress 默认插入 “Skip to content” 链接，导出 PDF 时不需要 */
  .VPSkipLink, .visually-hidden {
    display: none !important;
  }

  /* 让页面排版更接近 A4 打印宽度，提升书签定位精度（避免按 1280px 视口宽度计算导致分页偏差） */
  .vp-doc {
    width: calc(${PDF_PAGE_W_MM}mm - ${PDF_MARGIN_LEFT_MM}mm - ${PDF_MARGIN_RIGHT_MM}mm) !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }

  .VPNav, .VPNavBar, .VPNavScreen, .VPLocalNav,
  .VPSidebar, .VPBackdrop, .VPFooter,
  .VPDocAside, .VPDocFooter,
  .VPDocFooterDivider, .VPDocFooterLink,
  .VPDocFooter .pager, .pager, .prev-next,
  .VPDoc .aside, .aside, .outline, .VPDocOutlineDropdown {
    display: none !important;
  }

  .VPContent, .VPDoc, .vp-doc {
    padding-top: 0 !important;
    margin-top: 0 !important;
  }

  .vp-doc {
    font-size: 15px !important;
    line-height: 1.85 !important;
  }

  /* h 系列字体大小：确保都大于正文字体（15px），且层级差距缩小 */
  .vp-doc h1 { 
    font-size: 24px !important; 
    font-weight: 700 !important; 
    margin-top: 30px !important;
    margin-bottom: 15px !important;
  }
  .vp-doc h2 { 
    font-size: 21px !important; 
    font-weight: 600 !important; 
    margin-top: 26px !important;
    margin-bottom: 13px !important;
  }
  .vp-doc h3 { 
    font-size: 19px !important; 
    font-weight: 600 !important; 
    margin-top: 23px !important;
    margin-bottom: 11px !important;
  }
  .vp-doc h4 { 
    font-size: 17px !important; 
    font-weight: 600 !important; 
    margin-top: 19px !important;
    margin-bottom: 9px !important;
  }
  .vp-doc h5 { 
    font-size: 16px !important; 
    font-weight: 600 !important; 
    margin-top: 15px !important;
    margin-bottom: 8px !important;
  }
  .vp-doc h6 { 
    font-size: 15.5px !important; 
    font-weight: 600 !important; 
    margin-top: 13px !important;
    margin-bottom: 8px !important;
  }

  .vp-doc p,
  .vp-doc li {
    line-height: 1.9 !important;
  }

  .vp-doc code {
    font-size: 0.92em !important;
  }

  .vp-doc pre code {
    font-size: 0.9em !important;
  }

  img {
    break-inside: avoid;
    page-break-inside: avoid;
    max-width: 100% !important;
    height: auto !important;
  }

  thead {
    display: table-header-group;
  }
`;

function pnpmCmd() {
  return process.platform === "win32" ? "pnpm.cmd" : "pnpm";
}

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      stdio: "inherit",
      shell: process.platform === "win32",
      ...opts,
    });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} ${args.join(" ")} failed with code ${code}`));
    });
  });
}

function startPreviewServer() {
  const cmd = pnpmCmd();
  const args = ["-s", "docs:preview", "--", "--port", String(PORT), "--strictPort"];
  const child = spawn(cmd, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  return child;
}

async function waitForServer(url, timeoutMs = 30_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { method: "GET" });
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`Preview server not ready: ${url}`);
}

async function isServerUp(url) {
  try {
    const res = await fetch(url, { method: "GET" });
    return res.ok;
  } catch {
    return false;
  }
}

async function renderSinglePageToPdf(url, outFile, { backgroundTemplatePath }) {
  fs.mkdirSync(path.dirname(outFile), { recursive: true });

  if (!fs.existsSync(backgroundTemplatePath)) {
    throw new Error(`未找到页眉页脚模板 PDF：${backgroundTemplatePath}`);
  }

  let browser;
  try {
    browser = await chromium.launch();
  } catch (e) {
    console.error(
      "\n无法启动 Chromium（Playwright 浏览器可能未安装）。请先运行：\n" +
        "  pnpm exec playwright install chromium\n"
    );
    throw e;
  }

  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
  });

  const merged = await PDFDocument.create();

  // 背景模板（只取第一页，按 A4 cover 方式覆盖）
  const backgroundBytes = fs.readFileSync(backgroundTemplatePath);
  const backgroundDoc = await PDFDocument.load(backgroundBytes);
  const backgroundPage = backgroundDoc.getPage(0);
  const backgroundTemplate = await merged.embedPage(backgroundPage);

  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  // VitePress 在水合期间可能会让 #app 处于隐藏状态，这里只要“已挂载”即可
  await page.waitForSelector("#app", { state: "attached", timeout: 60_000 });
  await page.waitForSelector(".vp-doc", { state: "visible", timeout: 60_000 });

  await ensureImagesLoaded(page);

  // 等待字体加载完成（避免打印时文字抖动导致分页变化）
  // wait for fonts/images to settle
  await page.evaluate(async () => {
    // @ts-ignore
    if (document.fonts?.ready) {
      // @ts-ignore
      await document.fonts.ready;
    }
  });
  await page.waitForTimeout(200);
  await page.emulateMedia({ media: "screen" });

  await page.addStyleTag({ content: EXPORT_ONLY_DOC_CSS });
  await page.addStyleTag({ content: EXPORT_NON_HOME_TRANSPARENT_BG_CSS });

  // 为手册页面添加字体样式（确保 PDF 导出时也能应用）
  const isChineseManual = url.includes("/cn/manuals/normal-user");
  const manualFontCSS = isChineseManual
    ? `
    /* 中文手册：标题和正文统一使用 MiSans */
    .vp-doc h1, .vp-doc h2, .vp-doc h3, .vp-doc h4, .vp-doc h5, .vp-doc h6,
    .vp-doc {
      font-family: "MiSans", "Microsoft YaHei", "微软雅黑", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
    }
  `
    : `
    /* 英文手册：标题使用 Montserrat，正文使用 Arimo */
    .vp-doc h1, .vp-doc h2, .vp-doc h3, .vp-doc h4, .vp-doc h5, .vp-doc h6 {
      font-family: "Montserrat", Arial, sans-serif !important;
    }
    .vp-doc {
      font-family: "Arimo", Arial, sans-serif !important;
    }
  `;
  await page.addStyleTag({ content: manualFontCSS });

  const pdfBytes = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: `${PDF_CONTENT_TOP_MM}mm`,
      bottom: `${PDF_CONTENT_BOTTOM_MM}mm`,
      left: "12mm",
      right: "12mm",
    },
  });

  const doc = await PDFDocument.load(pdfBytes);
  const docPages = doc.getPages();
  const embeddedPages = await merged.embedPages(docPages);

  for (const embeddedPage of embeddedPages) {
    const { width, height } = embeddedPage;
    const mergedPage = merged.addPage([width, height]);
    drawBackgroundCover(mergedPage, backgroundTemplate);
    mergedPage.drawPage(embeddedPage, { x: 0, y: 0, width, height });
  }

  await addPageNumbers(merged);

  await page.close();
  await browser.close();

  const bytes = await merged.save();
  // Windows 下如果目标 PDF 正在被打开（例如在 IDE / PDF 阅读器里），直接写会失败。
  // 这里先写到临时文件，再尝试覆盖；若仍失败则保留 .new 文件并给出提示。
  safeWritePdf(outFile, bytes);
  console.log(`\nPDF generated: ${outFile} (${merged.getPageCount()} pages)\n`);
}

function safeWritePdf(outFile, bytes) {
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  try {
    fs.writeFileSync(outFile, bytes);
    return;
  } catch {}

  const tmp = `${outFile}.new`;
  fs.writeFileSync(tmp, bytes);
  try {
    // 尝试原子替换：先删再改名（在 Windows 上更稳）
    try {
      fs.unlinkSync(outFile);
    } catch {}
    fs.renameSync(tmp, outFile);
    return;
  } catch (e) {
    console.warn(
      `\n[PDF] 无法覆盖写入目标文件（可能正在被占用）：\n` +
        `      ${outFile}\n` +
        `      已生成新文件：${tmp}\n` +
        `      关闭已打开的 PDF 后，可手动用 .new 覆盖或重新运行导出。\n`
    );
  }
}

async function main() {
  // 1) Build the site（确保路由/样式/图片都是最终效果）
  await run(pnpmCmd(), ["-s", "docs:build"]);

  // 2) Start preview server
  let server = null;
  let startedByUs = false;
  try {
    const healthUrl = `${BASE_URL}/index.html`;
    if (await isServerUp(healthUrl)) {
      console.log(`Preview server already running at ${BASE_URL}, reusing it.`);
    } else {
      server = startPreviewServer();
      startedByUs = true;
      await waitForServer(healthUrl);
    }

    // 3) 导出：只导出 normal-user 这一页（中英各一份）
    const urlZh = `${BASE_URL}/cn/manuals/normal-user.html`;
    const urlEn = `${BASE_URL}/manuals/normal-user.html`;

    await renderSinglePageToPdf(urlZh, OUT_ZH, { backgroundTemplatePath: HEADER_FOOTER_PDF });
    await renderSinglePageToPdf(urlEn, OUT_EN, { backgroundTemplatePath: HEADER_FOOTER_PDF });
  } finally {
    if (startedByUs && server) server.kill();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});



import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { chromium } from "playwright";
import matter from "gray-matter";
import {
  PDFDocument,
  PDFHexString,
  PDFName,
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

const HEADER_FOOTER_PDF_EN = path.join(repoRoot, "tools", "pdf-assets", "header-footer-template.pdf");
const HEADER_FOOTER_PDF_ZH = path.join(repoRoot, "tools", "pdf-assets", "header-footer-template-cn.pdf");
const VITEPRESS_CONFIG = path.join(repoRoot, "docs", ".vitepress", "config.ts");
const DOCS_ROOT = path.join(repoRoot, "docs");
const MERGED_MANUAL_EN = path.join(repoRoot, "docs", "manuals", "normal-user.md");
const MERGED_MANUAL_ZH = path.join(repoRoot, "docs", "cn", "manuals", "normal-user.md");
const PDF_SEGMENT_EN_COVER = path.join(repoRoot, "docs", "manuals", "__pdf-cover.md");
const PDF_SEGMENT_EN_TOC = path.join(repoRoot, "docs", "manuals", "__pdf-toc.md");
const PDF_SEGMENT_EN_BODY = path.join(repoRoot, "docs", "manuals", "__pdf-body.md");
const PDF_SEGMENT_EN_SECTION_DIR = path.join(repoRoot, "docs", "manuals", "__pdf-sections");
const PDF_SEGMENT_ZH_COVER = path.join(repoRoot, "docs", "cn", "manuals", "__pdf-cover.md");
const PDF_SEGMENT_ZH_TOC = path.join(repoRoot, "docs", "cn", "manuals", "__pdf-toc.md");
const PDF_SEGMENT_ZH_BODY = path.join(repoRoot, "docs", "cn", "manuals", "__pdf-body.md");
const PDF_SEGMENT_ZH_SECTION_DIR = path.join(repoRoot, "docs", "cn", "manuals", "__pdf-sections");

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
const PDF_PAGE_NUMBER_BOTTOM_MM = Number(process.env.PDF_PAGE_NUMBER_BOTTOM_MM || 5);
const PDF_PAGE_NUMBER_RIGHT_MM = Number(process.env.PDF_PAGE_NUMBER_RIGHT_MM || 8);

const LOCAL_PDF_FONT_CSS = `
  @font-face {
    font-family: "MiSans PDF";
    src: url("/fonts/MiSans-Regular.woff2") format("woff2");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "MiSans PDF";
    src: url("/fonts/MiSans-Semibold.woff2") format("woff2");
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "MiSans PDF";
    src: url("/fonts/MiSans-Bold.woff2") format("woff2");
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Arimo PDF";
    src: url("/fonts/Arimo-Regular.ttf") format("truetype");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Arimo PDF";
    src: url("/fonts/Arimo-SemiBold.ttf") format("truetype");
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Arimo PDF";
    src: url("/fonts/Arimo-Bold.ttf") format("truetype");
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Montserrat PDF";
    src: url("/fonts/Montserrat-SemiBold.ttf") format("truetype");
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Montserrat PDF";
    src: url("/fonts/Montserrat-Bold.ttf") format("truetype");
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
`;

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

    const x = page.getWidth() - textW - mmToPt(PDF_PAGE_NUMBER_RIGHT_MM);
    const y = mmToPt(PDF_PAGE_NUMBER_BOTTOM_MM);

    page.drawText(text, { x, y, size: fontSize, font, color });
  }
}

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

  .manual-cover-page {
    text-align: center;
  }

  .vp-doc._manuals___pdf-cover,
  .vp-doc._cn_manuals___pdf-cover,
  .vp-doc._manuals___pdf-cover > div,
  .vp-doc._cn_manuals___pdf-cover > div,
  .vp-doc._manuals___pdf-cover .manual-cover-page,
  .vp-doc._cn_manuals___pdf-cover .manual-cover-page {
    margin: 0 !important;
    padding: 0 !important;
  }

  .vp-doc._manuals___pdf-cover,
  .vp-doc._cn_manuals___pdf-cover {
    width: auto !important;
    max-width: none !important;
  }

  .vp-doc._manuals___pdf-cover .manual-cover-page,
  .vp-doc._cn_manuals___pdf-cover .manual-cover-page {
    display: block !important;
    min-height: 0 !important;
    height: auto !important;
    padding-top: 82mm !important;
    overflow: visible !important;
    box-sizing: border-box;
  }

  .manual-cover-page h1 {
    margin: 0 !important;
    font-size: 30px !important;
  }

  .manual-toc-page h2 {
    margin-top: 0 !important;
  }

  .manual-toc ul {
    margin: 0 0 10px 20px !important;
  }

  .manual-toc li {
    margin: 2px 0 !important;
  }

  .manual-toc a, .manual-toc span {
    color: inherit !important;
    text-decoration: none !important;
  }

  .manual-toc-entry {
    display: flex;
    align-items: baseline;
    gap: 8px;
    width: 100%;
  }

  .manual-toc-label {
    flex: 0 1 auto;
    min-width: 0;
  }

  .manual-toc-leader {
    flex: 1 1 auto;
    min-width: 12px;
    border-bottom: 1px dotted currentColor;
    transform: translateY(-2px);
    opacity: 0.45;
  }

  .manual-toc-page-number {
    flex: 0 0 auto;
    min-width: 24px;
    text-align: right;
  }

  .manual-page-break {
    display: block;
    height: 0;
    break-after: page;
    page-break-after: always;
  }

  .manual-body-start {
    display: block;
    height: 0;
    break-before: page;
    page-break-before: always;
    overflow: hidden;
  }`;

function pnpmCmd() {
  return process.platform === "win32" ? "pnpm.cmd" : "pnpm";
}

function normalizePath(p) {
  return p.split(path.sep).join("/");
}

function extractDefineConfigObjectLiteral(source) {
  const anchor = "defineConfig(";
  const anchorIndex = source.indexOf(anchor);
  if (anchorIndex === -1) {
    throw new Error("defineConfig call not found in VitePress config");
  }

  const start = source.indexOf("{", anchorIndex);
  if (start === -1) {
    throw new Error("Config object start not found");
  }

  let depth = 0;
  let inString = false;
  let stringChar = "";
  let inLineComment = false;
  let inBlockComment = false;

  for (let i = start; i < source.length; i++) {
    const char = source[i];
    const next = source[i + 1];
    const prev = source[i - 1];

    if (inLineComment) {
      if (char === "\n") inLineComment = false;
      continue;
    }

    if (inBlockComment) {
      if (prev === "*" && char === "/") inBlockComment = false;
      continue;
    }

    if (inString) {
      if (char === stringChar && prev !== "\\") {
        inString = false;
        stringChar = "";
      }
      continue;
    }

    if (char === "/" && next === "/") {
      inLineComment = true;
      i++;
      continue;
    }

    if (char === "/" && next === "*") {
      inBlockComment = true;
      i++;
      continue;
    }

    if (char === "'" || char === '"') {
      inString = true;
      stringChar = char;
      continue;
    }

    if (char === "{") {
      depth++;
    } else if (char === "}") {
      depth--;
      if (depth === 0) {
        return source.slice(start, i + 1);
      }
    }
  }

  throw new Error("Unclosed config object literal");
}

function parseVitePressConfig() {
  const configSource = fs.readFileSync(VITEPRESS_CONFIG, "utf8");
  const objectLiteral = extractDefineConfigObjectLiteral(configSource)
    .replace(/\((\w+)\s*:\s*string\)/g, "($1)");
  return vm.runInNewContext("(" + objectLiteral + ")");
}

function extractSidebarConfig(localeKey) {
  const config = parseVitePressConfig();
  const locale = config.locales && config.locales[localeKey];
  if (!locale || !locale.themeConfig || !locale.themeConfig.sidebar) {
    throw new Error("Sidebar config not found for locale: " + localeKey);
  }
  return locale.themeConfig.sidebar;
}

function escapeHtml(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shouldSkipManualItem(item) {
  if (!item?.link || !/\/index\.html$/.test(item.link)) {
    return false;
  }

  const text = String(item.text || "").trim().toLowerCase();
  if (text === "table of contents" || text === "目录") {
    return true;
  }

  return Array.isArray(item.items) && item.items.length > 0;
}

function collectSidebarEntriesFromItems(items, entries) {
  for (const item of items || []) {
    const hasChildren = Array.isArray(item?.items) && item.items.length > 0;
    if (item?.link && !shouldSkipManualItem(item)) {
      entries.push({
        text: String(item.text || "").trim(),
        link: item.link,
      });
    }

    if (hasChildren) {
      collectSidebarEntriesFromItems(item.items, entries);
    }
  }
}

function collectSidebarEntries(localeKey) {
  const sidebar = extractSidebarConfig(localeKey);
  const entries = [];

  for (const items of Object.values(sidebar)) {
    collectSidebarEntriesFromItems(items, entries);
  }

  const uniqueEntries = [];
  const seen = new Set();
  for (const entry of entries) {
    if (seen.has(entry.link)) {
      continue;
    }
    seen.add(entry.link);
    uniqueEntries.push(entry);
  }

  return uniqueEntries;
}

function linkToMarkdownPath(link) {
  return path.join(
    DOCS_ROOT,
    link.replace(/^\//, "").replace(/\.html$/, ".md")
  );
}

function manualAnchorId(link) {
  return "manual-" + link
    .replace(/^\//, "")
    .replace(/\.html$/, "")
    .replace(/[^a-zA-Z0-9/_-]+/g, "-")
    .replace(/[\/]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function resolveManualTocPage(node, pageNumbers) {
  if (!pageNumbers) {
    return null;
  }

  if (node.link) {
    const page = pageNumbers.get(manualAnchorId(node.link));
    if (page) {
      return page;
    }
  }

  for (const child of node.children || []) {
    const childPage = resolveManualTocPage(child, pageNumbers);
    if (childPage) {
      return childPage;
    }
  }

  return null;
}

function renderManualTocNodes(nodes, lines, pageNumbers) {
  if (!nodes || nodes.length === 0) {
    return;
  }

  lines.push('<ul>');
  for (const node of nodes) {
    const label = escapeHtml(node.text || '');
    const page = resolveManualTocPage(node, pageNumbers);
    const pageText = page ? String(page) : '&nbsp;';
    const href = node.link ? '#' + manualAnchorId(node.link) : null;

    lines.push('<li>');
    lines.push('<div class="manual-toc-entry">');
    if (href) {
      lines.push('<a class="manual-toc-label" href="' + href + '">' + label + '</a>');
    } else {
      lines.push('<span class="manual-toc-label">' + label + '</span>');
    }
    lines.push('<span class="manual-toc-leader"></span>');
    lines.push('<span class="manual-toc-page-number">' + pageText + '</span>');
    lines.push('</div>');

    if (node.children?.length) {
      renderManualTocNodes(node.children, lines, pageNumbers);
    }

    lines.push('</li>');
  }
  lines.push('</ul>');
}

function renderManualToc(localeKey, pageNumbers = null) {
  const sidebar = extractSidebarConfig(localeKey);
  const tocTitle = localeKey === 'cn' ? '\u603b\u76ee\u5f55' : 'Contents';
  const lines = ['<div class="manual-toc-page">', '<h2>' + tocTitle + '</h2>', '', '<div class="manual-toc">'];

  for (const items of Object.values(sidebar)) {
    renderManualTocNodes(buildManualBookmarkNodes(items), lines, pageNumbers);
  }

  lines.push('</div>', '</div>', '');
  return lines.join('\n');
}
function buildManualBookmarkNodes(items) {
  const nodes = [];

  for (const item of items || []) {
    const hasChildren = Array.isArray(item?.items) && item.items.length > 0;
    const children = hasChildren ? buildManualBookmarkNodes(item.items) : [];
    const includeSelf = item?.link && !shouldSkipManualItem(item);

    if (!includeSelf && children.length === 0) {
      continue;
    }

    nodes.push({
      text: String(item?.text || '').trim(),
      link: includeSelf ? item.link : null,
      children,
    });
  }

  return nodes;
}

function buildManualBookmarkTree(localeKey) {
  const sidebar = extractSidebarConfig(localeKey);
  const roots = [];

  for (const items of Object.values(sidebar)) {
    roots.push(...buildManualBookmarkNodes(items));
  }

  return roots;
}

function collectManualAnchorIds(nodes, ids = []) {
  for (const node of nodes || []) {
    if (node.link) {
      ids.push(manualAnchorId(node.link));
    }
    if (node.children?.length) {
      collectManualAnchorIds(node.children, ids);
    }
  }
  return ids;
}


function rewriteRelativeAssetUrls(content, sourceFile) {
  const sourceDir = path.dirname(sourceFile);
  const toSitePath = (rawUrl) => {
    if (
      !rawUrl ||
      rawUrl.startsWith("http://") ||
      rawUrl.startsWith("https://") ||
      rawUrl.startsWith("data:") ||
      rawUrl.startsWith("#") ||
      rawUrl.startsWith("/")
    ) {
      return rawUrl;
    }

    const [pathname, hash = ""] = rawUrl.split("#");
    if (!pathname) {
      return rawUrl;
    }

    const resolved = path.resolve(sourceDir, pathname);
    const relativeToDocs = normalizePath(path.relative(DOCS_ROOT, resolved));
    if (relativeToDocs.startsWith("..")) {
      return rawUrl;
    }

    const sitePath = "/" + relativeToDocs;
    return hash ? sitePath + "#" + hash : sitePath;
  };

  const markdownImagePattern = /!\[([^\]]*?)\]\(([^)]+)\)/g;
  const markdownLinkPattern = /(?<!!)\[([^\]]*?)\]\(([^)]+)\)/g;
  const htmlImagePattern = /(<img\b[^>]*?\bsrc=["'])([^"']+)(["'][^>]*>)/gi;
  const htmlAnchorPattern = /(<a\b[^>]*?\bhref=["'])([^"']+)(["'][^>]*>)/gi;

  return content
    .replace(markdownImagePattern, (_, alt, url) => {
      return '<img src="' + toSitePath(url) + '" alt="' + alt.replace(/"/g, "&quot;") + '" style="max-width:100%; height:auto;" />';
    })
    .replace(markdownLinkPattern, (_, text, url) => {
      return "[" + text + "](" + toSitePath(url) + ")";
    })
    .replace(htmlImagePattern, (_, prefix, url, suffix) => {
      return prefix + toSitePath(url) + suffix;
    })
    .replace(htmlAnchorPattern, (_, prefix, url, suffix) => {
      return prefix + toSitePath(url) + suffix;
    });
}

function convertMarkdownHeadingsToHtml(content) {
  return content
    .replace(/^(#{1,6})\s+(.+)$/gm, (_, hashes, text) => {
      const level = Math.min(hashes.length + 1, 6);
      return "<h" + level + ">" + text.trim() + "</h" + level + ">";
    })
    .replace(/<h([1-5])(\b[^>]*)>/gi, (_, level, attrs) => "<h" + (Number(level) + 1) + attrs + ">")
    .replace(/<\/h([1-5])>/gi, (_, level) => "</h" + (Number(level) + 1) + ">");
}

function cleanMergedContent(content) {
  return content
    .replace(/\r\n/g, "\n")
    .replace(/^\s*<!--.*?-->\s*$/gm, "")
    .trim();
}

function buildManualSectionEntries(localeKey) {
  const entries = collectSidebarEntries(localeKey);
  const sections = [];

  for (const entry of entries) {
    const filePath = linkToMarkdownPath(entry.link);
    if (!fs.existsSync(filePath)) {
      throw new Error("Markdown source not found for link " + entry.link + ": " + filePath);
    }

    const source = fs.readFileSync(filePath, "utf8");
    const parsed = matter(source);
    const normalized = cleanMergedContent(
      convertMarkdownHeadingsToHtml(rewriteRelativeAssetUrls(parsed.content, filePath))
    );

    if (!normalized) {
      continue;
    }

    sections.push({
      text: entry.text,
      link: entry.link,
      anchorId: manualAnchorId(entry.link),
      sourceFile: normalizePath(path.relative(repoRoot, filePath)),
      content: normalized,
    });
  }

  return sections;
}

function renderManualSection(entry) {
  return `<div id="${entry.anchorId}"></div>
<!-- source: ${entry.sourceFile} -->

${entry.content}`;
}

function buildManualSections(localeKey) {
  return buildManualSectionEntries(localeKey).map(renderManualSection);
}

function buildMergedManual(localeKey, title) {
  const sections = buildManualSections(localeKey);
  return [
    "---",
    "outline: deep",
    "search: false",
    "---",
    "",
    "<div class=\"manual-cover-page\"><h1>" + title + "</h1></div>",
    "",
    renderManualToc(localeKey),
    "<div class=\"manual-body-start\"></div>",
    "<!-- This file is auto-generated by tools/export-normal-user-pdf.mjs. -->",
    "",
    ...sections.flatMap((section) => [section, ""]),
  ].join("\n");
}

function wrapPdfSegment(content) {
  return [
    "---",
    "outline: false",
    "search: false",
    "---",
    "",
    content.trim(),
    "",
  ].join("\n");
}

function writePdfSegmentFiles(localeKey, title, coverFile, tocFile, bodyFile, sectionDir, pageNumbers = null) {
  const bodyEntries = buildManualSectionEntries(localeKey);
  const bodySections = bodyEntries.map(renderManualSection);
  const coverContent = wrapPdfSegment(`<div class="manual-cover-page"><h1>${title}</h1></div>`);
  const tocContent = wrapPdfSegment(renderManualToc(localeKey, pageNumbers));
  const bodyContent = wrapPdfSegment([
    "<div class=\"manual-body-page\">",
    "<!-- This file is auto-generated by tools/export-normal-user-pdf.mjs. -->",
    "",
    ...bodySections.flatMap((section) => [section, ""]),
    "</div>",
  ].join("\n"));

  fs.mkdirSync(sectionDir, { recursive: true });
  for (const entry of fs.readdirSync(sectionDir, { withFileTypes: true })) {
    if (entry.isFile() && /^section-\d+\.md$/.test(entry.name)) {
      fs.unlinkSync(path.join(sectionDir, entry.name));
    }
  }

  const sectionSpecs = bodyEntries.map((entry, index) => {
    const slug = String(index + 1).padStart(3, "0");
    const filePath = path.join(sectionDir, `section-${slug}.md`);
    fs.writeFileSync(filePath, wrapPdfSegment(renderManualSection(entry)), "utf8");
    return {
      anchorId: entry.anchorId,
      route: normalizePath(path.relative(DOCS_ROOT, filePath)).replace(/\.md$/, ".html"),
    };
  });

  fs.writeFileSync(coverFile, coverContent, "utf8");
  fs.writeFileSync(tocFile, tocContent, "utf8");
  fs.writeFileSync(bodyFile, bodyContent, "utf8");

  return sectionSpecs;
}

function writeMergedManualFiles(pageNumbersByLocale = {}) {
  const enTitle = 'Monarch Edge User Manual';
  const zhTitle = '\u666e\u901a\u7528\u6237\u624b\u518c';
  const enContent = buildMergedManual('root', enTitle);
  const zhContent = buildMergedManual('cn', zhTitle);

  fs.writeFileSync(MERGED_MANUAL_EN, enContent, 'utf8');
  fs.writeFileSync(MERGED_MANUAL_ZH, zhContent, 'utf8');

  const enSections = writePdfSegmentFiles(
    'root',
    enTitle,
    PDF_SEGMENT_EN_COVER,
    PDF_SEGMENT_EN_TOC,
    PDF_SEGMENT_EN_BODY,
    PDF_SEGMENT_EN_SECTION_DIR,
    pageNumbersByLocale.root || null
  );
  const zhSections = writePdfSegmentFiles(
    'cn',
    zhTitle,
    PDF_SEGMENT_ZH_COVER,
    PDF_SEGMENT_ZH_TOC,
    PDF_SEGMENT_ZH_BODY,
    PDF_SEGMENT_ZH_SECTION_DIR,
    pageNumbersByLocale.cn || null
  );

  return {
    root: enSections,
    cn: zhSections,
  };
}

function buildPdfPageSpecs(localePrefix, sectionSpecs) {
  return [
    { kind: 'cover', url: BASE_URL + '/' + localePrefix + 'manuals/__pdf-cover.html' },
    { kind: 'toc', url: BASE_URL + '/' + localePrefix + 'manuals/__pdf-toc.html' },
    ...sectionSpecs.map((section) => ({
      kind: 'section',
      url: BASE_URL + '/' + section.route,
      anchorId: section.anchorId,
    })),
  ];
}

function cleanupGeneratedManualFiles() {
  const targets = [
    MERGED_MANUAL_EN,
    MERGED_MANUAL_ZH,
    PDF_SEGMENT_EN_COVER,
    PDF_SEGMENT_EN_TOC,
    PDF_SEGMENT_EN_BODY,
    PDF_SEGMENT_ZH_COVER,
    PDF_SEGMENT_ZH_TOC,
    PDF_SEGMENT_ZH_BODY,
    PDF_SEGMENT_EN_SECTION_DIR,
    PDF_SEGMENT_ZH_SECTION_DIR,
  ];

  for (const target of targets) {
    if (!fs.existsSync(target)) {
      continue;
    }

    const stat = fs.statSync(target);
    if (stat.isDirectory()) {
      fs.rmSync(target, { recursive: true, force: true });
    } else {
      fs.unlinkSync(target);
    }
  }
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

function computeOutlineCount(nodes) {
  let count = 0;
  for (const node of nodes || []) {
    count += 1;
    if (node.children?.length) {
      count += computeOutlineCount(node.children);
    }
  }
  return count;
}

function findBookmarkTarget(node, bookmarkTargets) {
  if (node.link) {
    const direct = bookmarkTargets.get(manualAnchorId(node.link));
    if (direct) return direct;
  }

  for (const child of node.children || []) {
    const target = findBookmarkTarget(child, bookmarkTargets);
    if (target) return target;
  }

  return null;
}

function createOutlineItems(pdfDoc, parentRef, nodes, bookmarkTargets) {
  const created = [];

  for (const node of nodes || []) {
    const target = findBookmarkTarget(node, bookmarkTargets);
    const itemDict = pdfDoc.context.obj({
      Title: PDFHexString.fromText(node.text || ''),
      Parent: parentRef,
    });

    if (target) {
      const page = pdfDoc.getPages()[target.pageIndex];
      itemDict.set(
        PDFName.of('Dest'),
        pdfDoc.context.obj([page.ref, PDFName.of('XYZ'), null, target.y, null])
      );
    }

    const itemRef = pdfDoc.context.register(itemDict);
    const children = createOutlineItems(pdfDoc, itemRef, node.children || [], bookmarkTargets);

    if (children.length > 0) {
      itemDict.set(PDFName.of('First'), children[0].ref);
      itemDict.set(PDFName.of('Last'), children[children.length - 1].ref);
      itemDict.set(PDFName.of('Count'), pdfDoc.context.obj(computeOutlineCount(node.children || [])));

      for (let i = 0; i < children.length; i++) {
        if (i > 0) {
          children[i].dict.set(PDFName.of('Prev'), children[i - 1].ref);
        }
        if (i < children.length - 1) {
          children[i].dict.set(PDFName.of('Next'), children[i + 1].ref);
        }
      }
    }

    created.push({ ref: itemRef, dict: itemDict });
  }

  return created;
}

function addPdfBookmarks(pdfDoc, localeKey, bookmarkTargets) {
  const roots = buildManualBookmarkTree(localeKey);
  if (!roots.length || bookmarkTargets.size === 0) {
    return;
  }

  const outlinesDict = pdfDoc.context.obj({ Type: PDFName.of('Outlines') });
  const outlinesRef = pdfDoc.context.register(outlinesDict);
  const children = createOutlineItems(pdfDoc, outlinesRef, roots, bookmarkTargets);

  if (!children.length) {
    return;
  }

  outlinesDict.set(PDFName.of('First'), children[0].ref);
  outlinesDict.set(PDFName.of('Last'), children[children.length - 1].ref);
  outlinesDict.set(PDFName.of('Count'), pdfDoc.context.obj(computeOutlineCount(roots)));

  for (let i = 0; i < children.length; i++) {
    if (i > 0) {
      children[i].dict.set(PDFName.of('Prev'), children[i - 1].ref);
    }
    if (i < children.length - 1) {
      children[i].dict.set(PDFName.of('Next'), children[i + 1].ref);
    }
  }

  pdfDoc.catalog.set(PDFName.of('Outlines'), outlinesRef);
  pdfDoc.catalog.set(PDFName.of('PageMode'), PDFName.of('UseOutlines'));
}

async function renderPagesToPdf(pageSpecs, outFile, { backgroundTemplatePath, localeKey }) {
  fs.mkdirSync(path.dirname(outFile), { recursive: true });

  if (!fs.existsSync(backgroundTemplatePath)) {
    throw new Error(`??????????????PDF??{backgroundTemplatePath}`);
  }

  let browser;
  try {
    browser = await chromium.launch();
  } catch (e) {
    console.error("\n?????? Chromium??laywright ???????????????????????\n" + "  pnpm exec playwright install chromium\n");
    throw e;
  }

  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
  });

  const merged = await PDFDocument.create();
  const isChineseManual = localeKey === "cn";
  const bookmarkTargets = new Map();
  const backgroundBytes = fs.readFileSync(backgroundTemplatePath);
  const backgroundDoc = await PDFDocument.load(backgroundBytes);
  const backgroundPage = backgroundDoc.getPage(0);
  const backgroundTemplate = await merged.embedPage(backgroundPage);
  const manualFontCSS = isChineseManual
    ? `
    .vp-doc h1, .vp-doc h2, .vp-doc h3, .vp-doc h4, .vp-doc h5, .vp-doc h6,
    .vp-doc {
      font-family: "MiSans PDF", "MiSans", "Microsoft YaHei", "??????", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
    }
  `
    : `
    .vp-doc h1, .vp-doc h2, .vp-doc h3, .vp-doc h4, .vp-doc h5, .vp-doc h6 {
      font-family: "Montserrat PDF", "Montserrat", Arial, sans-serif !important;
    }
    .vp-doc {
      font-family: "Arimo PDF", "Arimo", Arial, sans-serif !important;
    }
  `;

  try {
    for (const spec of pageSpecs) {
      const page = await context.newPage();
      await page.goto(spec.url, { waitUntil: "networkidle" });
      await page.waitForSelector("#app", { state: "attached", timeout: 60_000 });
      await page.waitForSelector(".vp-doc", { state: "visible", timeout: 60_000 });
      await ensureImagesLoaded(page);
      await page.evaluate(async () => {
        if (document.fonts?.ready) {
          await document.fonts.ready;
        }
      });
      await page.waitForTimeout(200);
      await page.emulateMedia({ media: "screen" });
      await page.addStyleTag({ content: LOCAL_PDF_FONT_CSS });
      await page.addStyleTag({ content: EXPORT_ONLY_DOC_CSS });
      await page.addStyleTag({ content: EXPORT_NON_HOME_TRANSPARENT_BG_CSS });
      await page.addStyleTag({ content: manualFontCSS });
      await page.evaluate(async () => {
        if (document.fonts?.ready) {
          await document.fonts.ready;
        }
      });
      await page.waitForTimeout(300);

      const pageOffset = merged.getPageCount();
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
      spec.pageCount = docPages.length;
      const embeddedPages = await merged.embedPages(docPages);

      for (const embeddedPage of embeddedPages) {
        const { width, height } = embeddedPage;
        const mergedPage = merged.addPage([width, height]);
        drawBackgroundCover(mergedPage, backgroundTemplate);
        mergedPage.drawPage(embeddedPage, { x: 0, y: 0, width, height });
      }

      if (spec.anchorId) {
        bookmarkTargets.set(spec.anchorId, {
          pageIndex: pageOffset,
          y: 841.89 - mmToPt(PDF_CONTENT_TOP_MM),
        });
      }

      await page.close();
    }

    addPdfBookmarks(merged, localeKey, bookmarkTargets);
    await addPageNumbers(merged);
  } finally {
    await browser.close();
  }

  const bytes = await merged.save();
  safeWritePdf(outFile, bytes);
  console.log(`\nPDF generated: ${outFile} (${merged.getPageCount()} pages)\n`);

  const pageNumbers = new Map();
  for (const [anchorId, target] of bookmarkTargets.entries()) {
    pageNumbers.set(anchorId, target.pageIndex + 1);
  }

  const tocPages = pageSpecs
    .filter((spec) => spec.kind === "toc")
    .reduce((sum, spec) => sum + (spec.pageCount || 0), 0);

  return { pageNumbers, tocPages, totalPages: merged.getPageCount() };
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
  let pageNumbersByLocale = { root: null, cn: null };
  let previousTocPages = null;
  let server = null;

  try {
    for (let pass = 0; pass < 3; pass++) {
      const pdfSections = writeMergedManualFiles(pageNumbersByLocale);
      await run(pnpmCmd(), ['-s', 'docs:build']);

      if (server) {
        server.kill();
        server = null;
      }

      const healthUrl = `${BASE_URL}/index.html`;
      server = startPreviewServer();
      await waitForServer(healthUrl);

      const resultZh = await renderPagesToPdf(
        buildPdfPageSpecs('cn/', pdfSections.cn),
        OUT_ZH,
        { backgroundTemplatePath: HEADER_FOOTER_PDF_ZH, localeKey: 'cn' }
      );
      const resultEn = await renderPagesToPdf(
        buildPdfPageSpecs('', pdfSections.root),
        OUT_EN,
        { backgroundTemplatePath: HEADER_FOOTER_PDF_EN, localeKey: 'root' }
      );

      const nextTocPages = { cn: resultZh.tocPages, root: resultEn.tocPages };
      const stable = previousTocPages && previousTocPages.cn === nextTocPages.cn && previousTocPages.root === nextTocPages.root;

      pageNumbersByLocale = {
        cn: resultZh.pageNumbers,
        root: resultEn.pageNumbers,
      };
      previousTocPages = nextTocPages;

      if (stable) {
        break;
      }
    }
  } finally {
    if (server) {
      server.kill();
    }
    cleanupGeneratedManualFiles();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


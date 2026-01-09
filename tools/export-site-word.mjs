import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  PageBreak,
} from "docx";

const repoRoot = process.cwd();
const distDir = path.join(repoRoot, "docs", ".vitepress", "dist");
const docsDir = path.join(repoRoot, "docs");

const OUT_EN_DOCX = path.join(
  repoRoot,
  "docs",
  "public",
  "downloads",
  "en",
  "monarch-edge-manual.docx"
);

function toPosix(p) {
  return p.split(path.sep).join("/");
}

function normalizeToHtmlPath(p) {
  if (!p) return "";
  let s = p;
  if (!s.startsWith("/")) s = "/" + s;
  if (s.endsWith("/")) s = s + "index.html";
  if (s === "/") s = "/index.html";
  // 本项目 cleanUrls=false，导航里基本都是 .html，但这里做个兜底
  if (!s.endsWith(".html") && !s.endsWith(".pdf") && !s.includes(".")) s = s + ".html";
  return s;
}

function parseVpSiteDataFromHtml(htmlText) {
  // VitePress 2 outputs either JSON.parse(...) or deserializeFunctions(JSON.parse(...))
  const m =
    htmlText.match(/window\.__VP_SITE_DATA__=JSON\.parse\("([\s\S]*?)"\);/) ||
    htmlText.match(/window\.__VP_SITE_DATA__=[^;]*?JSON\.parse\("([\s\S]*?)"\)\)\s*;/);
  if (!m) throw new Error("Cannot find __VP_SITE_DATA__ in built HTML.");
  const encoded = m[1];
  const decoded = JSON.parse(`"${encoded}"`);
  return JSON.parse(decoded);
}

function getOrderedLinks(siteData, localeKey) {
  const locale = siteData.locales?.[localeKey];
  if (!locale?.themeConfig) return [];

  const nav = locale.themeConfig.nav || [];
  const sidebar = locale.themeConfig.sidebar || {};
  const sidebarKeys = Object.keys(sidebar);

  const out = [];
  const seen = new Set();
  const push = (link) => {
    const norm = normalizeToHtmlPath(link);
    if (!norm.endsWith(".html")) return;
    if (!seen.has(norm)) {
      seen.add(norm);
      out.push(norm);
    }
  };

  // 0) Home first
  push("/index.html");

  const matchSidebarKey = (link) => {
    const l = normalizeToHtmlPath(link);
    let best = "";
    for (const key of sidebarKeys) {
      if (l.startsWith(key) && key.length > best.length) best = key;
    }
    return best || null;
  };

  const walkItems = (items) => {
    for (const it of items || []) {
      if (it.link) push(it.link);
      if (Array.isArray(it.items) && it.items.length) walkItems(it.items);
    }
  };

  // 1) 顶部导航顺序 -> 对应的侧边栏顺序
  for (const n of nav) {
    if (!n?.link) continue;
    push(n.link);
    const key = matchSidebarKey(n.link);
    if (!key) continue;
    const groups = sidebar[key] || [];
    for (const g of groups) {
      if (Array.isArray(g.items)) walkItems(g.items);
    }
  }

  return out;
}

function htmlPathToMarkdownFile(htmlPath) {
  const p = normalizeToHtmlPath(htmlPath);
  const rel = p.replace(/^\//, "").replace(/\.html$/i, ".md");
  return path.join(docsDir, rel);
}

function fileTitleFromMarkdown(mdPath, raw) {
  try {
    const { data, content } = matter(raw);
    if (typeof data?.title === "string" && data.title.trim()) return data.title.trim();
    // fallback: first markdown H1
    const m = content.match(/^\s*#\s+(.+?)\s*$/m);
    if (m) return m[1].trim();
  } catch {}
  // fallback: filename
  return path.basename(mdPath, ".md");
}

const md = new MarkdownIt({ html: false, linkify: true });

function inlineChildrenToRuns(inlineToken) {
  const runs = [];
  const children = inlineToken?.children || [];
  let pendingHref = null;

  for (const ch of children) {
    if (ch.type === "link_open") {
      pendingHref = ch.attrGet("href") || null;
      continue;
    }
    if (ch.type === "link_close") {
      pendingHref = null;
      continue;
    }

    if (ch.type === "code_inline") {
      runs.push(
        new TextRun({
          text: ch.content,
          font: "Consolas",
        })
      );
      continue;
    }

    if (ch.type === "text" || ch.type === "softbreak" || ch.type === "hardbreak") {
      const text = ch.type === "text" ? ch.content : "\n";
      runs.push(new TextRun({ text }));
      continue;
    }

    // 兜底：遇到未知类型就尽量输出它的 content
    if (typeof ch.content === "string" && ch.content) {
      runs.push(new TextRun({ text: ch.content }));
    }
  }

  // 如果是纯链接文本（inline 内部会有 link_open/text/link_close），上面已经输出了 text。
  // 这里不额外追加 href，避免文档太吵；如需可再加一版开关。
  if (pendingHref) {
    // no-op
  }

  return runs.length ? runs : [new TextRun({ text: "" })];
}

function tokensToDocxBlocks(tokens) {
  const blocks = [];

  let listLevel = 0;
  let orderedStack = []; // 每层一个计数器
  const nextOrderedNumber = () => {
    if (!orderedStack.length) orderedStack = [0];
    orderedStack[orderedStack.length - 1] += 1;
    return orderedStack[orderedStack.length - 1];
  };

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];

    if (t.type === "heading_open") {
      const level = Number(String(t.tag || "h1").slice(1)) || 1;
      const inline = tokens[i + 1];
      const text = inline?.content || "";

      const heading =
        level === 1
          ? HeadingLevel.HEADING_1
          : level === 2
            ? HeadingLevel.HEADING_2
            : level === 3
              ? HeadingLevel.HEADING_3
              : HeadingLevel.HEADING_4;

      blocks.push(new Paragraph({ text, heading }));
      continue;
    }

    if (t.type === "bullet_list_open") {
      listLevel += 1;
      continue;
    }
    if (t.type === "bullet_list_close") {
      listLevel = Math.max(0, listLevel - 1);
      continue;
    }

    if (t.type === "ordered_list_open") {
      listLevel += 1;
      orderedStack.push(0);
      continue;
    }
    if (t.type === "ordered_list_close") {
      listLevel = Math.max(0, listLevel - 1);
      orderedStack.pop();
      continue;
    }

    if (t.type === "paragraph_open") {
      const inline = tokens[i + 1];
      const runs = inlineChildrenToRuns(inline);

      const inList = listLevel > 0;
      const isOrdered = orderedStack.length > 0;
      if (inList && isOrdered) {
        // docx 的原生编号需要定义 numbering；这里用“前缀数字”简单实现，保证结构可读
        const n = nextOrderedNumber();
        blocks.push(
          new Paragraph({
            children: [new TextRun({ text: `${n}. ` }), ...runs],
          })
        );
      } else if (inList) {
        blocks.push(
          new Paragraph({
            children: runs,
            bullet: { level: Math.max(0, listLevel - 1) },
          })
        );
      } else {
        blocks.push(new Paragraph({ children: runs }));
      }

      continue;
    }

    if (t.type === "fence" || t.type === "code_block") {
      const code = (t.content || "").replace(/\s+$/g, "");
      const lines = code ? code.split("\n") : [""];

      // 简单把代码块按行输出，使用等宽字体
      for (const line of lines) {
        blocks.push(
          new Paragraph({
            children: [
              new TextRun({
                text: line || " ",
                font: "Consolas",
              }),
            ],
          })
        );
      }

      blocks.push(new Paragraph({})); // 空行
      continue;
    }

    if (t.type === "hr") {
      blocks.push(new Paragraph({ text: "—".repeat(24), alignment: AlignmentType.CENTER }));
      continue;
    }

    // 其他类型（图片/表格等）先跳过：用户需求是“文本”
  }

  return blocks;
}

async function main() {
  // 1) 确保已经 build（用 build 后的 __VP_SITE_DATA__ 来拿顺序）
  const rootIndexHtmlPath = path.join(distDir, "index.html");
  if (!fs.existsSync(rootIndexHtmlPath)) {
    throw new Error(
      `未找到构建产物：${toPosix(rootIndexHtmlPath)}。\n请先运行：pnpm docs:build`
    );
  }

  const rootIndexHtml = fs.readFileSync(rootIndexHtmlPath, "utf8");
  const siteData = parseVpSiteDataFromHtml(rootIndexHtml);
  const linksEn = getOrderedLinks(siteData, "root");

  // 2) 汇总所有英文 Markdown 内容
  const children = [];

  // 封面标题
  children.push(
    new Paragraph({
      text: "Monarch Edge Manual",
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
    })
  );
  children.push(
    new Paragraph({
      text: `Generated: ${new Date().toISOString().slice(0, 10)}`,
      alignment: AlignmentType.CENTER,
    })
  );
  children.push(new Paragraph({ children: [new PageBreak()] }));

  for (const htmlPath of linksEn) {
    const mdPath = htmlPathToMarkdownFile(htmlPath);
    if (!fs.existsSync(mdPath)) {
      console.warn(`[word] skip (md not found): ${htmlPath} -> ${toPosix(mdPath)}`);
      continue;
    }

    const raw = fs.readFileSync(mdPath, "utf8");
    const fm = matter(raw);
    const title = fileTitleFromMarkdown(mdPath, raw);

    // 每个页面以一级标题开始
    children.push(new Paragraph({ text: title, heading: HeadingLevel.HEADING_1 }));
    children.push(
      new Paragraph({
        text: `Source: ${htmlPath}`,
        alignment: AlignmentType.LEFT,
      })
    );
    children.push(new Paragraph({}));

    const tokens = md.parse(fm.content, {});
    const blocks = tokensToDocxBlocks(tokens);
    children.push(...blocks);

    // 页面之间插入分页
    children.push(new Paragraph({ children: [new PageBreak()] }));
  }

  const doc = new Document({
    sections: [{ properties: {}, children }],
  });

  fs.mkdirSync(path.dirname(OUT_EN_DOCX), { recursive: true });
  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(OUT_EN_DOCX, buf);

  console.log(`\nWord generated: ${OUT_EN_DOCX}\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});



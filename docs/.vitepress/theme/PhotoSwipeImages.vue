<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, watch } from "vue";
import { inBrowser, useRoute } from "vitepress";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

/**
 * PhotoSwipe full-screen preview for doc images.
 *
 * We open PhotoSwipe programmatically with a dataSource built from current
 * rendered <img> elements. This works well with VitePress-generated asset URLs
 * and relative paths, and does not require wrapping images with <a>.
 */

const route = useRoute();
let lightbox: PhotoSwipeLightbox | null = null;
let cleanup: Array<() => void> = [];

function getImgs() {
  return Array.from(
    document.querySelectorAll<HTMLImageElement>(".vp-doc img:not(.no-preview)")
  );
}

function absUrl(img: HTMLImageElement) {
  const raw = img.currentSrc || img.src || img.getAttribute("src") || "";
  if (!raw) return "";
  return new URL(raw, window.location.href).href;
}

function buildDataSource(imgs: HTMLImageElement[]) {
  return imgs
    .map((img) => {
      const src = absUrl(img);
      if (!src) return null;
      // PhotoSwipe needs dimensions. Use natural sizes if available; fallback to
      // viewport-ish values (PhotoSwipe will still work, just less perfect).
      // 确保获取到正确的图片尺寸，如果图片还未加载完成，使用实际显示尺寸或默认值
      let w = img.naturalWidth;
      let h = img.naturalHeight;
      
      // 如果图片还未加载完成（naturalWidth/naturalHeight 为 0），尝试使用显示尺寸
      if (!w || !h) {
        w = img.width || img.offsetWidth || 1600;
        h = img.height || img.offsetHeight || 900;
      }
      
      // 确保尺寸至少为 100，避免 PhotoSwipe 判断为无效图片而不显示放大按钮
      w = Math.max(w, 100);
      h = Math.max(h, 100);
      
      return {
        src,
        w,
        h,
        alt: img.alt || "",
      };
    })
    .filter(Boolean) as Array<{ src: string; w: number; h: number; alt: string }>;
}

function destroy() {
  for (const fn of cleanup) fn();
  cleanup = [];
  lightbox?.destroy();
  lightbox = null;
}

async function setup() {
  if (!inBrowser) return;
  await nextTick();

  destroy();

  const imgs = getImgs();
  if (!imgs.length) return;

  // 添加 CSS 样式隐藏放大按钮（在组件初始化时就添加，确保所有页面都生效）
  if (inBrowser) {
    const styleId = "pswp-hide-zoom-buttons";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .pswp__button--zoom,
        .pswp__button--zoom-in,
        .pswp__button--zoom-out {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
      cleanup.push(() => {
        const existingStyle = document.getElementById(styleId);
        if (existingStyle) {
          existingStyle.remove();
        }
      });
    }
  }

  // Create a lightbox instance (programmatic open).
  lightbox = new PhotoSwipeLightbox({
    // We don't rely on DOM gallery structure, but Lightbox requires these fields.
    gallery: document.body,
    children: "img",
    pswpModule: () => import("photoswipe"),
  });
  
  // 初始化 lightbox
  lightbox.init();
  
  // 监听打开事件，配置滚轮缩放
  lightbox.on("beforeOpen", () => {
    // PhotoSwipe 5 默认支持滚轮缩放，我们只需要确保缩放功能已启用
    // 在打开后通过实例配置
    if (lightbox && lightbox.pswp) {
      const pswp = lightbox.pswp;
      // 设置最大缩放级别（允许放大到原始尺寸的 4 倍）
      if (pswp.options) {
        pswp.options.maxZoomLevel = 4;
      }
    }
  });

  for (const img of imgs) {
    const onClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const list = getImgs();
      const index = Math.max(0, list.indexOf(img));
      const dataSource = buildDataSource(list);
      // Keep index aligned even if some images had empty src.
      const safeIndex = Math.min(index, Math.max(0, dataSource.length - 1));
      if (!dataSource.length) return;
      lightbox?.loadAndOpen(safeIndex, dataSource);
    };
    img.addEventListener("click", onClick, { passive: false });
    cleanup.push(() => img.removeEventListener("click", onClick));
  }
}

onMounted(() => void setup());

watch(
  () => route.path,
  () => void setup()
);

onBeforeUnmount(() => destroy());
</script>

<template></template>



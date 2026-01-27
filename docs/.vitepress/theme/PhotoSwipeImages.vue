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
      // 如果图片还未加载或尺寸为0，使用较大的默认值
      let w = img.naturalWidth;
      let h = img.naturalHeight;
      
      if (!w || !h || w === 0 || h === 0) {
        // 使用较大的默认值，确保可以显示缩放按钮
        w = 1920;
        h = 1080;
      }
      
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

  // Create a lightbox instance (programmatic open).
  lightbox = new PhotoSwipeLightbox({
    // We don't rely on DOM gallery structure, but Lightbox requires these fields.
    gallery: document.body,
    children: "img",
    pswpModule: () => import("photoswipe"),
    // 支持滚动缩放，但不显示缩放按钮（通过 CSS 隐藏）
    maxZoomLevel: 4, // 设置最大缩放倍数
    wheelToZoom: true, // 允许鼠标滚轮缩放
    // pinchToZoom: true, // 允许手指捏合缩放（移动端）
  });
  
  lightbox.init();

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



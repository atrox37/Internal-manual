<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, watch } from "vue";
import { inBrowser, useRoute } from "vitepress";
import mediumZoom from "medium-zoom";

/**
 * Enable medium-zoom for all images inside the doc content.
 *
 * Why a component?
 * - `enhanceApp()` can run before the page content is rendered, so attaching
 *   zoom there can miss images on initial load.
 * - This component runs after mount and re-attaches after route changes.
 */

const route = useRoute();
let zoom: ReturnType<typeof mediumZoom> | null = null;

const SELECTOR = ".vp-doc img:not(.no-zoom)";

async function attachZoom() {
  if (!inBrowser) return;

  // Wait until VitePress has rendered the page content.
  await nextTick();

  const targets = document.querySelectorAll<HTMLImageElement>(SELECTOR);
  if (!targets.length) return;

  if (!zoom) {
    zoom = mediumZoom(targets, {
      background: "var(--vp-c-bg)",
    });
    return;
  }

  zoom.detach();
  zoom.attach(targets);
}

onMounted(() => {
  void attachZoom();
});

watch(
  () => route.path,
  () => {
    void attachZoom();
  }
);

onBeforeUnmount(() => {
  zoom?.detach();
  zoom = null;
});
</script>

<template></template>



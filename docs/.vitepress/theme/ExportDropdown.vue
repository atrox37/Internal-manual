<script setup lang="ts">
import { computed } from "vue";
import { useData, withBase } from "vitepress";

/**
 * 顶部导航栏右侧「下载 PDF」按钮：
 * - 按语言下载“普通用户手册（normal-user）”生成的 PDF
 *
 * 旧策略（整站导出 monarch-edge-manual.pdf）暂时保留注释，便于回滚/对照。
 */

const { lang } = useData();

const isEnglish = computed(() => (lang.value || "").toLowerCase().startsWith("en"));

const ui = computed(() => {
  if (isEnglish.value) {
    return {
      export: "Download PDF",
    };
  }
  return {
    export: "下载 PDF",
  };
});

function toHref(path: string) {
  // Ensure spaces are valid in URLs (e.g. en PDFs).
  return withBase(encodeURI(path));
}

const pdfHref = computed(() =>
  isEnglish.value ? toHref("/downloads/en/user-manual.pdf") : toHref("/downloads/zh-cn/user-manual.pdf")
);

const pdfDownloadName = computed(() =>
  isEnglish.value ? "User Manual.pdf" : "普通用户手册.pdf"
);

// 旧策略（暂时注释）：下载整站导出 PDF
// const pdfHref = computed(() =>
//   isEnglish.value
//     ? toHref("/downloads/en/monarch-edge-manual.pdf")
//     : toHref("/downloads/zh-cn/monarch-edge-manual.pdf")
// );
// const pdfDownloadName = computed(() =>
//   isEnglish.value ? "Monarch Edge Manual.pdf" : "Monarch Edge 用户手册.pdf"
// );
</script>

<template>
  <div class="mc-export">
    <a class="mc-export__btn" :href="pdfHref" :download="pdfDownloadName" :aria-label="ui.export">
      <span class="mc-export__sr-only">{{ ui.export }}</span>
      <svg
        class="mc-export__icon"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M12 3a1 1 0 0 1 1 1v8.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-4.004 4.004a1 1 0 0 1-1.414 0l-4.004-4.004a1 1 0 1 1 1.414-1.414L11 12.586V4a1 1 0 0 1 1-1zm-7 14a1 1 0 0 1 1 1v1h12v-1a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z"
        />
      </svg>
    </a>
  </div>
</template>

<style scoped>
.mc-export {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.mc-export::before {
  margin-right: 8px;
  margin-left: 8px;
  width: 1px;
  height: 24px;
  background-color: var(--vp-c-divider);
  content: "";
}
@media (max-width: 959px) {
  .mc-export::before {
    display: none;
  }
  .mc-export__btn {
    padding: 0 !important;
  }
}
.mc-export__btn {
  display: inline-flex;
  align-items: center;
  padding: 0 12px;
  height: var(--vp-nav-height);
  border: 0;
  background: transparent;
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
  transition: color 0.25s;
  text-decoration: none;
}

.mc-export__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.mc-export__icon {
  display: block;
}

.mc-export__btn:hover {
  color: var(--vp-c-text-2);
}

/* Desktop top-right:
 * - keep everything visually "靠右" (match social-links negative margin)
 * - divider should NOT shift the whole nav group, so draw it as a border
 */
:global(.VPNavBar) .mc-export {
  margin-right: -8px;
}

:global(.VPNavBar) .mc-export__btn {
  border-left: 1px solid var(--vp-c-divider);
}

:global(.VPNavBar) .mc-export:hover {
  color: var(--vp-c-brand-1);
  transition: color 0.25s;
}

/* Mobile nav screen */
:global(.VPNavScreen) .mc-export {
  width: 100%;
  display: flex !important;
  margin: 0 !important;
  padding: 0 !important;
}

:global(.VPNavScreen) .mc-export__btn {
  width: 100%;
  justify-content: space-between;
  height: 32px;
  padding: 0 !important;
  margin: 0 !important;
  border-left: 0;
}

:global(.VPNavScreen) .mc-export {
  margin-right: 0;
}

:global(.VPNavScreen) .mc-export::before {
  display: none;
}
</style>



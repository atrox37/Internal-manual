<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { inBrowser, withBase } from "vitepress";

/**
 * 右上角「导出」按钮 + 下拉菜单：
 * - 用户文档：下载 普通用户手册.pdf
 * - 管理员文档：下载 系统用户手册.pdf
 *
 * 文件实际存放在 VitePress public：docs/public/downloads/*.pdf
 * 这样构建后会暴露为：/downloads/user-manual.pdf /downloads/admin-manual.pdf
 */

const open = ref(false);
const rootEl = ref<HTMLElement | null>(null);

const userManualHref = computed(() => withBase("/downloads/user-manual.pdf"));
const adminManualHref = computed(() => withBase("/downloads/admin-manual.pdf"));

function toggle() {
  open.value = !open.value;
}

function close() {
  open.value = false;
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") close();
}

function onDocumentPointerDown(e: Event) {
  const target = e.target as Node | null;
  if (!target) return;
  if (!rootEl.value) return;
  if (!open.value) return;
  if (rootEl.value.contains(target)) return;
  close();
}

onMounted(() => {
  if (!inBrowser) return;
  document.addEventListener("keydown", onKeydown);
  // capture=true 可以更早拿到事件，避免某些组件 stopPropagation 导致无法关闭
  document.addEventListener("pointerdown", onDocumentPointerDown, true);
});

onBeforeUnmount(() => {
  if (!inBrowser) return;
  document.removeEventListener("keydown", onKeydown);
  document.removeEventListener("pointerdown", onDocumentPointerDown, true);
});
</script>

<template>
  <div class="mc-export" ref="rootEl">
    <button
      class="mc-export__btn"
      type="button"
      aria-haspopup="true"
      :aria-expanded="open"
      aria-label="导出"
      @click="toggle"
    >
      <span class="mc-export__sr-only">导出</span>
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
      <svg
        class="mc-export__chevron"
        viewBox="0 0 24 24"
        width="14"
        height="14"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M7.41 8.59a1 1 0 0 1 1.41 0L12 11.76l3.18-3.17a1 1 0 1 1 1.41 1.41l-3.88 3.88a1 1 0 0 1-1.41 0L7.41 10a1 1 0 0 1 0-1.41z"
        />
      </svg>
    </button>

    <div v-show="open" class="mc-export__menu" role="menu" aria-label="导出菜单">
      <a
        class="mc-export__item"
        role="menuitem"
        :href="userManualHref"
        download="普通用户手册.pdf"
        @click="close"
      >
        用户文档
      </a>
      <a
        class="mc-export__item"
        role="menuitem"
        :href="adminManualHref"
        download="系统用户手册.pdf"
        @click="close"
      >
        管理员文档
      </a>
    </div>
  </div>
</template>

<style scoped>
.mc-export {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.mc-export__btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
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

.mc-export__chevron {
  display: block;
  opacity: 0.75;
}

.mc-export__btn:hover {
  color: var(--vp-c-text-2);
}

.mc-export__btn:active {
  transform: translateY(0.5px);
}

.mc-export__menu {
  position: absolute;
  /* Align with VitePress flyouts */
  top: calc(var(--vp-nav-height) / 2 + 20px);
  right: 0;
  min-width: 168px;
  padding: 6px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  box-shadow: 0 14px 38px rgba(0, 0, 0, 0.12);
  z-index: 50;
}

.mc-export__item {
  display: flex;
  align-items: center;
  height: 34px;
  padding: 0 10px;
  border-radius: 10px;
  color: var(--vp-c-text-1);
  text-decoration: none;
  font-size: 13px;
}

.mc-export__item:hover {
  background: var(--vp-c-accent-soft);
  color: var(--vp-c-brand-1);
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

/* Mobile nav screen: menu is not near the top bar, so use static layout */
:global(.VPNavScreen) .mc-export {
  width: 100%;
}

:global(.VPNavScreen) .mc-export__btn {
  width: 100%;
  justify-content: space-between;
  height: 32px;
  padding: 0;
  border-left: 0;
}

:global(.VPNavScreen) .mc-export__menu {
  position: static;
  margin-top: 10px;
  width: 100%;
  box-shadow: none;
}

:global(.VPNavScreen) .mc-export {
  margin-right: 0;
}
</style>



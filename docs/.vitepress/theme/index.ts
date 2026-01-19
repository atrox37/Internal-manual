import DefaultTheme from "vitepress/theme";
import "./custom.css";

import { h } from "vue";
import { inBrowser, withBase } from "vitepress";
import ExportDropdown from "./ExportDropdown.vue";
import PhotoSwipeImages from "./PhotoSwipeImages.vue";
import ManualPageClasses from "./ManualPageClasses.vue";

function normalizeHtmlTrailingSlash() {
  if (!inBrowser) return;
  const { pathname, search, hash } = window.location;
  // S3 object endpoints do not resolve "directory indexes", and also treat
  // keys with a trailing slash as different objects. Ensure ".html/" -> ".html".
  if (pathname.endsWith(".html/")) {
    const next = pathname.slice(0, -1) + search + hash;
    window.history.replaceState(null, "", next);
  }
}

export default {
  ...DefaultTheme,
  Layout() {
    // Keep DefaultTheme layout, inject a small client-only component to enable
    // image full-screen preview after mount + on route changes.
    return h(DefaultTheme.Layout, null, {
      "nav-bar-content-after": () => h(ExportDropdown),
      "nav-screen-content-after": () => h(ExportDropdown),
      "layout-bottom": () => h(PhotoSwipeImages),
      "layout-top": () => h(ManualPageClasses),
    });
  },
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx);

    if (!inBrowser) return;

    normalizeHtmlTrailingSlash();

    const previousAfterRouteChanged = ctx.router.onAfterRouteChanged;
    ctx.router.onAfterRouteChanged = () => {
      previousAfterRouteChanged?.();
      normalizeHtmlTrailingSlash();
    };
  },
};

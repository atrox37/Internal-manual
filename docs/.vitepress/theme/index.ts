import DefaultTheme from "vitepress/theme";
import "./custom.css";

import { h } from "vue";
import { inBrowser, withBase } from "vitepress";
import ExportDropdown from "./ExportDropdown.vue";
import ZoomImages from "./ZoomImages.vue";

const STORAGE_KEY = "mc_manual_locale";

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

function getLocaleFromPath(pathname: string) {
  // Use base-aware prefixes (works for dev + base deployments)
  if (pathname.startsWith(withBase("/en/"))) return "en";
  return "root";
}

function getPreferredLocale() {
  const lang =
    (typeof navigator !== "undefined" &&
      (navigator.languages?.[0] || navigator.language)) ||
    "";
  return lang.toLowerCase().startsWith("en") ? "en" : "root";
}

function maybeRedirectByBrowserLocale() {
  if (!inBrowser) return;

  // If user explicitly chose before, never auto-redirect.
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "en" || saved === "root") return;

  const pathname = window.location.pathname;
  const baseRoot = withBase("/");
  const isAtSiteRoot =
    pathname === baseRoot ||
    pathname === baseRoot.replace(/\/$/, "") || // safety for weird hosts
    pathname === `${baseRoot}index.html`;

  if (!isAtSiteRoot) return;

  const preferred = getPreferredLocale();
  if (preferred === "en") {
    window.location.replace(withBase("/en/"));
  }
}

function persistLocaleSelection() {
  if (!inBrowser) return;
  normalizeHtmlTrailingSlash();
  const locale = getLocaleFromPath(window.location.pathname);
  window.localStorage.setItem(STORAGE_KEY, locale);
}

export default {
  ...DefaultTheme,
  Layout() {
    // Keep DefaultTheme layout, inject a small client-only component to enable
    // image zoom after mount + on route changes.
    return h(DefaultTheme.Layout, null, {
      "nav-bar-content-after": () => h(ExportDropdown),
      "nav-screen-content-after": () => h(ExportDropdown),
      "layout-bottom": () => h(ZoomImages),
    });
  },
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx);

    if (!inBrowser) return;

    maybeRedirectByBrowserLocale();
    normalizeHtmlTrailingSlash();
    persistLocaleSelection();

    // When user switches language (route changes), remember the selection.
    const previousAfterRouteChanged = ctx.router.onAfterRouteChanged;
    ctx.router.onAfterRouteChanged = () => {
      previousAfterRouteChanged?.();
      normalizeHtmlTrailingSlash();
      persistLocaleSelection();
    };
  },
};

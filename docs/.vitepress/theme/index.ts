import DefaultTheme from "vitepress/theme";
import "./custom.css";

import { inBrowser, withBase } from "vitepress";

const STORAGE_KEY = "mc_manual_locale";

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
  const locale = getLocaleFromPath(window.location.pathname);
  window.localStorage.setItem(STORAGE_KEY, locale);
}

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx);

    if (!inBrowser) return;

    maybeRedirectByBrowserLocale();
    persistLocaleSelection();

    // When user switches language (route changes), remember the selection.
    ctx.router.onAfterRouteChanged = () => {
      persistLocaleSelection();
    };
  },
};

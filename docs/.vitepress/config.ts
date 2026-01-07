import { defineConfig } from "vitepress";

export default defineConfig({
  // GitHub Pages repo base path
  base: "/",
  cleanUrls: false,
  markdown: {
    // Native lazy-loading for all markdown images (<img loading="lazy" />)
    image: {
      lazyLoading: true,
    },
  },
  head: [
    ["link", { rel: "icon", href: "/logo.png" }],
    [
      "link",
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
    ],
    [
      "link",
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: "",
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Arimo:wght@400;500;600;700&family=Montserrat:wght@500;600;700;800;900&display=swap",
      },
    ],
  ],
  themeConfig: {
    logo: "/logo.png",
    /**
     * 本地搜索（不依赖 Algolia 等外部服务）
     * - 适合部署到 S3 / 内网环境
     * - 多语言：根据当前语言切换按钮文案/弹窗文案
     */
    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "Search",
                buttonAriaLabel: "Search documentation",
              },
              modal: {
                displayDetails: "Display detailed list",
                resetButtonTitle: "Reset search",
                backButtonTitle: "Close search",
                noResultsText: "No results for",
                footer: {
                  selectText: "Select",
                  selectKeyAriaLabel: "Enter",
                  navigateText: "Navigate",
                  navigateUpKeyAriaLabel: "Arrow up",
                  navigateDownKeyAriaLabel: "Arrow down",
                  closeText: "Close",
                  closeKeyAriaLabel: "Esc",
                },
              },
            },
          },
          cn: {
            translations: {
              button: {
                buttonText: "搜索",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                displayDetails: "显示详细列表",
                resetButtonTitle: "重置搜索",
                backButtonTitle: "关闭搜索",
                noResultsText: "没有找到",
                footer: {
                  selectText: "选择",
                  selectKeyAriaLabel: "回车",
                  navigateText: "切换",
                  navigateUpKeyAriaLabel: "向上箭头",
                  navigateDownKeyAriaLabel: "向下箭头",
                  closeText: "关闭",
                  closeKeyAriaLabel: "Esc",
                },
              },
            },
          },
        },
        /**
         * MiniSearch 中文优化：
         * 额外把中文按“单字”切词，避免中文无法命中（英文仍保留按词切分）
         */
        miniSearch: {
          options: {
            tokenize: (text: string) => {
              const lower = (text || "").toLowerCase();
              const wordTokens = lower
                .split(/[\s\p{P}\p{S}]+/gu)
                .filter(Boolean);
              const cjkTokens = Array.from(lower).filter((ch) =>
                /[\u4e00-\u9fff]/.test(ch)
              );
              return [...wordTokens, ...cjkTokens];
            },
          },
        },
      },
    },
  },
  locales: {
    root: {
      label: "English",
      link: "/",
      lang: "en-US",
      title: "Monarch Edge Manual",
      description: "User guide and operational manual for Monarch Edge.",
      themeConfig: {
        siteTitle: "Monarch Edge Manual",
        nav: [
          {
            text: "Basics",
            link: "/manuals/basic-knowledge/overview.html",
            activeMatch: "^/manuals/basic-knowledge/",
          },
          {
            text: "Core Features",
            link: "/manuals/core-features/login/index.html",
            activeMatch: "^/manuals/core-features/",
          },
          {
            text: "System Config",
            link: "/manuals/system-config/channels/index.html",
            activeMatch: "^/manuals/system-config/",
          },
          {
            text: "FAQ",
            link: "/manuals/faq/index.html",
            activeMatch: "^/manuals/faq/",
          },
        ],
        sidebar: {
          "/manuals/basic-knowledge/": [
            {
              text: "Basics",
              collapsed: false,
              items: [
                { text: "Overview", link: "/manuals/basic-knowledge/overview.html" },
                { text: "UI Structure", link: "/manuals/basic-knowledge/ui-structure.html" },
                {
                  text: "Channel Concepts",
                  link: "/manuals/basic-knowledge/system-concepts-channel/index.html",
                  collapsed: true,
                  items: [
                    { text: "Channel", link: "/manuals/basic-knowledge/system-concepts-channel/channel.html" },
                    { text: "Four Remote", link: "/manuals/basic-knowledge/system-concepts-channel/four-remote.html" },
                    { text: "Channel Points", link: "/manuals/basic-knowledge/system-concepts-channel/channel-points.html" },
                    { text: "Channel Mappings", link: "/manuals/basic-knowledge/system-concepts-channel/channel-mappings.html" },
                  ],
                },
                {
                  text: "Device Instance Concepts",
                  link: "/manuals/basic-knowledge/system-concepts-instance/index.html",
                  collapsed: true,
                  items: [
                    { text: "Product", link: "/manuals/basic-knowledge/system-concepts-instance/product.html" },
                    { text: "Instance", link: "/manuals/basic-knowledge/system-concepts-instance/instance.html" },
                    { text: "Instance Points", link: "/manuals/basic-knowledge/system-concepts-instance/instance-points.html" },
                    { text: "Instance Routing", link: "/manuals/basic-knowledge/system-concepts-instance/instance-routing.html" },
                  ],
                },
                {
                  text: "Rule Concepts",
                  link: "/manuals/basic-knowledge/system-concepts-rule/index.html",
                  collapsed: true,
                  items: [
                    { text: "Rule", link: "/manuals/basic-knowledge/system-concepts-rule/rule.html" },
                    { text: "Rule Chain", link: "/manuals/basic-knowledge/system-concepts-rule/rule-chain.html" },
                  ],
                },
                { text: "Glossary", link: "/manuals/basic-knowledge/glossary.html" },
              ],
            },
          ],
          "/manuals/core-features/": [
            {
              text: "Core Features",
              collapsed: false,
              items: [
                { text: "Login", link: "/manuals/core-features/login/index.html" },
                { text: "Home", link: "/manuals/core-features/home/index.html" },
                {
                  text: "Devices",
                  link: "/manuals/core-features/devices/index.html",
                  collapsed: true,
                  items: [
                    { text: "PV", link: "/manuals/core-features/devices/pv.html" },
                    { text: "Battery", link: "/manuals/core-features/devices/battery.html" },
                    { text: "Diesel Generator", link: "/manuals/core-features/devices/diesel-generator.html" },
                    { text: "Meter1", link: "/manuals/core-features/devices/meter1.html" },
                    { text: "Meter2", link: "/manuals/core-features/devices/meter2.html" },
                  ],
                },
                {
                  text: "Alarms",
                  link: "/manuals/core-features/alarm/index.html",
                  collapsed: true,
                  items: [
                    { text: "Current Records", link: "/manuals/core-features/alarm/current-records.html" },
                    { text: "History Records", link: "/manuals/core-features/alarm/history-records.html" },
                  ],
                },
                {
                  text: "Control",
                  link: "/manuals/core-features/control/index.html",
                  collapsed: true,
                  items: [{ text: "Control Record", link: "/manuals/core-features/control/control-record.html" }],
                },
                {
                  text: "Statistics",
                  link: "/manuals/core-features/statistics/index.html",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/manuals/core-features/statistics/overview.html" },
                    { text: "Curves", link: "/manuals/core-features/statistics/curves.html" },
                    { text: "Operation Log", link: "/manuals/core-features/statistics/operation-log.html" },
                    { text: "Running Log", link: "/manuals/core-features/statistics/running-log.html" },
                  ],
                },
              ],
            },
          ],
          "/manuals/system-config/": [
            {
              text: "System Config",
              collapsed: false,
              items: [
                {
                  text: "Channels",
                  link: "/manuals/system-config/channels/index.html",
                  collapsed: true,
                  items: [
                    { text: "Channel Ops", link: "/manuals/system-config/channels/channel-ops.html" },
                    { text: "Point Ops", link: "/manuals/system-config/channels/point-ops.html" },
                    { text: "Mapping Ops", link: "/manuals/system-config/channels/mapping-ops.html" },
                  ],
                },
                {
                  text: "Device Instances",
                  link: "/manuals/system-config/device-instances/index.html",
                  collapsed: true,
                  items: [
                    { text: "Instance Ops", link: "/manuals/system-config/device-instances/instance-ops.html" },
                    { text: "Instance Point Ops", link: "/manuals/system-config/device-instances/instance-point-ops.html" },
                    { text: "Instance Routing Ops", link: "/manuals/system-config/device-instances/instance-routing-ops.html" },
                  ],
                },
                {
                  text: "Rules",
                  link: "/manuals/system-config/rules/index.html",
                  collapsed: true,
                  items: [
                    { text: "Rule Ops", link: "/manuals/system-config/rules/rule-ops.html" },
                    { text: "Rule Chain Ops", link: "/manuals/system-config/rules/rule-chain-ops.html" },
                  ],
                },
              ],
            },
          ],
          "/manuals/faq/": [
            {
              text: "FAQ",
              collapsed: true,
              items: [{ text: "FAQ", link: "/manuals/faq/index.html" }],
            },
          ],
        },
        footer: {
          message: "Internal Only · Do Not Distribute",
          copyright: "(c) Monarch Edge",
        },
      },
    },
    cn: {
      label: "简体中文",
      link: "/cn/",
      lang: "zh-CN",
      title: "Monarch Edge 用户手册",
      description: "Monarch Edge 使用说明与操作指引",
      themeConfig: {
        siteTitle: "Monarch Edge 用户手册",
        nav: [
          {
            text: "基础认知",
            link: "/cn/manuals/basic-knowledge/overview.html",
            activeMatch: "^/cn/manuals/basic-knowledge/",
          },
          {
            text: "核心功能",
            link: "/cn/manuals/core-features/login/index.html",
            activeMatch: "^/cn/manuals/core-features/",
          },
          {
            text: "系统配置",
            link: "/cn/manuals/system-config/channels/index.html",
            activeMatch: "^/cn/manuals/system-config/",
          },
          {
            text: "常见问题",
            link: "/cn/manuals/faq/index.html",
            activeMatch: "^/cn/manuals/faq/",
          },
        ],
        sidebar: {
          "/cn/manuals/basic-knowledge/": [
            {
              text: "基础认知",
              collapsed: false,
              items: [
                { text: "平台概览", link: "/cn/manuals/basic-knowledge/overview.html" },
                { text: "界面结构", link: "/cn/manuals/basic-knowledge/ui-structure.html" },
                {
                  text: "通道概念",
                  link: "/cn/manuals/basic-knowledge/system-concepts-channel/index.html",
                  collapsed: true,
                  items: [
                    { text: "通道", link: "/cn/manuals/basic-knowledge/system-concepts-channel/channel.html" },
                    { text: "四遥", link: "/cn/manuals/basic-knowledge/system-concepts-channel/four-remote.html" },
                    { text: "通道点位", link: "/cn/manuals/basic-knowledge/system-concepts-channel/channel-points.html" },
                    { text: "通道点位映射", link: "/cn/manuals/basic-knowledge/system-concepts-channel/channel-mappings.html" },
                  ],
                },
                {
                  text: "设备实例概念",
                  link: "/cn/manuals/basic-knowledge/system-concepts-instance/index.html",
                  collapsed: true,
                  items: [
                    { text: "产品", link: "/cn/manuals/basic-knowledge/system-concepts-instance/product.html" },
                    { text: "实例", link: "/cn/manuals/basic-knowledge/system-concepts-instance/instance.html" },
                    { text: "实例点位", link: "/cn/manuals/basic-knowledge/system-concepts-instance/instance-points.html" },
                    { text: "实例点位路由", link: "/cn/manuals/basic-knowledge/system-concepts-instance/instance-routing.html" },
                  ],
                },
                {
                  text: "规则概念",
                  link: "/cn/manuals/basic-knowledge/system-concepts-rule/index.html",
                  collapsed: true,
                  items: [
                    { text: "规则", link: "/cn/manuals/basic-knowledge/system-concepts-rule/rule.html" },
                    { text: "规则链路", link: "/cn/manuals/basic-knowledge/system-concepts-rule/rule-chain.html" },
                  ],
                },
                { text: "术语表", link: "/cn/manuals/basic-knowledge/glossary.html" },
              ],
            },
          ],
          "/cn/manuals/core-features/": [
            {
              text: "核心功能",
              collapsed: false,
              items: [
                { text: "登录页面", link: "/cn/manuals/core-features/login/index.html" },
                { text: "首页", link: "/cn/manuals/core-features/home/index.html" },
                {
                  text: "设备页面",
                  link: "/cn/manuals/core-features/devices/index.html",
                  collapsed: true,
                  items: [
                    { text: "PV", link: "/cn/manuals/core-features/devices/pv.html" },
                    { text: "Battery", link: "/cn/manuals/core-features/devices/battery.html" },
                    { text: "Diesel Generator", link: "/cn/manuals/core-features/devices/diesel-generator.html" },
                    { text: "Meter1", link: "/cn/manuals/core-features/devices/meter1.html" },
                    { text: "Meter2", link: "/cn/manuals/core-features/devices/meter2.html" },
                  ],
                },
                {
                  text: "告警页面",
                  link: "/cn/manuals/core-features/alarm/index.html",
                  collapsed: true,
                  items: [
                    { text: "Current Records", link: "/cn/manuals/core-features/alarm/current-records.html" },
                    { text: "History Records", link: "/cn/manuals/core-features/alarm/history-records.html" },
                  ],
                },
                {
                  text: "控制页面",
                  link: "/cn/manuals/core-features/control/index.html",
                  collapsed: true,
                  items: [{ text: "Control Record", link: "/cn/manuals/core-features/control/control-record.html" }],
                },
                {
                  text: "统计页面",
                  link: "/cn/manuals/core-features/statistics/index.html",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/cn/manuals/core-features/statistics/overview.html" },
                    { text: "Curves", link: "/cn/manuals/core-features/statistics/curves.html" },
                    { text: "Operation Log", link: "/cn/manuals/core-features/statistics/operation-log.html" },
                    { text: "Running Log", link: "/cn/manuals/core-features/statistics/running-log.html" },
                  ],
                },
              ],
            },
          ],
          "/cn/manuals/system-config/": [
            {
              text: "系统配置",
              collapsed: false,
              items: [
                {
                  text: "通道配置",
                  link: "/cn/manuals/system-config/channels/index.html",
                  collapsed: true,
                  items: [
                    { text: "通道管理", link: "/cn/manuals/system-config/channels/channel-ops.html" },
                    { text: "通道点位配置", link: "/cn/manuals/system-config/channels/point-ops.html" },
                    { text: "通道点位映射配置", link: "/cn/manuals/system-config/channels/mapping-ops.html" },
                  ],
                },
                {
                  text: "设备实例配置",
                  link: "/cn/manuals/system-config/device-instances/index.html",
                  collapsed: true,
                  items: [
                    { text: "实例管理", link: "/cn/manuals/system-config/device-instances/instance-ops.html" },
                    { text: "实例点位配置", link: "/cn/manuals/system-config/device-instances/instance-point-ops.html" },
                    { text: "实例点位路由配置", link: "/cn/manuals/system-config/device-instances/instance-routing-ops.html" },
                  ],
                },
                {
                  text: "规则配置",
                  link: "/cn/manuals/system-config/rules/index.html",
                  collapsed: true,
                  items: [
                    { text: "规则操作", link: "/cn/manuals/system-config/rules/rule-ops.html" },
                    { text: "规则链路操作", link: "/cn/manuals/system-config/rules/rule-chain-ops.html" },
                  ],
                },
              ],
            },
          ],
          "/cn/manuals/faq/": [
            {
              text: "常见问题",
              collapsed: true,
              items: [{ text: "FAQ", link: "/cn/manuals/faq/index.html" }],
            },
          ],
        },
        footer: {
          message: "内部资料 · 请勿外传",
          copyright: "(c) Monarch Edge",
        },
      },
    },
  },
});

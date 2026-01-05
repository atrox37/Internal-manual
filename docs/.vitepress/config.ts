import { defineConfig } from "vitepress";

export default defineConfig({
  // GitHub Pages repo base path
  base: "/",
  cleanUrls: false,
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
  },
  locales: {
    root: {
      label: "简体中文",
      link: "/",
      lang: "zh-CN",
      title: "Monarch Edge 用户手册",
      description: "Monarch Edge 使用说明与操作指引",
      themeConfig: {
        siteTitle: "Monarch Edge 用户手册",
        nav: [
          {
            text: "基础认知",
            link: "/manuals/basic-knowledge/overview.html",
            activeMatch: "^/manuals/basic-knowledge/",
          },
          {
            text: "核心功能",
            link: "/manuals/core-features/login/index.html",
            activeMatch: "^/manuals/core-features/",
          },
          {
            text: "系统配置",
            link: "/manuals/system-config/channels/index.html",
            activeMatch: "^/manuals/system-config/",
          },
          {
            text: "常见问题",
            link: "/manuals/faq/index.html",
            activeMatch: "^/manuals/faq/",
          },
        ],
        sidebar: {
          "/manuals/basic-knowledge/": [
            {
              text: "基础认知",
              collapsed: false,
              items: [
                { text: "平台概览", link: "/manuals/basic-knowledge/overview.html" },
                { text: "界面结构", link: "/manuals/basic-knowledge/ui-structure.html" },
                {
                  text: "通道概念",
                  link: "/manuals/basic-knowledge/system-concepts-channel/index.html",
                  collapsed: true,
                  items: [
                    { text: "通道", link: "/manuals/basic-knowledge/system-concepts-channel/channel.html" },
                    { text: "四遥", link: "/manuals/basic-knowledge/system-concepts-channel/four-remote.html" },
                    { text: "通道点位", link: "/manuals/basic-knowledge/system-concepts-channel/channel-points.html" },
                    { text: "通道点位映射", link: "/manuals/basic-knowledge/system-concepts-channel/channel-mappings.html" },
                  ],
                },
                {
                  text: "设备实例概念",
                  link: "/manuals/basic-knowledge/system-concepts-instance/index.html",
                  collapsed: true,
                  items: [
                    { text: "产品", link: "/manuals/basic-knowledge/system-concepts-instance/product.html" },
                    { text: "实例", link: "/manuals/basic-knowledge/system-concepts-instance/instance.html" },
                    { text: "实例点位", link: "/manuals/basic-knowledge/system-concepts-instance/instance-points.html" },
                    { text: "实例点位路由", link: "/manuals/basic-knowledge/system-concepts-instance/instance-routing.html" },
                  ],
                },
                {
                  text: "规则概念",
                  link: "/manuals/basic-knowledge/system-concepts-rule/index.html",
                  collapsed: true,
                  items: [
                    { text: "规则", link: "/manuals/basic-knowledge/system-concepts-rule/rule.html" },
                    { text: "规则链路", link: "/manuals/basic-knowledge/system-concepts-rule/rule-chain.html" },
                  ],
                },
                { text: "术语表", link: "/manuals/basic-knowledge/glossary.html" },
              ],
            },
          ],
          "/manuals/core-features/": [
            {
              text: "核心功能",
              collapsed: false,
              items: [
                { text: "登录页面", link: "/manuals/core-features/login/index.html" },
                { text: "首页", link: "/manuals/core-features/home/index.html" },
                {
                  text: "设备页面",
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
                  text: "告警页面",
                  link: "/manuals/core-features/alarm/index.html",
                  collapsed: true,
                  items: [
                    { text: "Current Records", link: "/manuals/core-features/alarm/current-records.html" },
                    { text: "History Records", link: "/manuals/core-features/alarm/history-records.html" },
                  ],
                },
                {
                  text: "控制页面",
                  link: "/manuals/core-features/control/index.html",
                  collapsed: true,
                  items: [{ text: "Control Record", link: "/manuals/core-features/control/control-record.html" }],
                },
                {
                  text: "统计页面",
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
              text: "系统配置",
              collapsed: false,
              items: [
                {
                  text: "通道配置",
                  link: "/manuals/system-config/channels/index.html",
                  collapsed: true,
                  items: [
                    { text: "通道管理", link: "/manuals/system-config/channels/channel-ops.html" },
                    { text: "通道点位配置", link: "/manuals/system-config/channels/point-ops.html" },
                    { text: "通道点位映射配置", link: "/manuals/system-config/channels/mapping-ops.html" },
                  ],
                },
                {
                  text: "设备实例配置",
                  link: "/manuals/system-config/device-instances/index.html",
                  collapsed: true,
                  items: [
                    { text: "实例管理", link: "/manuals/system-config/device-instances/instance-ops.html" },
                    { text: "实例点位配置", link: "/manuals/system-config/device-instances/instance-point-ops.html" },
                    { text: "实例点位路由配置", link: "/manuals/system-config/device-instances/instance-routing-ops.html" },
                  ],
                },
                {
                  text: "规则配置",
                  link: "/manuals/system-config/rules/index.html",
                  collapsed: true,
                  items: [
                    { text: "规则操作", link: "/manuals/system-config/rules/rule-ops.html" },
                    { text: "规则链路操作", link: "/manuals/system-config/rules/rule-chain-ops.html" },
                  ],
                },
              ],
            },
          ],
          "/manuals/faq/": [
            {
              text: "常见问题",
              collapsed: true,
              items: [{ text: "FAQ", link: "/manuals/faq/index.html" }],
            },
          ],
        },
        footer: {
          message: "内部资料 · 请勿外传",
          copyright: "(c) Monarch Edge",
        },
      },
    },
    en: {
      label: "English",
      link: "/en/",
      lang: "en-US",
      title: "Monarch Edge Manual",
      description: "User guide and operational manual for Monarch Edge.",
      themeConfig: {
        siteTitle: "Monarch Edge Manual",
        nav: [
          {
            text: "Basics",
            link: "/en/manuals/basic-knowledge/overview.html",
            activeMatch: "^/en/manuals/basic-knowledge/",
          },
          {
            text: "Core Features",
            link: "/en/manuals/core-features/login/index.html",
            activeMatch: "^/en/manuals/core-features/",
          },
          {
            text: "System Config",
            link: "/en/manuals/system-config/channels/index.html",
            activeMatch: "^/en/manuals/system-config/",
          },
          {
            text: "FAQ",
            link: "/en/manuals/faq/index.html",
            activeMatch: "^/en/manuals/faq/",
          },
        ],
        sidebar: {
          "/en/manuals/basic-knowledge/": [
            {
              text: "Basics",
              collapsed: false,
              items: [
                { text: "Overview", link: "/en/manuals/basic-knowledge/overview.html" },
                { text: "UI Structure", link: "/en/manuals/basic-knowledge/ui-structure.html" },
                {
                  text: "Channel Concepts",
                  link: "/en/manuals/basic-knowledge/system-concepts-channel/index.html",
                  collapsed: true,
                  items: [
                    { text: "Channel", link: "/en/manuals/basic-knowledge/system-concepts-channel/channel.html" },
                    { text: "Four Remote", link: "/en/manuals/basic-knowledge/system-concepts-channel/four-remote.html" },
                    { text: "Channel Points", link: "/en/manuals/basic-knowledge/system-concepts-channel/channel-points.html" },
                    { text: "Channel Mappings", link: "/en/manuals/basic-knowledge/system-concepts-channel/channel-mappings.html" },
                  ],
                },
                {
                  text: "Device Instance Concepts",
                  link: "/en/manuals/basic-knowledge/system-concepts-instance/index.html",
                  collapsed: true,
                  items: [
                    { text: "Product", link: "/en/manuals/basic-knowledge/system-concepts-instance/product.html" },
                    { text: "Instance", link: "/en/manuals/basic-knowledge/system-concepts-instance/instance.html" },
                    { text: "Instance Points", link: "/en/manuals/basic-knowledge/system-concepts-instance/instance-points.html" },
                    { text: "Instance Routing", link: "/en/manuals/basic-knowledge/system-concepts-instance/instance-routing.html" },
                  ],
                },
                {
                  text: "Rule Concepts",
                  link: "/en/manuals/basic-knowledge/system-concepts-rule/index.html",
                  collapsed: true,
                  items: [
                    { text: "Rule", link: "/en/manuals/basic-knowledge/system-concepts-rule/rule.html" },
                    { text: "Rule Chain", link: "/en/manuals/basic-knowledge/system-concepts-rule/rule-chain.html" },
                  ],
                },
                { text: "Glossary", link: "/en/manuals/basic-knowledge/glossary.html" },
              ],
            },
          ],
          "/en/manuals/core-features/": [
            {
              text: "Core Features",
              collapsed: false,
              items: [
                { text: "Login", link: "/en/manuals/core-features/login/index.html" },
                { text: "Home", link: "/en/manuals/core-features/home/index.html" },
                {
                  text: "Devices",
                  link: "/en/manuals/core-features/devices/index.html",
                  collapsed: true,
                  items: [
                    { text: "PV", link: "/en/manuals/core-features/devices/pv.html" },
                    { text: "Battery", link: "/en/manuals/core-features/devices/battery.html" },
                    { text: "Diesel Generator", link: "/en/manuals/core-features/devices/diesel-generator.html" },
                    { text: "Meter1", link: "/en/manuals/core-features/devices/meter1.html" },
                    { text: "Meter2", link: "/en/manuals/core-features/devices/meter2.html" },
                  ],
                },
                {
                  text: "Alarms",
                  link: "/en/manuals/core-features/alarm/index.html",
                  collapsed: true,
                  items: [
                    { text: "Current Records", link: "/en/manuals/core-features/alarm/current-records.html" },
                    { text: "History Records", link: "/en/manuals/core-features/alarm/history-records.html" },
                  ],
                },
                {
                  text: "Control",
                  link: "/en/manuals/core-features/control/index.html",
                  collapsed: true,
                  items: [{ text: "Control Record", link: "/en/manuals/core-features/control/control-record.html" }],
                },
                {
                  text: "Statistics",
                  link: "/en/manuals/core-features/statistics/index.html",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/en/manuals/core-features/statistics/overview.html" },
                    { text: "Curves", link: "/en/manuals/core-features/statistics/curves.html" },
                    { text: "Operation Log", link: "/en/manuals/core-features/statistics/operation-log.html" },
                    { text: "Running Log", link: "/en/manuals/core-features/statistics/running-log.html" },
                  ],
                },
              ],
            },
          ],
          "/en/manuals/system-config/": [
            {
              text: "System Config",
              collapsed: false,
              items: [
                {
                  text: "Channels",
                  link: "/en/manuals/system-config/channels/index.html",
                  collapsed: true,
                  items: [
                    { text: "Channel Ops", link: "/en/manuals/system-config/channels/channel-ops.html" },
                    { text: "Point Ops", link: "/en/manuals/system-config/channels/point-ops.html" },
                    { text: "Mapping Ops", link: "/en/manuals/system-config/channels/mapping-ops.html" },
                  ],
                },
                {
                  text: "Device Instances",
                  link: "/en/manuals/system-config/device-instances/index.html",
                  collapsed: true,
                  items: [
                    { text: "Instance Ops", link: "/en/manuals/system-config/device-instances/instance-ops.html" },
                    { text: "Instance Point Ops", link: "/en/manuals/system-config/device-instances/instance-point-ops.html" },
                    { text: "Instance Routing Ops", link: "/en/manuals/system-config/device-instances/instance-routing-ops.html" },
                  ],
                },
                {
                  text: "Rules",
                  link: "/en/manuals/system-config/rules/index.html",
                  collapsed: true,
                  items: [
                    { text: "Rule Ops", link: "/en/manuals/system-config/rules/rule-ops.html" },
                    { text: "Rule Chain Ops", link: "/en/manuals/system-config/rules/rule-chain-ops.html" },
                  ],
                },
              ],
            },
          ],
          "/en/manuals/faq/": [
            {
              text: "FAQ",
              collapsed: true,
              items: [{ text: "FAQ", link: "/en/manuals/faq/index.html" }],
            },
          ],
        },
        footer: {
          message: "Internal Only · Do Not Distribute",
          copyright: "(c) Monarch Edge",
        },
      },
    },
  },
});

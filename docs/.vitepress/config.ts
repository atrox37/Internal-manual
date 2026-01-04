import { defineConfig } from "vitepress";

export default defineConfig({
  // GitHub Pages repo base path
  base: "/Internal-manual/",
  head: [
    ['link', { rel: 'icon', href: './logo.png' }],
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
          "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap",
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
      title: "Monarch Cloud 用户手册",
      description: "Monarch Cloud 使用说明与操作指引",
      themeConfig: {
        siteTitle: "Monarch Cloud 用户手册",
        nav: [
          {
            text: "基础认知",
            link: "/manuals/basic-knowledge/overview",
            activeMatch: "^/manuals/basic-knowledge/",
          },
          {
            text: "核心功能",
            link: "/manuals/core-features/login/",
            activeMatch: "^/manuals/core-features/",
          },
          {
            text: "系统配置",
            link: "/manuals/system-config/channels/",
            activeMatch: "^/manuals/system-config/",
          },
          {
            text: "常见问题",
            link: "/manuals/faq/",
            activeMatch: "^/manuals/faq/",
          },
        ],
        sidebar: {
          "/manuals/basic-knowledge/": [
            {
              text: "基础认知",
              collapsed: false,
              items: [
                { text: "平台概览", link: "/manuals/basic-knowledge/overview" },
                { text: "界面结构", link: "/manuals/basic-knowledge/ui-structure" },
                {
                  text: "通道概念",
                  link: "/manuals/basic-knowledge/system-concepts-channel/",
                  collapsed: true,
                  items: [
                    { text: "通道", link: "/manuals/basic-knowledge/system-concepts-channel/channel" },
                    { text: "四遥", link: "/manuals/basic-knowledge/system-concepts-channel/four-remote" },
                    { text: "通道点位", link: "/manuals/basic-knowledge/system-concepts-channel/channel-points" },
                    { text: "通道点位映射", link: "/manuals/basic-knowledge/system-concepts-channel/channel-mappings" },
                  ],
                },
                {
                  text: "设备实例概念",
                  link: "/manuals/basic-knowledge/system-concepts-instance/",
                  collapsed: true,
                  items: [
                    { text: "产品", link: "/manuals/basic-knowledge/system-concepts-instance/product" },
                    { text: "实例", link: "/manuals/basic-knowledge/system-concepts-instance/instance" },
                    { text: "实例点位", link: "/manuals/basic-knowledge/system-concepts-instance/instance-points" },
                    { text: "实例点位路由", link: "/manuals/basic-knowledge/system-concepts-instance/instance-routing" },
                  ],
                },
                {
                  text: "规则概念",
                  link: "/manuals/basic-knowledge/system-concepts-rule/",
                  collapsed: true,
                  items: [
                    { text: "规则", link: "/manuals/basic-knowledge/system-concepts-rule/rule" },
                    { text: "规则链路", link: "/manuals/basic-knowledge/system-concepts-rule/rule-chain" },
                  ],
                },
                { text: "术语表", link: "/manuals/basic-knowledge/glossary" },
              ],
            },
          ],
          "/manuals/core-features/": [
            {
              text: "核心功能",
              collapsed: false,
              items: [
                { text: "登录页面", link: "/manuals/core-features/login/" },
                { text: "首页", link: "/manuals/core-features/home/" },
                {
                  text: "设备页面",
                  link: "/manuals/core-features/devices/",
                  collapsed: true,
                  items: [
                    { text: "PV", link: "/manuals/core-features/devices/pv" },
                    { text: "Battery", link: "/manuals/core-features/devices/battery" },
                    { text: "Diesel Generator", link: "/manuals/core-features/devices/diesel-generator" },
                    { text: "Meter1", link: "/manuals/core-features/devices/meter1" },
                    { text: "Meter2", link: "/manuals/core-features/devices/meter2" },
                  ],
                },
                {
                  text: "告警页面",
                  link: "/manuals/core-features/alarm/",
                  collapsed: true,
                  items: [
                    { text: "Current Records", link: "/manuals/core-features/alarm/current-records" },
                    { text: "History Records", link: "/manuals/core-features/alarm/history-records" },
                  ],
                },
                {
                  text: "控制页面",
                  link: "/manuals/core-features/control/",
                  collapsed: true,
                  items: [{ text: "Control Record", link: "/manuals/core-features/control/control-record" }],
                },
                {
                  text: "统计页面",
                  link: "/manuals/core-features/statistics/",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/manuals/core-features/statistics/overview" },
                    { text: "Curves", link: "/manuals/core-features/statistics/curves" },
                    { text: "Operation Log", link: "/manuals/core-features/statistics/operation-log" },
                    { text: "Running Log", link: "/manuals/core-features/statistics/running-log" },
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
                  link: "/manuals/system-config/channels/",
                  collapsed: true,
                  items: [
                    { text: "通道管理", link: "/manuals/system-config/channels/channel-ops" },
                    { text: "通道点位配置", link: "/manuals/system-config/channels/point-ops" },
                    { text: "通道点位映射配置", link: "/manuals/system-config/channels/mapping-ops" },
                  ],
                },
                {
                  text: "设备实例配置",
                  link: "/manuals/system-config/device-instances/",
                  collapsed: true,
                  items: [
                    { text: "实例管理", link: "/manuals/system-config/device-instances/instance-ops" },
                    { text: "实例点位配置", link: "/manuals/system-config/device-instances/instance-point-ops" },
                    { text: "实例点位路由配置", link: "/manuals/system-config/device-instances/instance-routing-ops" },
                  ],
                },
                {
                  text: "规则配置",
                  link: "/manuals/system-config/rules/",
                  collapsed: true,
                  items: [
                    { text: "规则操作", link: "/manuals/system-config/rules/rule-ops" },
                    { text: "规则链路操作", link: "/manuals/system-config/rules/rule-chain-ops" },
                  ],
                },
              ],
            },
          ],
          "/manuals/faq/": [
            {
              text: "常见问题",
              collapsed: true,
              items: [{ text: "FAQ", link: "/manuals/faq/" }],
            },
          ],
        },
        footer: {
          message: "内部资料 · 请勿外传",
          copyright: "(c) Monarch Cloud",
        },
      },
    },
    en: {
      label: "English",
      link: "/en/",
      lang: "en-US",
      title: "Monarch Cloud Manual",
      description: "User guide and operational manual for Monarch Cloud.",
      themeConfig: {
        siteTitle: "Monarch Cloud Manual",
        nav: [
          {
            text: "Basics",
            link: "/en/manuals/basic-knowledge/overview",
            activeMatch: "^/en/manuals/basic-knowledge/",
          },
          {
            text: "Core Features",
            link: "/en/manuals/core-features/login/",
            activeMatch: "^/en/manuals/core-features/",
          },
          {
            text: "System Config",
            link: "/en/manuals/system-config/channels/",
            activeMatch: "^/en/manuals/system-config/",
          },
          {
            text: "FAQ",
            link: "/en/manuals/faq/",
            activeMatch: "^/en/manuals/faq/",
          },
        ],
        sidebar: {
          "/en/manuals/basic-knowledge/": [
            {
              text: "Basics",
              collapsed: false,
              items: [
                { text: "Overview", link: "/en/manuals/basic-knowledge/overview" },
                { text: "UI Structure", link: "/en/manuals/basic-knowledge/ui-structure" },
                {
                  text: "Channel Concepts",
                  link: "/en/manuals/basic-knowledge/system-concepts-channel/",
                  collapsed: true,
                  items: [
                    { text: "Channel", link: "/en/manuals/basic-knowledge/system-concepts-channel/channel" },
                    { text: "Four Remote", link: "/en/manuals/basic-knowledge/system-concepts-channel/four-remote" },
                    { text: "Channel Points", link: "/en/manuals/basic-knowledge/system-concepts-channel/channel-points" },
                    { text: "Channel Mappings", link: "/en/manuals/basic-knowledge/system-concepts-channel/channel-mappings" },
                  ],
                },
                {
                  text: "Device Instance Concepts",
                  link: "/en/manuals/basic-knowledge/system-concepts-instance/",
                  collapsed: true,
                  items: [
                    { text: "Product", link: "/en/manuals/basic-knowledge/system-concepts-instance/product" },
                    { text: "Instance", link: "/en/manuals/basic-knowledge/system-concepts-instance/instance" },
                    { text: "Instance Points", link: "/en/manuals/basic-knowledge/system-concepts-instance/instance-points" },
                    { text: "Instance Routing", link: "/en/manuals/basic-knowledge/system-concepts-instance/instance-routing" },
                  ],
                },
                {
                  text: "Rule Concepts",
                  link: "/en/manuals/basic-knowledge/system-concepts-rule/",
                  collapsed: true,
                  items: [
                    { text: "Rule", link: "/en/manuals/basic-knowledge/system-concepts-rule/rule" },
                    { text: "Rule Chain", link: "/en/manuals/basic-knowledge/system-concepts-rule/rule-chain" },
                  ],
                },
                { text: "Glossary", link: "/en/manuals/basic-knowledge/glossary" },
              ],
            },
          ],
          "/en/manuals/core-features/": [
            {
              text: "Core Features",
              collapsed: false,
              items: [
                { text: "Login", link: "/en/manuals/core-features/login/" },
                { text: "Home", link: "/en/manuals/core-features/home/" },
                {
                  text: "Devices",
                  link: "/en/manuals/core-features/devices/",
                  collapsed: true,
                  items: [
                    { text: "PV", link: "/en/manuals/core-features/devices/pv" },
                    { text: "Battery", link: "/en/manuals/core-features/devices/battery" },
                    { text: "Diesel Generator", link: "/en/manuals/core-features/devices/diesel-generator" },
                    { text: "Meter1", link: "/en/manuals/core-features/devices/meter1" },
                    { text: "Meter2", link: "/en/manuals/core-features/devices/meter2" },
                  ],
                },
                {
                  text: "Alarms",
                  link: "/en/manuals/core-features/alarm/",
                  collapsed: true,
                  items: [
                    { text: "Current Records", link: "/en/manuals/core-features/alarm/current-records" },
                    { text: "History Records", link: "/en/manuals/core-features/alarm/history-records" },
                  ],
                },
                {
                  text: "Control",
                  link: "/en/manuals/core-features/control/",
                  collapsed: true,
                  items: [{ text: "Control Record", link: "/en/manuals/core-features/control/control-record" }],
                },
                {
                  text: "Statistics",
                  link: "/en/manuals/core-features/statistics/",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/en/manuals/core-features/statistics/overview" },
                    { text: "Curves", link: "/en/manuals/core-features/statistics/curves" },
                    { text: "Operation Log", link: "/en/manuals/core-features/statistics/operation-log" },
                    { text: "Running Log", link: "/en/manuals/core-features/statistics/running-log" },
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
                  link: "/en/manuals/system-config/channels/",
                  collapsed: true,
                  items: [
                    { text: "Channel Ops", link: "/en/manuals/system-config/channels/channel-ops" },
                    { text: "Point Ops", link: "/en/manuals/system-config/channels/point-ops" },
                    { text: "Mapping Ops", link: "/en/manuals/system-config/channels/mapping-ops" },
                  ],
                },
                {
                  text: "Device Instances",
                  link: "/en/manuals/system-config/device-instances/",
                  collapsed: true,
                  items: [
                    { text: "Instance Ops", link: "/en/manuals/system-config/device-instances/instance-ops" },
                    { text: "Instance Point Ops", link: "/en/manuals/system-config/device-instances/instance-point-ops" },
                    { text: "Instance Routing Ops", link: "/en/manuals/system-config/device-instances/instance-routing-ops" },
                  ],
                },
                {
                  text: "Rules",
                  link: "/en/manuals/system-config/rules/",
                  collapsed: true,
                  items: [
                    { text: "Rule Ops", link: "/en/manuals/system-config/rules/rule-ops" },
                    { text: "Rule Chain Ops", link: "/en/manuals/system-config/rules/rule-chain-ops" },
                  ],
                },
              ],
            },
          ],
          "/en/manuals/faq/": [
            {
              text: "FAQ",
              collapsed: true,
              items: [{ text: "FAQ", link: "/en/manuals/faq/" }],
            },
          ],
        },
        footer: {
          message: "Internal Only · Do Not Distribute",
          copyright: "(c) Monarch Cloud",
        },
      },
    },
  },
});

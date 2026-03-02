---
outline: deep

---

# 首页点位配置

<img src="/images/Setting/Configuration/home/1.png" alt="index" style="max-width:100%; height:auto;" />

在下方配置区中，展示首页看板的缩略预览，按设计尺寸等比缩放显示。用户可以点击**橙色高亮区域**对点位进行配置，其中包含以下可点击配置的模块：

1. **总览数据（左上）**：共 **4** 处可配置点位。一般用来展示总览性的数据，如光伏总发电量、柴油发电机总发电量、负载总用电量等。
2. **拓扑图（左中）**：共 **6** 处可配置点位。拓扑图中分别有 `PV`、`Load`、`Diesel`、`ESS` 设备，每个设备都有1-2个可配置点位，一般用来展示对应设备的运行数据。如功率、电压、电流、SOC等。
3. **站点信息（右上）**：共 **3** 处可配置点位。一般用来展示站点中的关键信息，如光伏功率、柴发功率等。
4. **设备信息（右中）**：共 **6** 处可配置点位。此处以轮播图的形式展示PV、Diesel、ESS，用户可以点击轮播图切换按钮进行设备切换。每个设备有 2 个可配置点位，一般用来展示各个设备的一些关键信息，如电压、电流等。

<img src="/images/Setting/Configuration/home/2.png" alt="index" style="max-width:100%; height:auto;" />

1. 点击配置区域中想要修改的点位（橙色高亮区域），打开点位配置弹窗。

<img src="/images/Setting/Configuration/home/3.png" alt="index" style="max-width:100%; height:auto;" />

2. 页面可配置内容分为Basic Setting区域和Formula Setting区域。

- Basic Setting区域主要对基础信息进行设置，其字段包括：

  - `Name`：展示的点位名称
  - `Icon`：展示的点位的图标，图标只有对位于**总览数据（左上）**和**站点信息（右上）**的点位可以选择
  - `Unit`：展示点位的单位
  - `Description`：展示点位的描述信息，其在页面中不体现

- Formula Setting区域可以对所要展示的点位的数据来源进行设置。其主要分为三个类型：

  - `Channel`：用户可以选择对应的通道名称、通道点位类型、通道点位
  - `Instance`：用户可以选择对应的实例名称、实例点位类型、实例点位
  - `Number`：用户可以输入具体的数字

  除了选择单一的点位数据来源，用户还可以使用符合运算来设置点位的数据来源。点击**绿色添加按钮**可以添加一组数据来源信息，同时用户可以通过选择位于这一组数据前面的逻辑运算选择框来选择合适的运算符号，运算符号有`+`、`-`、`×`、`÷`；点击**红色删除按钮**可以删除一组数据来源信息。

  <img src="/images/Setting/Configuration/home/4.png" alt="index" style="max-width:100%; height:auto;" />

3. 点击**Submit**按钮，提交对首页点位的相关修改。
4. 点击**Cancel**按钮，取消对首页点位的相关修改。

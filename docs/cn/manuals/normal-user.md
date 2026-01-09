---
outline: deep
search: false
---

# 普通用户手册

<!-- 下载入口已迁移到顶部导航栏（右上角“下载 PDF”按钮） -->

## 平台介绍

<img src="/images/common/index.png" alt="index" style="max-width:100%; height:auto;" />
 **Monarch Edge**平台是一套面向边缘能源站点的综合监控与分析平台，旨在为用户提供清晰、统一、可视化的站点运行视图。平台覆盖发电、储能、用能及告警等关键业务场景，通过标准化的界面与一致的交互方式，帮助用户快速掌握设备状态、运行趋势与异常情况，提升日常运维效率与管理质量。
  平台主要能力包括：

- **站点总览**：集中展示能量概况、能量流向、功率/能量趋势及站点与设备摘要，便于快速判断运行健康度。
- **设备监控**：按设备类型（光伏、储能、电表、柴油机等）提供概览与值监控页面，支持实时数据与状态查看。
- **告警管理**：区分当前告警与历史告警，支持查询、筛选与导出，便于异常定位与追溯。
- **运行统计**：提供统计概览、曲线分析与运行/操作日志，支持运行数据复盘与趋势分析。
- **统一体验**：表格筛选、分页、更新时间提示等交互一致，降低学习成本。
**本手册面向普通用户。**

## 通用界面结构以及功能说明
<img src="/images/common/1.PNG" alt="1" style="max-width:100%; height:auto;" />
整个用户界面首页主要分为三个部分：

- 左侧：侧边栏菜单
  - 用户可以点击想要跳转的功能模块页面进行跳转，其中**Devices**、**Alarm**、**Control**、**Statistic**都具有二级菜单。当前页面所对应的菜单会高亮。其菜单信息如下：
    - **Home**（首页）
    - **Devices**（设备）
      - **PV**（光伏）
      - **Battery**（电池/储能）
      - **Diesel Generator**（柴油发电机）
      - **Meter1**（电表1）
      - **Meter2**（电表2）
    - **Alarm**（告警）
      - **Current Records**（当前告警）
      - **History Records**（历史告警）
    - **Control**（控制）
      - **Control Record**（控制记录）
    - **Statistics**（统计）
      - **Overview**（概览）
      - **Curves**（曲线）
      - **Operation Log**（操作日志）
      - **Running Log**（运行日志）
      <img src="/images/common/2.png" alt="2" style="zoom:50%;" />
  - 用户可以通过侧边栏右下角的缩放图标按钮，进行菜单栏的宽度缩放。
  |<img src="/images/common/3.png" alt="3" style="zoom:50%;" />|<img src="/images/common/4.png" alt="4" style="zoom:50%;" />|
  
- 右上方：顶部栏

  顶部右侧有“铃铛<img src="/images/common/5.png" alt="5" style="max-width:100%; height:auto;" />（Notice)”入口：
  
  - 有红色数字角标时表示“当前告警数量”
  - 点击后会跳转到 Alarm > Current Records（当前告警）


- 右下方：主内容区
  - 展示当前页面数据

## 页面使用说明

### Login 页面
<img src="/images/login/1.png" alt="1" style="max-width:100%; height:auto;" />

1. 打开系统后进入登录页（Log in page）

2. 输入：

  - `Username`：用户账号的的用户名称
  - `Password`：用户账号的密码

3. 点击 `Log in` 按钮登录
4. 登录成功后默认会进入**Home**页面。

### Home 页面
**Home**页面主要展示站点以及具体设备的关键数据，并且随着设备状态实时进行数据刷新。
<img src="/images/home/1.png" alt="1" style="max-width:100%; height:auto;" />

- 第一部分为站点的能量概览卡片，主要有对 **PV Energy**、**Diesel Energy**、**Energy Used**、**Saving Billing**的统计数据。
- 第二部分为微电网系统的拓扑图，其展示了能量的流动方向（设备充放电情况），同时展示了各个设备的核心数据：
  - **PV**：`P`（当前功率）
  - **Load**：`P`（当前功率）
  - **ESS**：`P`（当前功率）、`SOC`（电池荷电状态）
  - **Diesel**：`P`（当前功率）、`Oil`（当前柴发油量百分比含量）
- 第三部分为功率统计曲线，针对**PV**、**ESS**的功率进行统计。
- 第四部分为能量柱状图，针对**Diesel**、**ESS**、**PV**的能量情况进行统计。
- 第五部分为当前站点信息统计，对**PV**、**Diesel**的当前的功率进行统计，对ESS的充/放电情况进行统计。
- 第六部分为站点设备信息统计，分布对**PV**、**ESS**、**Diesel Generator**的**P（当前功率）**、**U(当前电压)**进行统计。用户可以通过点击左右的切换按钮进行设备的切换。
<img src="/images/home/2.png" alt="2" style="zoom:50%;" />
- 第七部分为站点告警信息，展示当前的告警信息，从左向右依次为：
  - 告警设备
  - 告警等级（按照紧急度排序为：**L1>L2>L3**）
  |<img src="/images/home/3.png" alt="3" />|<img src="/images/home/4.png" alt="4" />|<img src="/images/home/5.png" alt="5" />|
  - 告警信息

### Devices 页面
<img src="/images/Devices/pv/1.png" alt="1" style="max-width:100%; height:auto;" />
**Devices** 包含多个设备类型，包括：**PV**、**Battery**、**Diesel Generator**、**Meter1**、**Meter2**。
每个设备的页面中通常有：

-  **Overview（概览）**：设备关键指标卡片/概览展示
- **Value Monitoring（值监控）**：实时点位的表格展示，展示的是与真实设备绑定的通道中Telemetry、Signal的相关数据。

#### PV

##### Overview

<img src="/images/Devices/pv/2.png" alt="2" style="max-width:100%; height:auto;" />

- 顶部为PV的4个指标卡片：
  - **PV Power**：光伏当前功率
  - **PV Voltage**：光伏当前电压
  - **PV Current**：光伏当前电流
  - **Today’s Energy**：光伏今日发电量
- 中间为 PV 背景示意区域，鼠标悬停在行区域会显示该串光伏板的数据：
  - **P**：所选这串光伏板的功率
  - **V**：所选这串光伏板的电压
  - **I**：所选这串光伏板的电流

##### Value Monitoring

<img src="/images/Devices/pv/3.png" alt="3" style="max-width:100%; height:auto;" />

- 顶部显示 **Update Time**，为最新获取到数据的时间。
- 下方是两张表：
  - 左面的表为通道的**Telemetry**表，包含`Name`、`Value`、`Unit`信息。
  - 右面的表为通道的**Signal**表，包括`Name` 、`Status`信息。

#### Battery
##### Overview
<img src="/images/Devices/battery/1.png" alt="1" style="max-width:100%; height:auto;" />
该页面以卡片列表形式展示电池关键指标：

- **Charge/Discharge Status**：电池充放电状态
- **SoC**：电池电量百分比
- **SoH**：电池健康度
- **Voltage**：电池当前电压
- **Current**：电池当前电流
- **Power**：电池当前功率
- **Max/Min/Avg Cell Voltage**：电池Cell的最大/最小/平均电压
- **Cell Voltage Difference**：电池Cell最大电压差
- **Avg Cell Temperature**：电池Cell平均温度

##### Value Monitoring
<img src="/images/Devices/battery/2.png" alt="2" style="max-width:100%; height:auto;" />
该页面包含 Tab：

- **Battery**：电池

* **PCS**：储能变流器/功率变换系统

每个 Tab 都是“**Update Time + 左右表格**”的形式，同**PV**的**Value Monitoring**页面。

##### Battery Management
<img src="/images/Devices/battery/3.png" alt="3" style="max-width:100%; height:auto;" />
本页面主要监控所有**Battery Cell**的**Voltage**和**Temperature**的情况。

- 左侧：显示所有Cell的电压情况
  - 模块上方分别显示**最大Cell电压**和**最小Cell电压**。
  - 模块下方以卡片形式列出 **#1~#N**（Battery Cell） 的电压值
- 右侧：显示所有Cell的温度情况
  - 模块上方分别显示**最大Cell温度**和**最小Cell温度**。
  - 模块下方以卡片形式列出 **#1~#N** （Battery Cell）的温度值

---
#### Diesel Generator
##### Overvie
<img src="/images/Devices/diesel/1.png" alt="1" style="max-width:100%; height:auto;" />
顶部指标卡片：

- **Power（功率）**
- **Oil（当前油含量）**
- **Voltage（电压）**
- **Coolant Temp（冷却液温度）**

##### Value Monitoring
<img src="/images/Devices/diesel/2.png" alt="2" style="max-width:100%; height:auto;" />
结构同 **PV** 的 **Value Monitoring**页面。

##### Meter1
**Meter1**直接展示**Value Monitoring**信息，其结构同**PV**的 **Value Monitoring**页面。
<img src="/images/Devices/meter/1.png" alt="1" style="max-width:100%; height:auto;" />

##### Meter2

**Meter2**直接展示**Value Monitoring**信息，其结构同**PV**的 **Value Monitoring**页面。

<img src="/images/Devices/meter/2.png" alt="2" style="max-width:100%; height:auto;" />

### Alarm 页面
**Alarm**页面为告警记录页面，用户可以通过该模块对当前的告警信息以及历史告警信息进行查看。

##### Current Records




表格字段介绍：
- Name：规则/告警名称
- Channel ID：通道 ID
- Level：告警等级图标
- Start Time：触发时间
筛选操作：
用户可以对右上角的选择框进行告警等级的选择，以对当前告警记录进行筛选。

##### History Records



表格字段介绍：
- Name：规则/告警名称
- Channel ID：通道 ID
- Level：告警等级图标
- Start Time：告警触发时间
- End Time：告警处理结束时间
筛选操作：
用户可以通过以下筛选条件进行筛选：
- Warning Level：L1/L2/L3
- Start Time：开始时间
- End Time：结束时间
用户点击Search按钮，可以针对筛选的条件进行搜索；点击Reload按钮，重置所有的筛选条件并搜索。
列表信息导出：
用户点击Export按钮可以导出历史告警的excel文件，其表头如下：



#### Control
Viewer 通常只具备“查看控制记录”的权限，不具备下发控制的权限。
##### Control Record


表格字段介绍：
- Name：规则/告警名称
- Channel ID：通道 ID
- Level：告警等级图标
- Start Time：触发时间
筛选操作：
用户可以对右上角的选择框进行告警等级的选择，以对当前告警记录进行筛选。

#### Statistics
Statistics 顶部有 4 个页签：

- Overview（概览）
- Curves（曲线）
- Operation Log（操作日志）
- Running Log（运行日志）
【截图占位：Statistics 四个页签（Overview/Curves/Operation Log/Running Log）】



##### Overview
页面内容
该页以图表为主，通常包含：

- Energy consumption（能耗概览卡片）
- Energy Distribution（能源分布：环形图）
- Power Trend（功率趋势：折线图）
- Energy Chart（能量柱状图）
常用操作
- 切换时间范围：点击右侧时间按钮
  - 6 Hour / 1 Day / 1 Week / 1 Month
- 查看图表提示
  - 鼠标移到图表上，可看到某时间点的值（tooltip）
  【截图占位：Statistics Overview（时间按钮+图表区）】



##### Curves
Curves 页与 Overview 类似，也以图表为主，操作方式相同：

- 选择筛选条件（Select filter condition）
- 切换时间范围（6h/1d/1w/1m）
- 查看图表提示与趋势变化
【截图占位：Statistics Curves（筛选+时间按钮+图表）】



##### Operation Log
页面内容
表格列通常包含：

- User（用户）
- Role（角色）
- Action（动作）
- Device（对象/设备）
- Result（结果）
- Time（时间）
- IP Address（IP）
支持分页。
【截图占位：Operation Log（表格+分页）】



##### Running Log
页面内容
该页以“日志文本流”的方式展示系统运行信息：
顶部通常有 Export（导出）按钮。



## 常见问题（FAQ）与排障

1. 页面一直没有数据、设备 Update Time 不更新
请按顺序自查：
1. 刷新页面（F5）
2. 切换到别的菜单再切回来
3. 看顶部是否能正常跳转告警页（验证基础路由正常）
4. 让管理员检查：
  - 后端服务是否正常
  - WebSocket 推送源是否正常
  - 设备/通道是否在线
建议你向管理员提供：
- 发生问题的页面（例如：Devices > PV > Value Monitoring）
- 当时的时间点
- 是否所有设备都无数据，还是某一类无数据
2. 登录后又被跳回登录页
可能原因：
- 账号已过期/密码错误
- Token 刷新失败
建议：
- 重新登录一次
- 仍失败请联系管理员重置账号



## 术语表

- Viewer：只读用户，主要查看数据与记录
- Channel（通道）：采集/通信的逻辑通道（例如 Modbus 通道）
- Point（点位）：具体的测点/信号（例如某路电压/电流）
- Telemetry（遥测）：连续量（一般为数值 + 单位）
- Signal（遥信）：状态量（一般为 0/1 或状态码）
- SoC：State of Charge，电量百分比
- SoH：State of Health，健康度
- Update Time：当前页面数据最近一次刷新/推送的时间

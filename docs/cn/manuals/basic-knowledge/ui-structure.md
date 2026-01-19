---
outline: deep
---

# 界面结构以及功能说明

![1](../../../images/common/1.PNG)

整个用户界面首页主要分为三个部分：

- 左侧：侧边栏菜单
  - 用户可以点击想要跳转的功能模块页面进行跳转，其中**Devices**、**Alarm**、**Control**、**Statistic**都具有二级菜单。当前页面所对应的菜单会高亮。其菜单信息如下：

    <div style="display:flex; gap:16px; align-items:flex-start; flex-wrap:wrap;">
      <div style="min-width:260px; flex:1;">
        <ul>
          <li><strong>Home</strong>（首页）</li>
          <li>
            <strong>Devices</strong>（设备）
            <ul>
              <li><strong>PV</strong>（光伏）</li>
              <li><strong>Battery</strong>（电池/储能）</li>
              <li><strong>Diesel Generator</strong>（柴油发电机）</li>
              <li><strong>Meter1</strong>（电表1）</li>
              <li><strong>Meter2</strong>（电表2）</li>
            </ul>
          </li>
          <li>
            <strong>Alarm</strong>（告警）
            <ul>
              <li><strong>Current Records</strong>（当前告警）</li>
              <li><strong>History Records</strong>（历史告警）</li>
            </ul>
          </li>
          <li>
            <strong>Control</strong>（控制）
            <ul>
              <li><strong>Control Record</strong>（控制记录）</li>
            </ul>
          </li>
          <li>
            <strong>Statistics</strong>（统计）
            <ul>
              <li><strong>Overview</strong>（概览）</li>
              <li><strong>Curves</strong>（曲线）</li>
              <li><strong>Operation Log</strong>（操作日志）</li>
              <li><strong>Running Log</strong>（运行日志）</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  - 用户可以通过侧边栏右下角的缩放图标按钮，进行菜单栏的宽度缩放。

  <span style="display:inline-flex; gap:40px; align-items:center; white-space:nowrap;">
    <img src="../../../images/common/3.png" alt="3" style="zoom:35%; display:inline-block;" />
    <img src="../../../images/common/4.png" alt="4" style="zoom:35%; display:inline-block;" />
  </span>
  
- 右上方：顶部栏

  顶部右侧有“铃铛![5](../../../images/common/5.png)（Notice)”入口：
  
  - 有红色数字角标时表示“当前告警数量”
  - 点击后会跳转到 Alarm > Current Records（当前告警）


- 右下方：主内容区
  - 展示当前页面数据

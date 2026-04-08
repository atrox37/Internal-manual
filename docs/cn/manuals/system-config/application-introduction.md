---
outline: deep
---

# 应用介绍

<img src="../../../images/Setting/index/1.png" alt="EMS Edge Configuration应用介绍" style="max-width:100%; height:auto;" />

**EMS Edge Configuration** 是一款用于边缘侧配置与运行维护的桌面平台，主要面向运维人员、现场工程师与配置管理员。  
它的核心作用是提供统一的配置入口、清晰的运行视图与规范的操作流程，帮助用户更高效地完成设备与通道的配置管理、规则维护与状态监控。

## 下载地址（V0.1.14版本）

- **Windows**
  - [Monarch Edge Console_0.1.14_x64_en-US.msi](https://edge-desktop-configuration-application.s3.us-east-2.amazonaws.com/releases/v0.1.14/windows/Monarch%20Edge%20Console_0.1.14_x64_en-US.msi)

- **macOS**
  - [Monarch Edge Console_0.1.14_aarch64.dmg](https://edge-desktop-configuration-application.s3.us-east-2.amazonaws.com/releases/v0.1.14/macos/Monarch%20Edge%20Console_0.1.14_aarch64.dmg?v=20260320.1)
  
    >注意：因为目前仍在测试阶段，应用相关证书还未下发，在MacOS系统中可能提示软件已损害，无法正常打开，此时可以暂时绕过这个警告，方法如下：
    >
    >- 右键应用 → 打开 → 再确认
    >- 或在终端执行：
    >
    >```xattr -dr com.apple.quarantine /Applications/Monarch%20Edge%20Console.app```
  
- **Linux**
  - [Monarch Edge Console_0.1.14_amd64.AppImage](https://edge-desktop-configuration-application.s3.us-east-2.amazonaws.com/releases/v0.1.14/linux/Monarch%20Edge%20Console_0.1.14_amd64.AppImage?v=20260320.1)

- **Linux-arm64**
  - [Monarch Edge Console_0.1.14_aarch64.AppImage](https://edge-desktop-configuration-application.s3.us-east-2.amazonaws.com/releases/v0.1.14/linux-arm64/Monarch%20Edge%20Console_0.1.14_aarch64.AppImage?v=20260320.1)

## UI 介绍

### 顶部标题栏

<img src="../../../images/Setting/index/2.png" alt="顶部标题栏" style="max-width:100%; height:auto;" />

1. **应用标识区**：显示应用名称与基础状态提示。  
2. **当前所连网关机的IP**：在登录时进行设定，所有的操作都将基于该网关机进行。  
3. **用户控件**：查看用户名称，点击弹出下拉框，可进行退出登录的操作。  

### 侧边栏

用户可以点击侧边栏的标签选择不同的模块进行操作。侧边栏有两种形态，其会随着应用窗体的大小发生变化：

* 在应用窗口较宽时，会以`图标+模块名称`的形式来展示模块标签。

  <img src="../../../images/Setting/index/3.png" alt="侧边栏-宽屏模式" style="max-width:100%; height:400px;" />

* 在应用窗口较窄时，会以图标的形式来展示模块标签。

  

<img src="../../../images/Setting/index/4.png" alt="侧边栏-窄屏模式" style="max-width:100%; height:400px;" />

---
outline: deep
---

# 初始化配置

初始化配置用于网关首次接入或网关未就绪时的快速安装。  
系统会通过 SSH 连接网关，上传 `.run` 安装包并自动执行安装。

## 什么时候需要用

- 首次部署网关
- 网关重装后需要重新安装服务
- 登录时提示无法连接网关

## 如何进入初始化页面

### 方式一：初次打开应用进入

<img src="../../../images/Setting/Initialize/1.png"  style="max-width:100%; height:auto;" />

### 方式二：登录页进入

<img src="../../../images/Setting/Initialize/2.png"  style="max-width:100%; height:auto;" />

1. 点击右上角 **Initialize Project**，进入初始化页面。

### 方式三：登录失败自动跳转

<img src="../../../images/Setting/Initialize/3.png"  style="max-width:100%; height:auto;" />

若登录时检测到网关不可达/网络异常，系统会提示先完成初始化,随后自动进入初始化页面。

> **注意**： 在初始化页面，可以点击**Skip to login** 暂时跳过初始化操作。
>
><img src="../../../images/Setting/Initialize/4.png"  style="max-width:100%; height:auto;" />

## 操作步骤

<img src="../../../images/Setting/Initialize/5.png"  style="max-width:100%; height:auto;" />

1. 初始化配置表单包含以下内容：
    - ```IP Address```：网关机的IP地址，格式类似为192.168.1.100，必须符合IP地址格式。
    - ```Port```：SSH连接端口，默认值为22，范围为1-65535。
    - ```Package```：网关机配置安装包，点击Select Installation Package按钮进行安装包文件的选择，安装包必须是.run格式。

    >内部测试，如图进行填写，[点击下载.run文件](https://github.com/EvanL1/VoltageEMS/releases/download/v0.2.0/MonarchEdge-arm64-0.2.0.run)
2. 点击 **Start** 开始初始化。

<img src="../../../images/Setting/Initialize/6.png"  style="max-width:100%; height:auto;" />

初始化过程中会显示进度与状态，典型步骤包括：

- Testing SSH connection...
- Uploading file via SCP...
- Setting file execution permissions...
- Executing installation command...

<!-- ---

## 结果说明

### 成功

<img src="../../../images/Setting/Initialize/5.png"  style="max-width:100%; height:auto;" />

- 进度到 100%，状态为成功。
- 系统自动返回登录页。

### 失败

<img src="../../../images/Setting/Initialize/5.png"  style="max-width:100%; height:auto;" />

- 状态为失败（红色），并显示错误详情。
- 按提示检查 IP、端口、网络连通性和安装包后重试。 -->


>**注意**
>
>1. 安装包必须是有效的 `.run` 文件。
>2. 初始化期间不要关闭页面或中断流程。
>3. 请确保网关可通过 SSH 访问（IP/端口可达）。
>4. 初始化失败时，优先检查网络连通和安装包是否正确。




---
outline: deep
---

# Initialization Configuration

Initialization configuration is used for quick setup when the gateway is first connected or when the gateway is not ready.  
The system connects to the gateway via SSH, uploads the `.run` installation package, and automatically executes the installation.

## When to Use

- First-time gateway deployment
- Reinstalling services after gateway reinstallation
- Login prompt indicates unable to connect to gateway

## How to Access the Initialization Page

### Method 1: When Opening the Application for the First Time

<img src="../../images/Setting/Initialize/1.png" style="max-width:100%; height:auto;" />

### Method 2: From the Login Page

<img src="../../images/Setting/Initialize/2.png" style="max-width:100%; height:auto;" />

1. Click **Initialize Project** in the top right corner to access the initialization page.

### Method 3: Automatic Redirect on Login Failure

<img src="../../images/Setting/Initialize/3.png" style="max-width:100%; height:auto;" />

If the gateway is unreachable or there is a network exception when logging in, the system will prompt you to complete initialization first, then automatically redirect to the initialization page.

> **Note**: On the initialization page, you can click **Skip to login** to temporarily skip the initialization.
>
><img src="../../images/Setting/Initialize/4.png" style="max-width:100%; height:auto;" />

## Operation Steps

<img src="../../images/Setting/Initialize/5.png" style="max-width:100%; height:auto;" />

1. The initialization configuration form contains the following:
    - `IP Address`: The IP address of the gateway machine, in a format like 192.168.1.100, must conform to IP address format.
    - `Port`: SSH connection port, default value is 22, range is 1-65535.
    - `Package`: Gateway configuration installation package. Click the **Select Installation Package** button to select the installation package file. The package must be in `.run` format.

    > For internal testing, fill in as shown in the figure. [Download .run file](https://github.com/EvanL1/VoltageEMS/releases/download/v0.2.0/MonarchEdge-arm64-0.2.0.run)

2. Click **Start** to begin initialization.

<img src="../../images/Setting/Initialize/6.png" style="max-width:100%; height:auto;" />

Progress and status are displayed during initialization. Typical steps include:

- Testing SSH connection...
- Uploading file via SCP...
- Setting file execution permissions...
- Executing installation command...

> **Note**
>
> 1. The installation package must be a valid `.run` file.
> 2. Do not close the page or interrupt the process during initialization.
> 3. Ensure the gateway is accessible via SSH (IP/port reachable).
> 4. When initialization fails, first check network connectivity and whether the installation package is correct.

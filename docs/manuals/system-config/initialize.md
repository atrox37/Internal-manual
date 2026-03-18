---
outline: deep
---

# Initialization Configuration

The initialization configuration function is used for initial deployment or reconfiguration of backend servers. It automatically deploys and configures backend services by connecting to remote servers via SSH.

**Use Cases:**
- Initial system installation
- Server redeployment
- Server configuration changes

## Open Initialization Dialog

There are two ways to open the initialization dialog:

**Method 1: From Login Interface**

<img src="../../images/Setting/Initialize/1.png" alt="Initialize Button from Login" style="max-width:100%; height:auto;" />

1. Click the **Initialize Project** button in the top right corner of the login interface to open the initialization dialog.

**Method 2: From Error Prompt**

<img src="../../images/Setting/Initialize/2.png" alt="Initialize from Error Prompt" style="max-width:100%; height:auto;" />

1. When login fails and a network error is prompted, the system will display "**Unable to connect to server, please initialize project first**", and then automatically open the initialization dialog.

## Initialization Configuration Steps

<img src="../../images/Setting/Initialize/3.png" alt="Initialization Configuration Form" style="max-width:100%; height:auto;" />

1. The initialization configuration form contains the following:

   * `IP Address`: The IP address of the gateway machine, in a format like `192.168.1.100`, must conform to IP address format.

   * `Port`: **SSH** connection port, default value is `22`, range is 1-65535.

   * `Username`: **SSH** login username, usually `root` or other users with permissions.

   * `Auth Mode`: **SSH** authentication method. The system supports two authentication methods: **Password** authentication and **Private Key** authentication.

     * **Password** authentication: Enter the **SSH** password in the **Password** input field.

       <img src="../../images/Setting/Initialize/4.png" alt="Password Authentication" style="max-width:100%; height:auto;" />

     * **Private Key** authentication: Click the **Select Private Key File** button to select a private key file (`.pem` or `.key` format).

       <img src="../../images/Setting/Initialize/5.png" alt="Private Key Authentication" style="max-width:100%; height:auto;" />

   * `Package`: Gateway machine configuration installation package. Click the **Select Installation Package** button to select the installation package file. The installation package must be in `.run` format.

   > **For Internal Testing:**
   > - **IP Address**: `192.168.1.233`
   > - **Port**: `22`
   > - **Username**: `root`
   > - **Auth Mode**: `Password` (no need to enter the password, leave it empty)
   > - **Package**: Select `.run` file, [Download .run file](https://github.com/EvanL1/VoltageEMS/releases/download/v0.1.11/MonarchEdge-arm64-0.1.11.run)
2. Click the **Submit** button to start initialization. The system will display progress information, and users cannot interrupt the initialization process.

   * When initialization succeeds, the progress bar will turn green, and a success message will be displayed.

     <img src="../../images/Setting/Initialize/6.png" alt="Initialization Success" style="max-width:100%; height:auto;" />

   * When initialization fails, the progress bar will turn red, initialization stops, and an error message is displayed.

     <img src="../../images/Setting/Initialize/7.png" alt="Initialization Failed" style="max-width:100%; height:auto;" />

>Notes:
>
>1. Do not close the dialog during initialization.
>2. Ensure the server is accessible.
>3. Ensure SSH service is running normally.
>4. Installation package files must be valid `.run` format.
>5. Private key files must be `.pem` or `.key` format.
>6. After initialization is complete, you can try logging in again.

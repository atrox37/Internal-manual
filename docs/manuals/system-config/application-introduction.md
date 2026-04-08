---
outline: deep
---

# Application Introduction

<img src="../../images/Setting/index/1.png" alt="EMS Edge Configuration Application Introduction" style="max-width:100%; height:auto;" />

**EMS Edge Configuration** is a desktop platform for edge-side configuration and operation maintenance, primarily targeting operations personnel, field engineers, and configuration administrators.  
Its core function is to provide a unified configuration entry point, clear operational views, and standardized operational procedures, helping users more efficiently complete device and channel configuration management, rule maintenance, and status monitoring.

## Download Links (V0.1.14)

- **Windows**
  -  [Monarch Edge Console_0.1.14_x64_en-US.msi](https://edge-desktop-configuration-application.s3.us-east-2.amazonaws.com/releases/v0.1.14/windows/Monarch%20Edge%20Console_0.1.14_x64_en-US.msi)

- **macOS**
  - [Monarch Edge Console_0.1.14_aarch64.dmg](https://edge-desktop-configuration-application.s3.us-east-2.amazonaws.com/releases/v0.1.14/macos/Monarch%20Edge%20Console_0.1.14_aarch64.dmg?v=20260320.1)
  
    >**Note:** Since the application is still in the testing phase and the relevant certificates have not yet been issued, macOS may display a warning that the software is damaged and cannot be opened. In this case, you can temporarily bypass the warning using the following methods:
    >
    >- Right-click the application → Select **Open** → Confirm again
    >- Or run the following command in Terminal:
    >
    >```
    >xattr -dr com.apple.quarantine /Applications/pcmanagement.app
    >```
  
- **Linux**
  - [Monarch Edge Console_0.1.14_amd64.AppImage](https://edge-desktop-configuration-application.s3.us-east-2.amazonaws.com/releases/v0.1.14/linux/Monarch%20Edge%20Console_0.1.14_amd64.AppImage?v=20260320.1)

- **Linux-arm64**
  - [Monarch Edge Console_0.1.14_aarch64.AppImage](https://edge-desktop-configuration-application.s3.us-east-2.amazonaws.com/releases/v0.1.14/linux-arm64/Monarch%20Edge%20Console_0.1.14_aarch64.AppImage?v=20260320.1)

## UI Introduction

### Top Title Bar

<img src="../../images/Setting/index/2.png" alt="Top Title Bar" style="max-width:100%; height:auto;" />

1. **Application Identity Area**: Displays the application name and basic status prompts.  
2. **Current Gateway IP**: Set during login, all operations will be performed based on this gateway machine.  
3. **User Control**: View user name, click to open dropdown menu, can perform logout operation.  

### Sidebar

Users can click sidebar labels to select different modules for operations. The sidebar has two forms that change with the application window size:

* When the application window is wide, module labels are displayed in the form of `icon + module name`.

  <img src="../../images/Setting/index/3.png" alt="Sidebar - Wide Screen Mode" style="max-width:100%; height:400px;" />

* When the application window is narrow, module labels are displayed in icon form only.

  

<img src="../../images/Setting/index/4.png" alt="Sidebar - Narrow Screen Mode" style="max-width:100%; height:400px;" />

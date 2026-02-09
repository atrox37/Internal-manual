---
outline: deep
---

# Application Update

The system supports both automatic update checking and manual updates. When a new version is available, the system will automatically prompt you to update.

**Update Types:**

- Application version updates (through desktop application update mechanism)
- Firmware upgrades (through system configuration interface)

## Automatic Update Check

### Automatic Check Mechanism

The system will automatically check for updates at the following times:
- 3 seconds after application startup (silent check)
- Will not affect application startup speed

### Update Process

When a new version is detected, the system will display an update dialog, as shown:

<img src="../../images/Setting/Update/1.png" alt="Update Dialog" style="max-width:100%; height:auto;" />

1. Application's latest version number.
2. Update dialog, which will display detailed update logs, including:
   - New features
   - Bug fixes
   - Performance improvements
   - Other changes
3. Click the **Update Now** button to immediately start the application update. The system will begin downloading the update package and display progress during the download.
4. Click the **Remind Later** button to temporarily cancel the update.

5. After the download is complete, the system will prompt that the application needs to be restarted.
6. Select **Restart Now** to immediately restart the application and complete the update.
7. Or select **Restart Later** to restart later.

>Note:
>
>1. Do not close the application during the update process.
>2. It is recommended to save important data before updating.
>3. The application needs to be restarted after the update to take effect.
>4. If the current version is already the latest version, the system will prompt "Current version is already the latest version".

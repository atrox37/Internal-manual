---
outline: deep
---

# Regular User Manual

## Platform Introduction

![index](../../public/images/common/index.png)
 **Monarch Edge** is a comprehensive monitoring and analytics platform for edge energy sites, designed to provide users with a clear, unified, and visual view of site operations. The platform covers key business scenarios such as generation, energy storage, energy usage, and alarms. With standardized interfaces and consistent interactions, it helps users quickly understand device status, operational trends, and abnormal conditions, improving daily O&M efficiency and management quality.
  The platform's main capabilities include:

- **Site overview**: Centralized display of energy summary, energy flow, power/energy trends, and site/device highlights to quickly assess operational health.
- **Device monitoring**: Overview and value-monitoring pages by device type (PV, storage, meters, diesel generators, etc.), supporting real-time data and status viewing.
- **Alarm management**: Separate current and historical alarms with query, filter, and export for troubleshooting and traceability.
- **Operation statistics**: Statistical overview, curve analysis, and run/operation logs to support data review and trend analysis.
- **Unified experience**: Consistent interactions such as table filters, pagination, and update-time hints to reduce learning cost.
**This manual is intended for regular users.**

## General UI Structure and Function Description
![1](../../public/images/common/1.PNG)
The main home page of the user interface is divided into three parts:

- Left side: sidebar menu
  - Users can click the modules they want to open. **Devices**, **Alarm**, **Control**, and **Statistic** have secondary menus. The menu corresponding to the current page is highlighted. The menu items are as follows:
    - **Home** (Home page)
    - **Devices** (Devices)
      - **PV** (PV)
      - **Battery** (Battery / Energy Storage)
      - **Diesel Generator** (Diesel Generator)
      - **Meter1** (Meter 1)
      - **Meter2** (Meter 2)
    - **Alarm** (Alarms)
      - **Current Records** (Current Alarms)
      - **History Records** (Historical Alarms)
    - **Control** (Control)
      - **Control Record** (Control Records)
    - **Statistics** (Statistics)
      - **Overview** (Overview)
      - **Curves** (Curves)
      - **Operation Log** (Operation Log)
      - **Running Log** (Running Log)
      <img src="../../public/images/common/2.png" alt="2" style="zoom:50%;" />
  - Users can resize the sidebar width via the zoom icon at the bottom-right of the sidebar.
  |<img src="../../public/images/common/3.png" alt="3" style="zoom:50%;" />|<img src="../../public/images/common/4.png" alt="4" style="zoom:50%;" />|
  
- Upper-right: top bar

  On the right side of the top bar there is a bell icon ![5](../../public/images/common/5.png) (Notice):
  
  - A red badge indicates the number of current alarms.
  - Clicking it jumps to Alarm > Current Records (Current Alarms).


- Lower-right: main content area
  - Displays data for the current page

## Page Usage Instructions

### Login Page
![1](../../public/images/login/1.png)

1. Open the system and enter the login page.

2. Enter:

  - `Username`: The username of the user account.
  - `Password`: The password of the user account.

3. Click `Log in` to sign in.
4. After a successful login, the system opens the **Home** page by default.

### Home Page
**Home** mainly displays key data for the site and specific devices, and refreshes in real time with device status.
![1](../../public/images/home/1.png)

- The first section contains the site's energy overview cards, mainly showing statistics for **PV Energy**, **Diesel Energy**, **Energy Used**, and **Saving Billing**.
- The second section is the microgrid topology diagram. It shows the direction of energy flow (device charge/discharge) and the key data of each device:
  - **PV**: `P` (current power)
  - **Load**: `P` (current power)
  - **ESS**: `P` (current power), `SOC` (battery state of charge)
  - **Diesel**: `P` (current power), `Oil` (current diesel fuel percentage)
- The third section is the power statistics curves for **PV** and **ESS**.
- The fourth section is the energy bar chart for **Diesel**, **ESS**, and **PV**.
- The fifth section is current site information statistics, covering current power for **PV** and **Diesel**, and charge/discharge status for ESS.
- The sixth section is site device information statistics, showing **P (current power)** and **U (current voltage)** for **PV**, **ESS**, and **Diesel Generator**. Users can switch devices using the left/right buttons.
<img src="../../public/images/home/2.png" alt="2" style="zoom:50%;" />
- The seventh section is site alarm information, showing current alarms from left to right:
  - Alarm device
  - Alarm level (sorted by urgency: **L1>L2>L3**)
  |<img src="../../public/images/home/3.png" alt="3" />|<img src="../../public/images/home/4.png" alt="4" />|<img src="../../public/images/home/5.png" alt="5" />|
  - Alarm information

### Devices Page
![1](../../public/images/Devices/pv/1.png)
**Devices** includes multiple device types, such as **PV**, **Battery**, **Diesel Generator**, **Meter1**, and **Meter2**.
Each device page typically includes:

- **Overview**: Card-based display of key device indicators
- **Value Monitoring**: Real-time point tables showing Telemetry and Signal data from channels bound to real devices.

#### PV

##### Overview

![2](../../public/images/Devices/pv/2.png)

- The top shows four PV indicator cards:
  - **PV Power**: Current PV power
  - **PV Voltage**: Current PV voltage
  - **PV Current**: Current PV current
  - **Today’s Energy**: PV energy generated today
- The middle area shows a PV background diagram. Hovering over a string shows data for that PV string:
  - **P**: Power of the selected PV string
  - **V**: Voltage of the selected PV string
  - **I**: Current of the selected PV string

##### Value Monitoring

![3](../../public/images/Devices/pv/3.png)

- The top shows **Update Time**, which is the latest data acquisition time.
- Below are two tables:
  - The left table is the channel **Telemetry** table, including `Name`, `Value`, and `Unit`.
  - The right table is the channel **Signal** table, including `Name` and `Status`.

#### Battery
##### Overview
![1](../../public/images/Devices/battery/1.png)
This page displays key battery indicators in a card list:

- **Charge/Discharge Status**: Battery charge/discharge status
- **SoC**: Battery state of charge
- **SoH**: Battery health
- **Voltage**: Current battery voltage
- **Current**: Current battery current
- **Power**: Current battery power
- **Max/Min/Avg Cell Voltage**: Max/min/average cell voltage
- **Cell Voltage Difference**: Maximum cell voltage difference
- **Avg Cell Temperature**: Average cell temperature

##### Value Monitoring
![2](../../public/images/Devices/battery/2.png)
This page includes tabs:

- **Battery**: Battery

* **PCS**: Power conversion system

Each tab uses the "**Update Time + left/right tables**" layout, the same as the **PV** **Value Monitoring** page.

##### Battery Management
![3](../../public/images/Devices/battery/3.png)
This page mainly monitors **Voltage** and **Temperature** for all **Battery Cells**.

- Left: Shows voltage for all cells
  - The module header shows **maximum cell voltage** and **minimum cell voltage**.
  - The module body lists **#1~#N** (Battery Cell) voltages as cards.
- Right: Shows temperature for all cells
  - The module header shows **maximum cell temperature** and **minimum cell temperature**.
  - The module body lists **#1~#N** (Battery Cell) temperatures as cards.

---
#### Diesel Generator
##### Overview
![1](../../public/images/Devices/diesel/1.png)
Top indicator cards:

- **Power**
- **Oil** (current fuel level)
- **Voltage**
- **Coolant Temp** (coolant temperature)

##### Value Monitoring
![2](../../public/images/Devices/diesel/2.png)
Layout is the same as the **PV** **Value Monitoring** page.

##### Meter1
**Meter1** directly displays **Value Monitoring** information, with the same layout as the **PV** **Value Monitoring** page.
![1](../../public/images/Devices/meter/1.png)

##### Meter2

**Meter2** directly displays **Value Monitoring** information, with the same layout as the **PV** **Value Monitoring** page.

![2](../../public/images/Devices/meter/2.png)

### Alarm Page
**Alarm** is the alarm record page. Users can view current and historical alarm information from this module.

##### Current Records




Table fields:
- Name: Rule/Alarm name
- Channel ID: Channel ID
- Level: Alarm level icon
- Start Time: Trigger time
Filter:
Users can select the alarm level from the dropdown in the upper-right corner to filter current alarm records.

##### History Records



Table fields:
- Name: Rule/Alarm name
- Channel ID: Channel ID
- Level: Alarm level icon
- Start Time: Alarm trigger time
- End Time: Alarm handling end time
Filter:
Users can filter by the following conditions:
- Warning Level: L1/L2/L3
- Start Time: Start time
- End Time: End time
Click **Search** to search by the selected conditions. Click **Reload** to reset all filters and search again.
Export:
Click **Export** to export historical alarms to an Excel file.



#### Control
Viewers typically only have permission to view control records and cannot issue control commands.
##### Control Record


Table fields:
- Name: Rule/Alarm name
- Channel ID: Channel ID
- Level: Alarm level icon
- Start Time: Trigger time
Filter:
Users can select the alarm level from the dropdown in the upper-right corner to filter the current alarm records.

#### Statistics
Statistics has 4 tabs at the top:

- Overview
- Curves
- Operation Log
- Running Log
[Screenshot placeholder: Statistics tabs (Overview/Curves/Operation Log/Running Log)]



##### Overview
Page content
This page is chart-based and typically includes:

- Energy consumption (energy overview cards)
- Energy Distribution (donut chart)
- Power Trend (line chart)
- Energy Chart (bar chart)
Common actions
- Switch time range: click the time buttons on the right
  - 6 Hour / 1 Day / 1 Week / 1 Month
- View chart tips
  - Hover over a chart to see values at a specific time point (tooltip)
  [Screenshot placeholder: Statistics Overview (time buttons + chart area)]



##### Curves
The Curves page is similar to Overview and also chart-based, with the same interactions:

- Select filter conditions
- Switch time range (6h/1d/1w/1m)
- View chart tips and trend changes
[Screenshot placeholder: Statistics Curves (filters + time buttons + charts)]



##### Operation Log
Page content
Table columns typically include:

- User
- Role
- Action
- Device
- Result
- Time
- IP Address
Pagination is supported.
[Screenshot placeholder: Operation Log (table + pagination)]



##### Running Log
Page content
This page shows system operation information as a "log text stream":
The top usually has an **Export** button.



## FAQ and Troubleshooting

1. The page has no data and device Update Time does not change
Please check in order:
1. Refresh the page (F5)
2. Switch to another menu and switch back
3. Check whether the top bar can jump to the alarm page (verifies base routing)
4. Ask the administrator to check:
  - Whether the backend service is normal
  - Whether the WebSocket push source is normal
  - Whether devices/channels are online
It is recommended to provide the administrator with:
- The page where the issue occurs (e.g., Devices > PV > Value Monitoring)
- The time the issue occurred
- Whether all devices have no data or only a specific type has no data
2. After logging in, you are redirected back to the login page
Possible causes:
- Account expired or password incorrect
- Token refresh failed
Suggestions:
- Log in again
- If it still fails, contact the administrator to reset the account



## Glossary

- Viewer: Read-only user, mainly views data and records
- Channel: Logical channel for acquisition/communication (e.g., a Modbus channel)
- Point: Specific measurement/signal point (e.g., a voltage/current line)
- Telemetry: Continuous values (usually a number + unit)
- Signal: Status values (usually 0/1 or status codes)
- SoC: State of Charge, battery percentage
- SoH: State of Health
- Update Time: The most recent refresh/push time of page data

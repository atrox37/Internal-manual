---
search: false
---

# monarch Edge User Manual

<!-- 下载入口已迁移到顶部导航栏（右上角“Download PDF”按钮） -->

<img src="/images/common/index.png" alt="index" style="max-width:100%; height:auto;" />
 **Monarch Edge** is a comprehensive monitoring and analytics platform for edge energy sites, designed to provide users with a clear, unified, and visual view of site operations. The platform covers key business scenarios such as generation, energy storage, energy usage, and alarms. With standardized interfaces and consistent interactions, it helps users quickly understand device status, operational trends, and abnormal conditions, improving daily O&M efficiency and management quality.
  The platform's main capabilities include:

- **Site overview**: Centralized display of energy summary, energy flow, power/energy trends, and site/device highlights to quickly assess operational health.
- **Device monitoring**: Overview and value-monitoring pages by device type (PV, storage, meters, diesel generators, etc.), supporting real-time data and status viewing.
- **Alarm management**: Separate current and historical alarms with query, filter, and export for troubleshooting and traceability.
- **Operation statistics**: Statistical overview, curve analysis, and run/operation logs to support data review and trend analysis.
- **Unified experience**: Consistent interactions such as table filters, pagination, and update-time hints to reduce learning cost.
**This manual is intended for regular users.**

## Basics

### UI Structure and Function Description

<img src="/images/common/1.PNG" alt="1" style="max-width:100%; height:auto;" />

The main home page of the user interface is divided into three parts:

- **Left side: sidebar menu**
  
  - Users can click the modules they want to open. **Devices**, **Alarm**, **Control**, and **Statistic** have secondary menus. The menu corresponding to the current page is highlighted. The menu items are as follows:
  
    <div style="display:flex; gap:16px; align-items:flex-start; flex-wrap:wrap;">
      <div style="min-width:260px; flex:1;">
        <ul>
          <li><strong>Home</strong></li>
          <li>
            <strong>Devices</strong> 
            <ul>
              <li><strong>PV</strong></li>
              <li><strong>Battery</strong></li>
              <li><strong>Diesel Generator</strong></li>
              <li><strong>Meter1</strong></li>
              <li><strong>Meter2</strong></li>
            </ul>
          </li>
          <li>
            <strong>Alarm</strong>
            <ul>
              <li><strong>Current Records</strong> </li>
              <li><strong>History Records</strong></li>
            </ul>
          </li>
          <li>
            <strong>Control</strong>
            <ul>
              <li><strong>Control Record</strong></li>
            </ul>
          </li>
          <li>
            <strong>Statistics</strong>
            <ul>
              <li><strong>Overview</strong></li>
              <li><strong>Curves</strong></li>
              <li><strong>Operation Log</strong></li>
              <li><strong>Running Log</strong></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  
  - Users can resize the sidebar width via the zoom icon at the bottom-right of the sidebar.

  <span style="display:inline-flex; gap:40px; align-items:center; white-space:nowrap;">
    <img src="/images/common/3.png" alt="3" style="zoom:35%; display:inline-block;" />
    <img src="/images/common/4.png" alt="4" style="zoom:35%; display:inline-block;" />
  </span>
  
- **Upper-right: top bar**

  <img src="/images/common/5.png" alt="5" style="max-width:100%; height:auto;" /> 

  On the right side of the top bar there is a bell icon (Notice):
  
  - A red badge indicates the number of current alarms.
  - Clicking it jumps to Alarm > Current Records (Current Alarms).


- **Lower-right: main content area**
  - Displays data for the current page.

### Channel Concepts

In an IoT system, terminal devices, data acquisition gateways, and cloud platforms need to communicate through various methods for data collection, remote control, and device status monitoring. To standardize device onboarding and data management, the platform draws on proven experience in Industrial IoT (IIoT) and power automation (SCADA) and introduces concepts such as **Channel, Channel Point, Protocol, Four Remote types (Telemetry/Signal/Control/Adjustment), and Mapping**.

These concepts form the core logic for communication between devices and the cloud, and are key to understanding device onboarding, point configuration, data formats, and gateway behavior.

#### Channel

##### Definition

A channel is the **logical link** used to establish communication between a device (or gateway) and the platform, and includes the complete configuration required for read/write operations. In simple terms, a channel defines:

- which protocol is used to communicate with the device;
- how to connect to the device;
- what parameters are used for read/write operations;
- how to keep the connection alive and retry on errors. A channel is the foundation of device communication and a prerequisite for all point read/write operations.

##### Configuration Items

**Basic Information:**

- `id`: Unique identifier of the channel.
- `name`: Channel name.
- `description`: Channel description.
- `protocol`: Protocol used by the channel. Supported protocols include `modbus_tcp`, `modbus_rtu`, and `di_do`.
- `enabled`: Whether the channel is enabled.

**Parameters**: Dynamically change based on **protocol**. Common parameters:

- modbus_tcp
  - `host`: Host address (IP/domain).
  - `port`: Port (default 502). Range: 1-65535.
  - `connect_timeout_ms`: Connection timeout (positive integer, milliseconds).
  - `read_timeout_ms`: Read timeout (positive integer, milliseconds).
- modbus_rtu
  - `device`: Serial device path (e.g., /dev/ttyS0, COM3)
  - `baud_rate`: Baud rate (typical values: 9600/19200/38400/115200)
  - `data_bits`: Data bits (commonly 8)
  - `stop_bits`: Stop bits (1 or 2)
  - `parity`: Parity (N=None, E=Even, O=Odd)
  - `connect_timeout_ms`: Connection timeout (positive integer, milliseconds)
  - `read_timeout_ms`: Read timeout (positive integer, milliseconds)
  - `retry_interval_ms`: Retry interval after read/write failure (positive integer, milliseconds)

**Running Status:**

- `connected`: Whether the channel is connected (Connected/Disconnected).
- `running`: Running status (Running/Stop).
- `last_update`: Last update time.
- `error_count`: Error count.
- `last_error`: Last error message.

**Point Counts:**

- `telemetry`: Telemetry point count.
- `signal`: Signal point count.
- `control`: Control point count.
- `adjustment`: Adjustment point count.

##### Role of Channels

The entire communication process depends on channels, including:

- how the platform or gateway establishes connections (serial / TCP / RTU / Ethernet);
- how data is read from devices;
- how data is written or commands are issued to devices;
- how communication status is monitored and exceptions are handled. In plain terms: Channel = "link + protocol + parameters" required for device communication.

#### Four Remote Types

##### Definition

In industrial automation, power systems, and IoT device management, business data is typically organized and managed by the "four remote" categories. The four-remote model is a classic SCADA data model and is widely used in IIoT platforms, power automation, water, HVAC, energy management systems, and more. The classification clarifies the "nature and purpose of points," helping users understand what each point represents, what it can do, and how it is collected or issued.

##### category

###### Telemetry

Telemetry refers to continuous, analog, and measurable real-time values reported by devices. It is generally represented by numeric values (integer or float).

**Common Examples**

- Temperature (C)
- Humidity (%RH)
- Voltage (V), Current (A)
- Power (kW), Power factor
- Pressure (kPa), Level (%)
- Flow, Wind speed, RPM
- Energy readings (electricity, gas, water, etc.)

**Characteristics**

- Mostly read operations;
- Values change in real time with device operation;
- Collection intervals typically need to be configured. Usage in the platform Telemetry points are used for trend analysis, reporting, energy monitoring, and operational optimization.

###### Signal

Signals are discrete status information such as device state, switch status, or enumeration values. Typically there are only two states (0/1), though some may extend to a small number of enumerations.

**Common Examples**

- Running/Stopped
- Close/Open
- Started/Not started
- Alarm/Normal
- Fault/Normal
- Door Open/Closed
- Relay Energized/Released

**Characteristics**

- Mostly read operations;
- Used for monitoring device status;
- Change events can trigger alarms. Usage in the platform Signal points are widely used in alarm management, event monitoring, and status recording.

###### Control

Control refers to action commands issued by the platform to change device operating status. This is a write operation.

**Common Examples**

- Start/stop equipment
- Open/close valves
- Close/open breakers
- Start ventilation, drainage, heating equipment
- Reboot controllers
- Switch modes

**Characteristics**

- Requires permission control;
- Often requires secondary confirmation or safety checks;
- Mostly switch-type commands (0/1). Usage in the platform Control is used for intelligent operations, remote management, and automated control strategy execution.

###### Adjustment

Adjustment is remote parameter tuning used to set device operating parameters. It is also a write operation, but unlike Control, Adjustment acts on internal "setpoints".

**Common Examples**

- Temperature setpoint
- Pressure upper/lower limits
- Frequency setpoint (Hz)
- Voltage/current protection thresholds
- Tariff parameters (meters)
- PID control parameters (P/I/D)

**Characteristics**

- Parameter-type writes rather than switch actions;
- Greater impact on device performance;
- Typically requires range and type validation. Usage in the platform Adjustment is often combined with automation strategies to regulate environments and improve energy efficiency.

#### Channel Points

##### Definition

A channel point is a real data point of a device under a specific protocol (actual register address or signal address). A point is the smallest unit for data acquisition and command delivery. For example, in Modbus:

- Voltage may be at address 40001
- Current may be at address 40002
- Device start/stop may be at 00001 (coil) These registers or flags are channel points.

##### Point Classification

The platform classifies points according to the "four remote" standard in industrial automation:

| Type       | Name       | Description                                                  |
| :--------- | :--------- | :----------------------------------------------------------- |
| Telemetry  | Telemetry  | Continuous/analog values (e.g., temperature, voltage)        |
| Signal     | Signal     | Discrete/switch values (e.g., on/off, alarm)                 |
| Control    | Control    | Control commands issued by the platform (e.g., start/stop)   |
| Adjustment | Adjustment | Parameter setpoints issued by the platform (e.g., frequency or voltage setpoint) |

The point type determines whether it is read-only (Telemetry/Signal) or write-type (Control/Adjustment).

> Note: For `di_do` channels, point types are only Signal and Control because the values are only 0 and 1.

##### Field Description

Each channel point typically includes:

- `point_id`: Unique point ID (positive integer).
- `signal_name`: Business signal name.
- `value`: Current value of the point.
- `scale/offset`: Scaling and offset for converting raw values to business values.
- `unit`: Unit of the point.
- `reverse`: Whether the value should be inverted (commonly for switch points).

> **Note: For Signal and Control points, the `scale`, `offset`, and `unit` fields are not required.**

#### Channel Point Mapping

##### Definition

Because different device vendors use different register addresses and protocol structures, the platform maps "device actual points" to a unified data model. Channel mapping is used to:

- Raw points → unified format
- Protocol addresses → platform standard addresses
- Multi-register merge, scaling, unit conversion, and more The platform converts device-level register data into a unified structure through mapping rules, providing standard input for historical data, alarms, and formula calculations.

##### Field Description

Mappings differ by protocol:

**modbus_rtu/modbus_tcp**:

- `point_id`: Unique point ID (positive integer)
- `slave_id`: Slave ID in Modbus and similar protocols
- `data_type`: Data type: int16, uint16, int32, uint32, float32, int64, uint64, float64, bool.
- `byte_order`: Byte order such as AB, BA, ABCD, CDAB, etc.
- `function_code`: Register function code for different functions
  - `01`: Read Coils, for read/write 1-bit outputs.
  - `02`: Read Discrete Inputs, for read-only 1-bit inputs.
  - `03`: Read Holding Registers, for read/write 16-bit register data (setpoints/parameters).
  - `04`: Read Input Registers, for read-only 16-bit register data (measurements).
  - `05`: Write Single Coil, for writing one 1-bit output.
  - `06`: Write Single Holding Register, for writing one 16-bit register value.
  - `15`: Write Multiple Coils, for writing multiple 1-bit outputs in batch.
  - `16`: Write Multiple Holding Registers, for writing multiple 16-bit register values in batch.
- `register_address`: Register address where data is stored, usually 1-65535.
- `bit_position`: Bit position of the real value, used for switch points, range 1-15.

**di_do**:

- `point_id`: Unique point ID (positive integer)
- `gpio_number`: The global GPIO line number in Linux, allowing users to reference an IO line by a single number; not the same as the physical pin/chip pin.

**These items determine how the platform correctly parses raw device data into usable business data.**

### Device Instance Concepts

In microgrid EMS, to standardize device onboarding and point management, the platform introduces the basic concepts of products, instances, instance points, and instance routing (mapping): a product defines the standard capabilities and point model for a device type; an instance is a specific on-site device object for a product; instance points represent the device's configuration and runtime data and are classified as **property / measurement / action** by use; instance mapping (routing) binds instance points to on-site channel points (and to T/S/C/A types) to ensure accurate data reporting and control/adjustment issuance.

#### Product

##### Definition

A product is a standardized model for a device/system type in the platform, used to abstract the capabilities and data interfaces that this type should have in EMS. A product does not represent a specific on-site device, but rather the common structure and standard interface of the same device type. It defines what the device looks like in the platform and what capabilities it has:

- What points it includes (property points, measurement points, action points)

- What each point represents (e.g., SOC, power, alarms, start/stop, power setpoints, etc.) A product is not a specific on-site device, but a "generic definition for similar devices." The platform provides the following products:

  - **battery_cell(cell)**
    - Definition: The smallest electrochemical unit of a battery system.
    - Role: Provides the most basic voltage/temperature data, the foundation for BMS monitoring and safety evaluation.

  ------

  - **battery_module (battery module)**
    - Definition: A structural and electrical unit composed of multiple cells.
    - Role: Aggregates cell-level data, commonly used for module voltage, temperature distribution, balancing/protection management and display.

  ------

  - **battery_cluster(battery cluster/battery bank)**
    - Definition: A higher-level aggregation composed of multiple battery modules (often corresponding to the scope of one cluster BMS).
    - Role: Provides cluster-level SOC/SOH, voltage/current, alarms, enabling EMS strategy and safety coordination.

  ------

  - **battery_stack(battery stack/string)**

    - Definition: A system-level series/parallel unit composed of multiple battery clusters (often one battery stack in engineering practice).

    - Role: Provides system-level DC key metrics (total voltage/total current/total power) and stack-level alarms for coordination with PCS/DC conversion.

  ------

  - **battery_pack(battery pack/battery system pack)**
    - Definition: A more asset/system-oriented abstraction for the battery side in EMS (often used to summarize the overall capability of a BESS battery system).
    - Role: Used for capacity, ratings, runtime statistics, alarm aggregation, reporting, and asset management; often serves as the top-level battery object for BESS.

  ------

  - **dc_dc_converter(DC/DC converter)**

    - Definition: DC-to-DC power conversion equipment (boost/buck/isolation, etc.).

    - Role: Matches different DC bus voltage levels and supports energy regulation and protection coordination; commonly used in battery-side/DC bus power control loops.

  ------

  - **pcs(power conversion system)**
    - Definition: Core power conversion equipment in energy storage systems (DC-AC).
    - Role: Executes charge/discharge power control, grid-connected/off-grid operation, reactive support, and power quality control; key target for EMS strategies and execution.

  ------

  - **diesel_generator(diesel generator)**
    - Definition: Controllable backup/emergency/peak-shaving power source.
    - Role: Provides stable power in off-grid or weak-grid scenarios; supports start/stop control, power regulation, operating status, and fault monitoring.

  ------

  - **motor(motor)**
    - Definition: Motor-type load/device (as a drive device or key process device abstraction).
    - Role: Used to monitor operating status, power/current, etc.; some scenarios support start/stop or speed control (depending on site control and points).

  ------

  - **load (load)**
    - Definition: Aggregated load or controllable load object on the consumption side (e.g., campus load, building load, production line load).
    - Role: Core input for EMS load forecasting, energy balance, peak shaving, and demand response; supports strategy linkage when extended as controllable load.

  ------

  - **pv_string(PV string)**
    - Definition: A generation unit formed by series-connected modules.
    - Role: String-level voltage/current/power monitoring, helpful for locating shading, mismatch, and degradation issues (depending on access capability).

  ------

  - **pv_optimizer(optimizer)**

    - Definition: Module/string-level power optimization and monitoring device.

    - Role: Improves generation efficiency and supports finer-grained monitoring and fault localization; typically associated with string/module data.

  ------

  - **pv_combiner(combiner box)**

    - Definition: Device that combines multiple strings in parallel to a DC bus.

    - Role: Aggregates string circuits and provides branch current/switch/surge protection monitoring; key node between strings and inverters.

  ------

  - **pv_inverter(PV inverter)**
    - Definition: Device that converts PV DC power to AC for grid connection/supply.
    - Role: Output power control, grid operation management, reactive/power-quality support, and status/alarm monitoring; main controlled/monitored object on the PV side in EMS.

  ------

  - **gateway(gateway)**
    - Definition: Acquisition and protocol conversion node connecting site devices to the cloud/platform.
    - Role: Hosts channels and protocols, performs data acquisition upload and command delivery; responsible for point mapping, caching, edge computing/forwarding (depending on implementation).

  ------

  - **station(site/station)**
    - Definition: Top-level organizational object for a microgrid/site (one project or one station).
    - Role: Hosts the site device tree, topology, and aggregate metrics (site power/energy/alarms), and serves as the unified entry for permissions, reporting, dispatch strategies, and O&M.

##### Role

- Unify point collections and semantics for the same device type (standardization)
- Support bulk instantiation (multiple device instances for one product)
- Facilitate system integration, operations, and configuration reuse

#### Instance

##### Definition

An instance is the concrete object of a product model in a site project (Asset/Device Instance), corresponding to an actual device, system unit, or logical object (e.g., PCS_01, BESS_01, PCC_METER_01). An instance has a unique `instance_id` and binds to a `product_name`, inheriting the product's point system. An instance is not only a display "device item" but also the smallest business unit for status calculation, control issuance, and alarm positioning on the platform.

##### Field Description

- `insance_id`: Instance ID, a unique identifier.
- `instance_name`: Instance name.
- `product_name`: Name of the product the instance belongs to.
- `properties`: Instance properties.

##### Role

- Apply the "template (product)" to the "site object (instance)"
- Instances carry the product's configuration properties and runtime points (measurement/action)
- Map to site channels (four-remote) to enable data acquisition and control issuance

#### Instance Points

##### Definition

Instance points are the "data interfaces" of an instance in the platform, representing all information that can be configured, observed, and controlled. Instance points fall into three categories:

- **property points**

  Describe "static/semi-static configuration parameters" such as rated power, capacity, communication address, control strategy parameters, alarm thresholds, etc.Its function is:

  - Serve as the source of instance configuration data
  - Used for strategy calculation, limit checks, display, and operations configuration
  - Usually not high-frequency changes (can be set manually or by strategy)

- **measurement points**

  Represent "observable status/telemetry/signal" data such as voltage, current, power, SOC, switch status, alarm status, etc.Its function is:

  - Real-time monitoring and visualization
  - Input data for alarms, linkage, reporting, and optimization dispatch

- **action points**

  Represent points that can be issued for control/adjustment, such as start/stop, close/open, active/reactive setpoints, charge/discharge power setpoints, mode switching, etc.Its function is:

  - EMS control-loop output (strategy/manual operation -> device)
  - Support both Control and Adjustment commands

##### Field Description

- `point_id`: Unique identifier within the point category.
- `name`: Point name.
- `value`: Current point value.
- `unit`: Point unit.
- `description`: Point description.

##### Role

- Unify semantics and data governance: Map different protocols and vendor raw points into consistent semantic points for upper-layer understanding and reuse.
- Base granularity for monitoring and alarms: Trends, threshold alarms, event linkage, and reporting all rely on points.
- Input/output for the control loop: Strategies read **measurement** points to determine state and write to **action** points to issue targets.

#### Instance Point Routing

##### Definition

Instance point mapping binds platform "instance points" to on-site "channel points/addresses." It answers the following key questions for each instance point: **Which channel and point on-site does it map to? Which of the four remote types does it belong to?**

- For **measurement** points, the channel point type can only be **Telemetry** or **Signal**.
- For **action** points, the channel point type can only be **Control** or **Adjustment**.
- **property** points are intrinsic attributes and have no routing info.

##### Field Description

- `point_id`: ID of the instance point.
- `name`: Name of the point.
- `channel_id`: ID of the channel used by the route.
- `channel_type`: Four-remote type of the channel point.
- `channel_point_id`: Channel point ID used by the route.

##### Role

- Data uplink (acquisition): Channel data is routed to the corresponding measurement points.
- Command downlink (control): Values written to action points are routed to the corresponding channel points and sent to devices.
- Decouple business and protocol: Business logic focuses on point semantics; communication focuses on addresses; mapping connects them to allow protocol/gateway/point-table changes.

### Rule Concepts

In EMS systems, devices such as batteries, PCS, PV, and diesel generators must cooperate under constantly changing operating conditions. The system must make judgments based on real-time measurements and promptly issue control commands or adjust operating parameters (such as power setpoints, start/stop, mode switching) to achieve safe, stable, and economical operation. To standardize strategy configuration and visual management, the platform introduces concepts such as **Rule** and **Rule Flow**.

#### Rule

##### Definition

A rule is the basic unit used in EMS to express an "operating strategy." It describes the control logic the system should take under specific conditions. It takes real-time data (measurements/status/computed results) as inputs, determines the current scenario through conditions, and outputs corresponding control actions or parameter adjustments.

##### Role

- Strategy solidification and automated execution: Configure human experience/dispatch strategies into logic that the system can execute automatically for unattended operation.
- Operational objectives: Automatically choose appropriate control measures under different conditions to meet safety, stability, economy, and efficiency goals.
- Unified management and reuse: Rules can be centrally managed (enable/disable, priority, etc.) and reused across different sites or projects.

#### Rule Chain

##### Definition

A rule chain is the visual execution flow inside a rule. It uses "nodes + links" to describe the full execution path of a rule from start to finish. It breaks a rule into steps (such as start, condition, action, end) and uses branching to express different paths under different conditions.

##### Role

- Clearly express complex logic: Present multi-condition, multi-branch, multi-action strategies as flowcharts, reducing understanding and configuration costs.
- Traceable and diagnosable: During runtime, the actual execution path and key node data can be located to quickly identify why a decision was made.
- Easy to maintain and iterate: Quickly adjust steps and branches with a graphical structure, with versioning and import/export reuse.

### Glossary

- **Viewer**: Read-only user, mainly views data and records
- **Channel**: Logical channel for acquisition/communication (e.g., a Modbus channel)
- **Point**: Specific measurement/signal point (e.g., a voltage/current line)
- **Telemetry**: Continuous values (usually a number + unit)
- **Signal**: Status values (usually 0/1 or status codes)
- **Control**: Action command issued by the platform to change device operating state
- **Adjustment**: Parameter setpoints issued by the platform for remote tuning
- **SoC**: State of Charge, battery percentage
- **SoH**: State of Health
- **Update Time**: The most recent refresh/push time of page data

## Core Features

### Login Page
<img src="/images/login/1.png" alt="1" style="max-width:100%; height:auto;" />

1. Open the system and enter the login page.

2. Enter:

  - `Username`: The username of the user account.
  - `Password`: The password of the user account.

3. Click `Log in` to sign in.
4. After a successful login, the system opens the **Home** page by default.

### Home Page

- - The **Home** page mainly displays key data for the site and specific devices, and refreshes in real time with device status.
  
    <img src="/images/home/1.png" alt="1" style="max-width:100%; height:auto;" />
  
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
  
    - The seventh section is site alarm information, showing current alarms from left to right:
  
      - Alarm device
      - Alarm level (sorted by urgency: **L1>L2>L3**)
  
      <img src="/images/home/3.png" alt="alarm level1" style="max-width:100%; height:auto;" /><img src="/images/home/4.png" alt="alarm level2" style="max-width:100%; height:auto;" /><img src="/images/home/5.png" alt="alarm level3" style="max-width:100%; height:auto;" />
  
      \- Alarm information

### Devices Page
<img src="/images/Devices/pv/1.png" alt="1" style="max-width:100%; height:auto;" />

**Devices** includes multiple device types, such as **PV**, **Battery**, **Diesel Generator**, **Meter1**, and **Meter2**. Each device page typically includes:

- **Overview**: Card-based display of key device indicators.
- **Value Monitoring**: Real-time point tables showing Telemetry and Signal data from channels bound to real devices.

#### PV

##### Overview

<img src="/images/Devices/pv/2.png" alt="2" style="max-width:100%; height:auto;" />

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

<img src="/images/Devices/pv/3.png" alt="3" style="max-width:100%; height:auto;" />

- The top shows **Update Time**, which is the latest data acquisition time.
- Below are two tables:
  - The left table is the channel **Telemetry** table, including `Name`, `Value`, and `Unit`.
  - The right table is the channel **Signal** table, including `Name` and `Status`.

#### Battery

##### Overview

<img src="/images/Devices/battery/1.png" alt="1" style="max-width:100%; height:auto;" />

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

<img src="/images/Devices/battery/2.png" alt="2" style="max-width:100%; height:auto;" />

This page includes tabs:

- **Battery**: Battery

- **PCS**: Power conversion system

Each tab uses the "**Update Time + left/right tables**" layout, the same as the **PV** **Value Monitoring** page.

### Battery Management

<img src="/images/Devices/battery/3.png" alt="3" style="max-width:100%; height:auto;" />

This page mainly monitors **Voltage** and **Temperature** for all **Battery Cells**.

- Left: Shows voltage for all cells
  - The module header shows **maximum cell voltage** and **minimum cell voltage**.
  - The module body lists **#1~#N** (Battery Cell) voltages as cards.
- Right: Shows temperature for all cells
  - The module header shows **maximum cell temperature** and **minimum cell temperature**.
  - The module body lists **#1~#N** (Battery Cell) temperatures as cards.

#### Diesel Generator
##### Overview

<img src="/images/Devices/diesel/1.png" alt="1" style="max-width:100%; height:auto;" />

Top indicator cards:

- **Power**
- **Oil** (current fuel level)
- **Voltage**
- **Coolant Temp** (coolant temperature)

##### Value Monitoring

<img src="/images/Devices/diesel/2.png" alt="2" style="max-width:100%; height:auto;" />

Layout is the same as the **PV** **Value Monitoring** page.

##### Meter1
**Meter1** directly displays **Value Monitoring** information, with the same layout as the **PV** **Value Monitoring** page.
<img src="/images/Devices/meter/1.png" alt="1" style="max-width:100%; height:auto;" />

##### Meter2

**Meter2** directly displays **Value Monitoring** information, with the same layout as the **PV** **Value Monitoring** page.

<img src="/images/Devices/meter/2.png" alt="2" style="max-width:100%; height:auto;" />

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

## System Config

### Channels

<img src="/images/Setting/Configuration/channel/1.png" alt="Channel Configuration" style="max-width:100%; height:auto;" />

This chapter includes: channel management, channel point configuration, and channel point mapping configuration.

#### Channel Management

##### Query Channels

<img src="/images/Setting/Configuration/channel/2.png" alt="2" style="max-width:100%; height:auto;" />

1. You can filter channels by:

- **protocol**: Channel protocol type (e.g., modbus_tcp, modbus_rtu, di_do).
- **enabled**: Enabled status (Enabled, Disabled).
- **connected**: Connection status (Connected, Disconnected).

1. After selecting filters, click **Search** to apply.
2. Click **Reload** to reset filters.

##### View Channel Details and Edit

<img src="/images/Setting/Configuration/channel/3.png" alt="3" style="max-width:100%; height:auto;" />

1. Click **Detail** in the **Operation** column for the target channel to open the details dialog.

<img src="/images/Setting/Configuration/channel/4.png" alt="4" style="max-width:100%; height:auto;" />

1. Click **Edit** to enter edit mode.

<img src="/images/Setting/Configuration/channel/5.png" alt="5" style="max-width:100%; height:auto;" />

1. Enter the values to update. Refer to the field definitions in the basic concepts section.
2. Click **Submit** to save.
3. Click **Cancel Edit** to cancel.

##### Add a New Channel

<img src="/images/Setting/Configuration/channel/6.png" alt="6" style="max-width:100%; height:auto;" />

1. Click **New Channel** to open the add dialog.

<img src="/images/Setting/Configuration/channel/7.png" alt="7" style="max-width:100%; height:auto;" />

1. Select the protocol via the **Protocol** dropdown and fill in the required parameters. Refer to the field descriptions in the details page.
2. Click **Submit** to add the channel.
3. Click **Cancel Add** to cancel.

##### Toggle Channel Enable Status

<img src="/images/Setting/Configuration/channel/8.png" alt="8" style="max-width:100%; height:auto;" />

1. Use the slider in the **Enable** column to toggle. Slide left to **Enabled**, right to **Disabled**.

##### Delete an Existing Channel

<img src="/images/Setting/Configuration/channel/9.png" alt="9" style="max-width:100%; height:auto;" />

1. Click **Delete** in the **Operation** column of the channel row.

<img src="/images/Setting/Configuration/channel/10.png" alt="10" style="max-width:100%; height:auto;" />

1. Click **Confirm** to delete.
2. Click **Cancel** to cancel.

#### Channel Point Configuration

<img src="/images/Setting/Configuration/channel/11.png" alt="11" style="max-width:100%; height:auto;" />

<img src="/images/Setting/Configuration/channel/12.png" alt="12" style="max-width:100%; height:auto;" />

1. Click **Points** in the **Operation** column of the desired channel row to open the points dialog.
2. The point type tabs include **telemetry**, **signal**, **control**, and **adjustment**, corresponding to the four-remote point categories. Click a tab to view points of that type.
3. View mode toggle: **Points** and **Mappings**. Click the corresponding button to switch views.
4. Click **Batch Publish** to issue values in bulk.
5. Click **Publish** in the **Operation** column to issue a value for a single point.
6. Click **Export** to export the table data of the current tab to **.csv**.
7. Click **Edit** to enter point edit mode.
8. Click **Cancel** to close the dialog.
9. The point filter box supports fuzzy search by name or precise search via dropdown selection.

<img src="/images/Setting/Configuration/channel/13.png" alt="13" style="max-width:100%; height:auto;" />

When switching the view toggle to **mappings**, the page is interpreted as follows:

1. Click the tab to switch point type and view point mappings.
2. Click **Export** to export the table data of the current point type to **.csv**.
3. Click **Edit** to enter point mapping edit mode.
4. Click **Cancel** to close the dialog.

##### Issue Point Values

There are two ways to issue point values: **bulk publish** and **single publish**.

###### Single Publish

<img src="/images/Setting/Configuration/channel/14.png" alt="14" style="max-width:100%; height:auto;" />

<img src="/images/Setting/Configuration/channel/15.png" alt="15" style="max-width:100%; height:auto;" />

<img src="/images/Setting/Configuration/channel/16.png" alt="16" style="max-width:100%; height:auto;" />

1. Click **Publish** for the target point row to open the single publish dialog.
2. Enter the value to publish in the Value input (for **telemetry** and **adjustment**, the value is numeric; for **signal** and **control**, the value is 0 or 1).
3. Click **Submit** to publish the value.
4. Click **Cancel** to cancel.
5. On success, the value changes.

###### Batch Publish

<img src="/images/Setting/Configuration/channel/17.png" alt="17" style="max-width:100%; height:auto;" />

<img src="/images/Setting/Configuration/channel/18.png" alt="18" style="max-width:100%; height:auto;" />

<img src="/images/Setting/Configuration/channel/19.png" alt="19" style="max-width:100%; height:auto;" />

1. Click **Batch Publish** on the target point type tab (only affects the current point type).
2. Enter values in the **Publish** column (for **telemetry** and **adjustment**, numeric; for **signal** and **control**, 0 or 1).
3. Click **Submit Publish** to submit the bulk publish.
4. Click **Cancel Publish** to cancel.
5. On success, the values change.

##### Batch Edit Points

<img src="/images/Setting/Configuration/channel/20.png" alt="20" style="max-width:100%; height:auto;" />

1. Click **Edit** in the points view to enter batch edit mode for all points.

<img src="/images/Setting/Configuration/channel/21.png" alt="21" style="max-width:100%; height:auto;" />

1. During editing, you can filter by status (only within the current point-type table):

- **modified**: Filters points that were actually modified. Modified rows are shown in blue, and modified data is highlighted in blue.

  <img src="/images/Setting/Configuration/channel/22.png" alt="22" style="max-width:100%; height:auto;" />

- **added**: Filters points added via the add operation. Added rows and data are shown in green.

  <img src="/images/Setting/Configuration/channel/23.png" alt="23" style="max-width:100%; height:auto;" />

- **deleted**: Filters points deleted via the delete operation. Deleted rows and data are shown in red.

  <img src="/images/Setting/Configuration/channel/24.png" alt="24" style="max-width:100%; height:auto;" />

- **invalid**: Filters points with issues after add/modify. Problematic rows show orange markers with a dark red background.

  <img src="/images/Setting/Configuration/channel/25.png" alt="25" style="max-width:100%; height:auto;" />Point configuration rules:

- `point_id`: Positive integer (required, unique)

- `signal_name`: String, no spaces allowed (required)

- `scale`: Numeric (required)

- `offset`: Numeric (required)

- `unit`: String (optional)

- `reverse`: true/false (required)

> **Note: Point edits follow batch-edit principles. Make all changes locally first, then click Submit only after all changes are complete and error-free. The same applies to later mapping edits.**

###### Import Points from a File

<img src="/images/Setting/Configuration/channel/26.png" alt="26" style="max-width:100%; height:auto;" />

1. Click **Import**, choose a **.csv** file to import. File requirements differ by point type:

- telemetry/adjustment

  - Required headers **(must include the following; extra headers are ignored)**:

    `point_id,signal_name,scale,offset,unit,reverse`

  - Field descriptions: follow the point configuration rules.

  - Format screenshot:

    

- signal/control

  - Required headers (must include the following; extra headers are ignored):

    `point_id,point_name,reverse`

  - Field descriptions: follow the point configuration rules.

  - Format screenshot:

    

> **Note:**
>
> - **All imported records are rendered as "added" (green highlight). Even with validation errors, records are imported but marked as "invalid" so you can fix them in the UI.**
> - **Each import overwrites the current point information.**

###### Add Points

<img src="/images/Setting/Configuration/channel/28.png" alt="28" style="max-width:100%; height:auto;" />

1. Click the **Add** icon button to create an editable row at the top of the current point-type table.
2. Fill in the row according to the configuration rules.
3. Click the **checkmark** icon to confirm the local add.
4. Click the **X** icon to cancel the local add.
5. After confirmation, the new row appears as shown and can be filtered by **added**.

> **Note: Each tab allows only one pending add at a time. A new add row appears only after the previous add is confirmed or canceled. If a pending add row exists, clicking Add again will not create another row.**

###### Delete Points

<img src="/images/Setting/Configuration/channel/29.png" alt="29" style="max-width:100%; height:auto;" />

1. Click the **delete** icon for the target row to delete it locally.
2. Deleted rows appear as shown and can be filtered by **deleted**.
3. Click the restore icon to undo the local delete.

###### Modify Points

<img src="/images/Setting/Configuration/channel/30.png" alt="30" style="max-width:100%; height:auto;" />

1. Click the **edit** icon for the target point to modify it.
2. Modify according to the configuration rules. For existing points, the ID cannot be changed.
3. For newly added points, the ID can be changed.
4. Click the **confirm** icon to save the local modification.
5. Click the **cancel** icon to cancel the modification.
6. Modified rows appear as shown, with changed data marked in blue and filterable by **modified**.

###### Submit All Changes

<img src="/images/Setting/Configuration/channel/31.png" alt="31" style="max-width:100%; height:auto;" />

1. Before submission, ensure all modified point data is valid. Errors appear below invalid data.
2. Click **Submit** to submit the batch changes.
3. Click **Cancel Edit** to exit edit mode and restore the original point data.

> **Note: You do not need to run a manual search. After clicking Submit, if issues exist you can jump directly to them.**

##### Export Point CSV Files

<img src="/images/Setting/Configuration/channel/32.png" alt="32" style="max-width:100%; height:auto;" />.png)

Click **Export** to export the table data under the current tab as **.csv**. The filename format is: **channel name + tab name (telemetry/signal/control/adjustment) + current timestamp**.

#### Channel Point Mapping Configuration

##### Batch Edit Point Mappings

<img src="/images/Setting/Configuration/channel/33.png" alt="33" style="max-width:100%; height:auto;" />

1. In the **mappings** view, click **Edit** to enter mapping edit mode.

<img src="/images/Setting/Configuration/channel/34.png" alt="34" style="max-width:100%; height:auto;" />

1. During editing, you can filter changes by:

- **modified**: Filters points that were actually modified. Modified rows are shown in blue, and modified data is highlighted in blue.

<img src="/images/Setting/Configuration/channel/35.png" alt="35" style="max-width:100%; height:auto;" />

- **invalid**: Filters points with issues after add/modify. Problematic rows show orange markers with a dark red background.

<img src="/images/Setting/Configuration/channel/36.png" alt="36" style="max-width:100%; height:auto;" />

Point mapping rules (mapping fields differ by channel type):

**modbus_rtu/modbus_tcp:**

- Function Code

   

  depends on point type (four-remote):

  - **telemetry**: 3, 4
  - **signal**: 1, 2, 3, 4
  - **control**: 5, 15, 6, 16
  - **adjustment**: 6, 16

- Data Type

  :

  - **telemetry**: int16, uint16, int32, float32, uint32, int64, uint64, float64
  - **signal**: same as telemetry, plus bool
  - **control**: same as telemetry, plus bool
  - **adjustment**: same as telemetry

- Byte Order

   

  options depend on data length:

  - **bool**: no restriction
  - **16-bit**: AB, BA
  - **32-bit**: AB, BA, ABCD, DCBA, BADC, CDAB
  - **64-bit**: adds ABCDEFGH, HGFEDCBA, BADCFEHG, GHEFCDAB to the 32-bit list

- **Bit Position**: **Editable only when dataType is bool with functionCode 3/4, or for 16-bit integers (0-15). Other types are fixed at 0.**

###### Import Point Mappings from File

<img src="/images/Setting/Configuration/channel/37.png" alt="37" style="max-width:100%; height:auto;" />

1. Click **Import** and select a CSV file to import. Requirements differ by channel type:

- **modbus_rtu/modbus_tcp**

  - Required headers:

    `point_id,slave_id,function_code,register_address,data_type,byte_order,bit_position`

  - Field descriptions: follow the point configuration rules.

  - Format screenshot:

    

- **di_do**

  - Required headers:

    `point_id,gpio_number`

  - Field descriptions: follow the point configuration rules.

  - Format screenshot:

    

> **Note:**
>
> - **When modifying instance point mappings by import, the imported data overwrites the current mapping information.**
> - **During import, points are matched by point ID. If a point ID does not exist on the page, it is ignored. If duplicate mappings exist, the later one is used.**

###### Manually Edit Point Mappings

<img src="/images/Setting/Configuration/channel/39.png" alt="39" style="max-width:100%; height:auto;" />

1. Click the **edit icon** for the target point mapping to modify it.
2. Modify according to the mapping rules. For existing points, the ID cannot be changed.
3. Click the **confirm icon** to save the local change.
4. Click the **cancel icon** to cancel.
5. Modified rows appear as shown, with changed data marked in blue and filterable by **modified**.

###### Submit All Changes

<img src="/images/Setting/Configuration/channel/40.png" alt="40" style="max-width:100%; height:auto;" />

1. Before submission, ensure all mapping data is valid. Errors appear below invalid data.
2. Click **Submit** to submit the batch changes.
3. Click **Cancel Edit** to exit edit mode and restore the original mapping data. Note: You do not need to run a manual search. After clicking **Submit**, if issues exist you can jump directly to them.

##### Export Point Mapping CSV Files

<img src="/images/Setting/Configuration/channel/41.png" alt="41" style="max-width:100%; height:auto;" />.png)

1. Click **Export** to export the table data for the current point type as **.csv**. The filename format is: **channel name + tab name (telemetry/signal/control/adjustment) + "_mapping" + current timestamp**.

### Device Instance Configuration

<img src="/images/Setting/Configuration/deviceInstance/1.png" alt="Device Instance Configuration" style="max-width:100%; height:auto;" />

This chapter includes: instance management, instance point configuration, and instance point routing configuration.

#### Instance Management

##### Query Device Instances

<img src="/images/Setting/Configuration/deviceInstance/2.png" alt="2" style="max-width:100%; height:auto;" />

1. You can filter instances by:

- `Product_Name`: The product name of the instance.

1. Click **Search** to filter.
2. Click **Reload** to reset.

##### Add a Device Instance

<img src="/images/Setting/Configuration/deviceInstance/3.png" alt="3" style="max-width:100%; height:auto;" />

<img src="/images/Setting/Configuration/deviceInstance/4.png" alt="4" style="max-width:100%; height:auto;" />

1. Click **New Instance** to open the add dialog.
2. Enter the required parameters. Refer to the instance field definitions in the basic concepts.
3. Click the add property icon to add a property value.
4. Click the delete property icon to remove a property value.
5. Click **Submit** to create the instance.
6. Click **Cancel** to cancel.

##### View Device Instance Details

<img src="/images/Setting/Configuration/deviceInstance/5.png" alt="5" style="max-width:100%; height:auto;" />

<img src="/images/Setting/Configuration/deviceInstance/6.png" alt="6" style="max-width:100%; height:auto;" />

1. Click **Detail** in the **Operation** column to open the instance details dialog.

##### Edit Device Instances

<img src="/images/Setting/Configuration/deviceInstance/7.png" alt="7" style="max-width:100%; height:auto;" />

<img src="/images/Setting/Configuration/deviceInstance/8.png" alt="8" style="max-width:100%; height:auto;" />

1. In the instance details dialog, click **Edit** to enter edit mode.
2. During editing, `Product Name` cannot be changed; other fields are the same as in add.
3. Click **Submit** to save changes.
4. Click **Cancel Edit** to cancel.

##### Delete Device Instances

<img src="/images/common/9.png" alt="9" style="max-width:100%; height:auto;" />

<img src="/images/Setting/Configuration/deviceInstance/10.png" alt="10" style="max-width:100%; height:auto;" />

1. Click **Delete** in the **Operation** column for the target device instance row.
2. Click **Confirm** to delete.
3. Click **Cancel** to cancel.

#### Instance Point Configuration

<img src="/images/Setting/Configuration/deviceInstance/11.png" alt="11" style="max-width:100%; height:auto;" />

<img src="/images/Setting/Configuration/deviceInstance/12.png" alt="12" style="max-width:100%; height:auto;" />

1. Click **Points** in the **Operation** column of the target instance row to open the points dialog.
2. The **View Mode** selector switches between point view and routing view (default is point view).
3. Use the tabs to switch point types. In point view there are three tabs: **Property**, **measurement**, **action**.
4. The point filter box supports fuzzy search by name or precise search via dropdown selection.
5. **Export** exports the current point-type table as CSV.
6. **Execute** issues a point command.
7. **Cancel** closes the dialog.

##### Issue Point Commands

<img src="/images/Setting/Configuration/deviceInstance/13.png" alt="13" style="max-width:100%; height:auto;" />

<img src="/images/Setting/Configuration/deviceInstance/14.png" alt="14" style="max-width:100%; height:auto;" />

<img src="/images/Setting/Configuration/deviceInstance/15.png" alt="15" style="max-width:100%; height:auto;" />

1. Click **Execute** in the **Operation** column for the target point to open the execute dialog.
2. Enter the value to execute (numeric).
3. Click **Submit** to submit.
4. Click **Cancel** to cancel.
5. After successful submission, the value changes.

##### Export Point CSV Files

<img src="/images/Setting/Configuration/deviceInstance/16.png" alt="16" style="max-width:100%; height:auto;" />

1. Click **Export** to export the current table data. The CSV filename format is: **instance name_point type (property/measurement/action)_points_timestamp.csv**. The exported file looks like:

<img src="/images/Setting/Configuration/deviceInstance/17.png" alt="17" style="max-width:100%; height:auto;" />

#### Instance Point Routing Configuration

<img src="/images/Setting/Configuration/deviceInstance/18.png" alt="18" style="max-width:100%; height:auto;" />

1. Switch to **Routing** in **View Mode** to open the instance point routing view.
2. Click **Edit** to enter routing edit mode.

> Note: Property points are inherent product attributes and do not require routing to channel points, so only measurement and action types appear in routing.

##### Export Point Routing CSV Files

<img src="/images/Setting/Configuration/deviceInstance/19.png" alt="19" style="max-width:100%; height:auto;" />

1. Click **Export** to export the current table data. The CSV filename format is: **instance name_point type (measurement/action)_routing_timestamp.csv**. Example:

   <img src="/images/Setting/Configuration/deviceInstance/20.png" alt="20" style="max-width:100%; height:auto;" />

   In the exported file, **point_type** uses abbreviations: **T = Telemetry, S = Signal, C = Control, A = Adjustment.**

##### Batch Edit Instance Point Routing

<img src="/images/Setting/Configuration/deviceInstance/21.png" alt="21" style="max-width:100%; height:auto;" />

<img src="/images/Setting/Configuration/deviceInstance/22.png" alt="22" style="max-width:100%; height:auto;" />

1. Click **Edit** to enter routing edit mode.
2. During editing, you can filter by:

- **modified**: Filters points that were actually modified. Modified rows are shown in blue, and modified data is highlighted in blue.

<img src="/images/Setting/Configuration/deviceInstance/23.png" alt="23" style="max-width:100%; height:auto;" />

- **invalid**: Filters points with issues after add/modify. Problematic rows show orange markers with a dark red background.

<img src="/images/Setting/Configuration/deviceInstance/24.png" alt="24" style="max-width:100%; height:auto;" />

> Point routing configuration rules:
>
> - Channel is the channel that hosts the channel point mapped to the instance point.
> - Channel Point Type is the four-remote type of the mapped channel point. Available values depend on the channel protocol:
>   - For modbus_rtu and modbus_tcp channels: for measurement points, Channel Point Type can only be Telemetry or Signal; for action points, it can only be Control or Adjustment.
>   - For di_do channels: for measurement points, Channel Point Type can only be Signal; for action points, it can only be Control.
> - Channel Point is the channel point mapped to the instance point.
> - The three fields must be selected in order: Channel -> Channel Point Type -> Channel Point.

###### Manually Edit Routing

<img src="/images/Setting/Configuration/deviceInstance/25.png" alt="25" style="max-width:100%; height:auto;" />

1. Click the **edit icon** for the target routing row.
2. Modify according to the routing rules. For existing points, the ID cannot be changed.
3. Click the **confirm icon** to save the local change.
4. Click the **cancel icon** to cancel.
5. Modified rows appear as shown, with changed data marked in blue and filterable by **modified**.

###### Import Routing from File

<img src="/images/Setting/Configuration/deviceInstance/26.png" alt="26" style="max-width:100%; height:auto;" />

1. Click **Import** and select a **.csv** file. The file must meet the following requirements:

- Required headers **(must include the following; extra headers are ignored)**: `point_id,channel_id,channel_point_type,channel_point_id,enabled` After import, points are matched to routing info by **point_id**.

- Field descriptions:

  - `point_id` is the instance point ID. If the point does not exist, the routing is invalid.
  - `point_name` is the instance point name.
  - `channel_id` is the ID of the channel containing the mapped channel point. If the channel does not exist, the channel point is considered missing and an error is shown.
  - `channel_point_type` is the four-remote type of the mapped channel point (T/S/C/A). **It accepts both abbreviations T, S, C, A and full names Telemetry, Signal, Control, Adjustment (case-sensitive).**
  - `channel_point_id` is the channel point ID. If it does not exist, an error is shown.
  - `enabled` indicates whether the mapping is enabled; accepts **false** or **true**.

- Format screenshot:

  

> Note:
>
> - Importing routing data overwrites the current routing information.
> - During import, points are matched by ID. If a point ID does not exist on the page, it is ignored. If duplicates exist, the later one is used.

###### Submit All Changes

<img src="/images/Setting/Configuration/deviceInstance/28.png" alt="28" style="max-width:100%; height:auto;" />

1. Before submission, ensure the modified data is valid. Errors appear below invalid data.
2. Click **Submit** to submit the batch changes.
3. Click **Cancel Edit** to exit edit mode and restore the original table. Note: You do not need to run a manual search. After clicking **Submit**, if issues exist you can jump directly to them.

### Rule Configuration

<img src="/images/Setting/Configuration/rule/1.png" alt="Rule Configuration" style="max-width:100%; height:auto;" />

This chapter includes: basic rule operations and rule flow operations.

#### Rule Operations

##### Add a Rule

<img src="/images/Setting/Configuration/rule/2.png" alt="2" style="max-width:100%; height:auto;" />

<img src="/images/Setting/Configuration/rule/3.png" alt="3" style="max-width:100%; height:auto;" />

1. Click **New Rule** to open the add dialog.
2. Enter the rule name (required) and description (optional).
3. Click **Submit** to create the rule.
4. Click **Cancel** to cancel and close the dialog.

##### Edit a Rule

<img src="/images/Setting/Configuration/rule/4.png" alt="4" style="max-width:100%; height:auto;" />

<img src="/images/Setting/Configuration/rule/5.png" alt="5" style="max-width:100%; height:auto;" />

1. Click **Edit** in the **Operation** column for the target rule to open the edit dialog.
2. Modify the rule name and description.
3. Click **Submit** to save changes.
4. Click **Cancel** to cancel and close the dialog.

##### Delete a Rule

<img src="/images/Setting/Configuration/rule/6.png" alt="6" style="max-width:100%; height:auto;" />

<img src="/images/Setting/Configuration/rule/7.png" alt="7" style="max-width:100%; height:auto;" />

1. Click **Delete** in the **Operation** column for the target rule to open the confirmation dialog.
2. Click **Confirm** to delete.
3. Click **Cancel** to cancel.

#### Rule Flow Operations

##### View Rule Flow Details and Real-Time Execution Path

<img src="/images/Setting/Configuration/rule/8.png" alt="8" style="max-width:100%; height:auto;" />

<img src="/images/Setting/Configuration/rule/9.png" alt="9" style="max-width:100%; height:auto;" />

<img src="/images/Setting/Configuration/rule/10.png" alt="10" style="max-width:100%; height:auto;" />

1. Click **Detail** in the **Operation** column of the target rule row to navigate to the rule flow details page.
2. The highlighted path in the flow is the currently executed path. Node data for the current path is displayed below the node.
3. Click **Edit** to enter rule flow edit mode.
4. Click **Export** to export the current rule flow as a **.json** file. The structure is as follows:



```
{
  "cooldown_ms": 5000, // loop interval
  "description": "Control the diesel generators and photovoltaic systems based on the values of SOC.", // rule flow description
  "enabled": true, // enabled
  "flow_json": { // records point and edge information
 "edges": [ // all edges
   {
     "id": "edge-1766625864321", // edge id
     "source": "start", // source node
     "target": "node-1766625792260", // target node
     "sourceHandle": "right", // output handle id on the source node
     "targetHandle": "left" // input handle id on the target node
   },
   {
     "id": "edge-1766627137707",
     "source": "node-1766625792260",
     "target": "node-1766627111063",
     "sourceHandle": "out001",
     "targetHandle": "left"
   },
   {
     "id": "edge-1766627164179",
     "source": "node-1766627111063",
     "target": "end",
     "sourceHandle": "right1",
     "targetHandle": "left"
   },
   {
     "id": "edge-1766627167317",
     "source": "node-1766627120005",
     "target": "end",
     "sourceHandle": "right1",
     "targetHandle": "left"
   },
   {
     "id": "edge-1766627188300",
     "source": "node-1766627123081",
     "target": "end",
     "sourceHandle": "right1",
     "targetHandle": "left"
   },
   {
     "id": "edge-1766970657249",
     "source": "node-1766625792260",
     "target": "node-1766627120005",
     "sourceHandle": "out002",
     "targetHandle": "left"
   },
   {
     "id": "edge-1766970658549",
     "source": "node-1766625792260",
     "target": "node-1766627123081",
     "sourceHandle": "out003",
     "targetHandle": "left"
   }
 ],
 "nodes": [ // all nodes
   {
     "id": "start", // node id
     "type": "start", // start node
     "position": { // position on canvas
       "x": -213, // x coordinate
       "y": 107 // y coordinate
     },
     "data": { // internal data
       "config": { // point config
         "wires": { // output handles and their target node ids (except for special types, default handle is used)
           "default": [
             "node-1766625792260"
           ]
         }
       },
       "description": "START", // node description
       "id": "start", // node id
       "label": "START", // node title
       "status": "", // node status (reserved)
       "type": "start" // node type
     }
   },
   {
     "id": "end",
     "type": "end", // end node
     "position": {
       "x": 629,
       "y": 101
     },
     "data": {
       "config": {
         "wires": {
           "default": []
         }
       },
       "description": "END",
       "id": "end",
       "label": "END",
       "status": "",
       "type": "end"
     }
   },
   {
     "id": "node-1766625792260",
     "type": "custom", // custom node type
     "position": {
       "x": 25,
       "y": 106
     },
     "data": {
       "cardId": "function-2",
       "config": { // function-switch node, used for conditions
         "rule": [ // output handles and rule conditions
           {
             "name": "out001", // output handle name, matches wires
             "rule": [ // rules
               {
                 "operator": "<=", // operator
                 "type": "variable", // type for this rule
                 "value": 5, // value
                 "variables": "X1" // variable name, matches the variables definition
               }
             ],
             "type": "default" // reserved
           },
           {
             "name": "out002",
             "type": "default",
             "rule": [
               {
                 "type": "variable",
                 "variables": "X1",
                 "operator": ">=",
                 "value": 49
               },
               {
                 "type": "relation", // relation operator to combine rules
                 "value": "And" // logical operator
               },
               {
                 "type": "variable",
                 "variables": "X1",
                 "value": 99,
                 "operator": "<"
               }
             ]
           },
           {
             "name": "out003",
             "type": "default",
             "rule": [
               {
                 "type": "variable",
                 "variables": "X1",
                 "operator": ">",
                 "value": 99
               }
             ]
           }
         ],
         "variables": [ // parameter definitions
           {
             "instance_id": 1, // instance id for the point
             "instance_name": "battery_01", // instance name for the point
             "name": "X1", // default name used in rules
             "pointType": "measurement", // point type
             "point_name": "SOC", // point name
             "type": "single", // parameter type: single or combined
             "unit": "%", // unit
             "point_id": 3, // point id
             "formula": [] // when combined, records formula definition
           }
         ],
         "wires": { // for function-switch, multiple outputs map to next node ids
           "out001": [
             "node-1766627111063"
           ],
           "out002": [
             "node-1766627120005"
           ],
           "out003": [
             "node-1766627123081"
           ]
         }
       },
       "description": "Switch function",
       "id": "node-1766625792260",
       "label": "Switch Function",
       "type": "function-switch",
       "status": ""
     }
   },
   {
     "id": "node-1766627111063",
     "type": "custom",
     "position": {
       "x": 300,
       "y": -5
     },
     "data": {
       "cardId": "action-1",
       "config": {
         "rule": [ // rule config
           {
             "Variables": "X1", // defined variable
             "value": 42290 // assigned value
           },
           {
             "Variables": "X2",
             "value": 999
           }
         ],
         "variables": [
           {
             "formula": [],
             "instance_id": 2,
             "instance_name": "diesel_gen_01",
             "name": "X1",
             "pointType": "action",
             "point_id": 1,
             "point_name": "Start Inverter",
             "type": "single",
             "unit": ""
           },
           {
             "name": "X2",
             "type": "single",
             "instance_id": 4,
             "instance_name": "pv_01",
             "pointType": "action",
             "point_id": 5,
             "point_name": "Power Setpoint",
             "unit": "kW",
             "formula": []
           }
         ],
         "wires": {
           "default": [
             "end"
           ]
         }
       },
       "description": "The SOC is too low.",
       "id": "node-1766627111063",
       "label": "SOC low",
       "type": "action-changeValue", // this node type can execute actions or change point values
       "status": ""
     }
   },
   {
     "id": "node-1766627120005",
     "type": "custom",
     "position": {
       "x": 302,
       "y": 101
     },
     "data": {
       "cardId": "action-1",
       "config": {
         "rule": [
           {
             "Variables": "X1",
             "value": 42289
           },
           {
             "Variables": "X2",
             "value": 999
           }
         ],
         "variables": [
           {
             "name": "X1",
             "type": "single",
             "instance_id": 2,
             "instance_name": "diesel_gen_01",
             "pointType": "action",
             "point_id": 1,
             "point_name": "Start Inverter",
             "unit": "",
             "formula": []
           },
           {
             "name": "X2",
             "type": "single",
             "instance_id": 4,
             "instance_name": "pv_01",
             "pointType": "action",
             "point_id": 5,
             "point_name": "Power Setpoint",
             "unit": "kW",
             "formula": []
           }
         ],
         "wires": {
           "default": [
             "end"
           ]
         }
       },
       "description": "The SOC is normal.",
       "id": "node-1766627120005",
       "label": "SOC normal",
       "type": "action-changeValue",
       "status": ""
     }
   },
   {
     "id": "node-1766627123081",
     "type": "custom",
     "position": {
       "x": 297,
       "y": 219
     },
     "data": {
       "cardId": "action-1",
       "config": {
         "rule": [
           {
             "Variables": "X1",
             "value": "X2"
           }
         ],
         "variables": [
           {
             "name": "X1",
             "type": "single",
             "instance_id": 4,
             "instance_name": "pv_01",
             "pointType": "action",
             "point_id": 5,
             "point_name": "Power Setpoint",
             "unit": "kW",
             "formula": []
           },
           {
             "name": "X2",
             "type": "single",
             "instance_id": 3,
             "instance_name": "pcs_01",
             "pointType": "measurement",
             "point_id": 2,
             "point_name": "DC Power",
             "unit": "kW",
             "formula": []
           }
         ],
         "wires": {
           "default": [
             "end"
           ]
         }
       },
       "description": "The SOC is too high.",
       "id": "node-1766627123081",
       "label": "SOC high",
       "type": "action-changeValue",
       "status": ""
     }
   }
 ]
  },
  "format": "vue-flow",
  "id": "1", // rule id
  "name": "SOC Monitoring", // rule name
  "priority": 10 // priority
}
```

1. Click **FullScreen** to enter full-screen mode.
2. Click **Exit Fullscreen** to exit.

##### Edit Rule Flow

<img src="/images/Setting/Configuration/rule/11.png" alt="11" style="max-width:100%; height:auto;" />

<img src="/images/Setting/Configuration/rule/12.png" alt="12" style="max-width:100%; height:auto;" />

1. Click **Edit** to enter rule flow edit mode.

2. The cards below are custom function cards. Drag the required card onto the rule flow canvas. Different cards have different functions:

   - **Switch Function - Value condition card**

     <img src="/images/Setting/Configuration/rule/13.png" alt="13" style="max-width:100%; height:auto;" />

     This card is used to judge whether a point value meets a condition.

   - **Change Value - Data modification card**

     <img src="/images/Setting/Configuration/rule/14.png" alt="14" style="max-width:100%; height:auto;" />

     This card is used to modify a point value for an instance.

3. The rule flow canvas is where you configure cards and connections. Basic operations:

   - The canvas must include **Start** and **End** cards. **The rule flow must start with Start and end with End.**

   - The left handles on a card are inputs and can only be line endpoints; the right handles are outputs and can only be line starting points.

   - To delete, click a card or line and press **Backspace**. **Start and End cards cannot be deleted.**

   - Double-click a card to configure its parameters. Different card types have different data to edit:

     - **Switch Function - Value condition card**

       <img src="/images/Setting/Configuration/rule/15.png" alt="15" style="max-width:100%; height:auto;" />

       1. The first section is basic info: **label** is the card title, and **description** is the card description.

       2. The second section is parameter definition, where you declare parameters:

          <img src="/images/Setting/Configuration/rule/16.png" alt="16" style="max-width:100%; height:auto;" />

          Click the add button to create a parameter. Each parameter is named **X + auto-increment number**. Click the delete icon next to a parameter to remove it. Parameter definitions have two types: **single** and **combined**:

       - **single**: a single parameter. Select instance name, point type, and point name.

         <img src="/images/Setting/Configuration/rule/17.png" alt="17" style="max-width:100%; height:auto;" />

       - **combined**: a composite parameter. You can select existing parameters or enter numbers and combine them with operators `+`, `-`, `*`, `/`. Click the **green add icon** to add a calculation row, and click the **red delete icon** to remove a row.

         <img src="/images/Setting/Configuration/rule/18.png" alt="18" style="max-width:100%; height:auto;" />

       1. The third section is rule definition, where you define conditions:

          <img src="/images/Setting/Configuration/rule/19.png" alt="19" style="max-width:100%; height:auto;" />

          Click the **orange add icon** to add a rule. Each rule is named **out + auto-increment number**. Click the **delete icon** next to a rule to remove it.

          <img src="/images/Setting/Configuration/rule/20.png" alt="20" style="max-width:100%; height:auto;" />

          Based on parameter names defined above, you can compare parameters to other parameters or values. Click the green add icon to add an extra condition line and combine conditions (currently only **And** is supported, meaning both must be satisfied). Click the red delete button on a condition line to remove it.

       > Note: Each complete **out+xxx** rule generates a corresponding output handle on the node card. Only when the condition is satisfied will the flow proceed to the next node connected to that handle.

       > <img src="/images/Setting/Configuration/rule/21.png" alt="21" style="max-width:100%; height:auto;" />

     - **Change Value - Data modification card**

       <img src="/images/Setting/Configuration/rule/22.png" alt="22" style="max-width:100%; height:auto;" />

       1. The first section is basic info: **label** is the card title, and **description** is the card description.

       2. The second section is parameter definition, the same as in **Switch Function**.

       3. The third section is change-rule definition, where you modify instance point parameters.

          <img src="/images/Setting/Configuration/rule/23.png" alt="23" style="max-width:100%; height:auto;" />

          Click the **orange add icon** to add a change rule. Click the **delete icon** next to a rule to remove it. The modification rule uses left and right parameters: the left side is the target parameter to change; the right side is the new value or parameter. The left selector can only choose **single** parameters; the right selector can choose any defined parameter or a custom value.

4. Canvas controls from top to bottom: zoom in, zoom out, fit to canvas, disable/enable canvas interactions.

5. Rule flow save button. Save is enabled only when nodes/edges are added, modified, or deleted.

6. Rule flow cancel button. Cancel is enabled only when nodes/edges are added, modified, or deleted; it restores the last saved state.

7. **Fullscreen** button to enter full-screen edit mode.

8. **Import** button. Select a .json file to import a rule flow; **the .json format must match the exported format**.

9. **Cancel Edit** button to exit edit mode.

## FAQ and Troubleshooting

### The page has no data and device Update Time does not change

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

### After logging in, you are redirected back to the login page

Possible causes:

- Account expired or password incorrect
- Token refresh failed Suggestions:
- Log in again
- If it still fails, contact the administrator to reset the account

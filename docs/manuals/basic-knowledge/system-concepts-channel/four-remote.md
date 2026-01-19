---
outline: deep
---

# Four Remote Types

## Definition

In industrial automation, power systems, and IoT device management, business data is typically organized and managed by the "four remote" categories. The four-remote model is a classic SCADA data model and is widely used in IIoT platforms, power automation, water, HVAC, energy management systems, and more. The classification clarifies the "nature and purpose of points," helping users understand what each point represents, what it can do, and how it is collected or issued.

## Category

### Telemetry

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
- Collection intervals typically need to be configured. 

Usage in the platform Telemetry points are used for trend analysis, reporting, energy monitoring, and operational optimization.

### Signal

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
- Change events can trigger alarms. 

Usage in the platform Signal points are widely used in alarm management, event monitoring, and status recording.

### Control

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
- Mostly switch-type commands (0/1). 

Usage in the platform Control is used for intelligent operations, remote management, and automated control strategy execution.

### Adjustment

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
- Typically requires range and type validation. 

Usage in the platform Adjustment is often combined with automation strategies to regulate environments and improve energy efficiency.

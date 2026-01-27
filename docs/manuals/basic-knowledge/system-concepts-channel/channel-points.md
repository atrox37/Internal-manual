---
outline: deep
---

# Channel Points

## Definition

A channel point is a real data point of a device under a specific protocol (actual register address or signal address). A point is the smallest unit for data acquisition and command delivery. For example, in Modbus:

- Voltage may be at address 40001
- Current may be at address 40002
- Device start/stop may be at 00001 (coil)

  These registers or flags are channel points.

## Point Classification

The platform classifies points according to the "four remote" standard in industrial automation:

| Type       | Name       | Description                                                  |
| :--------- | :--------- | :----------------------------------------------------------- |
| Telemetry  | Telemetry  | Read-only.Continuous/analog values (e.g., temperature,voltage)         |
| Signal     | Signal     | Read-only.Discrete/switch values (e.g., on/off, alarm)                 |
| Control    | Control    | Write-only.Control commands issued by the platform (e.g., start/stop)   |
| Adjustment | Adjustment | Write-only.Parameter setpoints issued by the platform (e.g., frequency or voltage setpoint) |

> **Note: For `di_do` channels, point types are only Signal and Control because the values are only 0 and 1.**

## Field Description

Each channel point typically includes:

- `point_id`: Unique point ID (positive integer)
- `signal_name`: Business signal name
- `value`: Current value of the point
- `scale/offset`: Scaling and offset for converting raw values to business values
- `unit`: Unit of the point
- `reverse`: Whether the value should be inverted (commonly for switch points)

> **Note: For Signal and Control points, the `scale`, `offset`, and `unit` fields are not required.**

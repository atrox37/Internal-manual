---
outline: deep
---

# Instance Points

## Definition

Instance points are the "data interfaces" of an instance in the platform, representing all information that can be configured, observed, and controlled. Instance points fall into three categories:

- **Property points**

  Describe "static/semi-static configuration parameters" such as rated power, capacity, communication address, control strategy parameters, alarm thresholds, etc. Its function is:

  - To serve as the source of instance configuration data
  - To be used for strategy calculation, limit checks, display, and operations configuration
  - Usually not for high-frequency changes (can be set manually or by strategy)

- **Measurement points**

  Represent "observable status/telemetry/signal" data such as voltage, current, power, SOC, switch status, alarm status, etc.Its function is:

  - Real-time monitoring and visualization
  - Input data for alarms, linkage, reporting, and optimization dispatch

- **Action points**

  Represent points that can be issued for control/adjustment, such as start/stop, close/open, active/reactive setpoints, charge/discharge power setpoints, mode switching, etc. Its function is:

  - EMS control-loop output (strategy/manual operation -> device)
  - To support both Control and Adjustment commands

## Field Description

- `point_id`: Unique identifier within the point category
- `name`: Point name
- `value`: Current point value
- `unit`: Point unit
- `description`: Point description

## Role

- Unify semantics and data governance: Map different protocols and vendor raw points into consistent semantic points for upper-layer understanding and reuse.
- Base granularity for monitoring and alarms: Trends, threshold alarms, event linkage, and reporting all rely on points.
- Input/output for the control loop: Strategies read **measurement** points to determine state and write to **action** points to issue targets.

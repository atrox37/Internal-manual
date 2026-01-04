---
outline: deep
---

# Instance Points

## Definition

Instance points are the "data interfaces" of an instance in the platform, representing all information that can be configured, observed, and controlled.
Instance points fall into three categories:

- **property points**
  Describe "static/semi-static configuration parameters" such as rated power, capacity, communication address, control strategy parameters, alarm thresholds, etc.
  Role:
  - Serve as the source of instance configuration data
  - Used for strategy calculation, limit checks, display, and operations configuration
  - Usually not high-frequency changes (can be set manually or by strategy)
- **measurement points**
  Represent "observable status/telemetry/signal" data such as voltage, current, power, SOC, switch status, alarm status, etc.
  Role:
  - Real-time monitoring and visualization
  - Input data for alarms, linkage, reporting, and optimization dispatch
- **action points**
  Represent points that can be issued for control/adjustment, such as start/stop, close/open, active/reactive setpoints, charge/discharge power setpoints, mode switching, etc.
  Role:
  - EMS control-loop output (strategy/manual operation -> device)
  - Support both Control and Adjustment commands

## Field Description

* `point_id`: Unique identifier within the point category.
* `name`: Point name.
* `value`: Current point value.
* `unit`: Point unit.
* `description`: Point description.

## Role

- Unify semantics and data governance. Map different protocols and vendor raw points into consistent semantic points for upper-layer understanding and reuse.
- Base granularity for monitoring and alarms. Trends, threshold alarms, event linkage, and reporting all rely on points.
- Input/output for the control loop. Strategies read **measurement** points to determine state and write to **action** points to issue targets.

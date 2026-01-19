---
outline: deep
---

# Product

## Definition

A product is a standardized model for a device/system type in the platform, used to abstract the capabilities and data interfaces that this type should have in the EMS. A product does not represent a specific on-site device, but rather the common structure and standard interface of the same device type. It defines what the device looks like in the platform and what capabilities it has:

- What points it includes (property points, measurement points, action points)

- What each point represents (e.g., SOC, power, alarms, start/stop, power setpoints, etc.) A product is not a specific on-site device, but a "generic definition for similar devices." The platform provides the following products:

  - **battery_cell(cell)**
  
    - Definition: The smallest electrochemical unit of a battery system.
    - Role: Provides the most basic voltage/temperature data, the foundation for BMS monitoring and safety evaluation.
  
  - **battery_module (battery module)**
  
    - Definition: A structural and electrical unit composed of multiple cells.
    - Role: Aggregates cell-level data, commonly used for module voltage, temperature distribution, balancing/protection management and display.
  
  - **battery_cluster(battery cluster/battery bank)**

    - Definition: A higher-level aggregation composed of multiple battery modules (often corresponding to the scope of one cluster BMS).
    - Role: Provides cluster-level SOC/SOH, voltage/current, alarms, enabling EMS strategy and safety coordination.
  
  - **battery_stack(battery stack/string)**
  
    - Definition: A system-level series/parallel unit composed of multiple battery clusters (often one battery stack in engineering practice).
    - Role: Provides system-level DC key metrics (total voltage/total current/total power) and stack-level alarms for coordination with PCS/DC conversion.
  
  - **battery_pack(battery pack/battery system pack)**
  
    - Definition: A more asset/system-oriented abstraction for the battery side in EMS (often used to summarize the overall capability of a BESS battery system).
    - Role: Used for capacity, ratings, runtime statistics, alarm aggregation, reporting, and asset management; often serves as the top-level battery object for BESS.
  
    >The relationship among battery cell, battery module, battery cluster, battery stack and battery pack is shown in the figure.
    >
    >
    >
    ><img src="../../../images/Basic/Instance/battery.png" alt="Battery structure diagram">
  
  - **dc_dc_converter(DC/DC converter)**
  
    - Definition: DC-to-DC power conversion equipment (boost/buck/isolation, etc.).
  
    - Role: Matches different DC bus voltage levels and supports energy regulation and protection coordination; commonly used in battery-side/DC bus power control loops.
  
  - **pcs(power conversion system)**
    - Definition: Core power conversion equipment in energy storage systems (DC-AC).
    - Role: Executes charge/discharge power control, grid-connected/off-grid operation, reactive support, and power quality control; key target for EMS strategies and execution.
  - **diesel_generator(diesel generator)**
    - Definition: Controllable backup/emergency/peak-shaving power source.
    - Role: Provides stable power in off-grid or weak-grid scenarios; supports start/stop control, power regulation, operating status, and fault monitoring.
  - **motor(motor)**
    - Definition: Motor-type load/device (as a drive device or key process device abstraction).
    - Role: Used to monitor operating status, power/current, etc.; some scenarios support start/stop or speed control (depending on site control and points).
  - **load (load)**
    - Definition: Aggregated load or controllable load object on the consumption side (e.g., campus load, building load, production line load).
    - Role: Core input for EMS load forecasting, energy balance, peak shaving, and demand response; supports strategy linkage when extended as controllable load.
  - **pv_string(PV string)**
    - Definition: A generation unit formed by series-connected modules.
    - Role: String-level voltage/current/power monitoring, helpful for locating shading, mismatch, and degradation issues (depending on access capability).
  
  - **pv_optimizer(optimizer)**
    - Definition: Module/string-level power optimization and monitoring device.
  
    - Role: Improves generation efficiency and supports finer-grained monitoring and fault localization; typically associated with string/module data.
  
  - **pv_combiner(combiner box)**
    - Definition: Device that combines multiple strings in parallel to a DC bus.
    - Role: Aggregates string circuits and provides branch current/switch/surge protection monitoring; key node between strings and inverters.
  
  - **pv_inverter(PV inverter)**
    - Definition: Device that converts PV DC power to AC for grid connection/supply.
    - Role: Output power control, grid operation management, reactive/power-quality support, and status/alarm monitoring; main controlled/monitored object on the PV side in EMS.
  - **gateway(gateway)**
    - Definition: Acquisition and protocol conversion node connecting site devices to the cloud/platform.
    - Role: Hosts channels and protocols, performs data acquisition upload and command delivery; responsible for point mapping, caching, edge computing/forwarding (depending on implementation).
  
  - **station(site/station)**
    - Definition: Top-level organizational object for a microgrid/site (one project or one station).
    - Role: Hosts the site device tree, topology, and aggregate metrics (site power/energy/alarms), and serves as the unified entry for permissions, reporting, dispatch strategies, and O&M.

## Role

- Unify point collections and semantics for the same device type (standardization)
- Support bulk instantiation (multiple device instances for one product)
- Facilitate system integration, operations, and configuration reuse

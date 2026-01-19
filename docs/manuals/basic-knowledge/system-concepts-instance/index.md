---
outline: deep
---

# Device Instance Concepts

In microgrid EMS, to standardize device onboarding and point management, the platform defines four core concepts: **product, instance, instance point, and point mapping (binding)**. A **product** specifies the standardized capabilities and point model for a device type. An **instance** is a concrete on-site device object created from a product. **Instance points** describe the instance's configuration, runtime states/telemetry, and supported operations, and are categorized by usage as **property / measurement / action**. **Point mapping (binding)** associates each instance point with a specific on-site channel point, and labels the binding with a **T/S/C/A** semantic type to ensure correct data ingestion/reporting and correct command/setpoint dispatch.

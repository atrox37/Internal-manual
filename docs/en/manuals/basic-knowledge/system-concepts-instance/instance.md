---
outline: deep
---

# Instance

## Definition

An instance is the concrete object of a product model in a site project (Asset/Device Instance), corresponding to an actual device, system unit, or logical object (e.g., PCS_01, BESS_01, PCC_METER_01). An instance has a unique `instance_id` and binds to a `product_name`, inheriting the product's point system.
An instance is not only a display "device item" but also the smallest business unit for status calculation, control issuance, and alarm positioning on the platform.

## Field Description

* `insance_id`: Instance ID, a unique identifier.
* `instance_name`: Instance name.
* `product_name`: Name of the product the instance belongs to.
* `properties`: Instance properties.

## Role

- Apply the "template (product)" to the "site object (instance)"
- Instances carry the product's configuration properties and runtime points (measurement/action)
- Map to site channels (four-remote) to enable data acquisition and control issuance

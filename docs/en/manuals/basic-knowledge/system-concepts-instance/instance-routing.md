---
outline: deep
---

# Instance Point Routing

## Definition

Instance point mapping binds platform "instance points" to on-site "channel points/addresses." It answers a key question:
**For this instance point, which channel and which point on site does it map to, and which of the four-remote types does it belong to?**

* For **measurement** points, the channel point type can only be **Telemetry** or **Signal**.
* For **action** points, the channel point type can only be **Control** or **Adjustment**.
* **property** points are intrinsic attributes and have no routing info.

## Field Description

* `point_id`: ID of the instance point.
* `name`: Name of the point.
* `channel_id`: ID of the channel used by the route.
* `channel_type`: Four-remote type of the channel point.
* `channel_point_id`: Channel point ID used by the route.

## Role

- Data uplink (acquisition). Channel data is routed to the corresponding measurement points.
- Command downlink (control). Values written to action points are routed to the corresponding channel points and sent to devices.
- Decouple business and protocol. Business logic focuses on point semantics; communication focuses on addresses; mapping connects them to allow protocol/gateway/point-table changes.

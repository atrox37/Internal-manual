---
outline: deep
---

# Instance Point Routing Configuration

![18](../../../../public/images/Setting/Configuration/deviceInstance/18.png)

1. Switch to **Routing** in **View Mode** to open the instance point routing view.

2. Click **Edit** to enter routing edit mode.

  > Note: Property points are inherent product attributes and do not require routing to channel points, so only measurement and action types appear in routing.

## Export Point Routing CSV Files
![19](../../../../public/images/Setting/Configuration/deviceInstance/19.png)

2. Click **Export** to export the current table data. The CSV filename format is: **instance name_point type (measurement/action)_routing_timestamp.csv**. Example:
    ![20](../../../../public/images/Setting/Configuration/deviceInstance/20.png)
    In the exported file, **point_type** uses abbreviations: **T = Telemetry, S = Signal, C = Control, A = Adjustment.**

## Batch Edit Instance Point Routing
![21](../../../../public/images/Setting/Configuration/deviceInstance/21.png)

![22](../../../../public/images/Setting/Configuration/deviceInstance/22.png)

1. Click **Edit** to enter routing edit mode.

2. During editing, you can filter by:

- **modified**: Filters points that were actually modified. Modified rows are shown in blue, and modified data is highlighted in blue.
![23](../../../../public/images/Setting/Configuration/deviceInstance/23.png)
- **invalid**: Filters points with issues after add/modify. Problematic rows show orange markers with a dark red background.
![24](../../../../public/images/Setting/Configuration/deviceInstance/24.png)

> Point routing configuration rules:
>
> * Channel is the channel that hosts the channel point mapped to the instance point.
> * Channel Point Type is the four-remote type of the mapped channel point. Available values depend on the channel protocol:
>   * For modbus_rtu and modbus_tcp channels: for measurement points, Channel Point Type can only be Telemetry or Signal; for action points, it can only be Control or Adjustment.
>   * For di_do channels: for measurement points, Channel Point Type can only be Signal; for action points, it can only be Control.
> * Channel Point is the channel point mapped to the instance point.
> * The three fields must be selected in order: Channel -> Channel Point Type -> Channel Point.

### Manually Edit Routing
![25](../../../../public/images/Setting/Configuration/deviceInstance/25.png)

1. Click the **edit icon** for the target routing row.
2. Modify according to the routing rules. For existing points, the ID cannot be changed.
3. Click the **confirm icon** to save the local change.
4. Click the **cancel icon** to cancel.
5. Modified rows appear as shown, with changed data marked in blue and filterable by **modified**.

### Import Routing from File
![26](../../../../public/images/Setting/Configuration/deviceInstance/26.png)

1. Click **Import** and select a **.csv** file. The file must meet the following requirements:

- Required headers **(must include the following; extra headers are ignored)**:
  `point_id,channel_id,channel_point_type,channel_point_id,enabled`
  After import, points are matched to routing info by **point_id**.
  
- Field descriptions:
  - `point_id` is the instance point ID. If the point does not exist, the routing is invalid.
  - `point_name` is the instance point name.
  - `channel_id` is the ID of the channel containing the mapped channel point. If the channel does not exist, the channel point is considered missing and an error is shown.
  - `channel_point_type` is the four-remote type of the mapped channel point (T/S/C/A). **It accepts both abbreviations T, S, C, A and full names Telemetry, Signal, Control, Adjustment (case-sensitive).**
  - `channel_point_id` is the channel point ID. If it does not exist, an error is shown.
  - `enabled` indicates whether the mapping is enabled; accepts **false** or **true**.
  
- Format screenshot:

  <img src="../../../../public/images/Setting/Configuration/deviceInstance/27.png" alt="27" style="zoom:50%;" />

> Note:
>
> * Importing routing data overwrites the current routing information.
>
> * During import, points are matched by ID. If a point ID does not exist on the page, it is ignored. If duplicates exist, the later one is used.

### Submit All Changes
![28](../../../../public/images/Setting/Configuration/deviceInstance/28.png)

1. Before submission, ensure the modified data is valid. Errors appear below invalid data.
2. Click **Submit** to submit the batch changes.
3. Click **Cancel Edit** to exit edit mode and restore the original table.
    Note: You do not need to run a manual search. After clicking **Submit**, if issues exist you can jump directly to them.


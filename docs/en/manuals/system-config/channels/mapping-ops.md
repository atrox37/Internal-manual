---
outline: deep
---

# Channel Point Mapping Configuration


## Batch Edit Point Mappings

![33](../../../../public/images/Setting/Configuration/channel/33.png)

1. In the **mappings** view, click **Edit** to enter mapping edit mode.

![34](../../../../public/images/Setting/Configuration/channel/34.png)

1. During editing, you can filter changes by:

- **modified**: Filters points that were actually modified. Modified rows are shown in blue, and modified data is highlighted in blue.

![35](../../../../public/images/Setting/Configuration/channel/35.png)

- **invalid**: Filters points with issues after add/modify. Problematic rows show orange markers with a dark red background.

![36](../../../../public/images/Setting/Configuration/channel/36.png)

Point mapping rules (mapping fields differ by channel type):

**modbus_rtu/modbus_tcp:**

- **Function Code** depends on point type (four-remote):
  - **telemetry**: 3, 4
  - **signal**: 1, 2, 3, 4
  - **control**: 5, 15, 6, 16
  - **adjustment**: 6, 16
- **Data Type**:
  - **telemetry**: int16, uint16, int32, float32, uint32, int64, uint64, float64
  - **signal**: same as telemetry, plus bool
  - **control**: same as telemetry, plus bool
  - **adjustment**: same as telemetry
- **Byte Order** options depend on data length:
  - **bool**: no restriction
  - **16-bit**: AB, BA
  - **32-bit**: AB, BA, ABCD, DCBA, BADC, CDAB
  - **64-bit**: adds ABCDEFGH, HGFEDCBA, BADCFEHG, GHEFCDAB to the 32-bit list
- **Bit Position**: **Editable only when dataType is bool with functionCode 3/4, or for 16-bit integers (0-15). Other types are fixed at 0.**

### Import Point Mappings from File

![37](../../../../public/images/Setting/Configuration/channel/37.png)

1. Click **Import** and select a CSV file to import. Requirements differ by channel type:

* **modbus_rtu/modbus_tcp**

  - Required headers:

    `point_id,slave_id,function_code,register_address,data_type,byte_order,bit_position`

  - Field descriptions: follow the point configuration rules.

  - Format screenshot:

    <img src="../../../../public/images/Setting/Configuration/channel/38.png" alt="38" style="zoom:50%;" />

* **di_do**

  * Required headers:

    `point_id,gpio_number`

  - Field descriptions: follow the point configuration rules.

  - Format screenshot:
  
    <img src="../../../../public/images/Setting/Configuration/channel/38(1).png" alt="38(1)" style="zoom:50%;" />

>**Note:**
>
>* **When modifying instance point mappings by import, the imported data overwrites the current mapping information.**
>* **During import, points are matched by point ID. If a point ID does not exist on the page, it is ignored. If duplicate mappings exist, the later one is used.**

### Manually Edit Point Mappings

![39](../../../../public/images/Setting/Configuration/channel/39.png)

1. Click the **edit icon** for the target point mapping to modify it.
2. Modify according to the mapping rules. For existing points, the ID cannot be changed.
3. Click the **confirm icon** to save the local change.
4. Click the **cancel icon** to cancel.
5. Modified rows appear as shown, with changed data marked in blue and filterable by **modified**.

### Submit All Changes

![40](../../../../public/images/Setting/Configuration/channel/40.png)

1. Before submission, ensure all mapping data is valid. Errors appear below invalid data.
2. Click **Submit** to submit the batch changes.
3. Click **Cancel Edit** to exit edit mode and restore the original mapping data.
    Note: You do not need to run a manual search. After clicking **Submit**, if issues exist you can jump directly to them.

## Export Point Mapping CSV Files

![41](../../../../public/images/Setting/Configuration/channel/41.png).png)

1. Click **Export** to export the table data for the current point type as **.csv**. The filename format is: **channel name + tab name (telemetry/signal/control/adjustment) + "_mapping" + current timestamp**.

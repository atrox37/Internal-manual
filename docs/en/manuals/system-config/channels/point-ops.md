---
outline: deep
---

# Channel Point Configuration


![11](../../../../public/images/Setting/Configuration/channel/11.png)
![12](../../../../public/images/Setting/Configuration/channel/12.png)

1. Click **Points** in the **Operation** column of the desired channel row to open the points dialog.

2. The point type tabs include **telemetry**, **signal**, **control**, and **adjustment**, corresponding to the four-remote point categories. Click a tab to view points of that type.
3. View mode toggle: **Points** and **Mappings**. Click the corresponding button to switch views.
4. Click **Batch Publish** to issue values in bulk.
5. Click **Publish** in the **Operation** column to issue a value for a single point.
6. Click **Export** to export the table data of the current tab to **.csv**.
7. Click **Edit** to enter point edit mode.
8. Click **Cancel** to close the dialog.
9. The point filter box supports fuzzy search by name or precise search via dropdown selection.

![13](../../../../public/images/Setting/Configuration/channel/13.png)
When switching the view toggle to **mappings**, the page is interpreted as follows:

10. Click the tab to switch point type and view point mappings.
11. Click **Export** to export the table data of the current point type to **.csv**.
12. Click **Edit** to enter point mapping edit mode.
13. Click **Cancel** to close the dialog.

## Issue Point Values

There are two ways to issue point values: **bulk publish** and **single publish**.

### Single Publish



![14](../../../../public/images/Setting/Configuration/channel/14.png)

![15](../../../../public/images/Setting/Configuration/channel/15.png)

![16](../../../../public/images/Setting/Configuration/channel/16.png)

1. Click **Publish** for the target point row to open the single publish dialog.

2. Enter the value to publish in the Value input (for **telemetry** and **adjustment**, the value is numeric; for **signal** and **control**, the value is 0 or 1).
3. Click **Submit** to publish the value.
4. Click **Cancel** to cancel.
5. On success, the value changes.

### Bulk Publish

![17](../../../../public/images/Setting/Configuration/channel/17.png)

![18](../../../../public/images/Setting/Configuration/channel/18.png)

![19](../../../../public/images/Setting/Configuration/channel/19.png)

1. Click **Batch Publish** on the target point type tab (only affects the current point type).

2. Enter values in the **Publish** column (for **telemetry** and **adjustment**, numeric; for **signal** and **control**, 0 or 1).
3. Click **Submit Publish** to submit the bulk publish.
4. Click **Cancel Publish** to cancel.
5. On success, the values change.

## Batch Edit Points

![20](../../../../public/images/Setting/Configuration/channel/20.png)

1. Click **Edit** in the points view to enter batch edit mode for all points.

![21](../../../../public/images/Setting/Configuration/channel/21.png)

2. During editing, you can filter by status (only within the current point-type table):

- **modified**: Filters points that were actually modified. Modified rows are shown in blue, and modified data is highlighted in blue.
  ![22](../../../../public/images/Setting/Configuration/channel/22.png)
- **added**: Filters points added via the add operation. Added rows and data are shown in green.
  ![23](../../../../public/images/Setting/Configuration/channel/23.png)
- **deleted**: Filters points deleted via the delete operation. Deleted rows and data are shown in red.
  ![24](../../../../public/images/Setting/Configuration/channel/24.png)
- **invalid**: Filters points with issues after add/modify. Problematic rows show orange markers with a dark red background.
  ![25](../../../../public/images/Setting/Configuration/channel/25.png)
  Point configuration rules:
- `point_id`: Positive integer (required, unique)
- `signal_name`: String, no spaces allowed (required)
- `scale`: Numeric (required)
- `offset`: Numeric (required)
- `unit`: String (optional)
- `reverse`: true/false (required)

> **Note: Point edits follow batch-edit principles. Make all changes locally first, then click Submit only after all changes are complete and error-free. The same applies to later mapping edits.**

### Import Points from a File

![26](../../../../public/images/Setting/Configuration/channel/26.png)

1. Click **Import**, choose a **.csv** file to import. File requirements differ by point type:

* telemetry/adjustment

  - Required headers **(must include the following; extra headers are ignored)**:

    `point_id,signal_name,scale,offset,unit,reverse`

  - Field descriptions: follow the point configuration rules.

  - Format screenshot:

    <img src="../../../../public/images/Setting/Configuration/channel/27.png" alt="27" style="zoom: 33%;" />

* signal/control

  * Required headers (must include the following; extra headers are ignored):

    `point_id,point_name,reverse`

  * Field descriptions: follow the point configuration rules.

  * Format screenshot:
  
    <img src="../../../../public/images/Setting/Configuration/channel/27(1).png" alt="27(1)" style="zoom: 33%;" />

>**Note:**
>
>- **All imported records are rendered as "added" (green highlight). Even with validation errors, records are imported but marked as "invalid" so you can fix them in the UI.**
>- **Each import overwrites the current point information.**

### Add Points

![28](../../../../public/images/Setting/Configuration/channel/28.png)

1. Click the **Add** icon button to create an editable row at the top of the current point-type table.
2. Fill in the row according to the configuration rules.
3. Click the **checkmark** icon to confirm the local add.
4. Click the **X** icon to cancel the local add.
5. After confirmation, the new row appears as shown and can be filtered by **added**.

> **Note: Each tab allows only one pending add at a time. A new add row appears only after the previous add is confirmed or canceled. If a pending add row exists, clicking Add again will not create another row.**

### Delete Points

![29](../../../../public/images/Setting/Configuration/channel/29.png)

1. Click the **delete** icon for the target row to delete it locally.
2. Deleted rows appear as shown and can be filtered by **deleted**.
3. Click the restore icon to undo the local delete.

### Modify Points

![30](../../../../public/images/Setting/Configuration/channel/30.png)

1. Click the **edit** icon for the target point to modify it.
2. Modify according to the configuration rules. For existing points, the ID cannot be changed.
3. For newly added points, the ID can be changed.
4. Click the **confirm** icon to save the local modification.
5. Click the **cancel** icon to cancel the modification.
6. Modified rows appear as shown, with changed data marked in blue and filterable by **modified**.

### Submit All Changes

![31](../../../../public/images/Setting/Configuration/channel/31.png)

1. Before submission, ensure all modified point data is valid. Errors appear below invalid data.
2. Click **Submit** to submit the batch changes.
3. Click **Cancel Edit** to exit edit mode and restore the original point data.

> **Note: You do not need to run a manual search. After clicking Submit, if issues exist you can jump directly to them.**

## Export Point CSV Files

![32](../../../../public/images/Setting/Configuration/channel/32.png).png)

Click **Export** to export the table data under the current tab as **.csv**. The filename format is: **channel name + tab name (telemetry/signal/control/adjustment) + current timestamp**.

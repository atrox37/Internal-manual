---
outline: deep
---

# Channel Template Management

A channel template (Channel Template) is a **reusable configuration snapshot** that saves the channel's point table (Points) and mapping table (Mappings) configuration. With templates, you can:

- **Quickly configure new channels**: Apply an existing template to a new channel without manual configuration
- **Unify device configuration**: Use the same template for multiple channels of the same type to ensure consistency
- **Backup and migration**: Save channel configuration as a template for backup or reuse across projects

Each channel template contains the following information:

* ```Name```: Display name of the template
* ```Description```: Detailed description (optional)
* ```Protocol```: Supported communication protocol, e.g., modbus_tcp, modbus_rtu, di_do
* ```points_snapshot```: Definitions of telemetry, signal, control, and adjustment points
* ```mappings_snapshot```: Mapping relationships between points and protocol parameters

## Template View and Filter

<img src="../../../images/Setting/Configuration/channel/2-20.png" style="max-width:100%; height:auto;" />

1. On the template management page toolbar, you can filter templates using the filter dropdowns:
- ```Protocol```: Protocol type. Select a specific protocol (e.g., modbus_tcp) to show only templates of that protocol
2. Refresh icon: Click to reload the template list.

## Access Channel Templates

<img src="../../../images/Setting/Configuration/channel/2-1.png" alt="Top Title Bar" style="max-width:100%; height:auto;" />

1. On the channel configuration page toolbar, click the **Template** button.

<img src="../../../images/Setting/Configuration/channel/2-2.png" alt="Top Title Bar" style="max-width:100%; height:auto;" />

2. Enter the **Template Management** page.

## Create Channel Template

<img src="../../../images/Setting/Configuration/channel/2-3.png" style="max-width:100%; height:auto;" />

1. On the template management page, click the **New** button in the top-right corner of the table to open the "Add Template" dialog.

<img src="../../../images/Setting/Configuration/channel/2-4.png" style="max-width:100%; height:auto;" />

There are two ways to create a channel template: **Create via JSON** and **Create from Existing Channel**.

### Method 1: Create via JSON

Suitable for **batch import** or **existing JSON template files**.

<img src="../../../images/Setting/Configuration/channel/2-5.png" style="max-width:100%; height:auto;" />

1. Switch to the **By JSON** tab in the dialog.
2. Write or paste JSON content in the **JSON Content** text area. JSON format requirements:

```json
{
  "name": "Modbus Sample Template",
  "description": "Sample configuration for Modbus TCP channels",
  "protocol": "modbus_tcp",
  "points_snapshot": {
    "telemetry": [
      {
        "point_id": 1,
        "signal_name": "Temperature",
        "data_type": "float32",
        "scale": 1,
        "offset": 0,
        "unit": "℃"
      }
    ],
    "signal": [],
    "control": [],
    "adjustment": []
  },
  "mappings_snapshot": {
    "telemetry": [
      {
        "point_id": 1,
        "signal_name": "Temperature",
        "protocol_data": {
          "slave_id": 1,
          "function_code": 3,
          "register_address": 0,
          "data_type": "float32",
          "byte_order": "AB"
        }
      }
    ],
    "signal": [],
    "control": [],
    "adjustment": []
  }
}
```

3. Click the **select a file** button to choose a JSON file with the same format; its content will appear in the **JSON Content** text area.
4. Click **Submit** to submit.
5. Click **Cancel** to cancel.

> **Note**: The JSON format must be valid; otherwise you will see "JSON format is invalid".

### Method 2: Create from Existing Channel

Suitable for **saving an already configured channel as a template**.

<img src="../../../images/Setting/Configuration/channel/2-6.png" style="max-width:100%; height:auto;" />

1. Switch to the **From Channel** tab in the dialog.
2. Fill in the form:
   - ```Name```: Template name (required)
   - ```Source Channel```: Select the channel to use as source (required)
   - ```Protocol```: Auto-filled from the selected channel, read-only
   - ```Description```: Template description (optional)
3. Click **Submit** to submit.
4. Click **Cancel** to cancel.

The system will save the channel's **point snapshot** and **mapping snapshot** as a template.

> You can also create a template quickly from the channel configuration page. On the channel configuration page, each channel row has a **More** dropdown (⋮) in the Operation column:
>
><img src="../../../images/Setting/Configuration/channel/2-7.png" style="max-width:100%; height:auto;" />
>
>1. Click the **More** icon for a channel to open the **More** dropdown.
>2. Click the **As Template** button to open the operation panel.
>
><img src="../../../images/Setting/Configuration/channel/2-8.png" style="max-width:100%; height:auto;" />
>
>3. In the "As Template" dialog:
>   - Channel name and protocol are auto-filled
>   - Enter template name (default: `ChannelName-Template`)
>   - Enter description (optional)
>4. Click **Submit** to submit.
>5. Click **Cancel** to cancel.

## Apply Template to Channel

### Method 1: Apply from Template Management Page

<img src="../../../images/Setting/Configuration/channel/2-9.png" style="max-width:100%; height:auto;" />

1. In the template list, find the template to apply and click **Apply** in that row.

<img src="../../../images/Setting/Configuration/channel/2-10.png" style="max-width:100%; height:auto;" />

2. In the "Apply Template" dialog:
   - ```Template```: Select the template to apply (can be pre-selected)
   - ```Target Channel```: Select the target channel
3. Click **Apply** to execute.
4. Click **Cancel** to cancel.

> **Tip**: The target channel list is filtered by the selected template's protocol; only channels with matching protocol are shown.

### Method 2: Apply from Channel Configuration Page

<img src="../../../images/Setting/Configuration/channel/2-11.png" style="max-width:100%; height:auto;" />

1. Click the **More** icon for a channel to open the **More** dropdown.
2. Click the **Assign Template** button to open the operation panel.

<img src="../../../images/Setting/Configuration/channel/2-12.png" style="max-width:100%; height:auto;" />

3. In the "Assign Template" dialog:
   - ```Channel```: Channel name is displayed automatically
   - ```Template```: Select the template to apply (only templates with matching protocol are shown)
4. Click **Submit** to submit.
5. Click **Cancel** to cancel.

>**Apply Behavior**
>
>**Overwrite mode**: When applying a template, the target channel's existing points and mappings are **cleared** by default, then the template content is imported.
>**Use case**: Suitable for initializing new channels or fully resetting channel configuration.

## Edit Template

<img src="../../../images/Setting/Configuration/channel/2-13.png" style="max-width:100%; height:auto;" />

1. On the template management page table, click **Edit** for the template to edit.

<img src="../../../images/Setting/Configuration/channel/2-14.png" style="max-width:100%; height:auto;" />

2. In the "Edit Template" dialog, editable fields are:

  - ```Name```: Template name (required)
  - ```Description```: Template description (optional)

3. Click **Submit** to submit.
4. Click **Cancel** to cancel.

> **Note**: Point and mapping content **cannot be edited**. To modify, delete the old template and create a new one, or regenerate a template from the modified channel.

## View Template Details

<img src="../../../images/Setting/Configuration/channel/2-15.png" style="max-width:100%; height:auto;" />

1. On the template management page, click **Points/Mappings** for a template to open the template detail page.

<img src="../../../images/Setting/Configuration/channel/2-16.png" style="max-width:100%; height:auto;" />

<img src="../../../images/Setting/Configuration/channel/2-17.png" style="max-width:100%; height:auto;" />

2. **View toggle** button: Click to open a dropdown and choose **Point Table** or **Mapping Table** to show template points or point routing respectively. **Point Table** is shown by default.
3. **Point type toggle** button: Four types—**Telemetry**, **Signal**, **Control**, **Adjustment**—corresponding to the four-remote classification of channel points. Click to show points of the selected type.
4. Point filter: Enter text for fuzzy search by point name, or use the dropdown for exact selection.
5. Point/Mapping data table: For field descriptions, refer to [Channel Points](/manuals/basic-knowledge/system-concepts-channel/channel-points.html) and [Channel Mappings](/manuals/basic-knowledge/system-concepts-channel/channel-mappings.html) in Basics.

> **Note**: The di_do protocol does not include Telemetry and Adjustment tabs.

## Delete Template

<img src="../../../images/Setting/Configuration/channel/2-18.png" style="max-width:100%; height:auto;" />

1. On the template management page table, click **Delete** for the template to delete.

<img src="../../../images/Setting/Configuration/channel/2-19.png" style="max-width:100%; height:auto;" />

2. Click **Delete** to confirm.
3. Click **Cancel** to abort deletion.



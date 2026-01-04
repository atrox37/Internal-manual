---
outline: deep
---

# Rule Flow Operations

## View Rule Flow Details and Real-Time Execution Path

![8](../../../../public/images/Setting/Configuration/rule/8.png)

![9](../../../../public/images/Setting/Configuration/rule/9.png)

![10](../../../../public/images/Setting/Configuration/rule/10.png)

1. Click **Detail** in the **Operation** column of the target rule row to navigate to the rule flow details page.

2. The highlighted path in the flow is the currently executed path. Node data for the current path is displayed below the node.

3. Click **Edit** to enter rule flow edit mode.

4. Click **Export** to export the current rule flow as a **.json** file. The structure is as follows:

  ```
  {
    "cooldown_ms": 5000, // loop interval
    "description": "Control the diesel generators and photovoltaic systems based on the values of SOC.", // rule flow description
    "enabled": true, // enabled
    "flow_json": { // records point and edge information
   "edges": [ // all edges
     {
       "id": "edge-1766625864321", // edge id
       "source": "start", // source node
       "target": "node-1766625792260", // target node
       "sourceHandle": "right", // output handle id on the source node
       "targetHandle": "left" // input handle id on the target node
     },
     {
       "id": "edge-1766627137707",
       "source": "node-1766625792260",
       "target": "node-1766627111063",
       "sourceHandle": "out001",
       "targetHandle": "left"
     },
     {
       "id": "edge-1766627164179",
       "source": "node-1766627111063",
       "target": "end",
       "sourceHandle": "right1",
       "targetHandle": "left"
     },
     {
       "id": "edge-1766627167317",
       "source": "node-1766627120005",
       "target": "end",
       "sourceHandle": "right1",
       "targetHandle": "left"
     },
     {
       "id": "edge-1766627188300",
       "source": "node-1766627123081",
       "target": "end",
       "sourceHandle": "right1",
       "targetHandle": "left"
     },
     {
       "id": "edge-1766970657249",
       "source": "node-1766625792260",
       "target": "node-1766627120005",
       "sourceHandle": "out002",
       "targetHandle": "left"
     },
     {
       "id": "edge-1766970658549",
       "source": "node-1766625792260",
       "target": "node-1766627123081",
       "sourceHandle": "out003",
       "targetHandle": "left"
     }
   ],
   "nodes": [ // all nodes
     {
       "id": "start", // node id
       "type": "start", // start node
       "position": { // position on canvas
         "x": -213, // x coordinate
         "y": 107 // y coordinate
       },
       "data": { // internal data
         "config": { // point config
           "wires": { // output handles and their target node ids (except for special types, default handle is used)
             "default": [
               "node-1766625792260"
             ]
           }
         },
         "description": "START", // node description
         "id": "start", // node id
         "label": "START", // node title
         "status": "", // node status (reserved)
         "type": "start" // node type
       }
     },
     {
       "id": "end",
       "type": "end", // end node
       "position": {
         "x": 629,
         "y": 101
       },
       "data": {
         "config": {
           "wires": {
             "default": []
           }
         },
         "description": "END",
         "id": "end",
         "label": "END",
         "status": "",
         "type": "end"
       }
     },
     {
       "id": "node-1766625792260",
       "type": "custom", // custom node type
       "position": {
         "x": 25,
         "y": 106
       },
       "data": {
         "cardId": "function-2",
         "config": { // function-switch node, used for conditions
           "rule": [ // output handles and rule conditions
             {
               "name": "out001", // output handle name, matches wires
               "rule": [ // rules
                 {
                   "operator": "<=", // operator
                   "type": "variable", // type for this rule
                   "value": 5, // value
                   "variables": "X1" // variable name, matches the variables definition
                 }
               ],
               "type": "default" // reserved
             },
             {
               "name": "out002",
               "type": "default",
               "rule": [
                 {
                   "type": "variable",
                   "variables": "X1",
                   "operator": ">=",
                   "value": 49
                 },
                 {
                   "type": "relation", // relation operator to combine rules
                   "value": "And" // logical operator
                 },
                 {
                   "type": "variable",
                   "variables": "X1",
                   "value": 99,
                   "operator": "<"
                 }
               ]
             },
             {
               "name": "out003",
               "type": "default",
               "rule": [
                 {
                   "type": "variable",
                   "variables": "X1",
                   "operator": ">",
                   "value": 99
                 }
               ]
             }
           ],
           "variables": [ // parameter definitions
             {
               "instance_id": 1, // instance id for the point
               "instance_name": "battery_01", // instance name for the point
               "name": "X1", // default name used in rules
               "pointType": "measurement", // point type
               "point_name": "SOC", // point name
               "type": "single", // parameter type: single or combined
               "unit": "%", // unit
               "point_id": 3, // point id
               "formula": [] // when combined, records formula definition
             }
           ],
           "wires": { // for function-switch, multiple outputs map to next node ids
             "out001": [
               "node-1766627111063"
             ],
             "out002": [
               "node-1766627120005"
             ],
             "out003": [
               "node-1766627123081"
             ]
           }
         },
         "description": "Switch function",
         "id": "node-1766625792260",
         "label": "Switch Function",
         "type": "function-switch",
         "status": ""
       }
     },
     {
       "id": "node-1766627111063",
       "type": "custom",
       "position": {
         "x": 300,
         "y": -5
       },
       "data": {
         "cardId": "action-1",
         "config": {
           "rule": [ // rule config
             {
               "Variables": "X1", // defined variable
               "value": 42290 // assigned value
             },
             {
               "Variables": "X2",
               "value": 999
             }
           ],
           "variables": [
             {
               "formula": [],
               "instance_id": 2,
               "instance_name": "diesel_gen_01",
               "name": "X1",
               "pointType": "action",
               "point_id": 1,
               "point_name": "Start Inverter",
               "type": "single",
               "unit": ""
             },
             {
               "name": "X2",
               "type": "single",
               "instance_id": 4,
               "instance_name": "pv_01",
               "pointType": "action",
               "point_id": 5,
               "point_name": "Power Setpoint",
               "unit": "kW",
               "formula": []
             }
           ],
           "wires": {
             "default": [
               "end"
             ]
           }
         },
         "description": "The SOC is too low.",
         "id": "node-1766627111063",
         "label": "SOC low",
         "type": "action-changeValue", // this node type can execute actions or change point values
         "status": ""
       }
     },
     {
       "id": "node-1766627120005",
       "type": "custom",
       "position": {
         "x": 302,
         "y": 101
       },
       "data": {
         "cardId": "action-1",
         "config": {
           "rule": [
             {
               "Variables": "X1",
               "value": 42289
             },
             {
               "Variables": "X2",
               "value": 999
             }
           ],
           "variables": [
             {
               "name": "X1",
               "type": "single",
               "instance_id": 2,
               "instance_name": "diesel_gen_01",
               "pointType": "action",
               "point_id": 1,
               "point_name": "Start Inverter",
               "unit": "",
               "formula": []
             },
             {
               "name": "X2",
               "type": "single",
               "instance_id": 4,
               "instance_name": "pv_01",
               "pointType": "action",
               "point_id": 5,
               "point_name": "Power Setpoint",
               "unit": "kW",
               "formula": []
             }
           ],
           "wires": {
             "default": [
               "end"
             ]
           }
         },
         "description": "The SOC is normal.",
         "id": "node-1766627120005",
         "label": "SOC normal",
         "type": "action-changeValue",
         "status": ""
       }
     },
     {
       "id": "node-1766627123081",
       "type": "custom",
       "position": {
         "x": 297,
         "y": 219
       },
       "data": {
         "cardId": "action-1",
         "config": {
           "rule": [
             {
               "Variables": "X1",
               "value": "X2"
             }
           ],
           "variables": [
             {
               "name": "X1",
               "type": "single",
               "instance_id": 4,
               "instance_name": "pv_01",
               "pointType": "action",
               "point_id": 5,
               "point_name": "Power Setpoint",
               "unit": "kW",
               "formula": []
             },
             {
               "name": "X2",
               "type": "single",
               "instance_id": 3,
               "instance_name": "pcs_01",
               "pointType": "measurement",
               "point_id": 2,
               "point_name": "DC Power",
               "unit": "kW",
               "formula": []
             }
           ],
           "wires": {
             "default": [
               "end"
             ]
           }
         },
         "description": "The SOC is too high.",
         "id": "node-1766627123081",
         "label": "SOC high",
         "type": "action-changeValue",
         "status": ""
       }
     }
   ]
    },
    "format": "vue-flow",
    "id": "1", // rule id
    "name": "SOC Monitoring", // rule name
    "priority": 10 // priority
  }
  ```

5. Click **FullScreen** to enter full-screen mode.

6. Click **Exit Fullscreen** to exit.

## Edit Rule Flow

![11](../../../../public/images/Setting/Configuration/rule/11.png)

![12](../../../../public/images/Setting/Configuration/rule/12.png)

1. Click **Edit** to enter rule flow edit mode.

2. The cards below are custom function cards. Drag the required card onto the rule flow canvas. Different cards have different functions:

     - **Switch Function - Value condition card**
       ![13](../../../../public/images/Setting/Configuration/rule/13.png)
       This card is used to judge whether a point value meets a condition.
     - **Change Value - Data modification card**
       ![14](../../../../public/images/Setting/Configuration/rule/14.png)
       This card is used to modify a point value for an instance.

3. The rule flow canvas is where you configure cards and connections. Basic operations:

     - The canvas must include **Start** and **End** cards. **The rule flow must start with Start and end with End.**
     - The left handles on a card are inputs and can only be line endpoints; the right handles are outputs and can only be line starting points.
     - To delete, click a card or line and press **Backspace**. **Start and End cards cannot be deleted.**
     - Double-click a card to configure its parameters. Different card types have different data to edit:
       - **Switch Function - Value condition card**
         ![15](../../../../public/images/Setting/Configuration/rule/15.png)
       
         1. The first section is basic info: **label** is the card title, and **description** is the card description.
         2. The second section is parameter definition, where you declare parameters:
             ![16](../../../../public/images/Setting/Configuration/rule/16.png)
             Click the add button to create a parameter. Each parameter is named **X + auto-increment number**.
             Click the delete icon next to a parameter to remove it.
             Parameter definitions have two types: **single** and **combined**:

           * **single**: a single parameter. Select instance name, point type, and point name.
             ![17](../../../../public/images/Setting/Configuration/rule/17.png)
       
           * **combined**: a composite parameter. You can select existing parameters or enter numbers and combine them with operators `+`, `-`, `*`, `/`. Click the **green add icon** to add a calculation row, and click the **red delete icon** to remove a row.
             ![18](../../../../public/images/Setting/Configuration/rule/18.png)
         3. The third section is rule definition, where you define conditions:
             ![19](../../../../public/images/Setting/Configuration/rule/19.png)
             Click the **orange add icon** to add a rule. Each rule is named **out + auto-increment number**.
             Click the **delete icon** next to a rule to remove it.
             ![20](../../../../public/images/Setting/Configuration/rule/20.png)
             Based on parameter names defined above, you can compare parameters to other parameters or values. Click the green add icon to add an extra condition line and combine conditions (currently only **And** is supported, meaning both must be satisfied). Click the red delete button on a condition line to remove it.

           > Note: Each complete **out+xxx** rule generates a corresponding output handle on the node card. Only when the condition is satisfied will the flow proceed to the next node connected to that handle.
           > ![21](../../../../public/images/Setting/Configuration/rule/21.png)
       - **Change Value - Data modification card**
         ![22](../../../../public/images/Setting/Configuration/rule/22.png)
         
         1. The first section is basic info: **label** is the card title, and **description** is the card description.
         2. The second section is parameter definition, the same as in **Switch Function**.
         3. The third section is change-rule definition, where you modify instance point parameters.
             ![23](../../../../public/images/Setting/Configuration/rule/23.png)
             Click the **orange add icon** to add a change rule.
             Click the **delete icon** next to a rule to remove it.
             The modification rule uses left and right parameters: the left side is the target parameter to change; the right side is the new value or parameter. The left selector can only choose **single** parameters; the right selector can choose any defined parameter or a custom value.
4. Canvas controls from top to bottom: zoom in, zoom out, fit to canvas, disable/enable canvas interactions.
5. Rule flow save button. Save is enabled only when nodes/edges are added, modified, or deleted.
6. Rule flow cancel button. Cancel is enabled only when nodes/edges are added, modified, or deleted; it restores the last saved state.
7. **Fullscreen** button to enter full-screen edit mode.
8. **Import** button. Select a .json file to import a rule flow; **the .json format must match the exported format**.
9. **Cancel Edit** button to exit edit mode.


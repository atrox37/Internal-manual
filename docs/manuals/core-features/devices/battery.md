---
outline: deep
---

# Battery

## Overview

<img src="/images/Devices/battery/1.png" alt="1" style="max-width:100%; height:auto;" />

This page displays key battery indicators in a card list:

- **Status**: Battery charge/discharge status
- **SoC**: Battery state of charge
- **SoH**: Battery health
- **Voltage**: Current battery voltage
- **Current**: Current battery current
- **Power**: Current battery power
- **Max/Min/Avg Cell Voltage**: Max/min/average cell voltage
- **Cell Voltage Difference**: Maximum cell voltage difference
- **Avg Cell Temperature**: Average cell temperature

## Value Monitoring

<img src="/images/Devices/battery/2.png" alt="2" style="max-width:100%; height:auto;" />

This page includes tabs:

- **Battery**: Battery system (aggregated view at pack level or above)

  **PCS**: Power conversion system (bidirectional DC/AC conversion and grid interface control)


Each tab uses the "**Update Time + left/right tables**" layout, the same as the **PV** **Value Monitoring** page.

## Battery Management

<img src="/images/Devices/battery/3.png" alt="3" style="max-width:100%; height:auto;" />

This page mainly monitors **Voltage** and **Temperature** for all **Battery Cells**.

- Left: Shows voltage for all cells
  - The module header identifies which cells have the **maximum cell voltage** and **minimum cell voltage**.
  - The module body lists **#1~#N** (Battery Cell) voltages as cards.
- Right: Shows temperature for all cells
  - The module header identifies which cells have the **maximum cell temperature** and **minimum cell temperature**.
  - The module body lists **#1~#N** (Battery Cell) temperatures as cards.

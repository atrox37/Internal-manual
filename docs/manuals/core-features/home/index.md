---
outline: deep
---

# Home Page

The **Home** page mainly displays key data for the site and specific devices, and refreshes in real time with device status.

<img src="/images/home/1.png" alt="1" style="max-width:100%; height:auto;" />

1. The first section contains the site's energy overview cards, mainly showing statistics for **PV Energy**, **Diesel Energy**, **Energy Used**, and **Saving Billing**.

2. The second section is the microgrid topology diagram. It shows the direction of energy flow (device charge/discharge) and the key data of each device:

   - **PV**: `P` (real-time power,unit: kW)

   - **Load**: `P` (real-time power,unit: kW

   - **ESS**: `P` (real-time power,unit: kW), `SOC` (battery state of charge,unit: %)

   - **Diesel**: `P` (real-time power,unit: kW), `Oil` (real-time diesel fuel percentage,unit: %)

3. The third section is the power statistics curves for **PV** and **ESS**.

4. The fourth section is the energy bar chart for **Diesel**, **ESS**, and **PV**.

5. The fifth section is current site information statistics, covering current power for **PV** and **Diesel**, and the ESS's stored energy.

6. The sixth section is site device information statistics, showing **P (real-time power,unit: kW)** and **U (real-time voltage,unit: V)** for **PV**, **ESS**, and **Diesel Generator**. Users can switch devices using the left/right arrow buttons.

7. The seventh section contains site alarm information, showing active alarms with the following information (left-to-right)::

- Alarm device
- Alarm level (sorted by urgency: **L1>L2>L3**)

<img src="/images/home/3.png" alt="alarm level1" style="max-width:100%; height:auto;" /><img src="/images/home/4.png" alt="alarm level2" style="max-width:100%; height:auto;" /><img src="/images/home/5.png" alt="alarm level3" style="max-width:100%; height:auto;" />

* Alarm information

---
outline: deep
---

# UI Structure and Function Description
![1](../../../public/images/common/1.PNG)
The main home page of the user interface is divided into three parts:

- Left side: sidebar menu
  - Users can click the modules they want to open. **Devices**, **Alarm**, **Control**, and **Statistic** have secondary menus. The menu corresponding to the current page is highlighted. The menu items are as follows:

    <div style="display:flex; gap:16px; align-items:flex-start; flex-wrap:wrap;">
      <div style="min-width:260px; flex:1;">
        <ul>
          <li><strong>Home</strong> (Home page)</li>
          <li>
            <strong>Devices</strong> (Devices)
            <ul>
              <li><strong>PV</strong> (PV)</li>
              <li><strong>Battery</strong> (Battery / Energy Storage)</li>
              <li><strong>Diesel Generator</strong> (Diesel Generator)</li>
              <li><strong>Meter1</strong> (Meter 1)</li>
              <li><strong>Meter2</strong> (Meter 2)</li>
            </ul>
          </li>
          <li>
            <strong>Alarm</strong> (Alarms)
            <ul>
              <li><strong>Current Records</strong> (Current Alarms)</li>
              <li><strong>History Records</strong> (Historical Alarms)</li>
            </ul>
          </li>
          <li>
            <strong>Control</strong> (Control)
            <ul>
              <li><strong>Control Record</strong> (Control Records)</li>
            </ul>
          </li>
          <li>
            <strong>Statistics</strong> (Statistics)
            <ul>
              <li><strong>Overview</strong> (Overview)</li>
              <li><strong>Curves</strong> (Curves)</li>
              <li><strong>Operation Log</strong> (Operation Log)</li>
              <li><strong>Running Log</strong> (Running Log)</li>
            </ul>
          </li>
        </ul>
      </div>

      <img
        src="../../../public/images/common/2.png"
        alt="2"
        style="zoom:35%; display:block; max-width:100%;"
      />
    </div>
  - Users can resize the sidebar width via the zoom icon at the bottom-right of the sidebar.

  <span style="display:inline-flex; gap:40px; align-items:center; white-space:nowrap;">
    <img src="../../../public/images/common/3.png" alt="3" style="zoom:35%; display:inline-block;" />
    <img src="../../../public/images/common/4.png" alt="4" style="zoom:35%; display:inline-block;" />
  </span>
  
- Upper-right: top bar

  On the right side of the top bar there is a bell icon ![5](../../../public/images/common/5.png) (Notice):
  
  - A red badge indicates the number of current alarms.
  - Clicking it jumps to Alarm > Current Records (Current Alarms).


- Lower-right: main content area
  - Displays data for the current page.

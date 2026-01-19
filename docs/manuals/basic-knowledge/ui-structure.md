---
outline: deep
---

# UI Structure and Function Description

<img src="../../images/common/1.PNG" alt="1" style="max-width:100%; height:auto;" />

The main home page of the user interface is divided into three parts:

1. **Left side: Sidebar menu**

  - Users can click the modules they want to open. **Devices**, **Alarm**, **Control**, and **Statistic** have secondary menus. The menu corresponding to the current page is highlighted. The menu items are as follows:
    <div style="display:flex; gap:16px; align-items:flex-start; flex-wrap:wrap;">
      <div style="min-width:260px; flex:1;">
        <ul>
          <li><strong>Home</strong></li>
          <li>
            <strong>Devices</strong> 
            <ul>
              <li><strong>PV</strong></li>
              <li><strong>Battery</strong></li>
              <li><strong>Diesel Generator</strong></li>
              <li><strong>Meter1</strong></li>
              <li><strong>Meter2</strong></li>
            </ul>
          </li>
          <li>
            <strong>Alarm</strong>
            <ul>
              <li><strong>Current Records</strong> </li>
              <li><strong>History Records</strong></li>
            </ul>
          </li>
          <li>
            <strong>Control</strong>
            <ul>
              <li><strong>Control Record</strong></li>
            </ul>
          </li>
          <li>
            <strong>Statistics</strong>
            <ul>
              <li><strong>Overview</strong></li>
              <li><strong>Curves</strong></li>
              <li><strong>Operation Log</strong></li>
              <li><strong>Running Log</strong></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  
  - Users can resize the sidebar width via the zoom icon at the bottom-right of the sidebar.

  <span style="display:inline-flex; gap:40px; align-items:center; white-space:nowrap;">
    <img src="../../images/common/3.png" alt="3" style="zoom:35%; display:inline-block;" />
    <img src="../../images/common/4.png" alt="4" style="zoom:35%; display:inline-block;" />
  </span>

2. **Upper-right: Top bar**

  <img src="../../images/common/5.png" alt="5" style="max-width:100%; height:auto;" /> 

  On the right side of the top bar there is a bell icon (Notice):

  - A red badge indicates the number of current alarms.
  - Clicking it jumps to Alarm > Current Records (Current Alarms).


3. **Lower-right: Main content area**
  - Displays data for the current page.

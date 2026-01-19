---
outline: deep
---

# Channel Point Mapping

## Definition

Because different device vendors use different register addresses and protocol structures, the platform maps "device actual points" to a unified data model. Channel mapping is used to:

- Convert raw point to a unifies format

- Convert protocol addresses to platform standard addresses

- Multi-register merge, scaling, unit conversion, and more

  The platform converts device-level register data into a unified structure through mapping rules, providing standard input for historical data, alarms, and formula calculations.

## Field Description

Mappings differ by protocol:

**modbus_rtu/modbus_tcp**:

- `point_id`: Unique point ID (positive integer)
- `slave_id`: Slave ID in Modbus and similar protocols
- `data_type`:  Data type such as int16, uint16, int32, uint32, float32, int64, uint64, float64, bool
- `byte_order`: Byte order such as AB, BA, ABCD, CDAB, etc
- `function_code`: Register function code for different functions
  - `01`: Read Coils, for read/write 1-bit outputs
  - `02`: Read Discrete Inputs, for read-only 1-bit inputs
  - `03`: Read Holding Registers, for read/write 16-bit register data (setpoints/parameters)
  - `04`: Read Input Registers, for read-only 16-bit register data (measurements)
  - `05`: Write Single Coil, for writing one 1-bit output
  - `06`: Write Single Holding Register, for writing one 16-bit register value
  - `15`: Write Multiple Coils, for writing multiple 1-bit outputs in batch
  - `16`: Write Multiple Holding Registers, for writing multiple 16-bit register values in batch
- `register_address`: Register address where data is stored, usually 1-65535
- `bit_position`: Bit position of the real value, used for switch points, range 1-15

**di_do**:

- `point_id`: Unique point ID (positive integer)
- `gpio_number`: The global GPIO line number in Linux, allowing users to reference an IO line by a single number; not the same as the physical pin/chip pin.

**These items determine how the platform correctly parses raw device data into usable business data.**

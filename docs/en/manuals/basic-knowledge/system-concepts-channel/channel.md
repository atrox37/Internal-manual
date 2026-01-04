---
outline: deep
---

# Channel

## Definition
A channel is the **logical link** used to establish communication between a device (or gateway) and the platform, and includes the complete configuration required for read/write operations.
In simple terms, a channel defines:

- which protocol is used to communicate with the device;
- how to connect to the device;
- what parameters are used for read/write operations;
- how to keep the connection alive and retry on errors.
A channel is the foundation of device communication and a prerequisite for all point read/write operations.

## Configuration Items
**Basic Information:**

  - `id`: Unique identifier of the channel.
  - `name`: Channel name.
  - `description`: Channel description.
  - `protocol`: Protocol used by the channel. Supported protocols include `modbus_tcp`, `modbus_rtu`, and `di_do`.
  - `enabled`: Whether the channel is enabled.

**Parameters**:
Dynamically change based on **protocol**. Common parameters:

- **modbus_tcp**
    - `host`: Host address (IP/domain).
    - `port`: Port (default 502). Range: 1-65535.
    - `connect_timeout_ms`: Connection timeout (positive integer, milliseconds).
    - `read_timeout_ms`: Read timeout (positive integer, milliseconds).
- **modbus_rtu**
    - `device`: Serial device path (e.g., /dev/ttyS0, COM3)
    - `baud_rate`: Baud rate (typical values: 9600/19200/38400/115200)
    - `data_bits`: Data bits (commonly 8)
    - `stop_bits`: Stop bits (1 or 2)
    - `parity`: Parity (N=None, E=Even, O=Odd)
    - `connect_timeout_ms`: Connection timeout (positive integer, milliseconds)
    - `read_timeout_ms`: Read timeout (positive integer, milliseconds)
    - `retry_interval_ms`: Retry interval after read/write failure (positive integer, milliseconds)

**Running Status:**

- `connected`: Whether the channel is connected (Connected/Disconnected).
- `running`: Running status (Running/Stop).
- `last_update`: Last update time.
- `error_count`: Error count.
- `last_error`: Last error message.

**Point Counts:**

- `telemetry`: Telemetry point count.
- `signal`: Signal point count.
- `control`: Control point count.
- `adjustment`: Adjustment point count.

## Role of Channels
The entire communication process depends on channels, including:

- how the platform or gateway establishes connections (serial / TCP / RTU / Ethernet);
- how data is read from devices;
- how data is written or commands are issued to devices;
- how communication status is monitored and exceptions are handled.
In plain terms:
Channel = "link + protocol + parameters" required for device communication.

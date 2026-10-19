# System overview

Status: conceptual architecture; no transport, component, or numeric performance specification is finalized.

## Proposed data flow

```text
Electrical measurement points
           |
           v
Sensing hardware -> STM32 acquisition/diagnostics -> telemetry interface
                                                        |
                                      +-----------------+-----------------+
                                      v                                   v
                              Robot integration                    Diagnostics UI
```

The arrows describe information flow, not power wiring. Whether the UI receives data directly or through a robot/gateway is undecided. Control of power outputs is not assumed.

## Responsibilities

- Hardware: sensing, connectors, power supply interfaces, and documented protection boundaries.
- Firmware: acquisition, conversion into engineering units, validity/fault reporting, and telemetry production.
- FRC integration: consume telemetry through the selected robot-side interface and expose it to the robot application where appropriate.
- Web UI: display measurements, connection state, and data freshness.
- Tools: support reproducible development, capture, and analysis.

## Interface decisions to document

For each interface, specify producer and consumer, transport, schema/version, units, timestamp semantics, rate, validity, error handling, and compatibility. Do not assume CAN, USB, Ethernet, Wi-Fi, or a particular robot library until selected. Any future command path needs its own authority and failure-behavior definition.

Define behavior during startup, reset, disconnection, sensor failure, and stale data. Diagnostics must not be treated as a substitute for independently reviewed electrical protection.

See [system requirements](../requirements/system-requirements.md) and the [test plan](../../tests/README.md). Detailed schematics, firmware tasks, and deployment topology will follow design decisions.

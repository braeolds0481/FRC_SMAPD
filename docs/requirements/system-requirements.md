# System requirements

Status: initial proposal. These requirements express intended direction, not finalized specifications or claims of implemented capability.

## Purpose

Provide power diagnostics that help FRC students understand electrical behavior and troubleshoot a robot's electrical system. Whether the design supplements an existing distribution board or replaces any distribution functionality remains an open design decision.

## Proposed requirements

| ID | Proposed requirement | Planned verification / unresolved criteria |
| --- | --- | --- |
| SYS-001 | Make the selected power measurements available to users with documented units and validity. | Compare telemetry to bench reference instruments; quantities, ranges, and tolerances TBD. |
| SYS-002 | Identify stale, missing, and invalid measurements without presenting them as live valid values. | Disconnect and fault-injection tests; freshness threshold TBD. |
| SYS-003 | Support understandable diagnostics for student troubleshooting. | Demonstrate agreed user scenarios; display and accessibility criteria TBD. |
| SYS-004 | Document electrical connections, limits, and protection responsibilities before energized testing. | Schematic and procedure review; ratings and protection architecture TBD. |
| SYS-005 | Define a versioned interface for any robot or UI telemetry consumers. | Producer/consumer compatibility tests; transport and schema TBD. |
| SYS-006 | Document setup, calibration if required, operation, and reproducible builds. | A second contributor follows the relevant guide; tools and calibration method TBD. |

## Decisions needed before design freeze

- Supplement versus replacement scope; read-only diagnostics versus any control capability.
- Input supply range, channel count, current ratings, connector choices, measurement points, and thermal limits.
- Measurement accuracy, resolution, sample rate, reporting rate, and acceptable latency.
- STM32 part, board revision, sensing topology, isolation needs, and programming/debug connection.
- Communication transport, data schema, time base, fault handling, and robot-side language.
- UI framework, hosting location, supported clients, and any authentication needs.
- Applicable competition season and rules, and who will verify eligibility.
- Acceptance thresholds, test equipment, review owners, and release criteria.

Record each resolved decision with its rationale, source, reviewer, and date. Update the related test procedure before marking a requirement verified. This document makes no claim of competition approval or established electrical ratings.

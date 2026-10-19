# Operation and troubleshooting

Status: documentation outline, not an approved energization procedure.

Before hardware operation, this guide must be completed for the actual board revision with reviewed wiring diagrams, polarity, connectors, limits, protection, power-up/power-down steps, and required test equipment. No electrical ratings or safe energization settings have been established by this scaffold.

## Information to record

- Hardware revision, firmware revision, UI/integration version, and configuration.
- Measurement units, calibration status, expected update behavior, and fault indications.
- Connection state and whether displayed readings are live, stale, or invalid.
- Reproduction steps, timestamps, logs, and the expected versus observed result.

## Troubleshooting topics to complete

- Connection failures: verify the chosen transport and configuration using its documented procedure.
- Missing or stale readings: identify where acquisition or telemetry stopped; never interpret missing data as zero.
- Unexpected measurements: check the documented units, calibration, and measurement reference.
- Reset or fault indication: preserve diagnostic evidence and follow the approved hardware procedure before continuing.

Add verified recovery steps as the system is developed. Store reusable test procedures under [bench tests](../../tests/bench/README.md).

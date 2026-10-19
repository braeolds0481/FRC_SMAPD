# Firmware

Reserved for STM32/C firmware. The MCU, board configuration, toolchain version, scheduler, and communications stack remain undecided. No buildable firmware is included yet.

When a target is selected, add source and headers, startup code, linker scripts, required licensed dependencies, STM32 `.ioc` configuration, and reproducible build instructions. Preserve portable STM32CubeIDE metadata if used. Document generated versus hand-maintained code and regeneration steps.

Specify acquisition units, calibration, telemetry schema, data validity, reset behavior, and fault handling before integration. Add meaningful component tests under [tests/unit](../tests/unit/README.md). Keep generated binaries and build directories out of Git.

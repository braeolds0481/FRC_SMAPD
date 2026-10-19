# Getting started

Status: repository orientation. Hardware, firmware, and application setup commands are not yet available.

1. Read the root README and [contribution guide](../../CONTRIBUTING.md).
2. Review [proposed requirements](../requirements/system-requirements.md) and [system architecture](../architecture/system-overview.md).
3. Use the component directories for editable sources and component-specific instructions.
4. Read the [test plan](../../tests/README.md) before proposing validation.

## Toolchain decisions

Altium, STM32/C, a Node-based web toolchain, and Python utilities are anticipated by the repository layout and ignore rules. Specific versions, target devices, UI packages, and required dependencies are not selected here. Do not install an arbitrary toolchain based solely on this scaffold.

When a component is implemented, document its supported tool versions, dependency installation, build/test commands, expected output, configuration examples, and troubleshooting. Never place real credentials in example configuration.

See [operation and troubleshooting](operation-and-troubleshooting.md) for the information needed before hardware use.

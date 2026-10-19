# Contributing

This repository is an early-stage FRC smart power diagnostics project. Requirements and designs are provisional until reviewed and verified.

## Repository map

- `hardware/`: Altium design sources and hardware design notes.
- `firmware/`: STM32 firmware sources and build instructions once a target is selected.
- `web-ui/`: diagnostics interface sources once the UI stack is selected.
- `frc-integration/`: robot-side interfaces and examples once the protocol is selected.
- `tools/`: development, capture, analysis, and validation utilities.
- `docs/requirements/`: proposed requirements and open decisions.
- `docs/architecture/`: system boundaries, data flow, and interface decisions.
- `docs/user-guides/`: setup and operation documentation.
- `tests/`: test plans, component tests, integration tests, and bench procedures.

## Development workflow

1. Inspect `git status` and preserve any work already present.
2. Start a descriptive branch from the agreed base, for example `git switch -c docs/diagnostics-plan`.
3. Keep changes focused. Document assumptions and update relevant requirements or interfaces.
4. Run the checks appropriate to the change. Until executable tooling exists, review Markdown links, `git diff --check`, and the staged diff. Record checks that could not be run.
5. Stage specific paths with `git add <paths>`, then inspect `git diff --cached` before committing.
6. Commit with an imperative description, for example `git commit -m "Document telemetry interface proposal"`.
7. Push your branch with `git push -u origin <branch>` and open a pull request describing the change, validation, and unresolved decisions.

Do not commit credentials, machine-specific paths, dependencies, or generated build output. Commit dependency lockfiles, reproducible build configuration, STM32 `.ioc` files, linker scripts, and editable Altium sources when introduced. Keep necessary IDE project metadata portable. Add versioned libraries only with their license and provenance.

## Review and validation

Distinguish proposed behavior from implemented and verified behavior. Record units, validity, timestamps, and compatibility when changing telemetry. Hardware changes should include schematic/PCB review and a documented bench validation plan. Record tool versions and hardware revision with results. Never describe an unperformed test as passing.

Competition eligibility, electrical ratings, protection behavior, and safe operating procedures require separate review before robot use. Avoid adding numeric specifications until their source and acceptance criteria are recorded.

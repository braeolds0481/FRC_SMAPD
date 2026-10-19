# Test plan

Status: proposed validation structure. No executable tests or passing results are claimed.

- [Unit tests](unit/README.md): isolated firmware, UI, integration, or utility behavior.
- [Integration tests](integration/README.md): telemetry producer/consumer behavior across components.
- [Bench tests](bench/README.md): measurements and hardware behavior under a reviewed procedure.

For each test, record requirement ID, objective, prerequisites, source/hardware revisions, tool versions, procedure, expected result, actual result, and pass/fail/blocked status. Define measurable acceptance criteria before claiming verification. Track unresolved criteria in [system requirements](../docs/requirements/system-requirements.md).

Commit procedures and small sanitized fixtures. Generated reports go in ignored `test-results/` directories; retain reviewed evidence with the corresponding release or other documented artifact storage. Do not use a generated report as the only specification of expected behavior.

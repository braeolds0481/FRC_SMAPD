# Web UI

Reserved for the student-facing diagnostics interface. Framework, hosting, transport, authentication needs, and browser support are undecided. No runnable application is included yet.

When implemented, commit source, package manifest, dependency lockfile, and build/test instructions. Document telemetry schema, units, freshness, disconnected states, and invalid values. Keep credentials out of source; use a sanitized `.env.example` if configuration is needed. Dependencies and generated bundles are ignored.

Use [integration tests](../tests/integration/README.md) to verify behavior with representative valid, stale, missing, and malformed telemetry.

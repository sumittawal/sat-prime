# 10 — Packaging

Type: task
Status: ready-for-agent
Blocked by: 05, 07, 08, 14

## Goal

A publishable package with correct peers and entry points.

## Scope

- Peer deps in `projects/sat-prime/package.json`: `@angular/*`, `primeng`,
  `@primeuix/themes`, `@angular/cdk`.
- Ranges: Angular/PrimeNG `>=22.1.4 <23`; `@primeuix/themes` `^3.1`.
- Verify `sat-prime/theme` and `sat-prime/ui` exports in `dist`.
- `npm pack` smoke test; install the tarball into a scratch app and import both
  entry points.
- Confirm the empty primary entry point does not break consumers.

## Acceptance

- [ ] `ng build sat-prime` emits primary, `theme`, `ui`.
- [ ] `npm pack` tarball installs and resolves both subpaths.
- [ ] No dev-only dependency is declared as a runtime dependency.
- [ ] `peerDependenciesMeta` marks optional peers optional.

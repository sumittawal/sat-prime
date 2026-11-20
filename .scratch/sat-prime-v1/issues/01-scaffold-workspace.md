# 01 — Scaffold workspace and library

Type: task
Status: resolved
Blocked by: none

## Goal

A clean Angular 22 workspace containing the publishable `sat-prime` library and
the `SatPrimeDemo` app, both building.

## Scope

- `ng new sat-prime --create-application=false` (git init, no remote).
- `ng generate library sat-prime --prefix=sat`.
- `ng generate application SatPrimeDemo` (project key `SatPrimeDemo`, folder
  `sat-prime-demo`).
- Secondary entry points `theme` and `ui` declared with `ng-package.json`
  (ng-packagr discovers secondaries by `ng-package.json`, not `package.json`).
- `tsconfig.json` paths to entry-point sources for local dev.
- Install `primeng@22.1.4`, `@primeuix/themes@3.1.0`, `@angular/cdk@22`.
- `.nvmrc` pinned to Node 24.

## Acceptance

- [x] `ng build sat-prime` emits primary, `theme`, and `ui` entry points.
- [x] `ng build SatPrimeDemo --configuration development` succeeds.
- [x] No default placeholder component left in the library.

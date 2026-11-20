/**
 * `sat-prime` root entry point.
 *
 * The public surface lives in the secondary entry points:
 * - `sat-prime/theme` — `satPreset`, `provideSatUI()`
 * - `sat-prime/ui` — `SatLabel`, `SatInputText`,
 *   `SatConfirmDialog`, `SatConfirmation`, `SatToastMessage`, `SatToastService`
 *
 * ng-packagr cannot have the primary entry point re-export secondary
 * entry points without breaking its `rootDir`, so consumers import from
 * the subpaths above.
 */
export {};

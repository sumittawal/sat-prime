# ADR-0002: Projection-shell seam for forms

- Status: Superseded by ADR-0006 (`SatField` removed 2026-11-20)
- Date: 2026-11-05

## Context

Angular 22 ships multiple form APIs (Signal Forms, `ngModel`, Reactive Forms).
A field component that owns the model or implements `ControlValueAccessor` must
choose one and tends to break the others.

## Decision

`SatField` is a projection shell. It renders the label row, hint, error, and
required marker, and projects the real PrimeNG control via `<ng-content>`. It:

- does not implement `ControlValueAccessor`,
- does not own or read the model,
- does not read `NgControl`,
- does not import any Signal Forms API in library code.

Stories and tests may exercise Signal Forms, `ngModel`, and
`formControlName` to prove the seam.

## Consequences

- Every form API works without adapters.
- The shell cannot react to control validity by itself; callers pass `[error]`.
- Form-API churn in Angular does not affect the published library.

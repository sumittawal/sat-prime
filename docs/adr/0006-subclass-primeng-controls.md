# ADR-0006: Subclass PrimeNG controls (one `Sat*` class per control)

- Status: Accepted
- Date: 2026-11-20

## Context

Wrapping a PrimeNG control in our own component hides its inputs, outputs and
behaviour. We still need extras (first: a status dot) on the real control.

## Decision

- Each enhanced form control is **one class that extends the PrimeNG class**
  (e.g. `SatInputText extends InputText`, selector `input[satInputText]`). All
  enhancements are optional inputs on that one class; no per-feature variants.
- PrimeNG inputs/outputs/`ControlValueAccessor` handling are inherited, so every
  form API keeps working (ADR-0002 still holds).
- **No PrimeNG templates are overridden.** Visuals come from the preset's
  component `css` (ADR-0001). PrimeNG's decorator metadata is not inherited, so
  `providers` and `hostDirectives` are re-declared on the subclass.
- `SatField` is removed; ADR-0002 is superseded. Labels are plain `<label>`
  (optionally `satLabel`) or PrimeNG `p-floatlabel`.
- Status dot: `status` input (`SatDotTone`), independent of PrimeNG `invalid`.
  The dot is drawn inside the field by CSS; inside a `p-floatlabel` it is
  drawn on the floating label so it floats with it.

## Consequences

- Narrows AGENTS.md "wrappers need a reason": subclassing is the preferred way
  to extend a control; wrappers remain for non-control UI.
- Coupled to PrimeNG internals (base class, `InputTextStyle`, `PARENT_INSTANCE`,
  `Bind`). Each subclass has an integrity test that fails on upgrade (ADR-0004).
- `INPUTTEXT_INSTANCE` is not exported by PrimeNG, so it is not re-provided.
- Tier 1 (native-element directives): `SatInputText`, `SatTextarea`,
  `SatPassword` (extends `PasswordDirective`, not the `p-password` component) and
  `SatInputMask` (extends `InputMaskDirective`; `SatInputText` is a host directive
  because PrimeNG pairs the mask with `pInputText`). Password and InputMask have no
  PrimeNG toggle/strength/clear UI in this form.
- Tier 2 (components with templates): Angular cannot reuse a parent template in a
  subclass, and copying PrimeNG templates is an upgrade liability. These get a
  **directive on the PrimeNG element** (`<p-select satSelect status="...">`)
  extending the shared `SatStatus` base; PrimeNG inputs/outputs are untouched. The
  dot is preset CSS per component (`statusDotCss`) keyed on `data-sat-status`.
  Deferred: InputOtp, Listbox, ColorPicker (no single text field for the dot).
  AutoComplete multiple mode has no in-field dot yet.
- Confirm dialog: `SatConfirmDialog` is now a marker directive on
  `<p-confirmdialog>` (no wrapper component hiding PrimeNG inputs); tone icon colours
  come from classes `SatConfirmation` adds to the confirmation `icon`.
- Toast: `SatToast extends Toast` is impossible (PrimeNG's `ToastItem` is not
  exported, so its template cannot be copied). `p-toast` stays as is and
  `SatToastMessage` fills its `#message` template slot, adding the optional
  countdown ring; `SatToastService` wraps `MessageService`.

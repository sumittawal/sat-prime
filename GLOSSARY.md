# Glossary

Terms used across `sat-prime` code, docs, tickets, and tests.

## Preset

The theme object built with `definePreset(Aura, …)`. It is the single source of
truth for design values. Exported as **`satPreset`**.

## Token

A design value exposed by `@primeuix/themes`, addressed by a path such as
`form.field.padding.x` or `toast.border.width`. Tokens are the preferred
customisation seam.

- **Primitive token** — raw scale value (`blue.500`, `spacing.2`).
- **Semantic token** — meaning-level value referencing primitives
  (`form.field.padding.x`).
- **Component token** — per-component value (`datatable.body.cell.padding`).

## Component `css`

The `css` key inside a preset component section. Used only when a token cannot
express the change (for example a one-sided border). Preferred over a wrapper.

## Dot

The optional 8px decorative marker rendered before a label. Controlled by
`[dot]` (boolean) and `[dotTone]` on `label[satLabel]`. It is `aria-hidden`; it never carries
meaning without a text label.

## Status dot

`status` on `satInputText` (a `Tone`). Drawn inside the field, or on the floating
label inside `p-floatlabel`. Independent of PrimeNG `invalid`. See ADR-0006.

## Countdown ring

The optional circular timer in `SatToastMessage` (`countdown` or
`data: { countdown: true }`). Hidden for sticky messages, under reduced motion, and
when there is no life. Uses the severity colour (`currentColor`).

## Tone

One of `success`, `info`, `warning`, `neutral`. Maps to the corresponding
semantic colour. Used by the label dot and by confirmation/toast severity
mapping.

## Confirmation

A typed dialog request created through `SatConfirmation` (`success()`,
`info()`, `warning()`, `danger()`), rendered by `SatConfirmDialog` over
PrimeNG's `ConfirmationService`.

## Toast message

A transient notification. `SatToast` wraps PrimeNG Toast to add an optional
countdown ring; `SatToastService` wraps `MessageService` with typed helpers.

## Countdown

The optional circular progress ring on a toast, top-right and immediately left
of the close button. Its colour inherits the toast severity via `currentColor`.
Opt-in per component (`[countdown]="true"`) or per message
(`data: { countdown: true }`).

## Design delta

A value supplied by design that differs from the Aura default. Recorded in
`docs/design/deltas.md`.

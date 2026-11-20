# ADR-0005: Internal-only distribution + PrimeNG 22 licensing

## Context
Angular 22 + PrimeNG 22 (`primeng@22.1.4`) are no longer MIT-licensed; they use the **PrimeUI** commercial license model. Without a configured license key, PrimeNG shows a red **"Invalid PrimeUI License"** badge in the corner and logs `[PrimeUI] PrimeUI license is not configured.` in the console.

## Decision
- **The `sat-prime` library is internal-only.** It will not be published to npm.
- **Licensing is optional plumbing.** `provideSatUI()` accepts an optional `license` property (`license?: string`). The value is passed through to `providePrimeNG({ license })`; if omitted, PrimeNG behaves as if no key is set (badge + console warning). This satisfies the design requirement of making license configurable without forcing every consumer to supply one.
- **Community license** is free for eligible organisations (<5 developers, <10 employees, <$1M annual revenue, <$3M funding) and requires an annual key from PrimeUI.
- **Public redistribution** of a wrapper built on top of PrimeNG 22 requires an OEM/Enterprise PrimeUI key; the library therefore cannot be published publicly.
- **Design rule**: library code must not import Signal Forms; stories/tests may. Same applies to licensing — the `license` field is purely a pass-through; consumers may set it via environment variable `__PRIMEUI_LICENSE__` (wired in Storybook preview) or programmatically.

## Consequences
- No `npm publish` of `sat-prime`. The `SatPrimeDemo` app remains a local demo only.
- `definePreset` and all token/preset work unchanged; only the `provideSatUI` call site may carry a `license` string.
- The existing `AGENTS.md` declaration of “internal-only” is enforced by this decision.
- If a future org obtains a valid PrimeUI key, they can set the `PRIMEUI_LICENSE` env var; the Storybook config (`.storybook/main.ts`) already wires `define: { __PRIMEUI_LICENSE__: JSON.stringify(process.env.PRIMEUI_LICENSE ?? '') }` and `preview.ts` calls `provideSatUI({ license: __PRIMEUI_LICENSE__ || undefined })`.

## Related
- ADR-0004: upgrade guardrails (peer ranges, resolution tests).
- ADR-0001–0003: earlier architecture decisions (projection shell, code‑first tokens, no private seams).

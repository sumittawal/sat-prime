# 0005 — Internal-only library; PrimeUI licensing

Status: accepted

PrimeNG 22 is no longer MIT; it ships under a PrimeUI commercial license. Without a key
it logs `[PrimeUI] PrimeUI license is not configured.` and shows an "Invalid PrimeUI License" badge.
Community tier is free for small teams; public wrappers would need an OEM license.

## Decision

- `sat-prime` is **internal-only**; it is never published to npm.
- `provideSatUI({ license })` passes an optional key through to `providePrimeNG`. Consumers
  supply their own key; the library never embeds one.
- Storybook reads `PRIMEUI_LICENSE` from the environment (`__PRIMEUI_LICENSE__` define).

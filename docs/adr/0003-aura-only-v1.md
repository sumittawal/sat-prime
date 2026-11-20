# ADR-0003: Aura-only in v1

- Status: Accepted
- Date: 2026-11-05

## Context

`@primeuix/themes` ships Aura, Lara, Nora, Material, and compat presets. Each
has different token values and, in places, different token paths.

## Decision

`satPreset` is built on Aura only. `provideSatUI()` accepts options that leave
room for a future preset choice, but v1 does not guarantee or test other
presets.

## Consequences

- Design deltas are expressed against Aura's token tree.
- Supporting another preset later is a new preset module plus a token-resolution
  test matrix, not a breaking API change.
- Documentation must state Aura-only explicitly.

# 14 — SatToast with optional countdown

Type: task
Status: ready-for-agent
Blocked by: 05, 03

## Goal

A thin toast wrapper that adds an optional circular countdown ring without
reimplementing PrimeNG Toast.

## Scope

- `ng generate component ui/toast/sat-toast`.
- `ng generate service ui/toast/sat-toast` → `SatToastService`.
- Wrap `p-toast` with `pTemplate="message"`; mirror `key`, `position`, `life`,
  `mode`; add `[countdown]` (default false).
- Per-message opt-in: `data: { countdown: true }`.
- Duration: `message.life ?? toast.life`; `sticky` or no life → no ring.
- Ring: top-right, left of close, ~1.25rem, 2px stroke, `currentColor`,
  `aria-hidden`, pause on hover/focus, disabled under `prefers-reduced-motion`.
- Use `ToastClasses` constants; preserve `icon`, `closable`, `styleClass`,
  `contentStyleClass` behaviour.
- `SatToastService`: `success/info/warn/error`, `show()`, `clear()` over
  `MessageService`; typed `SatToastMessage`.
- Stories: on/off, all severities, pause/resume, reduced motion, axe.

## Acceptance

- [ ] Countdown ring uses the toast's severity colour.
- [ ] Ring is absent when countdown is off, sticky, or life is unset.
- [ ] Toast stack/motion/pause behaviour is PrimeNG's, not reimplemented.
- [ ] Raw `MessageService` + `p-toast` still work for consumers.
- [ ] Visual contract story guards the reused PrimeNG classes.

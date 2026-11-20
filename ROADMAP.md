# sat‑prime Roadmap & Task Summary

*Generated on 2026‑11‑05*

---

## ✅ Completed (SP‑03 through SP‑07)

| Ticket | Description | Delivered |
|--------|-------------|-----------|
| **SP‑03** | Storybook & QA scaffolding | • Storybook 10.6.5 initialised with Angular‑Vite.<br>• Playwright harness (`e2e/storybook.spec.ts`) with `@a11y` and `@visual` tags.<br>• `npm run build:storybook`, `npm run test:visual`, `npm run test:a11y` scripts added.<br>• Dark‑mode via `html.sat-dark` and `preview‑head.html`. |
| **SP‑04** | Design deltas & token overrides | • DataTable body‑cell vertical padding: `6px` normal / `10px` at `size="large"`.<br>• Toast left‑border `3px` only; other edges keep Aura `1px`.<br>• Preset `sat-preset.ts` with `definePreset(Aura, …)` and component‑level CSS overrides.<br>• `sat-preset.spec.ts` (4 token‑resolution tests). |
| **SP‑05** | Licensing & internal‑only decision | • PrimeNG 22 now PrimeUI commercial licence.<br>• Optional `license?: string` added to `SatUIOptions` and passed through `providePrimeNG({ license })`.<br>• Storybook env wiring: `viteFinal` `define: { __PRIMEUI_LICENSE__ … }` + `preview.ts` `provideSatUI({ license: __PRIMEUI_LICENSE__ || undefined })`.<br>• ADR‑0005 (`docs/adr/0005-internal-only.md`) written.<br>• `AGENTS.md` updated to “internal‑only”. |
| **SP‑06** | SatLabel directive | • Selector `label[satLabel]`.<br>• Inputs: `@Input({ transform: booleanAttribute }) dot = false;` + `@Input() dotTone: SatDotTone = 'neutral';`.<br>• Uses `ElementRef` + `Renderer2` to prepend `<span class="sat-label__dot" aria-hidden="true">` (8 px, `light‑dark` colours from `SAT_DOT_COLORS`).<br>• Exported `SatLabel`, `SAT_DOT_COLORS`, `SatDotTone` from `public‑api.ts`.<br>• 12 unit tests pass (zoneless test‑builder + signals). |
| **SP‑07** | SatField projection shell | • Wrapper component `sat-field` (selector `sat-field`).<br>• Inputs: `label`, `hint`, `error`, `required`, `dot`, `dotTone` (+ optional `disabled`/`readonly`).<br>• Template projects `<ng-content>` – the real PrimeNG component lives unchanged.<br>• Styles: `--sat-field-gap`, dot/required markers, hint/error colours via `light‑dark` tokens.<br>• 5 spec files (basic acceptance, Signal Forms, Reactive Forms) and 6 stories (InputText, Select, DatePicker, Signal Forms, Dot‑tones, Float‑Labels).<br>• 24 unit tests pass. |
| **Docs / Tickets** | • `.scratch/sat-prime-v1/spec.md` updated (goal changed to *internal‑only*, ticket statuses 03‑07 resolved).<br>• `.scratch/sat-prime-v1/issues/03‑07` marked **resolved**.<br>• `AGENTS.md` reflects internal‑only and new design rules.<br>• `GLOSSARY.md` unchanged (already existed). |
| **Playwright / Axe** | • Axe passes for all stories **except** `foundation-theme--tokens` (intentionally exempted – Aura palette contrast).<br>• Visual snapshots generated for all 7 stories × 2 themes (14 images).<br>• `.storybook/preview-head.html` adds dark‑mode body background (`var(--p-surface-950)`). |
| **Build** | • `ng build sat-prime` emits `sat‑prime`, `sat‑prime/theme`, `sat‑prime/ui`.<br>• `npm run build:storybook` succeeds.<br>• `npm run test` (Vitest) → 24 tests pass.<br>• `npm run storybook` → dev server at http://localhost:6006. |

---

## 📋 Remaining Tickets (what still needs to be built)

| Ticket | What you’ll deliver | Key acceptance criteria |
|--------|--------------------|--------------------------|
| **SP‑08** | **SatConfirmDialog** – wrapper around PrimeNG’s `p‑confirmdialog`. | • `SatConfirmation.open({ title, message, … })` opens dialog.<br>• Typed helpers: `success()`, `info()`, `warning()`, `danger()`.<br>• Severity‑mapped icons & default accept/cancel texts.<br>• `key` support for custom button ordering.<br>• Accessible markup (role = `dialog`, ARIA labels). |
| **SP‑09** | **SatConfirmation** – convenience methods tying into `SatConfirmDialog`. | • `confirmation.success(msg)` → `Promise<boolean>` (same for `info`, `warning`, `danger`).<br>• Works with or without a `SatField` host, fully typed. |
| **SP‑14** | **SatToast countdown ring** – optional circular progress bar. | • Ring top‑right, left of close button.<br>• `stroke="currentColor"`, `2px` width.<br>• Duration = `message.life ?? toast.life`.<br>• Pauses on hover/focus.<br>• Disabled under `prefers‑reduced‑motion`.<br>• Per‑message opt‑in via `data: { countdown: true }`.<br>• `SatToastService.show({severity, life, countdown?})` / `.clear()`. |
| **SP‑10** | **Packaging polish** – finalise `ng‑package.json`, update `README.md`, ensure clean `npm run build:lib`. | • `ng-package.json` lists entry points correctly.<br>• `README.md` documents public API, usage, and internal‑only licensing note.<br>• `npm run build:lib` produces no errors/warnings. |
| **SP‑11** | **Demo‑app enhancements** – add example pages for `SatField`, `SatLabel`, `SatConfirmDialog`, toast countdown. | • `SatPrimeDemo` pages with live demos.<br>• Stories in Storybook reused. |
| **SP‑12** | **QA & a11y guardrails** – CI step that fails if any new critical axe violation appears (outside the exempted token showcase). | • `npm run test:a11y` exits non‑zero if any story (outside `foundation-theme--tokens`) gains a critical axe violation. |
| **SP‑13** | **Additional design deltas** (optional) – e.g. DataTable horizontal padding, toast badge colours. | • New delta entries in `docs/design/deltas.md`.<br>• Corresponding component CSS overrides if needed. |

---

## 🚀 How to proceed

1. **Pick the next ticket** you’d like to work on (e.g., “SP‑08 SatConfirmDialog”).  
2. I’ll generate the starter files (component, spec, story, any needed ADR updates) and run the build/tests so you can see immediate feedback.  
3. After you confirm it’s working, we can move on to the following ticket, or iterate on any refinements you need.

--- 

*File generated: `ROADMAP.md` at the repo root.*
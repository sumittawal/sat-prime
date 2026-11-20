import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

/**
 * DataTable body cells use a vertical-only override so Aura's horizontal
 * padding (and the `sm` size) stay token-driven. See docs/design/deltas.md.
 */
const datatableCss = `
  .p-datatable:not(.p-datatable-sm):not(.p-datatable-lg) .p-datatable-tbody > tr > td {
    padding-block: 6px;
  }
  .p-datatable.p-datatable-lg:not(.p-datatable-sm) .p-datatable-tbody > tr > td {
    padding-block: 10px;
  }
`;

/**
 * A token cannot express a single-sided border width, so the left accent is a
 * component CSS override. The other edges keep Aura's 1px and the severity
 * border colour is untouched.
 */
const toastCss = `
  .p-toast .p-toast-message {
    border-left-width: 3px;
  }
  /* Countdown ring from SatToastMessage; currentColor is the severity colour. */
  .sat-toast-ring {
    flex: none;
    inline-size: 1.25rem;
    block-size: 1.25rem;
    transform: rotate(-90deg);
  }
  .sat-toast-ring circle {
    stroke-dashoffset: 0;
    animation: sat-toast-countdown var(--sat-toast-ring-ms, 3000ms) linear forwards;
  }
  .p-toast-message:hover .sat-toast-ring circle,
  .p-toast-message:focus-within .sat-toast-ring circle {
    animation-play-state: paused;
  }
  @keyframes sat-toast-countdown {
    to { stroke-dashoffset: 56.55; }
  }
  @media (prefers-reduced-motion: reduce) {
    .sat-toast-ring { display: none; }
  }
`;

/**
 * Status dot inside the field (SatInputText). Longhands only, so Aura's
 * `background` token is untouched. Hidden inside a floating label
 * container, where the dot is drawn on the label instead (ADR-0006).
 */
const statusRoots = [
  '.p-inputtext',
  '.p-textarea',
  '.p-select',
  '.p-multiselect',
  '.p-autocomplete',
  '.p-datepicker',
  '.p-inputnumber',
  '.p-cascadeselect',
  '.p-treeselect',
].join(', ');

const dotImage = `
    background-image: radial-gradient(circle, var(--sat-dot-color) 0 calc(var(--sat-dot-size, 8px) / 2), transparent calc(var(--sat-dot-size, 8px) / 2 + 0.5px));
    background-repeat: no-repeat;
    background-size: var(--sat-dot-size, 8px) var(--sat-dot-size, 8px);
    background-position: left var(--p-form-field-padding-x) center;`;
const dotPad = 'calc(var(--p-form-field-padding-x) + var(--sat-dot-size, 8px) + 0.5rem)';

/**
 * Status dot for PrimeNG components (SatStatus directive, `data-sat-status` on
 * the host). `root` is the host class, `field` the inner element carrying the
 * text. When the host draws the border/background (`onRoot`) the dot goes on
 * the host; otherwise on the inner input, whose own background would hide it.
 * Inside a floating label the dot is on the label instead.
 */
const statusDotCss = (root: string, field: string, onRoot: boolean) => `
  ${onRoot ? `${root}[data-sat-status] {${dotImage}\n  }\n  ${root}[data-sat-status]:dir(rtl) { background-position: right var(--p-form-field-padding-x) center; }` : ''}
  ${root}[data-sat-status] ${field} {
    ${onRoot ? '' : dotImage}
    padding-inline-start: ${dotPad};
  }
  ${onRoot ? '' : `${root}[data-sat-status] ${field}:dir(rtl) { background-position: right var(--p-form-field-padding-x) center; }`}
  .p-floatlabel ${root}[data-sat-status],
  .p-floatlabel ${root}[data-sat-status] ${field} {
    background-image: none;
  }
  .p-floatlabel ${root}[data-sat-status] ${field} {
    padding-inline-start: var(--p-form-field-padding-x);
  }
`;

const inputtextCss = `
  .p-inputtext[data-sat-status] {
    background-image: radial-gradient(circle, var(--sat-dot-color) 0 calc(var(--sat-dot-size, 8px) / 2), transparent calc(var(--sat-dot-size, 8px) / 2 + 0.5px));
    background-repeat: no-repeat;
    background-size: var(--sat-dot-size, 8px) var(--sat-dot-size, 8px);
    background-position: left var(--p-form-field-padding-x) center;
    padding-inline-start: calc(var(--p-form-field-padding-x) + var(--sat-dot-size, 8px) + 0.5rem);
  }
  .p-inputtext[data-sat-status]:dir(rtl) {
    background-position: right var(--p-form-field-padding-x) center;
  }
  /* Native fields only: composite hosts reset their inner field in statusDotCss. */
  .p-floatlabel :is(.p-inputtext, .p-textarea)[data-sat-status] {
    background-image: none;
    padding-inline-start: var(--p-form-field-padding-x);
  }
  /* Floating label: the dot is the label's ::before so it floats with it.
     A sibling label cannot read the input's --sat-dot-color, so tone colours
     are repeated here; keep in sync with SAT_DOT_COLORS (ui/sat-label). */
  .p-floatlabel:has(:is(${statusRoots})[data-sat-status]) label {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
  }
  .p-floatlabel:has(:is(${statusRoots})[data-sat-status]) label::before {
    content: '';
    flex: none;
    inline-size: var(--sat-dot-size, 8px);
    block-size: var(--sat-dot-size, 8px);
    border-radius: 9999px;
    background: var(--sat-dot-color);
  }
  .p-floatlabel:has(:is(${statusRoots})[data-sat-status='success']) { --sat-dot-color: light-dark(var(--p-green-500, #22c55e), var(--p-green-400, #4ade80)); }
  .p-floatlabel:has(:is(${statusRoots})[data-sat-status='info']) { --sat-dot-color: light-dark(var(--p-blue-500, #3b82f6), var(--p-blue-400, #60a5fa)); }
  .p-floatlabel:has(:is(${statusRoots})[data-sat-status='warning']) { --sat-dot-color: light-dark(var(--p-amber-500, #f59e0b), var(--p-amber-400, #fbbf24)); }
  .p-floatlabel:has(:is(${statusRoots})[data-sat-status='neutral']) { --sat-dot-color: var(--p-text-muted-color, #71717a); }
`;

/** Tone-coloured confirm icons; classes are added by SatConfirmation. */
const confirmdialogCss = `
  .p-confirmdialog-icon.sat-confirm-icon-success { color: light-dark(var(--p-green-500, #22c55e), var(--p-green-400, #4ade80)); }
  .p-confirmdialog-icon.sat-confirm-icon-info { color: light-dark(var(--p-blue-500, #3b82f6), var(--p-blue-400, #60a5fa)); }
  .p-confirmdialog-icon.sat-confirm-icon-warning { color: light-dark(var(--p-amber-500, #f59e0b), var(--p-amber-400, #fbbf24)); }
  .p-confirmdialog-icon.sat-confirm-icon-danger { color: light-dark(var(--p-red-500, #ef4444), var(--p-red-400, #f87171)); }
`;

export const satPreset = definePreset(Aura, {
  components: {
    inputtext: {
      css: inputtextCss,
    },
    confirmdialog: { css: confirmdialogCss },
    select: { css: statusDotCss('.p-select', '.p-select-label', true) },
    multiselect: { css: statusDotCss('.p-multiselect', '.p-multiselect-label', true) },
    cascadeselect: { css: statusDotCss('.p-cascadeselect', '.p-cascadeselect-label', true) },
    treeselect: { css: statusDotCss('.p-treeselect', '.p-treeselect-label', true) },
    autocomplete: { css: statusDotCss('.p-autocomplete', '.p-autocomplete-input', false) },
    datepicker: { css: statusDotCss('.p-datepicker', '.p-datepicker-input', false) },
    inputnumber: { css: statusDotCss('.p-inputnumber', '.p-inputnumber-input', false) },
    textarea: {
      // Dot sits at the top-start corner; same selector shape as inputtext.
      css: `
        .p-textarea[data-sat-status] {
          background-image: radial-gradient(circle, var(--sat-dot-color) 0 calc(var(--sat-dot-size, 8px) / 2), transparent calc(var(--sat-dot-size, 8px) / 2 + 0.5px));
          background-repeat: no-repeat;
          background-size: var(--sat-dot-size, 8px) var(--sat-dot-size, 8px);
          background-position: left var(--p-form-field-padding-x) top calc(var(--p-form-field-padding-y) + 0.4em);
          padding-inline-start: calc(var(--p-form-field-padding-x) + var(--sat-dot-size, 8px) + 0.5rem);
        }
        .p-textarea[data-sat-status]:dir(rtl) {
          background-position: right var(--p-form-field-padding-x) top calc(var(--p-form-field-padding-y) + 0.4em);
        }
      `,
    },
    datatable: {
      css: datatableCss,
    },
    toast: {
      css: toastCss,
    },
  },
});

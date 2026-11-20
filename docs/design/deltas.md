# Design deltas

Values supplied by design that differ from Aura's defaults. Anything not listed
here keeps the Aura (light and dark) value.

## Confirmed

| Area | Delta | Implementation seam |
| --- | --- | --- |
| Spacing | None. Existing values are already multiples of 2px. | Do not override spacing tokens. |
| DataTable body cells | Vertical padding `6px` at normal size, `10px` at `size="large"`. Horizontal padding unchanged. `size="small"` stays at Aura's `2px`. | Component `css` with `padding-block` (not the `bodyCell.padding` shorthand). |
| Toast border | `3px` on the left edge only. The other three edges keep Aura's `1px`. Severity border colours unchanged. | Component `css`: `.p-toast-message { border-left-width: 3px; }`. |
| Toast width / radius / colours | Aura defaults accepted, light and dark. | None. |
| DataTable header / borders / hover / selected | Aura defaults accepted, light and dark. | None. |
| Toast countdown ring | Optional. Circular progress, top-right, immediately left of the close button, ~1.25rem, 2px stroke, severity colour. | `SatToast` custom message template; `stroke="currentColor"`. |
| App name | `SatPrimeDemo` (Angular project key `SatPrimeDemo`, folder `sat-prime-demo`). | `angular.json`. |

## Open

None.

## Intake template (for future deltas)

Use this whenever a new supplied value arrives:

- **Area** (spacing / field / toast / table / other):
- **Default being changed** (token path or component behaviour):
- **Value, light**:
- **Value, dark**:
- **Sizes affected** (normal / sm / lg):
- **Screenshot or node link**:
- **Can a token express it?** If yes, token path. If no, component `css` or a
  wrapper — and why the wrapper is unavoidable.

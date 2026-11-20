import type { Meta, StoryObj } from '@storybook/angular-vite';
import { FloatLabel } from 'primeng/floatlabel';
import { SatInputMask } from './sat-input-mask';

const meta: Meta = {
  title: 'UI/SatInputMask',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: "`SatInputMask` adds a status dot to PrimeNG's [InputMask](https://primeng.org/inputmask). Every PrimeNG input, output and form integration works unchanged; see the [PrimeNG InputMask documentation](https://primeng.org/inputmask) for the base API.\n\n### Usage\n\n```html\n<input satInputMask mask=\"99-99-9999\" status=\"success\" />\n```\n\n### Added properties\n\n| Property | Type | Default | Description |\n|---|---|---|---|\n| `status` | `'success' \\| 'info' \\| 'warning' \\| 'neutral' \\| null` | `null` | Shows a status dot using the Aura palette (light/dark aware). Independent of PrimeNG's `invalid` state. |\n\n### Notes\n\n- Extends PrimeNG's `InputMaskDirective` (`pInputMask`), used **instead of** `pInputMask pInputText`.\n- `SatInputText` is attached as a host directive, so `pSize`, `variant`, `fluid` and `invalid` are also available, besides the mask's own inputs.\n- With a PrimeNG `p-floatlabel variant=\"on\"` ([FloatLabel docs](https://primeng.org/floatlabel)) the dot moves onto the floating label so it floats with it.\n- The dot is decorative (`aria-hidden` semantics): it never replaces a text label or error message." } },
  },
};

export default meta;
type Story = StoryObj;

export const StatusDots: Story = {
  render: () => ({
    moduleMetadata: { imports: [SatInputMask] },
    styles: ['.sat-story { width: 22rem; display: grid; gap: 1rem; }'],
    template: `
      <div class="sat-story">
        <input satInputMask mask="99-99-9999" placeholder="dd-mm-yyyy" status="success" aria-label="success" />
        <input satInputMask mask="99-99-9999" placeholder="dd-mm-yyyy" status="warning" aria-label="warning" />
        <input satInputMask mask="99-99-9999" placeholder="dd-mm-yyyy" status="info" [invalid]="true" aria-label="invalid" />
      </div>
    `,
  }),
};

export const FloatingLabel: Story = {
  render: () => ({
    moduleMetadata: { imports: [SatInputMask, FloatLabel] },
    styles: ['.sat-story { width: 22rem; }'],
    template: `
      <div class="sat-story">
        <p-floatlabel variant="on">
          <input satInputMask mask="99-99-9999" placeholder="dd-mm-yyyy" id="float-input-mask" status="success" />
          <label for="float-input-mask">Date (masked)</label>
        </p-floatlabel>
      </div>
    `,
  }),
};

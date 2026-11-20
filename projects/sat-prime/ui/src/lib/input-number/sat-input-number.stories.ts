import type { Meta, StoryObj } from '@storybook/angular-vite';
import { FloatLabel } from 'primeng/floatlabel';
import { InputNumber } from 'primeng/inputnumber';
import { SatInputNumber } from './sat-input-number';

const meta: Meta = {
  title: 'UI/SatInputNumber',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: "`SatInputNumber` adds a status dot to PrimeNG's [InputNumber](https://primeng.org/inputnumber). Every PrimeNG input, output and form integration works unchanged; see the [PrimeNG InputNumber documentation](https://primeng.org/inputnumber) for the base API.\n\n### Usage\n\n```html\n<p-inputnumber satInputNumber status=\"success\" />\n```\n\n### Added properties\n\n| Property | Type | Default | Description |\n|---|---|---|---|\n| `status` | `'success' \\| 'info' \\| 'warning' \\| 'neutral' \\| null` | `null` | Shows a status dot using the Aura palette (light/dark aware). Independent of PrimeNG's `invalid` state. |\n\n### Notes\n\n- A directive added to `<p-inputnumber>`; all PrimeNG inputs and outputs are unchanged.\n- With a PrimeNG `p-floatlabel variant=\"on\"` ([FloatLabel docs](https://primeng.org/floatlabel)) the dot moves onto the floating label so it floats with it.\n- The dot is decorative (`aria-hidden` semantics): it never replaces a text label or error message." } },
  },
};

export default meta;
type Story = StoryObj;

const opts = [{ n: 'One' }, { n: 'Two' }];

export const StatusDots: Story = {
  render: () => ({
    props: { opts },
    moduleMetadata: { imports: [InputNumber, SatInputNumber] },
    styles: ['.sat-story { width: 22rem; display: grid; gap: 1rem; }'],
    template: `
      <div class="sat-story">
        <p-inputnumber satInputNumber  status="success" />
        <p-inputnumber satInputNumber  status="warning" />
        <p-inputnumber satInputNumber  status="info" [invalid]="true" />
      </div>
    `,
  }),
};

export const FloatingLabel: Story = {
  render: () => ({
    props: { opts },
    moduleMetadata: { imports: [InputNumber, SatInputNumber, FloatLabel] },
    styles: ['.sat-story { width: 22rem; }'],
    template: `
      <div class="sat-story">
        <p-floatlabel variant="on">
          <p-inputnumber satInputNumber  inputId="f" status="success" />
          <label for="f">Label</label>
        </p-floatlabel>
      </div>
    `,
  }),
};

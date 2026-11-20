import type { Meta, StoryObj } from '@storybook/angular-vite';
import { FloatLabel } from 'primeng/floatlabel';
import { SatLabel } from '../field/sat-label/sat-label';
import { SatInputText } from './sat-input-text';

const meta: Meta = {
  title: 'UI/SatInputText',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: "`SatInputText` adds a status dot to PrimeNG's [InputText](https://primeng.org/inputtext). Every PrimeNG input, output and form integration works unchanged; see the [PrimeNG InputText documentation](https://primeng.org/inputtext) for the base API.\n\n### Usage\n\n```html\n<input satInputText status=\"success\" />\n```\n\n### Added properties\n\n| Property | Type | Default | Description |\n|---|---|---|---|\n| `status` | `'success' \\| 'info' \\| 'warning' \\| 'neutral' \\| null` | `null` | Shows a status dot using the Aura palette (light/dark aware). Independent of PrimeNG's `invalid` state. |\n\n### Notes\n\n- Used **instead of** `pInputText` (it extends PrimeNG's `InputText`), not together with it.\n- The dot is drawn inside the field, at the start.\n- With a PrimeNG `p-floatlabel variant=\"on\"` ([FloatLabel docs](https://primeng.org/floatlabel)) the dot moves onto the floating label so it floats with it.\n- The dot is decorative (`aria-hidden` semantics): it never replaces a text label or error message." } },
  },
};

export default meta;
type Story = StoryObj;

export const StatusDots: Story = {
  render: () => ({
    moduleMetadata: { imports: [SatLabel, SatInputText] },
    styles: ['.sat-story { width: 22rem; display: grid; gap: 1rem; }'],
    template: `
      <div class="sat-story">
        <label satLabel dot dotTone="success" for="a">Plain label (satLabel dot)</label>
        <input satInputText id="a" status="success" placeholder="Acme" />
        <input satInputText status="info" placeholder="No label (dot in field)" aria-label="info" />
        <input satInputText status="warning" placeholder="Warning" aria-label="warning" />
        <input satInputText status="neutral" placeholder="Neutral" aria-label="neutral" />
        <input satInputText status="success" [invalid]="true" placeholder="Status + invalid" aria-label="invalid" />
        <input satInputText status="info" pSize="small" placeholder="Small" aria-label="small" />
        <input satInputText status="info" pSize="large" placeholder="Large" aria-label="large" />
      </div>
    `,
  }),
};

export const FloatingLabel: Story = {
  render: () => ({
    moduleMetadata: { imports: [SatInputText, FloatLabel] },
    styles: ['.sat-story { width: 22rem; display: grid; gap: 1.5rem; }'],
    template: `
      <div class="sat-story">
        <p-floatlabel variant="on">
          <input satInputText id="float-plain" />
          <label for="float-plain">Workspace name</label>
        </p-floatlabel>
        <p-floatlabel variant="on">
          <input satInputText id="float-status" status="success" />
          <label for="float-status">Workspace name (status)</label>
        </p-floatlabel>
      </div>
    `,
  }),
};

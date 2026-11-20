import type { Meta, StoryObj } from '@storybook/angular-vite';
import { FloatLabel } from 'primeng/floatlabel';
import { SatTextarea } from './sat-textarea';

const meta: Meta = {
  title: 'UI/SatTextarea',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: "`SatTextarea` adds a status dot to PrimeNG's [Textarea](https://primeng.org/textarea). Every PrimeNG input, output and form integration works unchanged; see the [PrimeNG Textarea documentation](https://primeng.org/textarea) for the base API.\n\n### Usage\n\n```html\n<textarea satTextarea status=\"success\"></textarea>\n```\n\n### Added properties\n\n| Property | Type | Default | Description |\n|---|---|---|---|\n| `status` | `'success' \\| 'info' \\| 'warning' \\| 'neutral' \\| null` | `null` | Shows a status dot using the Aura palette (light/dark aware). Independent of PrimeNG's `invalid` state. |\n\n### Notes\n\n- Used **instead of** `pTextarea` (it extends PrimeNG's `Textarea`).\n- The dot sits at the top-start corner.\n- With a PrimeNG `p-floatlabel variant=\"on\"` ([FloatLabel docs](https://primeng.org/floatlabel)) the dot moves onto the floating label so it floats with it.\n- The dot is decorative (`aria-hidden` semantics): it never replaces a text label or error message." } },
  },
};

export default meta;
type Story = StoryObj;

export const StatusDots: Story = {
  render: () => ({
    moduleMetadata: { imports: [SatTextarea] },
    styles: ['.sat-story { width: 22rem; display: grid; gap: 1rem; }'],
    template: `
      <div class="sat-story">
        <textarea satTextarea status="success" rows="3" placeholder="Success" aria-label="success"></textarea>
        <textarea satTextarea status="warning" rows="3" placeholder="Warning" aria-label="warning"></textarea>
        <textarea satTextarea status="info" [invalid]="true" rows="3" placeholder="Status + invalid" aria-label="invalid"></textarea>
      </div>
    `,
  }),
};

export const FloatingLabel: Story = {
  render: () => ({
    moduleMetadata: { imports: [SatTextarea, FloatLabel] },
    styles: ['.sat-story { width: 22rem; display: grid; gap: 1.5rem; }'],
    template: `
      <div class="sat-story">
        <p-floatlabel variant="on">
          <textarea satTextarea id="float-ta" status="success" rows="3"></textarea>
          <label for="float-ta">Description</label>
        </p-floatlabel>
      </div>
    `,
  }),
};

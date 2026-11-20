import type { Meta, StoryObj } from '@storybook/angular-vite';
import { FloatLabel } from 'primeng/floatlabel';
import { AutoComplete } from 'primeng/autocomplete';
import { SatAutoComplete } from './sat-auto-complete';

const meta: Meta = {
  title: 'UI/SatAutoComplete',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: "`SatAutoComplete` adds a status dot to PrimeNG's [AutoComplete](https://primeng.org/autocomplete). Every PrimeNG input, output and form integration works unchanged; see the [PrimeNG AutoComplete documentation](https://primeng.org/autocomplete) for the base API.\n\n### Usage\n\n```html\n<p-autocomplete satAutoComplete [suggestions]=\"items\" status=\"success\" />\n```\n\n### Added properties\n\n| Property | Type | Default | Description |\n|---|---|---|---|\n| `status` | `'success' \\| 'info' \\| 'warning' \\| 'neutral' \\| null` | `null` | Shows a status dot using the Aura palette (light/dark aware). Independent of PrimeNG's `invalid` state. |\n\n### Notes\n\n- A directive added to `<p-autocomplete>`; all PrimeNG inputs and outputs are unchanged.\n- `multiple` mode has no in-field dot yet.\n- With a PrimeNG `p-floatlabel variant=\"on\"` ([FloatLabel docs](https://primeng.org/floatlabel)) the dot moves onto the floating label so it floats with it.\n- The dot is decorative (`aria-hidden` semantics): it never replaces a text label or error message." } },
  },
};

export default meta;
type Story = StoryObj;

const opts = [{ n: 'One' }, { n: 'Two' }];

export const StatusDots: Story = {
  render: () => ({
    props: { opts },
    moduleMetadata: { imports: [AutoComplete, SatAutoComplete] },
    styles: ['.sat-story { width: 22rem; display: grid; gap: 1rem; }'],
    template: `
      <div class="sat-story">
        <p-autocomplete satAutoComplete [suggestions]="[]" status="success" />
        <p-autocomplete satAutoComplete [suggestions]="[]" status="warning" />
        <p-autocomplete satAutoComplete [suggestions]="[]" status="info" [invalid]="true" />
      </div>
    `,
  }),
};

export const FloatingLabel: Story = {
  render: () => ({
    props: { opts },
    moduleMetadata: { imports: [AutoComplete, SatAutoComplete, FloatLabel] },
    styles: ['.sat-story { width: 22rem; }'],
    template: `
      <div class="sat-story">
        <p-floatlabel variant="on">
          <p-autocomplete satAutoComplete [suggestions]="[]" inputId="f" status="success" />
          <label for="f">Label</label>
        </p-floatlabel>
      </div>
    `,
  }),
};

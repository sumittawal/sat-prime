import type { Meta, StoryObj } from '@storybook/angular-vite';
import { FloatLabel } from 'primeng/floatlabel';
import { MultiSelect } from 'primeng/multiselect';
import { SatMultiSelect } from './sat-multi-select';

const meta: Meta = {
  title: 'UI/SatMultiSelect',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: "`SatMultiSelect` adds a status dot to PrimeNG's [MultiSelect](https://primeng.org/multiselect). Every PrimeNG input, output and form integration works unchanged; see the [PrimeNG MultiSelect documentation](https://primeng.org/multiselect) for the base API.\n\n### Usage\n\n```html\n<p-multiselect satMultiSelect [options]=\"options\" status=\"success\" />\n```\n\n### Added properties\n\n| Property | Type | Default | Description |\n|---|---|---|---|\n| `status` | `'success' \\| 'info' \\| 'warning' \\| 'neutral' \\| null` | `null` | Shows a status dot using the Aura palette (light/dark aware). Independent of PrimeNG's `invalid` state. |\n\n### Notes\n\n- A directive added to `<p-multiselect>`; all PrimeNG inputs and outputs are unchanged.\n- With a PrimeNG `p-floatlabel variant=\"on\"` ([FloatLabel docs](https://primeng.org/floatlabel)) the dot moves onto the floating label so it floats with it.\n- The dot is decorative (`aria-hidden` semantics): it never replaces a text label or error message." } },
  },
};

export default meta;
type Story = StoryObj;

const opts = [{ n: 'One' }, { n: 'Two' }];

export const StatusDots: Story = {
  render: () => ({
    props: { opts },
    moduleMetadata: { imports: [MultiSelect, SatMultiSelect] },
    styles: ['.sat-story { width: 22rem; display: grid; gap: 1rem; }'],
    template: `
      <div class="sat-story">
        <p-multiselect satMultiSelect [options]="opts" optionLabel="n" placeholder="Pick many" status="success" />
        <p-multiselect satMultiSelect [options]="opts" optionLabel="n" placeholder="Pick many" status="warning" />
        <p-multiselect satMultiSelect [options]="opts" optionLabel="n" placeholder="Pick many" status="info" [invalid]="true" />
      </div>
    `,
  }),
};

export const FloatingLabel: Story = {
  render: () => ({
    props: { opts },
    moduleMetadata: { imports: [MultiSelect, SatMultiSelect, FloatLabel] },
    styles: ['.sat-story { width: 22rem; }'],
    template: `
      <div class="sat-story">
        <p-floatlabel variant="on">
          <p-multiselect satMultiSelect [options]="opts" optionLabel="n" inputId="f" status="success" />
          <label for="f">Label</label>
        </p-floatlabel>
      </div>
    `,
  }),
};

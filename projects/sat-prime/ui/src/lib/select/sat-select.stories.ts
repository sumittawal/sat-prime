import type { Meta, StoryObj } from '@storybook/angular-vite';
import { FloatLabel } from 'primeng/floatlabel';
import { Select } from 'primeng/select';
import { SatSelect } from './sat-select';

const meta: Meta = {
  title: 'UI/SatSelect',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: "`SatSelect` adds a status dot to PrimeNG's [Select](https://primeng.org/select). Every PrimeNG input, output and form integration works unchanged; see the [PrimeNG Select documentation](https://primeng.org/select) for the base API.\n\n### Usage\n\n```html\n<p-select satSelect [options]=\"options\" status=\"success\" />\n```\n\n### Added properties\n\n| Property | Type | Default | Description |\n|---|---|---|---|\n| `status` | `'success' \\| 'info' \\| 'warning' \\| 'neutral' \\| null` | `null` | Shows a status dot using the Aura palette (light/dark aware). Independent of PrimeNG's `invalid` state. |\n\n### Notes\n\n- A directive added to `<p-select>`; all PrimeNG inputs and outputs are unchanged.\n- With a PrimeNG `p-floatlabel variant=\"on\"` ([FloatLabel docs](https://primeng.org/floatlabel)) the dot moves onto the floating label so it floats with it.\n- The dot is decorative (`aria-hidden` semantics): it never replaces a text label or error message." } },
  },
};

export default meta;
type Story = StoryObj;

const opts = [{ n: 'One' }, { n: 'Two' }];

export const StatusDots: Story = {
  render: () => ({
    props: { opts },
    moduleMetadata: { imports: [Select, SatSelect] },
    styles: ['.sat-story { width: 22rem; display: grid; gap: 1rem; }'],
    template: `
      <div class="sat-story">
        <p-select satSelect [options]="opts" optionLabel="n" placeholder="Pick one" status="success" />
        <p-select satSelect [options]="opts" optionLabel="n" placeholder="Pick one" status="warning" />
        <p-select satSelect [options]="opts" optionLabel="n" placeholder="Pick one" status="info" [invalid]="true" />
      </div>
    `,
  }),
};

export const FloatingLabel: Story = {
  render: () => ({
    props: { opts },
    moduleMetadata: { imports: [Select, SatSelect, FloatLabel] },
    styles: ['.sat-story { width: 22rem; }'],
    template: `
      <div class="sat-story">
        <p-floatlabel variant="on">
          <p-select satSelect [options]="opts" optionLabel="n" inputId="f" status="success" />
          <label for="f">Label</label>
        </p-floatlabel>
      </div>
    `,
  }),
};

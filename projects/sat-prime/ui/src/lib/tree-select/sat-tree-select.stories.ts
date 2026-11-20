import type { Meta, StoryObj } from '@storybook/angular-vite';
import { FloatLabel } from 'primeng/floatlabel';
import { TreeSelect } from 'primeng/treeselect';
import { SatTreeSelect } from './sat-tree-select';

const meta: Meta = {
  title: 'UI/SatTreeSelect',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: "`SatTreeSelect` adds a status dot to PrimeNG's [TreeSelect](https://primeng.org/treeselect). Every PrimeNG input, output and form integration works unchanged; see the [PrimeNG TreeSelect documentation](https://primeng.org/treeselect) for the base API.\n\n### Usage\n\n```html\n<p-treeselect satTreeSelect [options]=\"nodes\" status=\"success\" />\n```\n\n### Added properties\n\n| Property | Type | Default | Description |\n|---|---|---|---|\n| `status` | `'success' \\| 'info' \\| 'warning' \\| 'neutral' \\| null` | `null` | Shows a status dot using the Aura palette (light/dark aware). Independent of PrimeNG's `invalid` state. |\n\n### Notes\n\n- A directive added to `<p-treeselect>`; all PrimeNG inputs and outputs are unchanged.\n- With a PrimeNG `p-floatlabel variant=\"on\"` ([FloatLabel docs](https://primeng.org/floatlabel)) the dot moves onto the floating label so it floats with it.\n- The dot is decorative (`aria-hidden` semantics): it never replaces a text label or error message." } },
  },
};

export default meta;
type Story = StoryObj;

const opts = [{ n: 'One' }, { n: 'Two' }];

export const StatusDots: Story = {
  render: () => ({
    props: { opts },
    moduleMetadata: { imports: [TreeSelect, SatTreeSelect] },
    styles: ['.sat-story { width: 22rem; display: grid; gap: 1rem; }'],
    template: `
      <div class="sat-story">
        <p-treeselect satTreeSelect [options]="[]" placeholder="Pick a node" status="success" />
        <p-treeselect satTreeSelect [options]="[]" placeholder="Pick a node" status="warning" />
        <p-treeselect satTreeSelect [options]="[]" placeholder="Pick a node" status="info" [invalid]="true" />
      </div>
    `,
  }),
};

export const FloatingLabel: Story = {
  render: () => ({
    props: { opts },
    moduleMetadata: { imports: [TreeSelect, SatTreeSelect, FloatLabel] },
    styles: ['.sat-story { width: 22rem; }'],
    template: `
      <div class="sat-story">
        <p-floatlabel variant="on">
          <p-treeselect satTreeSelect [options]="[]" inputId="f" status="success" />
          <label for="f">Label</label>
        </p-floatlabel>
      </div>
    `,
  }),
};

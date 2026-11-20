import type { Meta, StoryObj } from '@storybook/angular-vite';
import { FloatLabel } from 'primeng/floatlabel';
import { SatPassword } from './sat-password';

const meta: Meta = {
  title: 'UI/SatPassword',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: "`SatPassword` adds a status dot to PrimeNG's [Password](https://primeng.org/password). Every PrimeNG input, output and form integration works unchanged; see the [PrimeNG Password documentation](https://primeng.org/password) for the base API.\n\n### Usage\n\n```html\n<input satPassword type=\"password\" status=\"success\" />\n```\n\n### Added properties\n\n| Property | Type | Default | Description |\n|---|---|---|---|\n| `status` | `'success' \\| 'info' \\| 'warning' \\| 'neutral' \\| null` | `null` | Shows a status dot using the Aura palette (light/dark aware). Independent of PrimeNG's `invalid` state. |\n\n### Notes\n\n- Extends PrimeNG's `PasswordDirective` (`pPassword`), used **instead of** it.\n- This is the directive form: the show/hide toggle and strength meter belong to the `p-password` component and are not included.\n- With a PrimeNG `p-floatlabel variant=\"on\"` ([FloatLabel docs](https://primeng.org/floatlabel)) the dot moves onto the floating label so it floats with it.\n- The dot is decorative (`aria-hidden` semantics): it never replaces a text label or error message." } },
  },
};

export default meta;
type Story = StoryObj;

export const StatusDots: Story = {
  render: () => ({
    moduleMetadata: { imports: [SatPassword] },
    styles: ['.sat-story { width: 22rem; display: grid; gap: 1rem; }'],
    template: `
      <div class="sat-story">
        <input satPassword type="password" status="success" aria-label="success" />
        <input satPassword type="password" status="warning" aria-label="warning" />
        <input satPassword type="password" status="info" [invalid]="true" aria-label="invalid" />
      </div>
    `,
  }),
};

export const FloatingLabel: Story = {
  render: () => ({
    moduleMetadata: { imports: [SatPassword, FloatLabel] },
    styles: ['.sat-story { width: 22rem; }'],
    template: `
      <div class="sat-story">
        <p-floatlabel variant="on">
          <input satPassword type="password" id="float-password" status="success" />
          <label for="float-password">Password</label>
        </p-floatlabel>
      </div>
    `,
  }),
};

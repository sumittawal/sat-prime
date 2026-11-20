import type { Meta, StoryObj } from '@storybook/angular-vite';
import { SatLabel } from './sat-label';

const meta: Meta = {
  title: 'UI/SatLabel',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          'A directive for a native `<label>` that can show a decorative dot before the text. It has no PrimeNG counterpart; it is plain label styling to pair with PrimeNG controls (see the [PrimeNG InputText documentation](https://primeng.org/inputtext) for a control to label).',
          '',
          '### Usage',
          '',
          '```html',
          '<label satLabel dot dotTone="success" for="name">Name</label>',
          '```',
          '',
          '### Properties',
          '',
          '| Property | Type | Default | Description |',
          '|---|---|---|---|',
          "| `dot` | `boolean` | `false` | Shows the dot before the label text. |",
          "| `dotTone` | `'success' \\| 'info' \\| 'warning' \\| 'neutral'` | `'neutral'` | Dot colour (Aura palette, light/dark aware). |",
          '',
          'The dot is `aria-hidden`; it never carries meaning without the label text. For the dot inside a field or a floating label, use the `Sat*` control `status` input instead.',
        ].join('\n'),
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Tones: Story = {
  render: () => ({
    moduleMetadata: { imports: [SatLabel] },
    template: `
      <div style="display: grid; gap: 0.5rem">
        <label satLabel>No dot</label>
        <label satLabel dot>Neutral</label>
        <label satLabel dot dotTone="success">Success</label>
        <label satLabel dot dotTone="info">Info</label>
        <label satLabel dot dotTone="warning">Warning</label>
      </div>
    `,
  }),
};

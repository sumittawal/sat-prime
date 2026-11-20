import { Component, inject } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ButtonModule } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { SatToastService } from '../sat-toast';
import { SatToastMessage } from './sat-toast-message';

@Component({
  selector: 'sat-toast-story',
  imports: [Toast, SatToastMessage, ButtonModule],
  template: `
    <p-toast position="top-right" [life]="5000">
      <ng-template #message let-message>
        <sat-toast-message [message]="message" [life]="5000" countdown />
      </ng-template>
    </p-toast>
    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem">
      <p-button label="Success" severity="success" (onClick)="toast.success('Saved', 'Your changes are saved.')" />
      <p-button label="Info" severity="info" (onClick)="toast.info('Heads up', 'Something to know.')" />
      <p-button label="Warn" severity="warn" (onClick)="toast.warn('Careful', 'This cannot be undone.')" />
      <p-button label="Error" severity="danger" (onClick)="toast.error('Failed', 'Try again later.')" />
      <p-button label="Sticky (no ring)" severity="secondary" (onClick)="toast.info('Sticky', 'Stays until closed.', { sticky: true })" />
      <p-button label="Custom life 10s" severity="secondary" (onClick)="toast.success('Slow', 'Ring runs 10s.', { life: 10000 })" />
    </div>
  `,
})
class ToastStory {
  protected readonly toast = inject(SatToastService);
}

const doc = `\`SatToastMessage\` is the message content for PrimeNG's [Toast](https://primeng.org/toast), with an optional countdown ring. \`p-toast\` keeps every input, the stacking, motion, pause-on-hover and the close button; see the [PrimeNG Toast documentation](https://primeng.org/toast).

### Usage

\`\`\`html
<p-toast position="top-right" [life]="5000">
  <ng-template #message let-message>
    <sat-toast-message [message]="message" [life]="5000" countdown />
  </ng-template>
</p-toast>
\`\`\`

\`\`\`ts
toast.success('Saved', 'Your changes are saved.', { data: { countdown: true } });
\`\`\`

### Added properties (\`sat-toast-message\`)

| Property | Type | Default | Description |
|---|---|---|---|
| \`message\` | \`ToastMessageOptions\` | required | The message from the template context. |
| \`life\` | \`number\` (ms) | \`3000\` | Ring duration when the message has no \`life\`. Match \`<p-toast [life]>\`. |
| \`countdown\` | \`boolean\` | \`false\` | Ring for every message. One message can opt in with \`data: { countdown: true }\`. |

### Notes

- The ring is hidden for \`sticky\` messages and when there is no life; it pauses with PrimeNG's hover pause and is hidden under \`prefers-reduced-motion\`.
- \`SatToastService\` offers \`success()\`, \`info()\`, \`warn()\`, \`error()\`, \`show()\` and \`clear()\` over PrimeNG's \`MessageService\`; \`MessageService\` itself still works.
- The template cannot read the toast's own \`life\`, so pass the same value to \`sat-toast-message\`.
`;

const meta: Meta = {
  title: 'UI/SatToastMessage',
  tags: ['autodocs'],
  parameters: { layout: 'centered', docs: { description: { component: doc } } },
};

export default meta;

/** Hover a toast to pause the ring; sticky toasts have none. */
export const Countdown: StoryObj = {
  render: () => ({ moduleMetadata: { imports: [ToastStory] }, template: `<sat-toast-story />` }),
};

import { Component, inject } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { SatConfirmDialog } from './sat-confirm-dialog';
import { SatConfirmation, SatConfirmTone } from './sat-confirmation';

const TONES: SatConfirmTone[] = ['success', 'info', 'warning', 'danger'];

@Component({
  selector: 'sat-confirm-story',
  imports: [ConfirmDialog, SatConfirmDialog, ButtonModule],
  template: `
    <p-confirmdialog satConfirmDialog />
    <div style="display: flex; gap: 0.5rem">
      @for (tone of tones; track tone) {
        <p-button [label]="tone" [severity]="tone === 'warning' ? 'warn' : tone" (onClick)="open(tone)" />
      }
    </div>
  `,
})
class ConfirmStory {
  protected readonly tones = TONES;
  private readonly confirmation = inject(SatConfirmation);

  open(tone: SatConfirmTone) {
    this.confirmation[tone]({ message: `This is a ${tone} confirmation.` });
  }
}

const meta: Meta = {
  title: 'UI/SatConfirmDialog',
  tags: ['autodocs'],
  parameters: { layout: 'centered', docs: { description: { component: "`SatConfirmDialog` is a marker directive for PrimeNG's [ConfirmDialog](https://primeng.org/confirmdialog): every PrimeNG input and output works unchanged (see the [PrimeNG ConfirmDialog documentation](https://primeng.org/confirmdialog)). Open it with `SatConfirmation`, which adds a tone-coloured icon and the accept-button severity.\n\n### Usage\n\n```html\n<p-confirmdialog satConfirmDialog key=\"delete\" position=\"top\" />\n```\n\n```ts\nconfirmation.danger({ message: 'Delete this item?', key: 'delete' });\n```\n\n### Added properties\n\nNone on the directive. `SatConfirmation` adds the methods `success()`, `info()`, `warning()` and `danger()`, each taking PrimeNG `Confirmation` options (an explicit `icon`, labels or `acceptButtonProps` override the tone defaults).\n" } } },
};
export default meta;

/** Four tones; Escape closes and focus returns to the trigger button. */
export const Tones: StoryObj = { render: () => ({ moduleMetadata: { imports: [ConfirmStory] }, template: `<sat-confirm-story />` }) };

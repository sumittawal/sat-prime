import { ChangeDetectionStrategy, Component, booleanAttribute, computed, input } from '@angular/core';
import type { ToastMessageOptions } from 'primeng/api';
import { CheckIcon } from 'primeng/icons/check';
import { ExclamationTriangleIcon } from 'primeng/icons/exclamationtriangle';
import { InfoCircleIcon } from 'primeng/icons/infocircle';
import { TimesCircleIcon } from 'primeng/icons/timescircle';
import { ToastClasses } from 'primeng/toast';

/** PrimeNG's own svg icons, as p-toast uses by default (no icon font needed). */
const ICONS: Record<string, string> = {
  success: 'check',
  info: 'info-circle',
  warn: 'exclamation-triangle',
  error: 'times-circle',
};

/** Circle circumference for r=9 (see the SVG); the ring animates its dash offset. */
const RING_LENGTH = 56.55;

/**
 * Message content for PrimeNG `p-toast` with an optional countdown ring. Use it
 * in the toast's `#message` template; `p-toast` keeps all its inputs, stacking,
 * motion and close button. See ADR-0006.
 */
@Component({
  selector: 'sat-toast-message',
  imports: [CheckIcon, InfoCircleIcon, ExclamationTriangleIcon, TimesCircleIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // The host adds no box of its own so the children flow in PrimeNG's flex row.
  host: { style: 'display: contents' },
  template: `
    @if (message().icon) {
      <span [class]="classes.messageIcon + ' ' + message().icon"></span>
    } @else {
      @switch (icon()) {
        @case ('check') { <svg data-p-icon="check" [class]="classes.messageIcon" aria-hidden="true" /> }
        @case ('info-circle') { <svg data-p-icon="info-circle" [class]="classes.messageIcon" aria-hidden="true" /> }
        @case ('exclamation-triangle') { <svg data-p-icon="exclamation-triangle" [class]="classes.messageIcon" aria-hidden="true" /> }
        @case ('times-circle') { <svg data-p-icon="times-circle" [class]="classes.messageIcon" aria-hidden="true" /> }
      }
    }
    <div [class]="classes.messageText">
      <div [class]="classes.summary">{{ message().summary }}</div>
      <div [class]="classes.detail">{{ message().detail }}</div>
    </div>
    @if (duration(); as ms) {
      <svg class="sat-toast-ring" viewBox="0 0 20 20" aria-hidden="true" [style.--sat-toast-ring-ms.ms]="ms">
        <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" stroke-width="2" [attr.stroke-dasharray]="ringLength" />
      </svg>
    }
  `,
})
export class SatToastMessage {
  readonly message = input.required<ToastMessageOptions>();
  /** Fallback ring duration (ms) when the message has no `life`; match `<p-toast [life]>`. */
  readonly life = input(3000);
  /** Shows the ring for every message; a single message can opt in with `data: { countdown: true }`. */
  readonly countdown = input(false, { transform: booleanAttribute });

  protected readonly classes = ToastClasses;
  protected readonly ringLength = RING_LENGTH;
  protected readonly icon = computed(() => ICONS[this.message().severity ?? ''] ?? '');

  /** Ring duration in ms, or 0 when no ring is shown (off, sticky, or no life). */
  protected readonly duration = computed(() => {
    const message = this.message();
    const enabled = this.countdown() || message.data?.countdown === true;
    return enabled && !message.sticky ? message.life || this.life() || 0 : 0;
  });
}

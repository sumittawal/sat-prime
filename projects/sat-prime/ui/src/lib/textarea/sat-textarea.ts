import { Directive, computed, input } from '@angular/core';
import { PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { Textarea, TextareaStyle } from 'primeng/textarea';
import { SAT_DOT_COLORS, SatDotTone } from '../field/sat-label/sat-label';

/** PrimeNG `Textarea` plus a status dot. See ADR-0006. */
@Directive({
  selector: 'textarea[satTextarea]',
  // Re-declared: PrimeNG's decorator metadata is not inherited by subclasses.
  providers: [TextareaStyle, { provide: PARENT_INSTANCE, useExisting: SatTextarea }],
  hostDirectives: [Bind],
  host: {
    '[attr.data-sat-status]': 'status()',
    '[style.--sat-dot-color]': 'dotColor()',
  },
})
export class SatTextarea extends Textarea {
  /** Status dot tone. Independent of PrimeNG's `invalid`. */
  readonly status = input<SatDotTone | null>(null);

  protected readonly dotColor = computed(() => {
    const status = this.status();
    return status ? SAT_DOT_COLORS[status] : null;
  });
}

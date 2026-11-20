import { Directive, computed, input } from '@angular/core';
import { PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { InputText, InputTextStyle } from 'primeng/inputtext';
import { SAT_DOT_COLORS, SatDotTone } from '../field/sat-label/sat-label';

/**
 * PrimeNG `InputText` plus a status dot. Everything PrimeNG offers (`pSize`,
 * `variant`, `fluid`, `invalid`, ...) is inherited. See ADR-0006.
 */
@Directive({
  selector: 'input[satInputText]',
  // Re-declared: PrimeNG's decorator metadata is not inherited by subclasses.
  providers: [InputTextStyle, { provide: PARENT_INSTANCE, useExisting: SatInputText }],
  hostDirectives: [Bind],
  host: {
    '[attr.data-sat-status]': 'status()',
    '[style.--sat-dot-color]': 'dotColor()',
  },
})
export class SatInputText extends InputText {
  /** Status dot tone. Independent of PrimeNG's `invalid`. */
  readonly status = input<SatDotTone | null>(null);

  protected readonly dotColor = computed(() => {
    const status = this.status();
    return status ? SAT_DOT_COLORS[status] : null;
  });
}

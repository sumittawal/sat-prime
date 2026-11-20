import { Directive, computed, input } from '@angular/core';
import { PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { PasswordDirective, PasswordStyle } from 'primeng/password';
import { SAT_DOT_COLORS, SatDotTone } from '../field/sat-label/sat-label';

/**
 * PrimeNG `PasswordDirective` plus a status dot. PrimeNG's directive already
 * applies `p-inputtext`, so the inputtext dot CSS covers it. See ADR-0006.
 */
@Directive({
  selector: 'input[satPassword]',
  // Re-declared: PrimeNG's decorator metadata is not inherited by subclasses.
  providers: [PasswordStyle, { provide: PARENT_INSTANCE, useExisting: SatPassword }],
  hostDirectives: [Bind],
  host: {
    '[attr.data-sat-status]': 'status()',
    '[style.--sat-dot-color]': 'dotColor()',
  },
})
export class SatPassword extends PasswordDirective {
  /** Status dot tone. */
  readonly status = input<SatDotTone | null>(null);

  protected readonly dotColor = computed(() => {
    const status = this.status();
    return status ? SAT_DOT_COLORS[status] : null;
  });
}

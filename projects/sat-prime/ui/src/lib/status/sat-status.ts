import { Directive, computed, input } from '@angular/core';
import { SAT_DOT_COLORS, SatDotTone } from '../field/sat-label/sat-label';

/**
 * Status dot for PrimeNG components whose template we cannot reuse in a
 * subclass (Select, DatePicker, ...). Applied as a directive on the PrimeNG
 * element, so every PrimeNG input/output is untouched. The dot is drawn by
 * preset CSS from `data-sat-status`. See ADR-0006.
 */
@Directive({
  host: {
    '[attr.data-sat-status]': 'status()',
    '[style.--sat-dot-color]': 'dotColor()',
  },
})
export abstract class SatStatus {
  /** Status dot tone. Independent of PrimeNG's `invalid`. */
  readonly status = input<SatDotTone | null>(null);

  protected readonly dotColor = computed(() => {
    const status = this.status();
    return status ? SAT_DOT_COLORS[status] : null;
  });
}

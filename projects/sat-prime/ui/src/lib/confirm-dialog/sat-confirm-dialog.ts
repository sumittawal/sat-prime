import { Directive } from '@angular/core';

/**
 * Marks a PrimeNG `p-confirmdialog` as the Sat confirm dialog. Every PrimeNG
 * input and output stays available; open it through `SatConfirmation`, which
 * supplies tone icons and button severity. See ADR-0006.
 */
@Directive({ selector: 'p-confirmdialog[satConfirmDialog]' })
export class SatConfirmDialog {}

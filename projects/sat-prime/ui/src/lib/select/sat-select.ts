import { Directive } from '@angular/core';
import { SatStatus } from '../status/sat-status';

/** Status dot on PrimeNG `Select`. See ADR-0006. */
@Directive({ selector: 'p-select[satSelect]' })
export class SatSelect extends SatStatus {}

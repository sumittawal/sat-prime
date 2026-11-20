import { Directive } from '@angular/core';
import { SatStatus } from '../status/sat-status';

/** Status dot on PrimeNG `InputNumber`. See ADR-0006. */
@Directive({ selector: 'p-inputnumber[satInputNumber], p-input-number[satInputNumber]' })
export class SatInputNumber extends SatStatus {}

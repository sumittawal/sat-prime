import { Directive } from '@angular/core';
import { SatStatus } from '../status/sat-status';

/** Status dot on PrimeNG `MultiSelect`. See ADR-0006. */
@Directive({ selector: 'p-multiselect[satMultiSelect], p-multi-select[satMultiSelect]' })
export class SatMultiSelect extends SatStatus {}

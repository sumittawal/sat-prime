import { Directive } from '@angular/core';
import { SatStatus } from '../status/sat-status';

/** Status dot on PrimeNG `CascadeSelect`. See ADR-0006. */
@Directive({ selector: 'p-cascadeselect[satCascadeSelect], p-cascade-select[satCascadeSelect]' })
export class SatCascadeSelect extends SatStatus {}

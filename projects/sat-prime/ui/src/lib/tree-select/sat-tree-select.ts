import { Directive } from '@angular/core';
import { SatStatus } from '../status/sat-status';

/** Status dot on PrimeNG `TreeSelect`. See ADR-0006. */
@Directive({ selector: 'p-treeselect[satTreeSelect], p-tree-select[satTreeSelect]' })
export class SatTreeSelect extends SatStatus {}

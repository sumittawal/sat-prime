import { Directive } from '@angular/core';
import { SatStatus } from '../status/sat-status';

/** Status dot on PrimeNG `AutoComplete`. See ADR-0006. */
@Directive({ selector: 'p-autocomplete[satAutoComplete], p-auto-complete[satAutoComplete]' })
export class SatAutoComplete extends SatStatus {}

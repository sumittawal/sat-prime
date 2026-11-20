import { Directive } from '@angular/core';
import { SatStatus } from '../status/sat-status';

/** Status dot on PrimeNG `DatePicker`. See ADR-0006. */
@Directive({ selector: 'p-datepicker[satDatePicker], p-date-picker[satDatePicker]' })
export class SatDatePicker extends SatStatus {}

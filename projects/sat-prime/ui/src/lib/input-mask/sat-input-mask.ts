import { Directive } from '@angular/core';
import { PARENT_INSTANCE } from 'primeng/basecomponent';
import { InputMaskDirective, InputMaskStyle } from 'primeng/inputmask';
import { SatInputText } from '../input-text/sat-input-text';

/**
 * PrimeNG `InputMaskDirective` for a native input. PrimeNG pairs it with
 * `pInputText`; here that role is `SatInputText` as a host directive, which
 * also supplies `status`. See ADR-0006.
 */
@Directive({
  selector: 'input[satInputMask]',
  providers: [InputMaskStyle, { provide: PARENT_INSTANCE, useExisting: SatInputMask }],
  hostDirectives: [
    { directive: SatInputText, inputs: ['status', 'pSize', 'variant', 'fluid', 'invalid'] },
  ],
})
export class SatInputMask extends InputMaskDirective {}

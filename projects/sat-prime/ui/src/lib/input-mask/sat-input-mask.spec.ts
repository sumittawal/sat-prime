import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PARENT_INSTANCE } from 'primeng/basecomponent';
import { SatDotTone } from '../field/sat-label/sat-label';
import { SatInputText } from '../input-text/sat-input-text';
import { SatInputMask } from './sat-input-mask';

@Component({
  imports: [SatInputMask, FormsModule],
  template: `<input satInputMask mask="99-99" [(ngModel)]="value" [status]="status()" />`,
})
class Host {
  readonly value = signal('');
  readonly status = signal<SatDotTone | null>(null);
}

describe('SatInputMask', () => {
  const setup = () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const debug = fixture.debugElement.query((d) => d.name === 'input');
    return { fixture, host: fixture.componentInstance, input: debug.nativeElement as HTMLInputElement, debug };
  };

  it('keeps PrimeNG input and mask classes', () => {
    const { input } = setup();
    expect(input.classList).toContain('p-inputtext');
    expect(input.classList).toContain('p-inputmask');
  });

  it('status comes from the SatInputText host directive', () => {
    const { host, fixture, input } = setup();
    host.status.set('warning');
    fixture.detectChanges();
    expect(input.getAttribute('data-sat-status')).toBe('warning');
  });

  it('subclass integrity: SatInputText host directive and mask instance resolve', () => {
    const { debug } = setup();
    expect(debug.injector.get(SatInputText)).toBeTruthy();
    expect(debug.injector.get(SatInputMask)).toBeTruthy();
    expect(debug.injector.get(PARENT_INSTANCE)).toBeTruthy();
  });
});

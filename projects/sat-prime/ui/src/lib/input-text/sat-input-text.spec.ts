import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { SatDotTone } from '../field/sat-label/sat-label';
import { SatInputText } from './sat-input-text';

@Component({
  imports: [SatInputText, FormsModule],
  template: `<input
    satInputText
    [(ngModel)]="value"
    [status]="status()"
    [invalid]="invalid()"
    pSize="small"
  />`,
})
class Host {
  readonly value = signal('x');
  readonly status = signal<SatDotTone | null>(null);
  readonly invalid = signal(false);
}

describe('SatInputText', () => {
  const setup = () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    return { fixture, host: fixture.componentInstance, input };
  };

  it('keeps PrimeNG classes and inherited inputs', () => {
    const { host, fixture, input } = setup();
    expect(input.classList).toContain('p-inputtext');
    expect(input.classList).toContain('p-inputtext-sm');
    host.invalid.set(true);
    fixture.detectChanges();
    expect(input.classList).toContain('p-invalid');
  });

  it('status is independent of invalid', () => {
    const { host, fixture, input } = setup();
    host.status.set('success');
    fixture.detectChanges();
    expect(input.getAttribute('data-sat-status')).toBe('success');
    expect(input.style.getPropertyValue('--sat-dot-color')).toContain('--p-green');
    expect(input.classList).not.toContain('p-invalid');
  });

  it('has no status attribute by default', () => {
    expect(setup().input.hasAttribute('data-sat-status')).toBe(false);
  });

  it('subclass integrity: PrimeNG parent token and Bind host directive resolve', () => {
    const { fixture } = setup();
    const debug = fixture.debugElement.query((d) => d.name === 'input');
    expect(debug.injector.get(PARENT_INSTANCE)).toBe(debug.injector.get(SatInputText));
    expect(debug.injector.get(Bind)).toBeTruthy();
  });
});

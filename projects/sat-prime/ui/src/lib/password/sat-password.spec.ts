import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { SatDotTone } from '../field/sat-label/sat-label';
import { SatPassword } from './sat-password';

@Component({
  imports: [SatPassword, FormsModule],
  template: `<input satPassword [(ngModel)]="value" [status]="status()" />`,
})
class Host {
  readonly value = signal('');
  readonly status = signal<SatDotTone | null>(null);
}

describe('SatPassword', () => {
  const setup = () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const debug = fixture.debugElement.query((d) => d.name === 'input');
    return { fixture, host: fixture.componentInstance, input: debug.nativeElement as HTMLInputElement, debug };
  };

  it('keeps PrimeNG classes', () => {
    expect(setup().input.classList).toContain('p-inputtext');
  });

  it('sets status attribute and colour', () => {
    const { host, fixture, input } = setup();
    expect(input.hasAttribute('data-sat-status')).toBe(false);
    host.status.set('info');
    fixture.detectChanges();
    expect(input.getAttribute('data-sat-status')).toBe('info');
    expect(input.style.getPropertyValue('--sat-dot-color')).toContain('--p-blue');
  });

  it('subclass integrity: parent token and Bind resolve', () => {
    const { debug } = setup();
    expect(debug.injector.get(PARENT_INSTANCE)).toBe(debug.injector.get(SatPassword));
    expect(debug.injector.get(Bind)).toBeTruthy();
  });
});

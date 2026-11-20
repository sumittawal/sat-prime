import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { SatDotTone } from '../field/sat-label/sat-label';
import { SatTextarea } from './sat-textarea';

@Component({
  imports: [SatTextarea, FormsModule],
  template: `<textarea satTextarea [(ngModel)]="value" [status]="status()" [invalid]="invalid()"></textarea>`,
})
class Host {
  readonly value = signal('x');
  readonly status = signal<SatDotTone | null>(null);
  readonly invalid = signal(false);
}

describe('SatTextarea', () => {
  const setup = () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
    return { fixture, host: fixture.componentInstance, el };
  };

  it('keeps PrimeNG classes and inherited inputs', () => {
    const { host, fixture, el } = setup();
    expect(el.classList).toContain('p-textarea');
    host.invalid.set(true);
    fixture.detectChanges();
    expect(el.classList).toContain('p-invalid');
  });

  it('status is independent of invalid', () => {
    const { host, fixture, el } = setup();
    host.status.set('success');
    fixture.detectChanges();
    expect(el.getAttribute('data-sat-status')).toBe('success');
    expect(el.classList).not.toContain('p-invalid');
  });

  it('subclass integrity: PrimeNG parent token and Bind resolve', () => {
    const { fixture } = setup();
    const debug = fixture.debugElement.query((d) => d.name === 'textarea');
    expect(debug.injector.get(PARENT_INSTANCE)).toBe(debug.injector.get(SatTextarea));
    expect(debug.injector.get(Bind)).toBeTruthy();
  });
});

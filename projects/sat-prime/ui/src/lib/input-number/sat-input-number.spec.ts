import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { InputNumber } from 'primeng/inputnumber';
import { SatDotTone } from '../field/sat-label/sat-label';
import { SatInputNumber } from './sat-input-number';

@Component({
  imports: [InputNumber, SatInputNumber],
  template: `<p-inputnumber satInputNumber [status]="status()" />`,
})
class Host {
  readonly status = signal<SatDotTone | null>(null);
}

describe('SatInputNumber', () => {
  it('keeps the PrimeNG component and sets the status attributes', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('p-inputnumber');
    expect(el.classList).toContain('p-inputnumber');
    expect(el.hasAttribute('data-sat-status')).toBe(false);

    fixture.componentInstance.status.set('success');
    fixture.detectChanges();
    expect(el.getAttribute('data-sat-status')).toBe('success');
    expect(el.style.getPropertyValue('--sat-dot-color')).toContain('--p-green');
  });
});

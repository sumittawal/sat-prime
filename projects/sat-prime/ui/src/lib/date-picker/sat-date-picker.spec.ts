import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DatePicker } from 'primeng/datepicker';
import { SatDotTone } from '../field/sat-label/sat-label';
import { SatDatePicker } from './sat-date-picker';

@Component({
  imports: [DatePicker, SatDatePicker],
  template: `<p-datepicker satDatePicker [status]="status()" />`,
})
class Host {
  readonly status = signal<SatDotTone | null>(null);
}

describe('SatDatePicker', () => {
  it('keeps the PrimeNG component and sets the status attributes', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('p-datepicker');
    expect(el.classList).toContain('p-datepicker');
    expect(el.hasAttribute('data-sat-status')).toBe(false);

    fixture.componentInstance.status.set('success');
    fixture.detectChanges();
    expect(el.getAttribute('data-sat-status')).toBe('success');
    expect(el.style.getPropertyValue('--sat-dot-color')).toContain('--p-green');
  });
});

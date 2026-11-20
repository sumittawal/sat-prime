import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MultiSelect } from 'primeng/multiselect';
import { SatDotTone } from '../field/sat-label/sat-label';
import { SatMultiSelect } from './sat-multi-select';

@Component({
  imports: [MultiSelect, SatMultiSelect],
  template: `<p-multiselect satMultiSelect [options]="[]" [status]="status()" />`,
})
class Host {
  readonly status = signal<SatDotTone | null>(null);
}

describe('SatMultiSelect', () => {
  it('keeps the PrimeNG component and sets the status attributes', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('p-multiselect');
    expect(el.classList).toContain('p-multiselect');
    expect(el.hasAttribute('data-sat-status')).toBe(false);

    fixture.componentInstance.status.set('success');
    fixture.detectChanges();
    expect(el.getAttribute('data-sat-status')).toBe('success');
    expect(el.style.getPropertyValue('--sat-dot-color')).toContain('--p-green');
  });
});

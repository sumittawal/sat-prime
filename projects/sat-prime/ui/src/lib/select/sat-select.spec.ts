import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Select } from 'primeng/select';
import { SatDotTone } from '../field/sat-label/sat-label';
import { SatSelect } from './sat-select';

@Component({
  imports: [Select, SatSelect],
  template: `<p-select satSelect [options]="[]" [status]="status()" />`,
})
class Host {
  readonly status = signal<SatDotTone | null>(null);
}

describe('SatSelect', () => {
  it('keeps the PrimeNG component and sets the status attributes', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('p-select');
    expect(el.classList).toContain('p-select');
    expect(el.hasAttribute('data-sat-status')).toBe(false);

    fixture.componentInstance.status.set('success');
    fixture.detectChanges();
    expect(el.getAttribute('data-sat-status')).toBe('success');
    expect(el.style.getPropertyValue('--sat-dot-color')).toContain('--p-green');
  });
});

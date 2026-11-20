import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AutoComplete } from 'primeng/autocomplete';
import { SatDotTone } from '../field/sat-label/sat-label';
import { SatAutoComplete } from './sat-auto-complete';

@Component({
  imports: [AutoComplete, SatAutoComplete],
  template: `<p-autocomplete satAutoComplete [suggestions]="[]" [status]="status()" />`,
})
class Host {
  readonly status = signal<SatDotTone | null>(null);
}

describe('SatAutoComplete', () => {
  it('keeps the PrimeNG component and sets the status attributes', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('p-autocomplete');
    expect(el.classList).toContain('p-autocomplete');
    expect(el.hasAttribute('data-sat-status')).toBe(false);

    fixture.componentInstance.status.set('success');
    fixture.detectChanges();
    expect(el.getAttribute('data-sat-status')).toBe('success');
    expect(el.style.getPropertyValue('--sat-dot-color')).toContain('--p-green');
  });
});

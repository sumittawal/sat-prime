import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CascadeSelect } from 'primeng/cascadeselect';
import { SatDotTone } from '../field/sat-label/sat-label';
import { SatCascadeSelect } from './sat-cascade-select';

@Component({
  imports: [CascadeSelect, SatCascadeSelect],
  template: `<p-cascadeselect satCascadeSelect [options]="[]" [status]="status()" />`,
})
class Host {
  readonly status = signal<SatDotTone | null>(null);
}

describe('SatCascadeSelect', () => {
  it('keeps the PrimeNG component and sets the status attributes', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('p-cascadeselect');
    expect(el.classList).toContain('p-cascadeselect');
    expect(el.hasAttribute('data-sat-status')).toBe(false);

    fixture.componentInstance.status.set('success');
    fixture.detectChanges();
    expect(el.getAttribute('data-sat-status')).toBe('success');
    expect(el.style.getPropertyValue('--sat-dot-color')).toContain('--p-green');
  });
});

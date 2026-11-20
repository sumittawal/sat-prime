import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TreeSelect } from 'primeng/treeselect';
import { SatDotTone } from '../field/sat-label/sat-label';
import { SatTreeSelect } from './sat-tree-select';

@Component({
  imports: [TreeSelect, SatTreeSelect],
  template: `<p-treeselect satTreeSelect [options]="[]" [status]="status()" />`,
})
class Host {
  readonly status = signal<SatDotTone | null>(null);
}

describe('SatTreeSelect', () => {
  it('keeps the PrimeNG component and sets the status attributes', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('p-treeselect');
    expect(el.classList).toContain('p-treeselect');
    expect(el.hasAttribute('data-sat-status')).toBe(false);

    fixture.componentInstance.status.set('success');
    fixture.detectChanges();
    expect(el.getAttribute('data-sat-status')).toBe('success');
    expect(el.style.getPropertyValue('--sat-dot-color')).toContain('--p-green');
  });
});

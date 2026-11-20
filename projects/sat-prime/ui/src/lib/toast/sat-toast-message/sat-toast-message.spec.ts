import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ToastMessageOptions } from 'primeng/api';
import { ToastClasses } from 'primeng/toast';
import { SatToastMessage } from './sat-toast-message';

@Component({
  imports: [SatToastMessage],
  template: `<sat-toast-message [message]="message()" [life]="life()" [countdown]="countdown()" />`,
})
class Host {
  readonly message = signal<ToastMessageOptions>({ severity: 'success', summary: 'Saved', detail: 'Done' });
  readonly life = signal(3000);
  readonly countdown = signal(false);
}

describe('SatToastMessage', () => {
  const setup = () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = (): HTMLElement => fixture.nativeElement;
    const update = (fn: (h: Host) => void) => {
      fn(fixture.componentInstance);
      fixture.detectChanges();
    };
    return { el, update };
  };

  it('renders summary and detail with the PrimeNG toast classes', () => {
    const { el } = setup();
    expect(el().querySelector(`.${ToastClasses.summary}`)?.textContent?.trim()).toBe('Saved');
    expect(el().querySelector(`.${ToastClasses.detail}`)?.textContent?.trim()).toBe('Done');
    expect(el().querySelector(`svg.${ToastClasses.messageIcon}`)?.getAttribute('data-p-icon')).toBe('check');
  });

  it('has no ring unless countdown is on', () => {
    const { el } = setup();
    expect(el().querySelector('.sat-toast-ring')).toBeNull();
  });

  it('shows an aria-hidden ring using life as the duration', () => {
    const { el, update } = setup();
    update((h) => { h.countdown.set(true); h.life.set(5000); });
    const ring = el().querySelector('.sat-toast-ring')!;
    expect(ring.getAttribute('aria-hidden')).toBe('true');
    expect((ring as SVGElement).style.getPropertyValue('--sat-toast-ring-ms')).toBe('5000ms');
  });

  it('message.life wins over the life input', () => {
    const { el, update } = setup();
    update((h) => { h.countdown.set(true); h.message.set({ summary: 's', life: 8000 }); });
    expect((el().querySelector('.sat-toast-ring') as SVGElement).style.getPropertyValue('--sat-toast-ring-ms')).toBe('8000ms');
  });

  it('per-message opt-in via data.countdown', () => {
    const { el, update } = setup();
    update((h) => h.message.set({ summary: 's', data: { countdown: true } }));
    expect(el().querySelector('.sat-toast-ring')).not.toBeNull();
  });

  it('no ring for sticky messages', () => {
    const { el, update } = setup();
    update((h) => { h.countdown.set(true); h.message.set({ summary: 's', sticky: true }); });
    expect(el().querySelector('.sat-toast-ring')).toBeNull();
  });
});

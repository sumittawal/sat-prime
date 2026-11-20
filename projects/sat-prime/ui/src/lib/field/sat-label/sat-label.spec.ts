import { Component, signal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { SAT_DOT_COLORS, SatDotTone, SatLabel } from './sat-label';

@Component({
  imports: [SatLabel],
  template: `<label satLabel [dot]="dot()" [dotTone]="tone()">Name</label>`,
})
class Host {
  readonly dot = signal(false);
  readonly tone = signal<SatDotTone>('neutral');
}

describe('SatLabel', () => {
  let fixture: ComponentFixture<Host>;
  let host: Host;
  let label: HTMLLabelElement;

  const render = () => {
    fixture.detectChanges();
    label = fixture.nativeElement.querySelector('label');
  };

  const dot = () => label.querySelector<HTMLElement>('.sat-label__dot');

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [Host] });
    fixture = TestBed.createComponent(Host);
    host = fixture.componentInstance;
    render();
  });

  it('renders no dot when dot is unset', () => {
    expect(dot()).toBeNull();
  });

  it('renders a decorative dot before the label text by default', () => {
    host.dot.set(true);
    render();

    const element = dot();
    expect(element).not.toBeNull();
    expect(element?.getAttribute('aria-hidden')).toBe('true');
    expect(element?.getAttribute('data-tone')).toBe('neutral');
    expect(label.firstElementChild).toBe(element);
  });

  it.each<SatDotTone>(['success', 'info', 'warning', 'neutral'])(
    'maps the %s tone to its semantic colour',
    (tone) => {
      host.dot.set(true);
      host.tone.set(tone);
      render();

      const element = dot();
      expect(element?.getAttribute('data-tone')).toBe(tone);
      expect(element?.style.getPropertyValue('--sat-dot-color')).toBe(SAT_DOT_COLORS[tone]);
    },
  );

  it('falls back to neutral for an unknown tone', () => {
    host.dot.set(true);
    host.tone.set('unknown' as SatDotTone);
    render();

    const element = dot();
    expect(element?.getAttribute('data-tone')).toBe('neutral');
    expect(element?.style.getPropertyValue('--sat-dot-color')).toBe(SAT_DOT_COLORS.neutral);
  });

  it('removes the dot when dot is turned off', () => {
    host.dot.set(true);
    render();
    expect(dot()).not.toBeNull();

    host.dot.set(false);
    render();
    expect(dot()).toBeNull();
  });
});

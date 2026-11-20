import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  Renderer2,
  booleanAttribute,
  inject,
} from '@angular/core';

export type SatDotTone = 'success' | 'info' | 'warning' | 'neutral';

export const SAT_DOT_COLORS: Record<SatDotTone, string> = {
  success: 'light-dark(var(--p-green-500, #22c55e), var(--p-green-400, #4ade80))',
  info: 'light-dark(var(--p-blue-500, #3b82f6), var(--p-blue-400, #60a5fa))',
  warning: 'light-dark(var(--p-amber-500, #f59e0b), var(--p-amber-400, #fbbf24))',
  neutral: 'var(--p-text-muted-color, #71717a)',
};

@Directive({
  selector: 'label[satLabel]',
})
export class SatLabel implements OnChanges, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);

  @Input({ transform: booleanAttribute }) dot = false;
  @Input() dotTone: SatDotTone = 'neutral';

  private dotElement: HTMLElement | null = null;

  ngOnChanges(): void {
    if (!this.dot) {
      this.removeDot();
      return;
    }

    const color = SAT_DOT_COLORS[this.dotTone];
    const tone = color ? this.dotTone : 'neutral';
    const element = this.ensureDot();

    this.renderer.setAttribute(element, 'data-tone', tone);
    this.renderer.setStyle(element, '--sat-dot-color', color ?? SAT_DOT_COLORS.neutral);
  }

  ngOnDestroy(): void {
    this.removeDot();
  }

  private ensureDot(): HTMLElement {
    if (this.dotElement) {
      return this.dotElement;
    }

    const element = this.renderer.createElement('span') as HTMLElement;

    this.renderer.setAttribute(element, 'aria-hidden', 'true');
    this.renderer.addClass(element, 'sat-label__dot');
    this.renderer.setStyle(element, 'display', 'inline-block');
    this.renderer.setStyle(element, 'inline-size', 'var(--sat-dot-size, 8px)');
    this.renderer.setStyle(element, 'block-size', 'var(--sat-dot-size, 8px)');
    this.renderer.setStyle(element, 'border-radius', '9999px');
    this.renderer.setStyle(element, 'background-color', 'var(--sat-dot-color)');
    this.renderer.setStyle(element, 'margin-inline-end', 'var(--sat-field-gap, 0.5rem)');
    this.renderer.setStyle(element, 'vertical-align', 'middle');
    this.renderer.setStyle(element, 'flex', 'none');
    this.renderer.insertBefore(this.host.nativeElement, element, this.host.nativeElement.firstChild);

    this.dotElement = element;
    return element;
  }

  private removeDot(): void {
    if (!this.dotElement) {
      return;
    }

    this.renderer.removeChild(this.host.nativeElement, this.dotElement);
    this.dotElement = null;
  }
}

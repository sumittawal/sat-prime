import { TestBed } from '@angular/core/testing';
import { dt, useTheme } from '@primeuix/styled';
import { ConfirmationService, MessageService } from 'primeng/api';
import { provideSatUI } from './provide-sat-ui';
import { satPreset } from './sat-preset';

describe('satPreset', () => {
  beforeAll(() => {
    useTheme({
      preset: satPreset,
      options: { prefix: 'p', cssVariables: true },
    });
  });

  it('leaves Aura spacing and semantic tokens unchanged', () => {
    expect(dt('form.field.padding.x', undefined, 'value')).toBe('0.625rem');
    expect(dt('datatable.body.cell.padding', undefined, 'value')).toBe('0.5rem 0.875rem');
  });

  it('keeps the toast border width token at 1px', () => {
    expect(dt('toast.border.width', undefined, 'value')).toBe('1px');
  });

  it('adds the 3px left-only toast border as component css', () => {
    const preset = satPreset as { components?: { toast?: { css?: string } } };

    expect(preset.components?.toast?.css).toContain('border-left-width: 3px');
  });

  it('adds vertical-only DataTable body cell padding as component css', () => {
    const preset = satPreset as { components?: { datatable?: { css?: string } } };
    const css = preset.components?.datatable?.css;

    expect(css).toContain('padding-block: 6px');
    expect(css).toContain('padding-block: 10px');
    expect(css).toContain('.p-datatable-sm');
  });

  it('adds the SatInputText status dot as inputtext component css', () => {
    const preset = satPreset as { components?: { inputtext?: { css?: string } } };
    const css = preset.components?.inputtext?.css;

    expect(css).toContain('[data-sat-status]');
    expect(css).toContain('label::before');
    expect(css).toContain(':is(.p-inputtext, .p-textarea, .p-select, .p-multiselect,');
  });

  it.each([
    ['select', '.p-select[data-sat-status] .p-select-label'],
    ['multiselect', '.p-multiselect[data-sat-status] .p-multiselect-label'],
    ['cascadeselect', '.p-cascadeselect[data-sat-status] .p-cascadeselect-label'],
    ['treeselect', '.p-treeselect[data-sat-status] .p-treeselect-label'],
    ['autocomplete', '.p-autocomplete[data-sat-status] .p-autocomplete-input'],
    ['datepicker', '.p-datepicker[data-sat-status] .p-datepicker-input'],
    ['inputnumber', '.p-inputnumber[data-sat-status] .p-inputnumber-input'],
  ])('adds the status dot css for %s', (name, selector) => {
    const components = (satPreset as { components?: Record<string, { css?: string }> }).components;

    expect(components?.[name]?.css).toContain(selector);
    expect(components?.[name]?.css).toContain('.p-floatlabel');
  });

  it.each(['success', 'info', 'warning', 'danger'])('colours the %s confirm icon', (tone) => {
    const components = (satPreset as { components?: Record<string, { css?: string }> }).components;

    expect(components?.['confirmdialog']?.css).toContain(`.sat-confirm-icon-${tone}`);
  });

  it('adds the toast countdown ring css', () => {
    const preset = satPreset as { components?: { toast?: { css?: string } } };
    const css = preset.components?.toast?.css;

    expect(css).toContain('.sat-toast-ring');
    expect(css).toContain('@keyframes sat-toast-countdown');
    expect(css).toContain('prefers-reduced-motion');
  });

  it('provideSatUI registers the root services SatConfirmation and SatToastService inject', () => {
    TestBed.configureTestingModule({ providers: [provideSatUI()] });

    expect(TestBed.inject(ConfirmationService)).toBeInstanceOf(ConfirmationService);
    expect(TestBed.inject(MessageService)).toBeInstanceOf(MessageService);
  });
});

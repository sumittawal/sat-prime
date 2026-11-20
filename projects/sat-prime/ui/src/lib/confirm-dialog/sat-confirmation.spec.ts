import { TestBed } from '@angular/core/testing';
import { ConfirmationService } from 'primeng/api';
import { SatConfirmation } from './sat-confirmation';

describe('SatConfirmation', () => {
  let confirm: ReturnType<typeof vi.fn>;
  let service: SatConfirmation;

  beforeEach(() => {
    confirm = vi.fn();
    TestBed.configureTestingModule({ providers: [{ provide: ConfirmationService, useValue: { confirm } }] });
    service = TestBed.inject(SatConfirmation);
  });

  it.each([
    ['success', 'success'],
    ['info', 'info'],
    ['warning', 'warn'],
    ['danger', 'danger'],
  ] as const)('%s opens with accept severity %s', (tone, severity) => {
    service[tone]({ message: 'x' });
    expect(confirm.mock.calls[0][0].acceptButtonProps.severity).toBe(severity);
  });

  it('passes key and lets options override defaults', () => {
    service.danger({ message: 'x', key: 'k', acceptLabel: 'Remove' });
    expect(confirm.mock.calls[0][0]).toMatchObject({ key: 'k', acceptLabel: 'Remove', rejectLabel: 'Cancel' });
  });

  it.each(['success', 'info', 'warning', 'danger'] as const)('%s icon carries its tone class', (tone) => {
    service[tone]({ message: 'x' });
    expect(confirm.mock.calls[0][0].icon).toContain(`sat-confirm-icon-${tone}`);
  });
});

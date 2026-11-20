import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { SatToastService } from './sat-toast';

describe('SatToastService', () => {
  let add: ReturnType<typeof vi.fn>;
  let clear: ReturnType<typeof vi.fn>;
  let service: SatToastService;

  beforeEach(() => {
    add = vi.fn();
    clear = vi.fn();
    TestBed.configureTestingModule({ providers: [{ provide: MessageService, useValue: { add, clear } }] });
    service = TestBed.inject(SatToastService);
  });

  it.each(['success', 'info', 'warn', 'error'] as const)('%s adds a message with that severity', (severity) => {
    service[severity]('Saved', 'All good', { key: 'k', data: { countdown: true } });
    expect(add).toHaveBeenCalledWith({
      severity, summary: 'Saved', detail: 'All good', key: 'k', data: { countdown: true },
    });
  });

  it('show passes the message through and clear forwards the key', () => {
    service.show({ severity: 'info', summary: 's', sticky: true });
    expect(add).toHaveBeenCalledWith({ severity: 'info', summary: 's', sticky: true });
    service.clear('k');
    expect(clear).toHaveBeenCalledWith('k');
  });
});

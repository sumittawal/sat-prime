import { inject, Service } from '@angular/core';
import { MessageService, ToastMessageOptions } from 'primeng/api';

/** PrimeNG toast message plus the Sat countdown opt-in. */
export type SatToastOptions = ToastMessageOptions & {
  data?: { countdown?: boolean } & Record<string, unknown>;
};

/** Typed helpers over PrimeNG `MessageService`; raw `MessageService` keeps working. */
@Service()
export class SatToastService {
  private readonly messages = inject(MessageService);

  success(summary: string, detail?: string, options?: SatToastOptions): void { this.show({ severity: 'success', summary, detail, ...options }); }
  info(summary: string, detail?: string, options?: SatToastOptions): void { this.show({ severity: 'info', summary, detail, ...options }); }
  warn(summary: string, detail?: string, options?: SatToastOptions): void { this.show({ severity: 'warn', summary, detail, ...options }); }
  error(summary: string, detail?: string, options?: SatToastOptions): void { this.show({ severity: 'error', summary, detail, ...options }); }

  show(message: SatToastOptions): void { this.messages.add(message); }
  clear(key?: string): void { this.messages.clear(key); }
}

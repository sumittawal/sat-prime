import { inject, Service } from '@angular/core';
import { Confirmation, ConfirmationService } from 'primeng/api';

export type SatConfirmTone = 'success' | 'info' | 'warning' | 'danger';

export type SatConfirmOptions = Omit<Confirmation, 'acceptButtonProps'> & {
  acceptButtonProps?: Record<string, unknown>;
};

const TONES: Record<SatConfirmTone, { severity: string; icon: string; header: string; acceptLabel: string }> = {
  success: { severity: 'success', icon: 'pi pi-check-circle sat-confirm-icon-success', header: 'Confirm', acceptLabel: 'Confirm' },
  info: { severity: 'info', icon: 'pi pi-info-circle sat-confirm-icon-info', header: 'Confirm', acceptLabel: 'OK' },
  warning: { severity: 'warn', icon: 'pi pi-exclamation-triangle sat-confirm-icon-warning', header: 'Are you sure?', acceptLabel: 'Continue' },
  danger: { severity: 'danger', icon: 'pi pi-times-circle sat-confirm-icon-danger', header: 'Are you sure?', acceptLabel: 'Delete' },
};

@Service()
export class SatConfirmation {
  private readonly confirmation = inject(ConfirmationService);

  success(options: SatConfirmOptions): void { this.open('success', options); }
  info(options: SatConfirmOptions): void { this.open('info', options); }
  warning(options: SatConfirmOptions): void { this.open('warning', options); }
  danger(options: SatConfirmOptions): void { this.open('danger', options); }

  private open(tone: SatConfirmTone, options: SatConfirmOptions): void {
    const { severity, ...defaults } = TONES[tone];
    this.confirmation.confirm({
      rejectLabel: 'Cancel',
      ...defaults,
      ...options,
      acceptButtonProps: { severity, ...options.acceptButtonProps },
    });
  }
}

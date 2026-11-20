import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { satPreset } from './sat-preset';

export interface SatUIOptions {
  /**
   * Selector that toggles dark mode. Defaults to `.sat-dark`.
   * Pass `false` to disable PrimeNG's dark-mode handling.
   */
  darkModeSelector?: string | false;
  /**
   * PrimeNG ripple. Defaults to `true`.
   */
  ripple?: boolean;
  /**
   * PrimeUI license key for PrimeNG 22.
   *
   * PrimeNG 22 is not MIT-licensed and renders an "Invalid PrimeUI License"
   * notice when no key is configured. Supply the key from the host app's
   * environment; never commit it. See ADR-0005.
   */
  license?: string;
}

/**
 * Registers the Sat preset and PrimeNG defaults, plus the root-level
 * `ConfirmationService` and `MessageService` that `SatConfirmation` and
 * `SatToastService` inject. Do not re-provide them on a component: a
 * component-level instance would not be the one those services use.
 *
 * ```ts
 * bootstrapApplication(App, {
 *   providers: [provideSatUI()],
 * });
 * ```
 */
export function provideSatUI(options: SatUIOptions = {}): EnvironmentProviders {
  const { darkModeSelector = '.sat-dark', ripple = true, license } = options;

  return makeEnvironmentProviders([
    providePrimeNG({
      theme: {
        preset: satPreset,
        options: {
          darkModeSelector,
          cssLayer: false,
        },
      },
      ripple,
      license,
    }),
    ConfirmationService,
    MessageService,
  ]);
}

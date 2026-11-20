import { applicationConfig, type Preview } from '@storybook/angular-vite';
import { withThemeByClassName } from '@storybook/addon-themes';
import { provideSatUI } from '../projects/sat-prime/theme/src/public-api';

declare const __PRIMEUI_LICENSE__: string;

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [provideSatUI({ license: __PRIMEUI_LICENSE__ || undefined })],
    }),
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'sat-dark',
      },
      defaultTheme: 'light',
    }),
  ],
  parameters: {
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

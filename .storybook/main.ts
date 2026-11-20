import type { StorybookConfig } from '@storybook/angular-vite';

const config: StorybookConfig = {
  stories: ['../projects/sat-prime/**/*.stories.@(ts|js)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-themes'],
  framework: {
    name: '@storybook/angular-vite',
    options: {},
  },
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');

    return mergeConfig(config, {
      define: {
        __PRIMEUI_LICENSE__: JSON.stringify(process.env.PRIMEUI_LICENSE ?? ''),
      },
      resolve: {
        dedupe: [
          '@angular/core',
          '@angular/common',
          '@angular/forms',
          '@angular/platform-browser',
          '@angular/cdk',
        ],
      },
      optimizeDeps: {
        include: [
          '@angular/core',
          '@angular/common',
          '@angular/forms',
          '@angular/platform-browser',
          '@angular/cdk',
        ],
      },
    });
  },
};

export default config;

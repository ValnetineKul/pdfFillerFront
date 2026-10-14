import { create } from 'storybook/theming';

export const theme = create({
  base: 'light',
  // Typography
  fontBase: '"Inter Variable", sans-serif',
  brandTitle: 'UPlatform Design System',
  brandUrl: '/',
  brandImage: '/UPlatform_logo.svg',
  brandTarget: '_self',
  colorSecondary: '#6941C6',

  // UI
  appBg: '#F9F5FF',
  inputBorderRadius: 8,
});

import { defineGlobalStyles } from '@pandacss/dev';

export const globalCss = defineGlobalStyles({
  body: {
    fontFamily: 'primary',
  },
  '*:focus-visible': {
    outlineStyle: 'none',
  },
  '*': {
    '-webkit-tap-highlight-color': 'transparent',
  },
  '::-ms-reveal': {
    display: 'none',
  },
});

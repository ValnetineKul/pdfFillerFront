import { definePreset } from '@pandacss/dev';

import { conditions } from './conditions';
import { globalCss } from './global-css';
import * as patterns from './patterns';
import * as theme from './theme';
import * as utilities from './utilities';

export const defaultPreset = definePreset({
  name: 'default',
  theme,
  globalCss,
  conditions,
  utilities: {
    extend: {
      ...utilities,
    },
  },
  staticCss: {
    recipes: {},
    css: [
      {
        properties: {
          width: [
            '0/12',
            '1/12',
            '2/12',
            '3/12',
            '4/12',
            '5/12',
            '6/12',
            '7/12',
            '8/12',
            '9/12',
            '10/12',
            '11/12',
            '12/12',
          ],
          marginInlineStart: [
            '0/12',
            '1/12',
            '2/12',
            '3/12',
            '4/12',
            '5/12',
            '6/12',
            '7/12',
            '8/12',
            '9/12',
            '10/12',
            '11/12',
            '12/12',
          ],
        },
        responsive: true,
      },
      {
        properties: {
          marginInline: Object.keys(theme.tokens.spacing),
        },
      },
    ],
  },
  patterns: {
    extend: {
      ...patterns,
      wrap: {
        defaultValues: {
          gap: 5,
          alignItems: 'start',
        },
      },
    },
  },
});

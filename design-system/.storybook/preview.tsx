import '@fontsource-variable/inter';
import '../src/index.css';
import '@front/icons/style.css';
import type { DocsTypes } from '@storybook/addon-docs';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react-vite';
import { INITIAL_VIEWPORTS } from 'storybook/viewport';

import { ConfigProvider } from '../src/components/ConfigProvider';
import { wrap } from '../styled-system/patterns';
import DocTemplate from './doc-template.mdx';
import { theme } from './theme';

const docsParameters: DocsTypes['parameters']['docs'] = {
  theme,
  toc: { headingSelector: 'h2, h3' },
  page: DocTemplate,
  source: {
    dark: true,
  },
};

const preview: Preview = {
  parameters: {
    viewport: {
      options: INITIAL_VIEWPORTS,
    },
    backgrounds: { disabled: true },
    docs: docsParameters,
    options: {
      storySort: {
        order: [
          'GettingStarted',
          [
            'Introduction',
            'Development',
            'Usage',
            'Theme',
            'Testing',
            'F.A.Q.',
          ],
          'Foundation',
          'System',
          'Layout',
          'Cards',
          'Buttons',
          'Informative',
          'Forms',
          'Date & Time',
          'Navigation',
          'Collections',
          'Overlays',
          'Others',
          '*',
        ],
      },
    },
  },
  decorators: [
    (Story) => (
      <ConfigProvider value={{ buttonPressHandlerDelay: 41 }}>
        <div className={wrap()}>
          <Story />
        </div>
      </ConfigProvider>
    ),
    withThemeByDataAttribute({
      themes: {
        default: 'default',
        yellowLight: 'yellowLight',
        navyDark: 'navyDark',
        tealDark: 'tealDark',
        yellowDark: 'yellowDark',
      },
      defaultTheme: 'default',
      attributeName: 'data-panda-theme',
    }),
  ],
};

export default preview;

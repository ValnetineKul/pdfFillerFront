import { createRequire } from 'node:module';
import path, { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { frontIconsPlugin } from '@front/icons/vite';
import type { StorybookConfig } from '@storybook/react-vite';
import dotenv from 'dotenv';
import { mergeConfig } from 'vite';

dotenv.config();

const require = createRequire(import.meta.url);
const pkgRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);

function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  stories: [
    '../src/@(components|docs)/**/*.mdx',
    '../src/@(components|docs)/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-themes'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  docs: {},
  core: {
    builder: '@storybook/builder-vite',
    disableTelemetry: true,
    disableWhatsNewNotifications: true,
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      propFilter: { skipPropsWithoutDoc: true },
      shouldRemoveUndefinedFromOptional: true,
      exclude: ['**/*.stories.tsx', '**/.storybook/**'],
    },
  },
  refs: {
    public: {
      title: 'Public',
      url: process.env.PUBLIC_STORYBOOK_URL,
      disable:
        process.env.PUBLIC_STORYBOOK_URL === undefined ||
        process.env.PUBLIC_STORYBOOK_URL === '',
      expanded: false,
    },
    icons: {
      title: 'Icons',
      url: process.env.ICONS_STORYBOOK_URL,
      disable:
        process.env.ICONS_STORYBOOK_URL === undefined ||
        process.env.ICONS_STORYBOOK_URL === '',
      expanded: false,
    },
  },
  viteFinal: (viteConfig) => {
    viteConfig.build ??= {};
    viteConfig.build.rolldownOptions ??= {};
    viteConfig.build.rolldownOptions.output = {
      strictExecutionOrder: true,
    };

    return mergeConfig(viteConfig, {
      root: pkgRoot,
      resolve: {
        tsconfigPaths: true,
      },
      plugins: [frontIconsPlugin()],
    });
  },
};

export default config;

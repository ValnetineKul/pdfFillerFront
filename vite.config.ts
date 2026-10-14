import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { frontIconsPlugin } from '@front/icons/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, root, '');
  const apiTarget = env.API_PROXY_TARGET || 'http://localhost:8080';

  return {
    plugins: [frontIconsPlugin(), react()],
    server: {
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: [
        {
          find: /^@\//,
          replacement: `${path.resolve(root, 'src')}/`,
        },
        { find: '#temp', replacement: path.resolve(root, '.temp') },
        {
          find: '#styled-system',
          replacement: path.resolve(root, 'styled-system'),
        },
        {
          find: /^#shared\/utils$/,
          replacement: path.resolve(root, 'src/types/shared-utils.ts'),
        },
        {
          find: '#shared',
          replacement: path.resolve(root, 'design-system/src/shared'),
        },
      ],
    },
  };
});

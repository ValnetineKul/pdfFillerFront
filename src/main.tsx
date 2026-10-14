import '@fontsource-variable/inter';
import '@front/icons/style.css';
import './icon-mask.css';
import { ConfigProvider } from '@/design-system';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import '../design-system/src/index.css';
import '../styled-system/styles.css';

import { router } from './routes/router';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Корневой элемент не найден.');
}

createRoot(root).render(
  <StrictMode>
    <ConfigProvider value={{ buttonPressHandlerDelay: 41 }}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </StrictMode>,
);

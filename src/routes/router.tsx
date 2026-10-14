import { type ComponentType } from 'react';
import { createBrowserRouter, type RouteObject } from 'react-router';

import { RequireSession } from '@/auth/RequireSession';

type PageModule = {
  default: ComponentType;
  auth?: boolean;
};

const pages = import.meta.glob<PageModule>('./*/page.tsx');

function pathFromFolder(folder: string): string {
  if (folder === 'index') {
    return '/';
  }

  if (folder === '404') {
    return '*';
  }

  return `/${folder}`;
}

function createRoute(file: string, load: () => Promise<PageModule>): RouteObject {
  const folder = file.split('/')[1] ?? 'index';

  return {
    path: pathFromFolder(folder),
    lazy: async () => {
      const pageModule = await load();
      const Page = pageModule.default;

      function Route() {
        const page = <Page />;
        return pageModule.auth ? <RequireSession>{page}</RequireSession> : page;
      }

      return { Component: Route };
    },
  };
}

const routes = Object.entries(pages)
  .map(([file, load]) => createRoute(file, load))
  .sort((left, right) => Number(left.path === '*') - Number(right.path === '*'));

export const router = createBrowserRouter(routes);

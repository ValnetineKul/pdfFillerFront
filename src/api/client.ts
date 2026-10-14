import createClient from 'openapi-fetch';

import type { paths } from '#temp/api-schemas/api';

import { mockFetch } from './mock-fetch';

export type ApiClient = ReturnType<typeof createClient<paths>>;

let apiClient: ApiClient | undefined;

export function getApiClient(): ApiClient {
  if (!apiClient) {
    apiClient = createClient<paths>({
      baseUrl: '',
      fetch: mockFetch,
    });
  }

  return apiClient;
}

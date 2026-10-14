import config from '@front/prettier-config';
import type { OxfmtConfig } from 'oxfmt';
import { defineConfig } from 'oxfmt';

export default defineConfig({
  ...(config as OxfmtConfig),
  sortImports: true,
});

import { defineConfig } from 'tsdown';

export default defineConfig({
  name: '@front/design-system',
  entry: {
    index: 'src/index.ts',
    rac: 'src/rac.ts',
    internationalized: 'src/internationalized.ts',
    preset: 'src/preset/index.ts',
  },
  outDir: 'dist',
  unbundle: true,
  clean: true,
  dts: true,
  deps: {
    neverBundle: ['@pandacss/dev'],
  },
  treeshake: true,
});

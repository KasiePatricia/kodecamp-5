import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: 'src/index.js',
  outDir: 'build',
  platform: 'node',
  minify: true,
});
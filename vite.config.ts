import {defineConfig} from 'vite';
import {resolve} from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig(function() {
  return {
    plugins: [
      dts({
        exclude: ['node_modules/**', 'list/**', '__tests__/**', 'docs/**'],
        outputDir: 'types',
      }),
    ],
    publicDir: false,
    resolve: {
      alias: {
        '@src': resolve(__dirname, 'src'),
      },
    },
    build: {
      emptyOutDir: true,
      target: 'esnext',
      outDir: 'lib',
      minify: false,
      lib: {
        entry: './src/index.ts',
        formats: ['es'],
        name: 'xhooks',
        fileName: () => 'index.js',
      },
      rollupOptions: {
        external: ['react', 'dayjs'],
        output: {
          globals: {
            react: 'react',
            dayjs: 'dayjs',
          },
        },
      },
    },
  };
});

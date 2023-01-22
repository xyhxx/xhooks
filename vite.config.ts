import {defineConfig, Plugin} from 'vite';
import {resolve} from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig(function({mode}) {
  const m = mode as 'es' | 'umd';
  const plugins: Plugin[] = [];

  m === 'es'
    && plugins.push(
      dts({
        exclude: ['node_modules/**', 'list/**', '__tests__/**', 'docs/**'],
        outputDir: 'types',
      }),
    );

  return {
    plugins,
    publicDir: false,
    resolve: {
      alias: {
        '@src': resolve(__dirname, 'src'),
      },
    },
    build: {
      emptyOutDir: m === 'umd',
      target: 'esnext',
      outDir: 'lib',
      lib: {
        entry: './src/index.ts',
        formats: [m],
        name: 'xhooks',
        fileName: format => `index.${format}.js`,
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

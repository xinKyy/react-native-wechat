import {defineConfig, UserConfig} from 'vite';
import {resolve} from 'path';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';

/**
 * @description Build Config
 */
const build_as_lib: UserConfig = {
  base: './',
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*'],
      outDir: 'dist',
      copyDtsFiles: true,
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      name: 'native-wechat',
      fileName: 'index',
      entry: resolve(__dirname, './src/index.ts'),
      formats: ['es'],
    },
    minify: 'esbuild',
    rollupOptions: {
      external: ['react', 'react-native'],
      output: {
        globals: {
          react: 'react',
          'react-native': 'react-native',
        },
      },
    },
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
};

export default defineConfig(build_as_lib);

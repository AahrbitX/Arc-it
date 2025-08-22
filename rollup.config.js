import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

// Check if we're in development mode
const isDev = process.argv.includes('--config-dev');

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ 
      tsconfig: './tsconfig.json',
      outputToFilesystem: false,
      declaration: !isDev, // Skip declaration in dev mode for speed
      declarationMap: !isDev,
      sourceMap: true
    }),
    // Only minify in production builds
    ...(isDev ? [] : [terser()])
  ],
  external: [
    'react', 
    'react-dom',
    'lucide-react',
    // Externalize all build tools to prevent them from being bundled
    '@babel/core',
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
    '@rollup/plugin-babel',
    '@rollup/plugin-commonjs',
    '@rollup/plugin-node-resolve',
    '@rollup/plugin-terser',
    '@rollup/plugin-typescript',
    '@types/node',
    '@types/react',
    '@types/react-dom',
    'concurrently',
    'rollup',
    'rollup-plugin-peer-deps-external',
    'tslib',
    'typescript'
  ],
  // Development optimizations
  ...(isDev && {
    watch: {
      include: 'src/**',
      exclude: 'node_modules/**',
      clearScreen: false
    }
  })
};

import { defineConfig } from 'vite';

export default defineConfig({
  // ... other config
  test: {
    reporters: ['default'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
      enabled: true,
      reportOnFailure: true,
      exclude: [
        'tailwind.config.js',
        'vite.config.ts',
        '.eslintrc.js',
        'postcss.config.js',
        'eslint.config.mjs',
        'inex.js',
        'example/**',
        'dist/**',
        'tests/**',
      ],
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.js', // Optional setup file
    mockReset: true,
    restoreMocks: true,
    clearMocks: true,
  },
});

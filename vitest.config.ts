import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: 'coverage',
      cleanOnRerun: true,
      include: ['src/**/*.{js,ts}'],
      exclude: [
        '**/electron/**',
        '**/tests/**',
        '**/node_modules/**'
      ],
    },
  },
});



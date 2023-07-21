/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-07-21 11:27
 * @LastAuthor : wangchao
 * @LastTime   : 2023-07-21 11:30
 * @desc       :
 */

/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'c8',
    },
  },
});

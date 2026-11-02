import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/crm-api': {
        target: 'https://crm.cloudastro.space/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/crm-api/, ''),
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes) => {
            const cookies = proxyRes.headers['set-cookie'];
            if (cookies) {
              const list = Array.isArray(cookies) ? cookies : [cookies];
              const session = list.find((c) => typeof c === 'string' && c.startsWith('crm_session='));
              if (session) {
                const token = session.split(';')[0].replace('crm_session=', '');
                proxyRes.headers['x-crm-token'] = token;
                proxyRes.headers['access-control-expose-headers'] = 'x-crm-token';
              }
            }
          });
        },
      },
    },
  },
})

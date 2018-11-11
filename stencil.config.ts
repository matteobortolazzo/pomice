import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
// https://stenciljs.com/docs/config

export const config: Config = {
  globalStyle: 'src/global/app.css',
  plugins: [
    sass()
  ],
  copy: [
    { src: 'web.config' }
  ],
  outputTargets: [
    {
      type: 'www',
      serviceWorker: {
        skipWaiting: true,
        clientsClaim: true,
        globPatterns: [
          '**/*.{js,css,json,html,ico,png,svg}'
        ]
      }
    }
  ]
};

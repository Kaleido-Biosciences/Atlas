const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/activities',
    createProxyMiddleware({
      target: 'https://fetch-staging.apps.kaleidobio.com',
      changeOrigin: true,
    })
  );
};

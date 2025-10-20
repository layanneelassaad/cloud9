const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // Events service
  app.use(
    '/api/events',
    createProxyMiddleware({
      target: process.env.REACT_APP_EVENTS_URL || 'http://localhost:8001',
      changeOrigin: true,
      pathRewrite: { '^/api/events': '' }, // so fetch('/api/events/xyz') -> 'http://...:8001/xyz'
      // logLevel: 'debug', // uncomment to debug proxying in dev
    })
  );

  // Orgs service
  app.use(
    '/api/orgs',
    createProxyMiddleware({
      target: process.env.REACT_APP_ORGS_URL || 'http://localhost:8002',
      changeOrigin: true,
      pathRewrite: { '^/api/orgs': '' },
    })
  );

  // RSVP service
  app.use(
    '/api/rsvp',
    createProxyMiddleware({
      target: process.env.REACT_APP_RSVP_URL || 'http://localhost:8003',
      changeOrigin: true,
      pathRewrite: { '^/api/rsvp': '' },
    })
  );

  // Composite service
  app.use(
    '/api/composite',
    createProxyMiddleware({
      target: process.env.REACT_APP_COMPOSITE_URL || 'http://localhost:8004',
      changeOrigin: true,
      pathRewrite: { '^/api/composite': '' },
    })
  );
};

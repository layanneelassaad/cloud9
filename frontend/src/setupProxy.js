const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/events", // Endpoint to proxy
    createProxyMiddleware({
      target: "http://3.82.209.215:8001", // Your FastAPI server
      changeOrigin: true,
    })
  );
};
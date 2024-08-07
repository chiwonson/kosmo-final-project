
// src/main/frontend
// npm install create-react-app
// npm install http-proxy-middleware
// npm install axios
// npm install react-router-dom
// src/main/frontend/src/setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8083/BreadTour",
      changeOrigin: true,
    })
  );
};
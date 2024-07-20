// server.js
const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const app = express();

app.use('/api', createProxyMiddleware({
  target: 'https://api.mangadex.org',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // Remove a parte '/api' da URL
  },
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('Access-Control-Allow-Origin', '*');
  }
}));

app.listen(3000, () => {
  console.log('Proxy server running on port 3000');
});
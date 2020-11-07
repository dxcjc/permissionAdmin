const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
app.use('/api', createProxyMiddleware({
    // 代理跨域目标接口
    target: 'http://localhost:8080',
    changeOrigin: true,
}))

app.listen(9527, () => {
    console.log('****************************服务器启动***************************************')
})
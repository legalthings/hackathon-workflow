const proxyUrls = [
  '^/api',
  '^/signrequest-callback'
]
const proxy = {}
proxyUrls.forEach(route => {
  proxy[route] = {
    target: 'http://localhost:8080'
  }
})

module.exports = {
  devServer: {
    proxy,
    port: 9000,
    disableHostCheck: true
  }
}

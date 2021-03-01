const { route } = require('../../index')

module.exports = route({
  url: '/hello',
  method: 'GET',
  handler (req, rep) {
    rep.send('hello world')
  }
})

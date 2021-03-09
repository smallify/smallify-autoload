const Smallify = require('smallify')
const AutoLoad = require('./index')

const path = require('path')

const smallify = Smallify({})

smallify.register(AutoLoad, {
  dir: path.join(__dirname, 'routes'),
  dirAsScope: true
})

smallify.route({
  url: '/_test',
  method: 'GET',
  handler (req, rep) {
    rep.send('this is test')
  }
})

smallify.ready(e => {
  e && smallify.$log.error(e.message)
  smallify.print()
})

const Smallify = require('smallify')
const AutoLoad = require('./index')

const path = require('path')

const smallify = Smallify({})

smallify.register(AutoLoad, {
  dir: path.join(__dirname, 'routes'),
  dirAsScope: true
})

smallify.ready(e => {
  e && smallify.$log.error(e.message)
  smallify.print()
})

module.exports = async function (smallify, opts) {
  smallify.addHook('onRequest', function (req, rep) {
    console.log('onRequest')
  })
}

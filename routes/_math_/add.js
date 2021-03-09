const { route } = require('../../index')

module.exports = route({
  url: '/add',
  method: 'GET',
  schema: {
    query: {
      type: 'object',
      properties: {
        a: {
          type: 'number'
        },
        b: {
          type: 'number'
        }
      }
    }
    // response: {
    //   type: 'object',
    //   properties: {
    //     sum: {
    //       type: 'string'
    //     }
    //   }
    // }
  },
  handler (req, rep) {
    const { a, b } = req.query
    rep.send({ sum: a + b, params: req.params })
  }
})

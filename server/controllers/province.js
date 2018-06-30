const DB = require('./dbindex')

module.exports = {
  get: async ctx => {
    var result = await DB.raw('SELECT * FROM province').then((res) => {
      return res
    })
    ctx.state.data = {
      resultCode: 0,
      values: result[0]
    }
  }
}
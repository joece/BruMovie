const DB = require('./dbindex')

module.exports = {
  get: async (ctx, next) => {
    var result = await DB.raw('SELECT * FROM city WHERE province_id = ' + ctx.request.query.provinceId).then((res) => {
      return res
    })
    ctx.state.data = {
      resultCode: 0,
      values: result[0]
    }
  }
}
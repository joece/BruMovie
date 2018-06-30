const DB = require('./dbindex')

module.exports = {
  get: async (ctx, next) => {
    var result = await DB.raw('SELECT * FROM block WHERE province_id = ' + ctx.request.query.provinceId + ' AND city_id = ' + ctx.request.query.cityId).then((res) => {
      return res
    })
    ctx.state.data = {
      resultCode: 0,
      values: result[0]
    }
  }
}
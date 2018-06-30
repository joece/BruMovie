const DB = require('./dbindex')

module.exports = {
    get: async ctx => {
        var result = await DB.raw('SELECT * FROM cinema LEFT JOIN locationUserOrCinema ON cinema.cinema_id=locationUserOrCinema.cinema_id LEFT JOIN location ON locationUserOrCinema.location_id=location.location_id WHERE province_id = ' + ctx.request.query.provinceId + ' AND city_id = ' + ctx.request.query.cityId + ' AND block_id = ' + ctx.request.query.blockId).then((res) => {
            return res
        })
        ctx.state.data = {
            resultCode: 0,
            values: result[0]
        }
    },
    post: async ctx => {

    }

}
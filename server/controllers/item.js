const DB = require('./dbindex')

module.exports = {
    get: async ctx => {
        var result = await DB('item').select('*').where({ cinema_id: ctx.request.query.cinemaId })
        ctx.state.data = {
            resultCode: 0,
            values: result
        }
    },
    post: async ctx => {

    }

}
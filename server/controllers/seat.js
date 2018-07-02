const DB = require('./dbindex')

module.exports = {
    get: async ctx => {
        var screening_id = ctx.request.query.screening_id,
            cinema_id = ctx.request.query.cinema_id,
            room_id = ctx.request.query.room_id
        var result = await DB('seat').select('*').where({
            screening_id: screening_id, cinema_id: cinema_id, room_id: room_id
        })
        ctx.state.data = {
            resultCode: 0,
            values: result
        }
    },
    post: async ctx => {

    }

}
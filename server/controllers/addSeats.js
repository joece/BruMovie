const DB = require('./dbindex')

module.exports = {
    get: async (ctx) => {
        let cinema_id = ctx.request.query.cinema_id
        let room_id = ctx.request.query.room_id
        let col = ctx.request.query.col
        let row = ctx.request.query.row
        let screening_id = ctx.request.query.screening_id
        for (let i=0;i<row;i++) {
            for (let j=0;j<col;j++){
                var result = await DB('seat').insert({
                    screening_id: screening_id, cinema_id: cinema_id, room_id: room_id, row: i, col: j, state: 0
                })
            }
        }
        ctx.state.data = {
            resultCode: 0
        }
    }
}
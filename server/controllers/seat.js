const DB = require('./dbindex')

module.exports = {
    get: async ctx => {
        var result = await DB.raw('SELECT * FROM seat WHERE cinema_id = ' + ctx.request.query.cinemaId + ' AND movie_id = ' + ctx.request.query.movieId + ' AND screening_id = ' + ctx.request.query.screeningId).then((res) => {
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
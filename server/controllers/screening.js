const DB = require('./dbindex')

module.exports = {
    get: async ctx => {
        var result = await DB.raw('SELECT * FROM screening WHERE cinema_id = ' + ctx.request.query.cinemaId + ' AND movie_id = ' + ctx.request.query.movieId).then((res) => {
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
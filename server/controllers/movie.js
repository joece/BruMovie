const DB = require('./dbindex')

module.exports = {
    get: async ctx => {
        if (ctx.request.query.cinemaId) {
            var result = await DB.raw('SELECT * FROM movie LEFT JOIN cinemaMovie ON movie.movie_id=cinemaMovie.movie_id WHERE cinema_id = ' + ctx.request.query.cinemaId).then((res) => {
                return res
            })
        }
        else if (ctx.request.query.movieId) {
            var result = await DB.raw('SELECT * FROM movie WHERE movie_id = ' + ctx.request.query.movieId).then((res) => {
                return res
            })
        }
        else {
            var result = await DB.raw('SELECT * FROM movie').then((res) => {
                return res
            })
        }
        ctx.state.data = {
            resultCode: 0,
            values: result[0]
        }
    },
    post: async ctx => {

    }

}
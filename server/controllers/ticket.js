const DB = require('./dbindex')
const AuthDbService = require('../node_modules/wafer-node-sdk/lib/mysql/AuthDbService')
const moment = require('moment')

module.exports = {
    create: async ctx => {
        const body = ctx.request.body
        var userInfo = await AuthDbService.getUserInfoBySKey(body.skey).then((res) => { return res })
        var open_id = userInfo[0].open_id
        if (userInfo.length < 1) {
            return
        }
        var cinema_id = body.cinemaId,
            movie_id = body.movieId,
            screening_id = body.screeningId,
            seat_id = body.seatId,
            price = body.price
        // create(open)
        var result = await DB('seat').select('*').where({
            cinema_id: cinema_id, movie_id: movie_id, screening_id: screening_id, seat_id: seat_id
        })
        if (result.length <= 0) {
            ctx.state.data = {
                resultCode: 1,
                resultDes: '没有这个座位',
            }
        }
        else if (result[0].state != 0) {
            ctx.state.data = {
                resultCode: 2,
                resultDes: '座位已被锁定',
            }
        }
        else {
            result = await DB('seat').where({
                cinema_id: cinema_id, movie_id: movie_id, screening_id: screening_id, seat_id: seat_id
            }).update({ state: 1 })
            var ticiets = await DB('ticket').select('*').orderBy('ticket_id', 'desc')
            var ticket_id
            if (ticiets.length <= 0) {
                ticket_id = 0
            }
            else {
                ticket_id = ticiets[0].ticket_id + 1
            }
            result = await DB('ticket').insert({
                ticket_id, cinema_id, movie_id, screening_id, seat_id, price, open_id
            })
            ctx.state.data = {
                resultCode: 0,
                resultDes: 'success',
                ticket_id: ticket_id
            }
        }
    },
    cancel: async ctx => {
        const body = ctx.request.body
        var userInfo = await AuthDbService.getUserInfoBySKey(body.skey).then((res) => { return res })
        var open_id = userInfo[0].open_id
        if (userInfo.length < 1) {
            return
        }
        var ticket_id = body.ticketId
        var tickets = await DB('ticket').select('*').where({ ticket_id: ticket_id })
        if (tickets.length <= 0) {
            ctx.state.data = {
                resultCode: 1,
                resultDes: '该票不存在',
            }
        }
        else {
            var result = await DB('ticket').where({ ticket_id: ticket_id }).del()
            var ticket = tickets[0],
                cinema_id = ticket.cinema_id,
                movie_id = ticket.movie_id,
                screening_id = ticket.screening_id,
                seat_id = ticket.seat_id
            result = await DB('seat').where({
                cinema_id: cinema_id, movie_id: movie_id, screening_id: screening_id, seat_id: seat_id
            }).update({ state: 0 })
            ctx.state.data = {
                resultCode: 0,
                resultDes: 'success',
            }
        }
    },
    get: async ctx => {
        const body = ctx.request.body
        var userInfo = await AuthDbService.getUserInfoBySKey(body.skey).then((res) => { return res })
        var open_id = userInfo[0].open_id
        if (userInfo.length < 1) {
            return
        }
        var order_id = body.orderId
        var result = await DB.raw('SELECT * FROM ticket LEFT JOIN ticketOrder ON ticket.ticket_id=ticketOrder.ticket_id WHERE order_id = ' + order_id).then((res) => {
            return res
        })
        ctx.state.data = {
            resultCode: 0,
            values: result[0]
        }
    }

}
const DB = require('./dbindex')
const AuthDbService = require('../node_modules/wafer-node-sdk/lib/mysql/AuthDbService')
const moment = require('moment')

module.exports = {
    create: async ctx => {
        const body = ctx.request.body
        var userInfo = await AuthDbService.getUserInfoBySKey(body.skey).then((res) => { return res })
        if (userInfo.length < 1) {
            return
        }
        var orders = await DB('order').select('*').orderBy('order_id', 'desc')
        var order_id
        if (orders.length <= 0) {
            order_id = 0
        }
        else {
            order_id = orders[0].order_id + 1
        }
        var open_id = userInfo[0].open_id,
            state = 0,
            create_time = moment().format('YYYY-MM-DD HH:mm:ss'),
            totalPrice = body.price,
            note = body.note
        result = await DB('order').insert({
            order_id, open_id, state, create_time, totalPrice, note
        })

        //开始关联order和票 
        var tickets = JSON.parse(body.tickets)
        for (var ticket of tickets) {
            var ticket_id = ticket.ticket_id
            var result = await DB('ticketOrder').insert({
                ticket_id, order_id
            })
        }
        var items = JSON.parse(body.items)
        for (let item of items) {
            let item_id = item.item_id
            var result = await DB('itemOrder').insert({
                item_id, order_id
            })
        }
        ctx.state.data = {
            resultCode: 0,
            order_id: order_id
        }
    },
    del: async ctx => {
        const body = ctx.request.body
        var userInfo = await AuthDbService.getUserInfoBySKey(body.skey).then((res) => { return res })
        var open_id = userInfo[0].open_id
        var order_id = body.order_id
        if (userInfo.length < 1) {
            return
        }
        var result = await DB('order').where({ order_id: order_id, open_id: open_id }).del()
        ctx.state.data = {
            resultCode: 0,
        }
    },
    get: async ctx => {
        const body = ctx.request.body
        var userInfo = await AuthDbService.getUserInfoBySKey(body.skey).then((res) => { return res })
        var open_id = userInfo[0].open_id
        if (userInfo.length < 1) {
            return
        }
        var result = await DB('order').select('*').where({ open_id: open_id })
        ctx.state.data = {
            resultCode: 0,
            values: result
        }
    },
    pay: async ctx => {
        
    }
}
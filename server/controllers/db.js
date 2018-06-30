const { mysql } = require('../qcloud.js')
const { mysql: config } = require('../config')
const AuthDbService = require('../node_modules/wafer-node-sdk/lib/mysql/AuthDbService')
const moment = require('moment')
const DB = require('knex')({
  client: 'mysql',
  connection: {
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.pass,
    database: config.db,
    charset: config.char,
    multipleStatements: true
  }
})

async function dbtest(ctx, next) {
  var result = await DB.raw('SELECT * FROM cTest').then((res) => {
    return res
  })
  ctx.state.data = {
    resultCode: 0,
    values: result[0][0]
  }
}

async function getProvince(ctx, next) {
  var result = await DB.raw('SELECT * FROM province').then((res) => {
    return res
  })
  ctx.state.data = {
    resultCode: 0,
    values: result[0]
  }
}

async function getCity(ctx, next) {
  var result = await DB.raw('SELECT * FROM city WHERE province_id = ' + ctx.request.query.provinceId).then((res) => {
    return res
  })
  ctx.state.data = {
    resultCode: 0,
    values: result[0]
  }
}

async function getBlock(ctx, next) {
  var result = await DB.raw('SELECT * FROM block WHERE province_id = ' + ctx.request.query.provinceId + ' AND city_id = ' + ctx.request.query.cityId).then((res) => {
    return res
  })
  ctx.state.data = {
    resultCode: 0,
    values: result[0]
  }
}

async function postLocation(ctx, next) {
  const body = ctx.request.body
  var result = await DB.raw('SELECT * FROM location').then((res) => {
    return res
  })
  var count = result[0].length
  result = await DB.raw('INSERT INTO `location` (`location_id`,`province_id`,`city_id`,`block_id`,`street_name`,`door_name`) VALUES(' + count + ',' + body.provinceId + ',' + body.cityId + ',' + body.blockId + ',"' + body.streetName + '","' + body.doorName + '")').then((res) => {
    return res
  })
  var skey = body.skey
  var userInfo = await AuthDbService.getUserInfoBySKey(skey).then((res) => { return res })
  if (userInfo.length < 1) {
    return
  }
  result = await DB.raw('INSERT INTO `locationUserOrCinema` (`location_id`,`type`,`open_id`,`cinema_id`) VALUES(' + count + ',0,"' + userInfo[0].open_id + '",NULL)').then((res) => {
    return res
  })
  ctx.body.resultCode = 0
}

async function getCinema(ctx, next) {
  var result = await DB.raw('SELECT * FROM cinema LEFT JOIN locationUserOrCinema ON cinema.cinema_id=locationUserOrCinema.cinema_id LEFT JOIN location ON locationUserOrCinema.location_id=location.location_id WHERE province_id = ' + ctx.request.query.provinceId + ' AND city_id = ' + ctx.request.query.cityId + ' AND block_id = ' + ctx.request.query.blockId).then((res) => {
    return res
  })
  ctx.state.data = {
    resultCode: 0,
    values: result[0]
  }
}

async function getMovie(ctx, next) {
  if (ctx.request.query.cinemaId) {
    var result = await DB.raw('SELECT * FROM movie LEFT JOIN cinemaMovie ON movie.movie_id=cinemaMovie.movie_id WHERE cinema_id = ' + ctx.request.query.cinemaId).then((res) => {
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
}

async function getScreening(ctx, next) {
  var result = await DB.raw('SELECT * FROM screening WHERE cinema_id = ' + ctx.request.query.cinemaId + ' AND movie_id = ' + ctx.request.query.movieId).then((res) => {
    return res
  })
  ctx.state.data = {
    resultCode: 0,
    values: result[0]
  }
}

async function getSeat(ctx, next) {
  var result = await DB.raw('SELECT * FROM seat WHERE cinema_id = ' + ctx.request.query.cinemaId + ' AND movie_id = ' + ctx.request.query.movieId + ' AND screening_id = ' + ctx.request.query.screeningId).then((res) => {
    return res
  })
  ctx.state.data = {
    resultCode: 0,
    values: result[0]
  }
}

async function postOrder(ctx, next) {
  // tickets
  // items
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
    note = 'test'
  result = await DB('order').insert({
    order_id, open_id, state, create_time, totalPrice, note
  })
  ctx.state.data = {
    resultCode: 0,
    order_id: order_id
  }
}

async function create(open_id) {
  let screening_id = 0,
    cinema_id = 0,
    movie_id = 0,
    start_time = moment().format('YYYY-MM-DD HH:mm:ss'),
    end_time = moment().format('YYYY-MM-DD HH:mm:ss')
  var result = await DB('screening').insert({
    screening_id, cinema_id, movie_id, start_time, end_time
  })
}

async function getOrder(ctx, next) {
  const body = ctx.request.body
  var userInfo = await AuthDbService.getUserInfoBySKey(body.skey).then((res) => { return res })
  var open_id = userInfo[0].open_id
  // create(open)
  if (userInfo.length < 1) {
    return
  }
  var result = await DB('order').select('*').where({ open_id: open_id })
  ctx.state.data = {
    resultCode: 0,
    values: result
  }
}

async function deleteOrder(ctx, next) {
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
}


async function createTicket(ctx, next) {
  const body = ctx.request.body
  var userInfo = await AuthDbService.getUserInfoBySKey(body.skey).then((res) => { return res })
  var open_id = userInfo[0].open_id
  if (userInfo.length < 1) {
    return
  }
  var cinema_id = body.cinema_id,
    movie_id = body.movie_id,
    screening_id = body.screening_id,
    seat_id = body.seat_id,
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
}

async function cancelTicket(ctx, next) {
  const body = ctx.request.body
  var userInfo = await AuthDbService.getUserInfoBySKey(body.skey).then((res) => { return res })
  var open_id = userInfo[0].open_id
  if (userInfo.length < 1) {
    return
  }
  var ticket_id = body.ticket_id
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
  }
}

async function getTicket(ctx, next) {

  var result = await DB('ticket').select('*').where({ cinema_id: ctx.request.query.cinema_id, movie_id: ctx.request.query.movie_id, screening_id: ctx.request.query.screening_id })
  ctx.state.data = {
    resultCode: 0,
    values: result
  }
}

async function payOrder(ctx, next) {

}

async function getItem(ctx, next) {
  var result = await DB('item').select('*').where({ cinema_id: ctx.request.query.cinema_id })
  ctx.state.data = {
    resultCode: 0,
    values: result
  }
}

module.exports = {
  dbtest,
  getProvince,
  getCity,
  getBlock,
  postLocation,
  getCinema,
  getMovie,
  getScreening,
  getSeat,
  createTicket,
  cancelTicket,
  getTicket,
  getItem,
  postOrder,
  getOrder,
  deleteOrder,
  payOrder
}
const { mysql } = require('../qcloud.js')
const { mysql: config } = require('../config')
const AuthDbService = require('../node_modules/wafer-node-sdk/lib/mysql/AuthDbService')
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
  var userInfo = await AuthDbService.getUserInfoBySKey(skey).then((res) => {return res})
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

module.exports = {
  dbtest, 
  getProvince,
  getCity,
  getBlock,
  postLocation,
  getCinema
}
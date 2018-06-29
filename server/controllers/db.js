const { mysql } = require('../qcloud.js')
const { mysql: config } = require('../config')
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
  result = await DB.raw('INSERT INTO `locationUserOrCinema` (`location_id`,`type`,`open_id`,`cinema_id`) VALUES(' + count + ',0,"ididid",NULL)').then((res) => {
    return res
  })
  ctx.body = result
}

module.exports = {
  dbtest, 
  getProvince,
  getCity,
  getBlock,
  postLocation
}
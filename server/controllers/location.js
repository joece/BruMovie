const DB = require('./dbindex')
const AuthDbService = require('../node_modules/wafer-node-sdk/lib/mysql/AuthDbService')

module.exports = {
    post: async ctx => {
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

}
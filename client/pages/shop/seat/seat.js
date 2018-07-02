var seatmap = require('../../../utils/seatmap');
var limt = 0
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
Page({
  data: {
    roomInfo: {},
    map: [],
    seats: [],
    willChange: false,
    hasSelected: false,
    deltaX: 0,
    deltaY: 0,
    columnArr: []
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://k3d2hspl.qcloud.la/weapp/seat?movieId=0&cinemaId=0&screeningId=0',
      data: {},
      success: function (res) {
        var resVal = res.data.data.values[0]
        var info = { resVal, 'showing_room': options.room, 'price': options.price }
        console.log(info)
        that.setData({
          roomInfo: info
        })
      }
    })
  },
  onReady: function () {
    var roomInfo = this.data.roomInfo.resVal
    var columnArr = []
    var seatmap = []
    var index = 0
    for (var i = 1; i <= roomInfo.row; i++) {
      columnArr.push(i)
      var rowmap = []
      for(var j = 1; j <= roomInfo.col; j++, index++){
        rowmap.push(parseInt(roomInfo.state[index]))
      }
      seatmap.push(rowmap)
    }
    this.setData({
      columnArr: columnArr,
      map: seatmap
    })
    
  },
  onShow: function () {
  },
  scrollstart: function (ev) {
    this.sX = ev.changedTouches[0].clientX
    this.sY = ev.changedTouches[0].clientY
    this.setData({
      willChange: true
    })
    console.log(ev)
  },
  scrollmove: function (ev) {
    var mX = ev.changedTouches[0].clientX
    var mY = ev.changedTouches[0].clientY
    var deltaX = (mX - this.sX) / 2
    var deltaY = (mY - this.sY) / 2
    this.setData({
      deltaX: deltaX,
      deltaY: deltaY
    })
  },
  scrollend: function (ev) {
    var eX = ev.changedTouches[0].clientX
    var eY = ev.changedTouches[0].clientY
    console.log(ev)
    this.setData({
      willChange: false
    })
  },
  selectSeat: function (ev) {
    var ver = ev.currentTarget.dataset.ver
    var hor = ev.currentTarget.dataset.hor
    var map = this.data.map
    var seats = []
    var cStr = ''
    if (this.data.seats.length < 4) {
      map[ver][hor] = 2
      for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {
          if (map[i][j] === 2) {
            cStr = formatNumber(i + 1) + '排' + (j + 1) + '座'
            seats.push(cStr)
          }
        }
      }
      this.setData({
        map: map,
        seats: seats
      })
    }
    else {
      wx.showToast({
        title: '最多选4个座位',
        icon: 'success',
        duration: 2000
      })
    }
    console.log(seats.length)
  },
  cancelSeat: function (ev) {
    var ver = ev.currentTarget.dataset.ver
    var hor = ev.currentTarget.dataset.hor
    var cStr = ''
    var seats = []
    console.log(ev)
    var map = this.data.map
    map[ver][hor] = 1
    for (var i = 0; i < map.length; i++) {
      for (var j = 0; j < map[i].length; j++) {
        if (map[i][j] === 2) {
          cStr = formatNumber(i + 1) + '排' + (j + 1) + '座'
          seats.push(cStr)
        }
      }
    }
    this.setData({
      map: map,
      seats: seats
    })

  }
})
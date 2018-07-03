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
    resseats: [],
    seats: [],
    willChange: false,
    hasSelected: false,
    deltaX: 0,
    deltaY: 0,
    columnArr: [],
    totalcost: 0
  },
  onLoad: function (options) {
    var that = this
    var baseInfo = options
    console.log(baseInfo)
    var orimap = []
    for(var i = 0; i < baseInfo.row; i++){
      var rowmap = []
      for(var j = 0; j < baseInfo.col; j++)
        rowmap.push(0)
      orimap.push(rowmap)
    }
    console.log(orimap)
    wx.request({
      url: 'https://k3d2hspl.qcloud.la/weapp/seat?cinema_id=0&screening_id=0&room_id=1',
      data: {}, 
      success: function (res) {
        var seats = res.data.data.values  
        for(var i = 0; i < seats.length; i++){
          var r = seats[i].row, c = seats[i].col, s = seats[i].state
          orimap[r][c] = s
        }
        console.log(orimap)
        that.setData({
          roomInfo: baseInfo,
          map: orimap
        })
      }
    })
  },
  onReady: function () {
    var roomInfo = this.data.roomInfo
    var columnArr = []
    for (var i = 1; i <= roomInfo.row; i++) {
      columnArr.push(i)
    }
    this.setData({
      columnArr: columnArr
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
      var ttc = this.data.roomInfo.price * seats.length
      this.setData({
        map: map,
        seats: seats,
        totalcost: ttc.toFixed(1)
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
    var ttc = this.data.roomInfo.price * seats.length
    this.setData({
      map: map,
      seats: seats,
      totalcost: ttc.toFixed(1)
    })

  }
})
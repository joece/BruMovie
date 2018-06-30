var event = require('../../utils/event')
var app = getApp()

Page({
  data: {
    head: {
      currentCity: '',
      placestr: '搜索影院'
    },
    theater: []
  },
  onLoad: function () {
    var page = this;
    page.setData({
      'head.currentCity': app.globalData.currentCity
    })
    wx.request({
      url: 'https://k3d2hspl.qcloud.la/weapp/cinema?provinceId=44&cityId=1&blockId=13',
      success: function (res) {
        console.log(res)
        page.setData({
          theater: res.data.data.values
        })
      }
    })
  },
  onShow:function(){
    this.setData({
      'head.currentCity': app.globalData.currentCity
    })
  }

})

var util = require('../../utils/util.js');
var weekday = util.getWeek(12);
const app = getApp();
Page({
  data: {
    activeIndex: 0,
    weekday: weekday,
    currentCity: '',
    theater: []
  },
  onLoad: function (options) {
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
  selDate: function (ev) {
    var page = this
    this.setData({
      activeIndex: ev.target.id
    })
    wx.request({
      url: 'http://localhost:8888/data/indexTheater?city=' + page.data.currentCity + '&id=' + id + '&index=' + ev.target.id,
      success: function (res) {
        page.setData({
          theater: res.data.data
        })
      }
    })
  }
})
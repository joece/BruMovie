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

  }

})

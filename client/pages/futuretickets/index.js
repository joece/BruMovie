// pages/futuretickets/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   myorders:[]
  },
  onLoad: function(){
    var that = this
    wx.request({
      url: 'https://k3d2hspl.qcloud.la/weapp/getOrder',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        skey: wx.getStorageSync('weapp_session_' + 'F2C224D4-2BCE-4C64-AF9F-A6D872000D1A')
      },
      success(result) {
        wx.pc = result.data
        console.log(result)

        }
     })
  },

  showticketorder: function () {
    wx.navigateTo({
      url: '../qrcode/qrcode',
    })
  },

})
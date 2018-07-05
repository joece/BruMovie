// pages/qrcode/qrcode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderbase:{},
    tickets:[],
    qrcodeimg: '../../images/qrcode.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://k3d2hspl.qcloud.la/weapp/getOrder',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        skey: wx.getStorageSync('weapp_session_' + 'F2C224D4-2BCE-4C64-AF9F-A6D872000D1A'),
        order_id: options.order_id
      },
      success(result) {
        wx.pc = result.data
        console.log(result.data.data)
        that.setData({
          orderbase: result.data.data.order[0],
          tickets: result.data.data.tickets[0]
        }) 
      }
    })
  }

})
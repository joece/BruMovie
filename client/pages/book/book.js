
Page({
  data: {
    ticketInfo: {}
  },
  onLoad: function (options) {
    var that = this
    console.log(options)
    this.setData({
      ticketInfo: options
    })
    wx.request({
      url: 'https://k3d2hspl.qcloud.la/weapp/createTicket',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        skey: wx.getStorageSync('weapp_session_' + 'F2C224D4-2BCE-4C64-AF9F-A6D872000D1A'),
        cinemaId: 0,
        screeningId: 0,
        roomId: 1,
        col: 0,
        row: 1,
        price: 100
      },
      success(result) {
        wx.pc = result.data
        console.log(result)
      }
    })
    
  },


  confirmPay: function(){
    var that = this
    wx.request({
      url: 'https://k3d2hspl.qcloud.la/weapp/order',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        skey: wx.getStorageSync('weapp_session_' + 'F2C224D4-2BCE-4C64-AF9F-A6D872000D1A'),
        price: that.data.ticketInfo.totalcost,
        note: '动物世界',
        tickets: JSON.stringify([{ ticket_id: 0 }, { ticket_id: 1 }]),
        items: JSON.stringify([{ item_id: 0 }, { item_id: 1 }]),
      },
      success(result) {
        wx.pc = result.data
        console.log(result)
      }
    })
    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: '',
      paySign: '',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})
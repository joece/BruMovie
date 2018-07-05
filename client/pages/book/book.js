
Page({
  data: {
    ticketInfo: {},
    ticketId: []
  },
  onLoad: function (options) {
    var that = this

    //将页面跳转携带的座位详情参数切割转成整型数组获取对应行、列
    var rnc = options.seatnums.split(',')
    var intrnc = [], ti_id = []
    rnc.forEach(function(data,index,arr){
      intrnc.push(+data)
    })

    for(var i = 0; i <= intrnc.length - 2; i+=2){
      wx.request({
        url: 'https://k3d2hspl.qcloud.la/weapp/createTicket',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          skey: wx.getStorageSync('weapp_session_' + 'F2C224D4-2BCE-4C64-AF9F-A6D872000D1A'),
          cinemaId: 0,
          movieId: 0,
          screeningId: 0,
          roomId: 1,
          col: intrnc[i+1],
          row: intrnc[i],
          price: options.totalcost * 2 / intrnc.length 
        },
        success(result) {
          wx.pc = result.data
          console.log(result)
          that.data.ticketId.push({'ticket_id': result.data.data.ticket_id})
        }
      })
    }
    that.setData({
      ticketInfo: options
    })
  },


  confirmPay: function(){
    var that = this
    console.log(that.data.ticketId)
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
        tickets: JSON.stringify(that.data.ticketId),
        items: JSON.stringify([{ item_id: 0 }, { item_id: 1 }])
       
      },
      
      success(result) {
        wx.navigateTo({
          url: '../qrcode/qrcode?order_id=' + result.data.data.order_id,
        })
      }
    })

  }
})
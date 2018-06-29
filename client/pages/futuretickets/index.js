// pages/futuretickets/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   myorders:[
      {
        'cinema':'珠江金逸影院（大学城店)',
        'price': '38',
        'chairnum': "3号厅-6FL9排13座",
        'movietime': "07月02日 13:00",
        'moviename': "金瓶梅",
        'postpath': "../../images/ticket.png"
      }
    ]
  },

  showticketorder: function () {
    wx.navigateTo({
      url: '../qrcode/qrcode',
    })
  },

})
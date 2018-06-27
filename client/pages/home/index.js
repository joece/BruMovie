//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    city:"广州",
    ingorwillbelist: "showingfilmslist",
    hotshowing:true
  },
  showingfilms:function(){
    this.setData({
      ingorwillbelist:"showingfilmslist",
      hotshowing:true
    })
  },
  willbefilms:function(){
    this.setData({
      ingorwillbelist:"willbefilmslist",
      hotshowing:false
    })
  },
  locate:function(){
    wx.getLocation({
      success: function(res) {},
    })
  },
  onLoad: function () {
    var page = this
    wx.authorize({
      scope: 'scope.userLocation',
      success(res) {
        console.log('允许获取用户位置')
        wx.getLocation({
          success: function(res) {
            page.loadCity(res.latitude,res.longitude)
          },
        })
      },
      fail() {
        console.log('拒绝获取用户位置')
      }
    })
  
  },
  loadCity: function (longitude, latitude) {
    var page = this
    console.log(latitude)
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=olaWhkFxfhl5Q17O4rrg7xfIclYnpete&location=113.26627,' + longitude + '&output=json&coordtype=wgs84ll',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // success  
        console.log(res);
        var city = res.data.result.addressComponent.city;
        page.setData({ city: city });
      },
      fail: function () {
        // fail  
      },
      complete: function () {
        // complete  
      }
    })
  }
  
})

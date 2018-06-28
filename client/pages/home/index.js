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
  loadCity: function (latitude, longitude) {
    var page = this
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=olaWhkFxfhl5Q17O4rrg7xfIclYnpete&location='+ latitude + ',' + longitude + '&output=json&coordtype=wgs84ll',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // success  
        console.log(res)
        var city = res.data.result.addressComponent.city
        if(city.charAt(city.length - 1)=='市')
          page.setData({ city: city.slice(0,-1) })
        else
          page.setData({ city: city })
      },
      fail: function () {
        // fail  
      },
      complete: function () {
        // complete  
      }
    })
  },

  remind: function (onLoad) {
    var page = this
    var positionCity = page.globalData.positionCity
    var currentCity = page.globalData.currentCity
    wx.showModal({
      title: '',
      content: '定位到您当前所在的城市在' + positionCity + ',是否切换',
      success: function (res) {
        if (res.confirm) {
          console.log('confirm')
        }
      }
    })
  }
  
})

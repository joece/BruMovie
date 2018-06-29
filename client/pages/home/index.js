//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    film: { PostPath:'', filmname:"小编是傻逼"},
    currentCity: '',
    ingorwillbelist: "showingfilmslist",
    hotshowing:true
  },
  search: function(){
    wx.navigateTo({
      url: '../search/search',
    })
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
    wx.navigateTo({
      url: '../cinema/position/position?city='+ this.data.currentCity
    })
  },
  onLoad: function () {
    
  
  },

  onShow: function(){
    var page = this
    wx.authorize({
      scope: 'scope.userLocation',
      success(res) {
        console.log('允许获取用户位置')
        if(page.data.currentCity == ''){
          app.getPos(
            function (currentCity) {
              page.setData({
                currentCity: currentCity
              })
            }
          )
        }  
      },
      fail() {
        console.log('拒绝获取用户位置')
      }
    })
  }
  
})

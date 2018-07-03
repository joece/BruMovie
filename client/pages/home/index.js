//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    films: {
      'filmsli': []
    },
    currentCity: '',
    ingorwillbelist: "showingfilmslist",
    hotshowing:true
  },
  search: function(){
    wx.navigateTo({
      url: '../search/search?for=找影视剧，艺人，影院',
    })
  },
  showdetail: function(){
    if(!gotobuy){
      wx.navigateTo({
        url: '../movies / detail / detail ? movie = {{item}}',
      })
    }
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
    var page = this
    wx.request({
      url: 'https://k3d2hspl.qcloud.la/weapp/movie?cinemaId=0',
      success: function (res) {
        console.log(res)
        page.setData({
          films:{'filmsli': res.data.data.values}
        })
      }
    })
  
  },

  onShow: function(){
    var page = this
    wx.authorize({
      scope: 'scope.userLocation',
      success(res) {
        console.log('允许获取用户位置')
        if(app.globalData.currentCity == ''){
          app.getPos(
            function (currentCity) {
              page.setData({
                currentCity: currentCity
              })
            }
          )
        } 
        else
          page.setData({
            currentCity: app.globalData.currentCity
          }) 
      },
      fail() {
        console.log('拒绝获取用户位置')
      }
    })
  }

  
})

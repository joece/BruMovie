//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    films: {
      'filmsli': [
       { 'imgUrl': '../../images/就决定是你了.jpg',
          'name': '动物世界2',
          'id': '001',
          'rating': '9.0分',
          'type': '动作,科幻,冒险',
          'kind': '3DMAX',
          'actors': 'bianzetong,zgt,sb,sbsb,路人甲',
          'cinemacounts': 999,
          'times': 1231
        },
       {
         'imgUrl': '../../images/就决定是你了.jpg',
         'name': '动物世界2',
         'id': '001',
         'rating': '9.0分',
         'type': '动作，科幻',
         'kind': '3DMAX',
         'actors': 'bianzetong,zgt,sb,sbsb,路人甲',
         'cinemacounts': 999,
         'times': 1231
       },
       {
         'imgUrl': '../../images/就决定是你了.jpg',
         'name': '动物世界2',
         'id': '001',
         'rating': '9.0分',
         'type': '动作，科幻',
         'kind': '3DMAX',
         'actors': 'bianzetong,zgt,sb,sbsb,路人甲',
         'cinemacounts': 999,
         'times': 1231
       }, 
       {
         'imgUrl': '../../images/就决定是你了.jpg',
         'name': '动物世界2',
         'id': '001',
         'rating': '9.0分',
         'type': '动作，科幻',
         'kind': '3DMAX',
         'actors': 'bianzetong,zgt,sb,sbsb,路人甲',
         'cinemacounts': 999,
         'times': 1231
       },
       {
         'imgUrl': '../../images/就决定是你了.jpg',
         'name': '动物世界2',
         'id': '001',
         'rating': '9.0分',
         'type': '动作,科幻,冒险',
         'kind': '3DMAX',
         'actors': 'bianzetong,zgt,sb,sbsb,路人甲',
         'cinemacounts': 999,
         'times': 1231
       }, 
       {
          'imgUrl': '../../images/就决定是你了.jpg',
         'name': '动物世界2',
         'id': '001',
         'rating': '9.0分',
         'type': '动作，科幻',
         'kind': '3DMAX',
         'actors': 'bianzetong,zgt,sb,sbsb,路人甲',
         'cinemacounts': 999,
         'times': 1231
       }
      ]
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
    console.log(app.globalData.currentCity)
  }

  
})

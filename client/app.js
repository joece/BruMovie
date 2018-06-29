//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    globalData:{
      currentCity: '',
      locateCity: '',
      remind: false,
      userInfo: null
    },

    onLaunch: function () {
      var logs = wx.getStorageSync('log') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)
      qcloud.setLoginUrl(config.service.loginUrl)

      wx.getSetting({
        success: res => {
          if(res.authSetting['scope.userInfo']){
            wx.getUserInfo({
              success: res => {
                this.globalData.userInfo = res.userInfo
                if(this.userInfoReadyCallback){
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }
        }
      })
    },
    getPos: function(cityres){
      var page = this
      wx.getLocation({
        success: function (res) {
          var latitude = res.latitude
          var longitude = res.longitude
          wx.request({
            url: 'https://api.map.baidu.com/geocoder/v2/?ak=olaWhkFxfhl5Q17O4rrg7xfIclYnpete&location=' + latitude + ',' + longitude + '&output=json&coordtype=wgs84ll',
            data: {},
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              // success  
              console.log(res)
              var city = res.data.result.addressComponent.city
              if (city.charAt(city.length - 1) == '市')
                page.globalData.locateCity = city.slice(0, -1)
              else
                page.globalData.locateCity = city
              var lacity = wx.getStorageSync('lacity') || []
              if(lacity.length){
                page.globalData.currentCity = lacity[0]
                if(!page.globalData.remind & recity[0] != city){
                  page.remind()
                  page.globalData.remind = true
                }
              }
              else
                page.globalData.currentCity = page.globalData.locateCity
              typeof cityres == 'function' && cityres(page.globalData.currentCity)
            }
          })
        },
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
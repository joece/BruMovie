//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    globalData:{
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
    }
    
})
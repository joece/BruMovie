//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUseInfo:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  
  login: function () {
    if (this.data.hasUseInfo) return
    console.log('loging')
    util.showBusy('正在登录')
    var that = this

    // 调用登录接口
    qcloud.login({
      success(result) {
        if (result) {
          util.showSuccess('登录成功')
          that.setData({
            userInfo: result,
            hasUseInfo: true
          })
          app.globalData.userInfo = result
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            hasUseInfo: true,
            success(result) {
              util.showSuccess('登录成功')
              that.setData({
                userInfo: result.data.data,
                hasUseInfo: true
              })
              app.globalData.userInfo = result
            },

            fail(error) {
              util.showModel('请求失败', error)
              console.log('request fail', error)
            }
          })
        }
      },

      fail(error) {
        util.showModel('登录失败', error)
        console.log('登录失败', error)
      }
    })
  },
  //即将观影页面跳转
  showticketorder: function(){
    wx.navigateTo({
      url: '../futuretickets/index',
    })
  },
  //观影足迹订单页面
  showhistory:function(){
    wx.navigateTo({
      url: '../history/index',
    })
  },
  //观影周边页面
  showaround:function(){
    wx.navigateTo({
      url: '../around/index',
    })
  },
  //影评页面
  showcomment:function(){
    wx.navigateTo({
      url: '../comment/index',
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res.userInfo.avatarUrl)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  onReady: function () {
    wx.setNavigationBarTitle({
      title: '我的'
    })
  }
})

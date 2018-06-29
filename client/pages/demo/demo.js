var qcloud = require('../../vendor/wafer2-client-sdk/index')
// pages/demo/demo.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  login: function () {
    if (this.data.logged) return
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
            logged: true
          })
          app.globalData.userInfo = result
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              util.showSuccess('登录成功')
              that.setData({
                userInfo: result.data.data,
                logged: true
              })
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  click: function() {
    wx.request({
      //url: 'https://k3d2hspl.qcloud.la/weapp/province',
      //url: 'https://k3d2hspl.qcloud.la/weapp/city?provinceId=44'
      //url: 'https://k3d2hspl.qcloud.la/weapp/block?provinceId=44&cityId=01',
      //url: 'https://k3d2hspl.qcloud.la/weapp/cinema?provinceId=44&cityId=1&blockId=13',
      url: 'https://k3d2hspl.qcloud.la/weapp/movie?cinemaId=0',
      success(result) {
        wx.cc = result.data
        console.log(result.data)
      }
    })
    /*
    wx.request({
      url: 'https://k3d2hspl.qcloud.la/weapp/location',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        skey: wx.getStorageSync('weapp_session_' + 'F2C224D4-2BCE-4C64-AF9F-A6D872000D1A'),
        provinceId: 44,
        cityId: 1,
        blockId: 13,
        streetName: '小谷围街道',
        doorName: '中山大学东校区'
      },
      success(result) {
        wx.pc = result.data
        //console.log(result.data.data)
      }
    })
    */
  }
})
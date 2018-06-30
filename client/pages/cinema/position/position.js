var city =require("../../../utils/city.js")
var app = getApp()
var event = require('../../../utils/event')
Page({
    data: {
        position: '',
        recent: [],
        li: [],
        scrollId: ''
    },
    onLoad: function (prama) {
        wx.setNavigationBarTitle({
            title: '当前城市-' + prama.city
        })
        this.setData({
            position: app.globalData.locateCity,
            recent: wx.getStorageSync('recity') || []
        })
        this.setData({
          li: city,
        })
    },
    selcity: function (ev) {
        console.log(ev);
        var tar = ev.target.dataset.set;
        if (tar) {
            var recity = wx.getStorageSync('recity') || []
            if (recity[0] != tar) { recity.unshift(tar) }
            var nowrecity = recity.slice(0, 2)
            wx.setStorageSync('recity', nowrecity)
            app.globalData.currentCity = tar
            console.log(app.globalData.currentCity)
            wx.navigateBack();
        }
    },

    scrollto: function (ev) {
        var tar = ev.target.dataset.to
        console.log(tar)
        if (tar) {
            this.setData({
                scrollId: tar
            })
        }
    }
})
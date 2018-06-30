Page({

  /**
   * 页面的初始数据
   */
  data: {
    allorders:[
      {
        movietime_saw: "05月02日 13:00",
        moviename_saw: "精灵宝可梦：就决定是你了",
        postpath_saw: "../../images/就决定是你了.jpg"},
      {
        movietime_saw: "05月03日 13:00",
        moviename_saw: "精灵宝可梦：不是我",
        postpath_saw: "../../images/就决定是你了.jpg"
      }

    ]
    
  },

  showticketorder: function () {
    wx.navigateTo({
      url: '../movies/detail/detail',
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

  }
})
Page({
  data: {
    des: {},
    flexed: false
  },
  onLoad: function (param) {
    var that = this;
    if(param) {
      that.setData({
        des: param.movie
      })
    }
  
  },
  flex: function () {
    var that = this
    this.setData({
      flexed: !that.data.flexed
    })
  }
})
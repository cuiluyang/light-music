// miniprogram/pages/playlist/playlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    x:1,
    listing:null,
    listingimg:null,
    listid:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

  },
  /**
   * 获取播放列表缓存
   */
  getcache:function(){
    var listing=wx.getStorageSync('listing');
    var listingimg=wx.getStorageSync('listingimg');
    this.setData({
      listing:listing,
      listingimg:listingimg
    })
  },
  /**
   * 跳转播放页面
   */
  playTap:function(e){
    var id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../play/play?mid='+id,
    })
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
    this.getcache();
    console.log(this.data.listing);
    

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
// miniprogram/pages/ilike/ilike.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ilikeList:null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSongInfoById();

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
  getSongInfoById:function(){
    var ilike=wx.getStorageSync('ilike');
    var that=this;
    var musicinfo=[];
    for(var i=0;i<ilike.length;i++){
        wx.request({
        url: 'https://music.163.com/api/song/detail/?id='+ilike[i]+'&ids=['+ilike[i]+']',
        success:function(res){
          var result=res.data.songs[0];
          musicinfo.push([result.id,result.album.picUrl,result.name,result.artists[0].name,result.album.name]);
          that.setData({
          ilikeList:musicinfo
          })
         
          
          
  
        },
        
      })
    }
    
    
    
    
    
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
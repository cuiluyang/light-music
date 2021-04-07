//index.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[
      { 
      img:'http://p1.music.126.net/mpsE4xVZoKH3AZc_D0cOlw==/109951164944030659.jpg',
      imgid:1434062381
    },{
      img:'http://p1.music.126.net/K7E8WZqa4N7c6XijXNnBXQ==/109951164945097075.jpg',
      imgid:1443916433
    },{
      img:'http://p1.music.126.net/cUa5jsP3PMGRlaUADBBt4g==/109951164933295277.jpg',
      imgid:1432428744
    }
    ],
    songs:null,
    listid:3778678
  },

  // 点击下拉列表


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
   this.listxinxi(this.data.listid);
   var x=[];
   wx.setStorageSync('ilike', x);
    wx.setStorageSync('commentes', x);
    
  

  },
  changeListTop:function(options){
    var listid=options.currentTarget.dataset.listid;
    this.listxinxi(listid);
  },
  /**
   * 
   * 获取榜单列表信息，并赋值给songs
   */
  listxinxi:function(listid){
    var that=this;
    var result1=[];
    wx.request({
      url: 'https://music.163.com/api/playlist/detail?id='+listid,
      success:function(res){
        var result=res.data.result.tracks;
        for(var i=0;i<20;i++){
          result1.push(result[i]);
        }
        wx.setStorageSync('listing', result1);
        that.setData({
            songs:result1
        })
      }
    })
    
  },
  playTap:function(e){
    var id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../play/play?mid='+id,
    })
  },
  /**
   * 将播放列表写入缓存
   */

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
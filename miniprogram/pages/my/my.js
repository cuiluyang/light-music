// miniprogram/pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    x:1,
    listing:null,
    listingimg:null,
    ilikeList:null,
    listid:0
    

  },
  changeListTop:function(options){
    var listid=options.currentTarget.dataset.listid;
    switch(listid) {
      case "0":
         wx.navigateTo({
           url: '../playlist/playlist',
         })
         break;
      case "1":
         wx.navigateTo({
           url: '../ilike/ilike',
         })
         break;
 } 
    
  },
  /**
   * 
   * 列表获取缓存
   */
  
  /**
   * 
   *我喜欢获取缓存
   */



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
    this.getSongInfoById();

  },

  /*获取歌曲详细信息*/
getSongInfoById:function(){
  var ilike=wx.getStorageSync('ilike');
  //console.log(ilike);
  var that=this;
  var musicinfo=new Array(new Array);
  for(var i=0;i<ilike.length;i++){
      wx.request({
      url: 'https://music.163.com/api/song/detail/?id='+ilike[i]+'&ids=['+ilike[i]+']',
      success:function(res){
        //console.log(res.data.songs[0]);
        musicinfo.push(res.data.songs[0]);
        

      },
    })
  }
  //console.log("ssssssssss"+musicinfo);
  that.setData({
    ilikeList:musicinfo
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
    this.getSongInfoById();

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
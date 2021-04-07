// miniprogram/pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songs:null,
    albumpicUrl:[]

  },




  formSubmit: function (e) {
    var search = e.detail.value.input;
    if(search !== ""){
      this.searchReault(search);
    }

  },
  playTap:function(e){
    var id=e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '../play/play?mid='+id,
    })
  },
  /**
   * 
   * 搜索结果
   */
  searchReault:function(search){
    var that=this;
    var songids=[];
    wx.request({
      url: 'https://music.163.com/api/search/get?s='+search+'&type=1&limit=10',
      success:function(res){
        var songid=res.data.result.songs;
        for(var i=0;i<songid.length;i++){
          songids.push(songid[i].id)
          
        }
        that.setData({
          albumpicUrl:[]
        })
        var imagesrc=that.getsongimage(songids,0,songids.length);
        console.log(res.data.result.songs);
        wx.setStorageSync('listing', res.data.result.songs);
        that.setData({
          songs:res.data.result.songs
        })
      }
    })
  },

  /**
   * 
   *查找歌曲详情，获得歌曲封面
   */
  getsongimage:function(songids,i,l){
    var that=this;
    var albumpicUrl=this.data.albumpicUrl;
    wx.request({
      url: 'https://music.163.com/api/song/detail/?id='+songids[i]+'&ids=['+songids[i]+']',
      success:function(res){
       // console.log(res.data.songs[0].album.name);
        var picUrl=res.data.songs[0].album.picUrl;
        albumpicUrl.push(picUrl);
        wx.setStorageSync('listingimg', albumpicUrl);
        that.setData({
          albumpicUrl:albumpicUrl
        })
        if(++i<l){
          that.getsongimage(songids,i,l)
        }
      },
    })

    return albumpicUrl;

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
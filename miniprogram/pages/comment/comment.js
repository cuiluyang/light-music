// miniprogram/pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    comments:null,
    keyboardIntputValue:null,
    sendMoreMsgFlag:false,
    chooseFile:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var sid=options.id;
    this.setData({
      id:sid
    })
    this.bindCommentData();

  },
  bindCommentInput:function(event){
    this.data.keyboardIntputValue=event.detail.value;
    
  },
  /**
   * 缓存评论内容
   */
  submitComment:function(event){
    var result=[];
    var timestamp = Date.parse(new Date());  
    timestamp = timestamp / 1000;  
    var newData={
      id:this.data.id,
      username:"雨夜",
      userimg:"../../image/头像.png",
      content:this.data.keyboardIntputValue,
      time: timestamp,
    };
    if(!newData.content){
      console.log("没有内容")
      return;
    }
    
    result=wx.getStorageSync('commentes');
    result.push(newData);
    wx.setStorageSync('commentes', result);
    this.showCommentSuccess();
    this.bindCommentData();
    this.resetAll();
  },
  showCommentSuccess:function(){
    wx.showToast({
      title: '评论成功',
      duration:1000,
      icon:"sueecss"
    })
  },
  bindCommentData:function(){
    var id=this.data.id;
    var comments=wx.getStorageSync('commentes');
    var result=[];
    for(var i=0;i<comments.length;i++){
      if(comments[i].id==id){
        var time=comments[i].time;
        comments[i].time=this.timeChange(time);
        result.push(comments[i]);
      }
      
    }
    this.setData({
      comments:result
    })
  },
  resetAll:function(){
    this.setData({
      keyboardIntputValue:''
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
   * 
   * 获取时间戳转换成普通时间
   */
  timeChange:function(time){

   
  
//获取当前时间  
    var n = time * 1000;  
    var date = new Date(n);  
    //年  
    var Y = date.getFullYear();  
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);  
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();  
    //时  
    var h = date.getHours();  
    //分  
    var m = date.getMinutes();  
    //秒  
    var s = date.getSeconds();
    var a=":";
    var b=".";
    var result=Y+"."+M+"."+D+" "+h+":"+m+":"+s;  
    return result; 

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
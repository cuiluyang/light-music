// miniprogram/pages/play/play.js
const myaudio = wx.createInnerAudioContext();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    action:{
      method:'pause'
    },
    playing:"../../image/播放.png",
    paused:"../../image/暂停.png",
    yes:"../../image/心亮.png",
    no:"../../image/心灭.png",
    like:0,
    id:null,
    state:'play',
    song:null,
    lyricArrays:[],
    margintop:0,
    lyricindex:0,
    isplay: true,
    playTime:"00:00",
    allTime:"00:00",
    playTimeMax:100,
    playTimeValue:0


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var sid=options.mid;
    this.setData({
      id:sid
    });
    this.setlike();
    this.getSongInfoById();
    this.getgeci();
    var id=this.data.id;
    myaudio.src ="https://music.163.com/song/media/outer/url?id="+id+".mp3";
    that.changeTime();
    myaudio.play();
    
    
    
    
   // this.playAudio();

  },

  /*播放暂停点击事件*/ 
  onPlayTap:function(){
    var meth=this.data.state;
    if(meth=='play'){
      this.setData({
        state:'pause'
      })
      myaudio.pause();
    }
    else{
      this.setData({
        state:'play'
      })
      myaudio.play();
    }
  },
/*获取歌曲详细信息*/
getSongInfoById:function(){
  var currentId=this.data.id;
  var that=this;
  wx.request({
    url: 'https://music.163.com/api/song/detail/?id='+currentId+'&ids=['+currentId+']',
    success:function(res){
      var musicinfo=res.data.songs[0];
      that.setData({
        song:musicinfo
      })

    },
  })
  
},
/**
 * 获取歌词
 */
getgeci:function(){
  var currentId=this.data.id;
  var that=this;
  wx.request({
    url: 'https://music.163.com/api/song/lyric?os=pc&id='+currentId+'&lv=-1&kv=-1&tv=-1',
    success:function(res){
    //   var musicinfo=res.data.songs[0];
    var lyric=res.data.lrc.lyric;
    var result=that.getlyric(lyric);
    that.setData({
      lyricArrays:result
    })

    },
  })
},
/**
 * 解析歌词 用\n切割歌词
 */
  getlyric:function(lyrics){
    var  lyricResult=[];
    var lyricArray=lyrics.split("\n");
   
    /*判断最后一个数组是否为空歌词，删去空歌词*/
    if(lyricArray[lyricArray.length-1]==""){
      lyricArray.pop();
    }
    //正则表达式
    var pattern = /\[\d{2}\:\d{2}\.\d{2,3}\]/;
    lyricArray.forEach(function(v,i,a){
      var realyric=v.replace(pattern,"");
      var timelyric=v.match(pattern);
      if(timelyric!=null){
        var result=timelyric[0].slice(1,-1);
        var timeArray=result.split(":");
        var finalTime=parseFloat(timeArray[0])*60+parseFloat(timeArray[1]);
        lyricResult.push([finalTime,realyric]);
        
      }
    
  })
    return lyricResult;
  },
  /**
   * 获取播放进度,设置歌词滚动
   */
changeTime:function(e){
  var that=this;
  myaudio.onCanplay(()=> {
    myaudio.duration;
    setTimeout(() => {
      
      var M=Math.floor(myaudio.duration/60);
      var S=Math.floor(myaudio.duration%60);
      if(M<10){
        var M="0"+M;
      }
      if(S<10){
        var S="0"+S;
      }
      var X=M+":"+S;
      that.setData({
        allTime:X,
        playTimeMax:Math.floor(myaudio.duration)
      })
    }, 1000)
  })
  setTimeout(() => {
    myaudio.currentTime
    myaudio.onTimeUpdate(() => {
      var time=myaudio.currentTime;
      var M=Math.floor(time/60);
      var S=Math.floor(time%60);
      if(M<10){
        var M="0"+M;
      }
      if(S<10){
        var S="0"+S;
      }
      var X=M+":"+S;
           // console.log(time+"aaaaaaa"+X);
      var lyricArrays=that.data.lyricArrays;
      if(that.data.lyricindex>=3){
        that.setData({
          margintop:(that.data.lyricindex-8)*27.4,
          playTime:X,
          playTimeValue:Math.floor(time)
        });
      }
      //自动播放下一首
      if(that.data.playTimeValue==that.data.playTimeMax){
        that.nextSong();
      }
      if(that.data.lyricindex == lyricArrays.length-2){
        if(time>=lyricArrays[lyricArrays.length-1][0]){
          that.setData({
            lyricindex:lyricArrays.length-1
          });
        };
      }else{
      for(var i=0;i<lyricArrays.length-1;i++){
        if(time>=lyricArrays[i][0] && time<=lyricArrays[i+1][0]){
          that.setData({
            lyricindex:i
          })
        }
      }
    }
  })
}, 500)
  

},
/**
 * 更改进度条
 */
changProgress:function(e){
  var value=e.detail.value;
  myaudio.seek(value);
},

/***
 * 初始化like
 */
setlike:function(){
    var id=this.data.id;
    var ilike=wx.getStorageSync('ilike');
    for(var i=0;i<ilike.length;i++){
      if(ilike[i]==id){
        this.setData({
          like:1
        })
      }
    }
},


/**
 * 我喜欢 收藏功能
 */
onLikeTap:function(){
  var result=[];
  var that=this;
  var meth=this.data.like;
  var id=this.data.id;
  if(meth=="0"){
    this.setData({
      like:"1"
    })
    result=wx.getStorageSync('ilike');
    result.push(id);
    wx.setStorageSync('ilike', result);
  }
  else{
    this.setData({
      like:"0"
    })
    var ilike=wx.getStorageSync('ilike');
    for(var i=0;i<ilike.length;i++){
      if(ilike[i]!=id){
        result.push(ilike[i]);
      }
    }
    wx.setStorageSync('ilike', result);
  }
},



/**
 * 跳转到评论页
 */

gotoComment:function(){
  var id=this.data.id;
  wx.navigateTo({
    url: '../comment/comment?id='+id,
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  play: function () {
      
    myaudio.play();
    console.log(myaudio.duration);
    this.setData({ isplay: true });
  },
  // 停止
  stop: function () {
    myaudio.pause();
    this.setData({ isplay: false });
  },
  playAudio: function () {
    this.setData({
      action: {
        method: 'play'
      }
    });
  },

  /**
 * 上一首
*/
lastSong:function(){
  var listing=wx.getStorageSync('listing');
  var id=this.data.id;
  for(var i=0;i<listing.length;i++){
    if(listing[i].id==id){
      if(i>0){
        this.setData({
          id:listing[i-1].id
        })
      }
      else{
        this.setData({
          id:listing[listing.length-1].id
        })
      }
    }
  }
    this.setlike();
    this.getSongInfoById();
    this.getgeci();
    var id=this.data.id;
    myaudio.src ="https://music.163.com/song/media/outer/url?id="+id+".mp3";
    this.changeTime();
    myaudio.play();
  
},

  /**
 * 下一首
 */
  nextSong:function(){
    var listing=wx.getStorageSync('listing');
  var id=this.data.id;
  for(var i=0;i<listing.length;i++){
    if(listing[i].id==id){
      if(i<listing.length-1){
        this.setData({
          id:listing[i+1].id
        })
      }
      else{
        this.setData({
          id:listing[0].id
        })
      }
    }
  }
    this.setlike();
    this.getSongInfoById();
    this.getgeci();
    var id=this.data.id;
    myaudio.src ="https://music.163.com/song/media/outer/url?id="+id+".mp3";
    this.changeTime();
    myaudio.play();
    
  },
})
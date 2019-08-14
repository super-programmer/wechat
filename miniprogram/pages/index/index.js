//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo:{},
    groupList:[],
    activeType:24,
    activeIndex:0,
    logged: false,
    takeSession: false,
    indicatorDots: false,
    autoplay: false,
    interval: 2000,
    duration: 1000,
    requestResult: ''
  },
  onLoad: function() {
    this.getGroupList()
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    
  },
  getGroupList:function(){
    let apiurl = `https://c.y.qq.com/v8/fcg-bin/fcg_v8_radiolist.fcg`
    wx.request({
      url: apiurl, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) =>{
        if(res.data){
          let startNum = res.data.indexOf('(')
          let endNum = res.data.indexOf(')')
          let $data = JSON.parse(res.data.substring(startNum + 1,endNum)).data;
          this.setData({
            "groupList": $data.data.groupList
          })
        }
      }
    })
  },
  swiperHandle(e){
    this.setData({
      activeType: this.data.groupList[e.detail.current].type
    })
  },
  checkTab:function(e){
    this.setData({
      activeType: e.currentTarget.dataset.type,
      activeIndex: e.currentTarget.dataset.index
    })
  },
})

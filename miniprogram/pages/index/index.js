//index.js
const app = getApp()
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo:{},
    groupList:[],
    tips:'请稍后',
    showLoading: true,
    animated: true,
    activeType:24,
    activeIndex:0,
    activeTabView:'tab0',
    logged: false,
    takeSession: false,
    indicatorDots: false,
    autoplay: false,
    interval: 1000,
    duration: 800,
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
          $data.data.groupList.forEach(item=>{
            item.radioList.forEach(sitem=>{
              sitem.listenNum = sitem.listenNum >= 10000 ? `${(sitem.listenNum/10000).toFixed(2)}万` : sitem.listenNum
            })
          })
          this.setData({
            "groupList": $data.data.groupList,
            "showLoading": false
          })
        }
      }
    })
  },
  swiperHandle(e){
    this.setData({
      activeTabView: `tab${e.detail.current}`,
      activeType: this.data.groupList[e.detail.current].type
    })
  },
  checkTab:function(e){
    this.setData({
      activeTabView: `tab${e.currentTarget.dataset.index}`,
      activeType: e.currentTarget.dataset.type,
      activeIndex: e.currentTarget.dataset.index
    })
  },
})

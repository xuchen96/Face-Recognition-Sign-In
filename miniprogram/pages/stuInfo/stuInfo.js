const app = getApp();
const db = wx.cloud.database();
const stuDb = db.collection('student');

Page({
  onLoad: function (options) {
    stuDb.where({
      _openid: app.globalData.openid
    }).get({
      success: res => {
        wx.showLoading({
          title: '正在获取信息',
        });
        console.log(res.data);
        const examInfo = res.data[0].examInfo;
        this.setData({
          examInfo: examInfo
        });
        wx.hideLoading();
      }
    });
  },
})
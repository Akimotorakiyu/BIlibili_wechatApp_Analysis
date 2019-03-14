require("../../utils/fetch").fetch;

var t = getApp();

Page({
    data: {
        uptext: "视频不见了哟",
        Sheight: ""
    },
    onLoad: function() {
        this.setData({
            Sheight: t.globalData.screenHeight - 301
        });
    }
});
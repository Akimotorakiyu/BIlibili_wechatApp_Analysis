require("./utils/ald-stat.js");

App({
    onLaunch: function(e) {
        var n = this, o = wx.getStorageSync("logs") || [];
        o.unshift(Date.now()), wx.setStorageSync("logs", o), wx.login({
            success: function(e) {}
        }), wx.getSetting({
            success: function(e) {
                e.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(e) {
                        n.globalData.userInfo = e.userInfo, n.userInfoReadyCallback && n.userInfoReadyCallback(e);
                    }
                });
            }
        }), this.globalData.wx_uid = Number(Math.random().toString().substr(3, 5) + Date.now()).toString(36), 
        wx.getSystemInfo({
            success: function(e) {
                console.log("系统信息", e), n.globalData.screenHeight = e.screenHeight, n.globalData.navBarHt = e.statusBarHeight + 46, 
                n.deviceCheckNotch(e.model);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    onShow: function(e) {
        console.log("onLaunch场景值", e.scene), -1 == [ 1036, 1069 ].indexOf(e.scene) ? wx.setStorageSync("openApp", !1) : wx.setStorageSync("openApp", !0);
    },
    deviceCheckNotch: function(e) {
        for (var n = [ "iPhone X", "MI 8", "MI 8 SE", "PADM00", "Nokia X6", "ONEPLUS A6000", "CLT-AL00", "iPhone XS Max", "iPhone XS", "iPhone XR", "unknown<iPhone11,2>", "unknown<iPhone11,8>", "16th" ], o = 0; o < n.length; o++) if (e.indexOf(n[o]) > -1) return void (this.globalData.isNotch = !0);
        this.globalData.isNotch = !1;
    },
    globalData: {
        userInfo: null,
        ip: "https://api.bilibili.com",
        isPlayId: "",
        scene: 1,
        wx_uid: 0,
        navBarHt: "",
        isNotch: !1,
        screenHeight: ""
    }
});
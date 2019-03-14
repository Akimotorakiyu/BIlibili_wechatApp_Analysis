var t = require("../../utils/util.js"),
  e = require("../../utils/fetch"),
  a = e.fetch,
  i = e.fetchImg,
  s = e.reportbili,
  o = getApp();

Page({
  data: {
    isPlay: !1,
    isStart: !1,
    durl: "",
    coverImg: "",
    localCoverImg: "",
    cid: "",
    listInfo: "",
    followers: "",
    playStat: "",
    aidSingle: "",
    tagArray: [],
    nowTag: 0,
    titleOpen: !1,
    tagsOpen: !1,
    titleheight: "",
    detailheight: "",
    singleRec: {},
    isShowRec: !1,
    iPxBar: !1,
    acount: "",
    actionsArr: [{
      name: "分享",
      icon: "share",
      openType: "share"
    }],
    showAS: !1,
    deviceHeight: 0,
    deviceWidth: 0,
    nickName: "",
    avatarUrl: "",
    isRefresh: !0,
    duration: "",
    network: "",
    iSopenBtn: !1,
    right: !1,
    isToastShow: !1,
    acode: "",
    epArr: [, , , , , , , , ],
    isShowFullPGC: !1,
    epInfo: "",
    season_id: "",
    epOid: "",
    epList: [],
    nowEPid: "",
    seasonList: [],
    long_title: "",
    singlepcover: "",
    arcodeUrl: "",
    noright: !1,
    isplayend: !1,
    scrollPosition: "",
    nowSStag: 0,
    backTop: "",
    islimit: !1,
    limitInfo: "",
    networkFlag: !1,
    epFullList: [],
    shareover100: !1,
    over100: !1,
    pgcidx: "",
    currentTitle: "",
    YGarr: [!1, !1, !1],
    currentLong_title: ""
  },
  onLoad: function(e) {
    var a = this;
    if (console.log("查看入参", e), e.ssid && (this.setData({
        season_id: e.ssid
      }), this.fetchEpInfo(e.ssid, 2)), e.epid && this.fetchEpInfo(e.epid, 1), e.scene) {
      var i = Number(e.scene);
      this.fetchEpInfo(i, 1);
    }
    var s = this;
    wx.getSystemInfo({
      success: function(t) {
        o.globalData.isNotch && s.setData({
          iPxBar: !0
        }), s.setData({
          deviceWidth: t.windowWidth,
          deviceHeight: t.screenHeight
        });
      }
    }), this.isShowopenbtn(), t.getNetWorkType().then(function(t) {
      var e = t.errMsg,
        i = t.networkType;
      "getNetworkType:ok" === e && a.setData({
        network: "wifi" === i,
        networkFlag: "wifi" !== i
      });
    });
  },
  onShow: function(t) {
    -1 == o.globalData.secne && this.onLoad();
  },
  onHide: function() {
    o.globalData.scene = -1;
  },
  onReady: function() {
    this.videoContext = wx.createVideoContext("myVideo"), wx.getStorageSync("openApp") && wx.reportAnalytics("vinfo_pgcvideo_click", {
      vinfo_pgcvideo_click: "",
      from_app_share: 1
    });
  },
  getArcode: function(t) {
    var e = this;
    wx.getImageInfo({
      src: 'https://api.bilibili.com/x/web-goblin/wechat/qrcode?json={"page":"pages/pgcvideo/pgcvideo","scene":' + t + ',"width":"76"}',
      success: function(t) {
        e.setData({
          arcodeUrl: t.path
        });
      }
    });
  },
  fetchEpInfo: function(t, e) {
    var s = this;
    1 == e && a({
      url: "https://api.bilibili.com/pgc/view/wx/season",
      data: {
        ep_id: t
      }
    }).then(function(e) {
      if (s.getArcode(t), s.data.shareover100) s.setData({
        nowEPid: t,
        scrollPosition: "position" + t
      });
      else {
        if (s.setData({
            noright: !1,
            islimit: !1,
            isplayend: !1,
            limitInfo: "",
            nowEPid: t,
            epInfo: e.data.result,
            epList: e.data.result.episodes.slice(0, 100),
            seasonList: e.data.result.seasons,
            scrollPosition: "position" + t,
            season_id: e.data.result.season_id
          }), e.data.result.episodes.length > 100 && s.setData({
            over100: !0
          }), e.data.result.section)
          for (var a = 0; a < e.data.result.section[0].episodes.length; a++) t == e.data.result.section[0].episodes[a].id && s.setData({
            title: e.data.result.section[0].episodes[a].title,
            long_title: e.data.result.section[0].episodes[a].long_title,
            singlepcover: e.data.result.section[0].episodes[a].cover,
            currentTitle: e.data.result.section[0].episodes[a].title,
            currentLong_title: e.data.result.section[0].episodes[a].long_title,
            epOid: e.data.result.section[0].episodes[a].aid
          }, function() {
            s.getComments(s.data.epOid), i(s.data.singlepcover).then(function(t) {
              s.setData({
                localCoverImg: t.path
              });
            });
          });
        for (var o = 0; o < e.data.result.episodes.length; o++)
          if (t == e.data.result.episodes[o].id) {
            o > 99 && s.setData({
              shareover100: !0,
              scrollPosition: "current",
              shareId: t
            });
            var n = e.data.result.episodes[o];
            if (s.setData({
                title: n.title,
                epOid: n.aid,
                long_title: n.long_title,
                singlepcover: n.cover,
                pgcidx: o,
                currentTitle: n.title,
                currentLong_title: n.long_title
              }, function() {
                s.getComments(s.data.epOid), i(s.data.singlepcover).then(function(t) {
                  s.setData({
                    localCoverImg: t.path
                  });
                });
              }), 2 != n.status) return s.setData({
              noright: !0,
              isplayend: !1,
              networkFlag: !1,
              islimit: !1
            }), void s.pause();
          }
      }
      e.data.result.limit ? s.setData({
        islimit: !0,
        limitInfo: e.data.result.limit.content,
        networkFlag: !1,
        noright: !1,
        isplayend: !1
      }) : s.getAvinfo(s.data.nowEPid);
    }), 2 == e && a({
      url: "https://api.bilibili.com/pgc/view/wx/season",
      data: {
        season_id: t
      }
    }).then(function(e) {
      s.setData({
        noright: !1,
        islimit: !1,
        isplayend: !1,
        shareover100: !1,
        over100: !1,
        limitInfo: "",
        epInfo: e.data.result,
        epList: e.data.result.episodes.slice(0, 100),
        seasonList: e.data.result.seasons
      }, function() {
        e.data.result.episodes.length >= 1 ? (s.setData({
          nowEPid: e.data.result.episodes.slice(0, 100)[0].id,
          epOid: e.data.result.episodes.slice(0, 100)[0].aid,
          currentTitle: e.data.result.episodes.slice(0, 100)[0].title,
          currentLong_title: e.data.result.episodes.slice(0, 100)[0].long_title,
          long_title: e.data.result.episodes.slice(0, 100)[0].long_title,
          singlepcover: e.data.result.episodes.slice(0, 100)[0].cover,
          scrollPosition: "position" + e.data.result.episodes.slice(0, 100)[0].id
        }, function() {
          s.getComments(s.data.epOid), s.getAvinfo(s.data.nowEPid);
        }), 2 != e.data.result.episodes.slice(0, 100)[0].status && s.setData({
          noright: !0,
          isplayend: !1,
          networkFlag: !1,
          islimit: !1
        })) : e.data.result.episodes.length || s.setData({
          epOid: e.data.result.section[0].episodes[0].aid,
          nowEPid: e.data.result.section[0].episodes[0].id
        }, function() {
          s.getComments(s.data.epOid), s.getAvinfo(s.data.nowEPid);
        }), i(s.data.singlepcover).then(function(t) {
          s.setData({
            localCoverImg: t.path
          }), s.getArcode(s.data.nowEPid);
        });
      }), e.data.result.episodes.length > 100 && s.setData({
        over100: !0
      }), s.data.seasonList.forEach(function(e, a) {
        e.season_id == t && s.setData({
          nowSStag: a
        });
      }), e.data.result.limit && s.setData({
        islimit: !0,
        limitInfo: e.data.result.limit.content,
        networkFlag: !1,
        noright: !1,
        isplayend: !1
      });
    });
  },
  isFullPGC: function(t) {
    t.currentTarget.dataset.flag ? this.setData({
      isShowFullPGC: !0
    }) : this.setData({
      isShowFullPGC: !1
    });
  },
  isFullYG: function(t) {
    if (t.currentTarget.dataset.flag) switch (t.currentTarget.dataset.stage) {
      case 1:
        this.setData({
          YGarr: [!0, !1, !1]
        });
        break;

      case 2:
        this.setData({
          YGarr: [!1, !0, !1]
        });
        break;

      case 3:
        this.setData({
          YGarr: [!1, !1, !0]
        });
    } else this.setData({
      YGarr: [!1, !1, !1]
    });
  },
  isStartPlay: function(t) {
    return !!t.publish.is_started || (this.setData({
      epInfo: t,
      seasonList: t.seasons,
      epList: []
    }), this.getArcode(), !1);
  },
  isToast: function() {
    var t = this,
      e = wx.getStorageSync("toastCount");
    e ? 3 === e ? this.setData({
      isToastShow: !1
    }) : (this.setData({
      isToastShow: !0
    }), e++, wx.setStorageSync("toastCount", e), setTimeout(function() {
      t.setData({
        isToastShow: !1
      });
    }, 5e3)) : (wx.setStorageSync("toastCount", 1), this.setData({
      isToastShow: !0
    }), setTimeout(function() {
      t.setData({
        isToastShow: !1
      });
    }, 5e3));
  },
  stopMove: function() {
    return !1;
  },
  play: function() {
    this.setData({
      isPlay: !0,
      isStart: !0
    }), wx.reportAnalytics("vinfo_pgcvideo_click", {}), this.videoContext.play();
  },
  tagReport: function(t) {
    wx.reportAnalytics("vinfo_tag_click", {
      vinfo_tag_click: ""
    });
  },
  pause: function() {
    this.videoContext.pause(), this.setData({
      isPlay: !1
    });
  },
  bindended: function() {
    this.videoContext.exitFullScreen(), this.setData({
      isStart: !1,
      isPlay: !1,
      isShowRec: !0,
      isplayend: !0,
      noright: !1,
      networkFlag: !1,
      islimit: !1
    });
  },
  checkNewss: function(t) {
    var e = t.currentTarget.dataset.idx;
    e != this.data.nowSStag && (this.setData({
      nowSStag: e
    }), this.pause(), this.fetchEpInfo(t.currentTarget.dataset.season_id, 2));
  },
  launchAppError: function(t) {
    wx.navigateTo({
      url: "../download/download"
    });
  },
  onShareAppMessage: function(t) {
    return wx.reportAnalytics("vinfo_share_click", {
      vinfo_share_click: this.data.aidSingle
    }), "button" === t.from && wx.reportAnalytics("share_friends_click"), {
      title: 2 === this.data.epInfo.type ? this.data.epInfo.title : this.data.epInfo.title + " " + this.data.currentTitle + " " + this.data.currentLong_title,
      path: "/pages/pgcvideo/pgcvideo?epid=" + this.data.nowEPid,
      imageUrl: this.data.singlepcover + "@158-0-750-600a_10660w_600h.png",
      success: function() {
        wx.showToast({
          title: "分享成功",
          icon: "success",
          duration: 3e3
        });
      },
      fail: function() {
        wx.showToast({
          title: "分享失败",
          icon: "none",
          duration: 3e3
        });
      }
    };
  },
  backHome: function() {
    wx.reportAnalytics("backhome_click", {
      backhome_click: "backhome"
    }), wx.reLaunch({
      url: "../index/index"
    });
  },
  switchHomeTag: function(t) {
    var e = t.currentTarget.dataset.tag;
    e != this.data.nowTag && (this.setData({
      nowTag: e
    }), 1 == e && wx.reportAnalytics("pgcvideo_comments_tab_click"));
  },
  changeOpen: function() {
    this.setData({
      titleOpen: !this.data.titleOpen
    });
  },
  tagsOpen: function() {
    this.setData({
      tagsOpen: !this.data.tagsOpen
    });
  },
  getAvinfo: function(t) {
    var e = this;
    a({
      url: "https://api.bilibili.com/pgc/player/web/playurl/html5",
      data: {
        ep_id: t
      }
    }).then(function(a) {
      e.setData({
        durl: a.data.result.durl[0].url
      }), s([t, "play", "vinfo", e.data.season_id]), e.data.network && wx.reportAnalytics("vinfo_pgcvideo_click", {
        vinfo_pgcvideo_click: t
      });
    });
  },
  getComments: function(t) {
    var e = this;
    // a({
    //     url: o.globalData.ip + "/x/v2/reply?",
    //     data: {
    //         oid: t,
    //         pn: 1,
    //         type: 1,
    //         sort: 0
    //     }
    // }).then(function(t) {
    //     if (t.data.code) 12002 === t.data.code && e.setData({
    //         isCommentsBan: !0
    //     }); else {
    //         var a = JSON.parse(JSON.stringify(t).replace(/\u00A0|\u2028|\u2029|\uFEFF/g, ""));
    //         e.setData({
    //             isCommentsBan: !1,
    //             comments: t.data.data.page.acount ? t.data.data.page.acount : "",
    //             hotArray: a.data.data.hots,
    //             discussArray: a.data.data.replies
    //         });
    //     }
    // });
  },
  updatePlay: function(t) {
    this.videoContext.pause(), console.log("父组件接收", t.detail), 1 == t.detail.type && this.fetchEpInfo(t.detail.id, 1),
      2 == t.detail.type && this.fetchEpInfo(t.detail.id, 2), t.detail.backTop && (s([t.detail.id, "relate_click", "vinfo", t.detail.id, ""]),
        this.setData({
          backTop: "position0000"
        }));
  },
  playing: function() {
    this.setData({
      isShowRec: !1,
      isplayend: !1,
      noright: !1,
      islimit: !1,
      networkFlag: !1
    });
  },
  epChoice: function(t) {
    var e = t.currentTarget.dataset.epid,
      a = t.currentTarget.dataset.title ? t.currentTarget.dataset.title : "",
      i = t.currentTarget.dataset.long,
      s = t.currentTarget.dataset.spc;
    e !== this.data.nowEPid && (this.fetchEpInfo(e, 1), this.setData({
      nowEPid: e,
      isShowFullPGC: !1,
      scrollPosition: "position" + e,
      currentTitle: a,
      YGarr: [!1, !1, !1],
      currentLong_title: i || ""
    }), s && this.setData({
      scrollPosition: "current"
    }));
  },
  canvasTextAutoLine: function(t, e, a, i) {
    for (var s = wx.createCanvasContext("shareCanvas"), o = 0, n = 0, r = [], l = [], c = 0; c < t.length; c++)(o += s.measureText(t[c]).width) > 375 - e && (r.push(t.substring(n, c)),
      i, o = 0, n = c), c == t.length - 1 && l.push(t.substring(n, c + 1) + "...");
    return {
      1: r,
      2: l
    };
  },
  onGotUserInfo: function(t) {
    var e = this;
    if (wx.reportAnalytics("pgcvideo_share_moments_click"), t.detail.userInfo) {
      var a = t.detail.userInfo,
        s = a.avatarUrl,
        o = a.nickName;
      i(s).then(function(t) {
        e.setData({
          nickName: o,
          avatarUrl: t.path
        }, function() {
          e.setPost();
        });
      });
    }
  },
  setPost: function() {
    var t = this;
    wx.getSetting({
      success: function(e) {
        void 0 === e.authSetting["scope.writePhotosAlbum"] ? wx.authorize({
          scope: "scope.writePhotosAlbum",
          success: function() {
            t.createPost();
          }
        }) : !1 === e.authSetting["scope.writePhotosAlbum"] ? wx.showModal({
          content: "请在设置中打开相册权限～",
          showCancel: !1,
          confirmText: "知道了",
          success: function(e) {
            e.confirm && wx.openSetting({
              success: function(e) {
                e.authSetting["scope.writePhotosAlbum"] && t.createPost();
              }
            });
          }
        }) : t.createPost();
      }
    });
  },
  createPost: function() {
    var e = wx.createCanvasContext("shareCanvas"),
      a = this.data,
      i = a.deviceWidth,
      s = a.deviceHeight,
      o = a.nickName,
      n = a.avatarUrl,
      r = a.localCoverImg,
      l = (a.arcodeUrl,
        a.epInfo),
      c = l.title,
      d = l.evaluate.substring(0, 23) + "...";
    e.setFillStyle("#ffffff"), e.fillRect(0, 0, i, s), e.drawImage(r, 0, 0, i, 210);
    var p = t.strLen(c),
      u = p.str1,
      h = p.str2;
    e.setFontSize(20), e.setFillStyle("#212121"), h.length ? (e.fillText(u.join().replace(/,/g, ""), 16, 242),
        e.fillText(h.join().replace(/,/g, ""), 16, 270)) : e.fillText(u.join().replace(/,/g, ""), 16, 260),
      e.stroke(), e.save(), e.setFontSize(12), e.setFillStyle("#999"), e.fillText(d, 16, 298),
      e.stroke(), e.save(), e.setStrokeStyle("#E7E7E7"), e.setLineWidth(.1), e.beginPath(),
      e.moveTo(16, 325), e.lineTo(58, 325), e.closePath(), e.stroke(), e.save(), e.setFontSize(14),
      e.setFillStyle("#212121"), e.fillText(o, 41, 365), e.stroke(), e.setFontSize(12),
      e.setFillStyle("#999"), e.fillText("在" + t.getTime() + "观看这个视频", 16, 382), e.stroke(),
      e.save(), e.beginPath(), e.arc(26, 360, 10, 0, 2 * Math.PI), e.setFillStyle("#EEEEEE"),
      e.fill(), e.clip(), e.drawImage(n, 16, 350, 20, 20), e.restore(), e.closePath(),
      e.restore(), e.drawImage("../../image/icon-post.png", 0, 330, 375, 140), e.drawImage(this.data.arcodeUrl, 216, 377, 76, 76),
      e.draw(!0, function() {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 375,
          height: 470,
          canvasId: "shareCanvas",
          success: function(t) {
            var e = t.tempFilePath;
            wx.saveImageToPhotosAlbum({
              filePath: e,
              success: function(t) {
                -1 !== t.errMsg.indexOf("ok") ? wx.showModal({
                  content: "已保存到本地相册，快叫小伙伴们来围观吧~",
                  showCancel: !1,
                  confirmText: "知道了",
                  success: function(t) {
                    t.confirm && console.log("用户点击确定");
                  }
                }) : wx.showToast({
                  title: "保存失败",
                  icon: "none",
                  duration: 3e3
                });
              }
            });
          }
        });
      });
  },
  reportEvent: function(t) {
    switch (t.target.dataset.report) {
      case "playbtn":
        wx.reportAnalytics("videopage_play_click", {
          videopage_play_click: t.target.dataset.aid
        });
        break;

      case "openapp":
        wx.reportAnalytics("openapp_click", {
          openapp_click: "openapp"
        });
    }
  },
  isShowopenbtn: function() {
    wx.getStorageSync("openApp") ? this.setData({
      iSopenBtn: !0
    }) : this.setData({
      iSopenBtn: !1
    });
  },
  shareRep: function() {
    wx.reportAnalytics("pgcvideo_share_friends_click");
  }
});
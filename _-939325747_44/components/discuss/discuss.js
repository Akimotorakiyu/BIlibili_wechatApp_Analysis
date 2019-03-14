var a = getApp(), t = require("../../utils/fetch").fetch;

Component({
    data: {
        hotArray: [],
        discussArray: [],
        isBan: !1,
        normal: !1
    },
    properties: {
        aid: Number,
        hotArray: Array,
        discussArray: Array,
        isPgc: Boolean,
        isCommentsBan: Boolean
    },
    ready: function() {
        var s = this;
        this.data.isPgc ? this.data.isCommentsBan ? this.setData({
            isBan: !0,
            normal: !1
        }) : this.setData({
            normal: !0,
            isBan: !1
        }) : t({
            url: a.globalData.ip + "/x/v2/reply?",
            data: {
                oid: this.data.aid,
                pn: 1,
                type: 1,
                sort: 0
            }
        }).then(function(a) {
            var t = JSON.parse(JSON.stringify(a).replace(/\u00A0|\u2028|\u2029|\uFEFF/g, ""));
            t.data.code ? 12002 === t.data.code && s.setData({
                isBan: !0,
                normal: !1
            }) : s.setData({
                normal: !0,
                hotArray: t.data.data.hots,
                discussArray: t.data.data.replies,
                isBan: !1
            });
        }).catch(function(a) {
            console.log(a);
        });
    },
    methods: {}
});
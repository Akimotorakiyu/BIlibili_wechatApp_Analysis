var t = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
}, a = {
    visible: !1
}, e = getApp(), i = null;

Component({
    externalClasses: [ "i-class" ],
    data: t({}, a, {
        isX: !1
    }),
    ready: function() {
        e.globalData.isNotch && this.setData({
            isX: !0
        });
    },
    methods: {
        handleShow: function(a) {
            var e = this, n = a.type, o = void 0 === n ? "default" : n, s = a.duration, l = void 0 === s ? 2 : s;
            this.setData(t({}, a, {
                type: o,
                duration: l,
                visible: !0
            }), function() {
                console.log(e.data.type);
            });
            var r = 1e3 * this.data.duration;
            i && clearTimeout(i), 0 !== r && (i = setTimeout(function() {
                e.handleHide(), i = null;
            }, r));
        },
        handleHide: function() {
            this.setData(t({}, a));
        }
    }
});
var t = require("../../utils/fetch").fetch;

Page({
    data: {
        durl: ""
    },
    onLoad: function() {
        t({
            url: "http://h5playurl.bilibili.co/playurl?appkey=12450&otype=json&qn=32&cid=10151061&avid=21118516&platform=html5&type=mp4",
            data: {
                appkey: 12450,
                otype: "json",
                qn: 32,
                cid: 10151061,
                avid: 21118516,
                platform: "html5",
                type: "mp4"
            }
        }).then(function(t) {}).catch(function(t) {
            console.log(t);
        });
    }
});
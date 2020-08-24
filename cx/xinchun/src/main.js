import Vue from 'vue'
import App from './App.vue'
import plugin from './utils/plugin.js'

Vue.use(plugin)


window.cxPaySuccess = function(){
    window.location.reload();
};

window.cxLoginSuccess = function () {
    window.location.reload();
};



new Vue({
    render: h => h(App),
    mounted() {
        let ua = window.navigator.userAgent;
        let wxReg = /MicroMessenger/i;
        if (wxReg.test(ua)) {
            getWXConfig();
            let shareTitle = '上财新   摇好礼';
            let lineLink = window.location.href;
            let descContent = '摇一摇，好礼非你莫“鼠”';
            let imgUrl = 'http://cchuodong.caixin.com/market/xinchun/img/xinchun.jpg';
            wx.ready(function () {
                wx.onMenuShareTimeline({
                    title: shareTitle, // 分享标题
                    link: lineLink, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                wx.onMenuShareAppMessage({
                    title: shareTitle, // 分享标题
                    desc: descContent, // 分享描述
                    link: lineLink, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                wx.onMenuShareQQ({
                    title: shareTitle, // 分享标题
                    desc: descContent, // 分享描述
                    link: lineLink, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                wx.onMenuShareWeibo({
                    title: shareTitle, // 分享标题
                    desc: descContent, // 分享描述
                    link: lineLink, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
            });
        }

    }
}).$mount('#app')


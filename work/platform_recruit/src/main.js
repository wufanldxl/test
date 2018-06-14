// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import apiUrl from './common/apiUrl.js'
Vue.config.productionTip = false
Vue.use(VueResource)
Vue.prototype.apiUrl = apiUrl
Vue.http.headers.common['Token'] = getCookie('Token')
Vue.http.headers.common['App-Key'] = getCookie('App-Key')
// Vue.http.headers.common['Token'] = '84f31ee861c04e9fbc90d56df0e2bef8'
// Vue.http.headers.common['App-Key'] = '2018060413204309d68e3d4f023157821e754b721634df'
Vue.prototype.wxconfig = function (shareTitle, shareDesc, shareUrl, shareIcon, locationHref) {
  let ua = window.navigator.userAgent
  let isWX = /MicroMessenger/i.test(ua)
  if (isWX) {
    this.$http.get('/common/jssdkConfig', {params: {href: locationHref}}).then(res => {
      if (res.body.resultCode === 200) {
        let data = res.body.data
        wx.config({
          debug: false,
          appId: data.appId,
          timestamp: data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone', 'onMenuShareWeibo', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem']
        })
        wx.ready(function () {     
          let menuList = ['menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:share:QZone', 'menuItem:share:facebook']
          wx.hideMenuItems({
            menuList: menuList
          })
          wx.onMenuShareTimeline({
            title: shareTitle,
            link: shareUrl,
            imgUrl: shareIcon,
            success () {},
            cancel () {}
          })
          wx.onMenuShareAppMessage({
            title: shareTitle,
            desc: shareDesc,
            link: shareUrl,
            imgUrl: shareIcon,
            success () {
            },
            cancel () {
            }
          })
        })
      }
    })
  }
}

function getCookie (sName) {
  var arr = document.cookie.split('; ')
  if (sName) {
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split('=')
      if (arr2[0] === sName) {
        return arr2[1]
      }
    }
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

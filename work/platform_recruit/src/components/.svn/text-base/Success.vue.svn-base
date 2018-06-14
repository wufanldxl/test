<template>
  <div class="success">
    <div class="qrcode" v-show="!isApp">
      <div class="tips"></div>
      <div class="code">
        <img src="../image/success_qrcode.png">
      </div>
    </div>
    <div class="appsuccess" v-show="isApp">
      <div></div>
    </div>
    <div class="rule">
      <span @click="showRule"></span>
    </div>
    <div class="sharebtn">
      <span @click="shareFunc"></span>
    </div>
    <div class="sharetips">
      <span></span>
    </div>
    <div class="sharepoint" v-show="sharePoint" @click="hideSharePoint">
      <img src="../image/wx_point.png">
      <div class="content">点击 “  …  ”<br>分享朋友</div>
      <div class="sharepointbg"></div>
    </div>
    <div class="successbg"></div>
    <rule v-show="rule" @hideRule="hideRule"></rule>
    <bubble :msg="bubbleMsg" :moudel="bubbleMoudel" :delay="bubbleDelay" :box="'gbox'"></bubble>
  </div>
</template>
<script>
import Rule from './Rule.vue'
import bubble from './bubble'
export default {
  name: 'Success',
  data () {
    return {
      rule: false,
      recruitTypeCode: '',
      isApp: /platformEmp\/\d+(\.\d+)*/i.test(window.navigator.userAgent),
      bubbleMsg: '',
      bubbleMoudel: {
        show: false
      },
      bubbleDelay: 0,
      sharePoint: false,
      isApp: /platformEmp\/\d+(\.\d+)*/i.test(window.navigator.userAgent),
      isWX: /MicroMessenger/i.test(window.navigator.userAgent),
      isIOS: !!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    }
  },
  methods: {
    getCookie (sName) {
      var arr = document.cookie.split('; ')      
      if (sName) {
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split('=')
          if (arr2[0] === sName) {            
            return arr2[1]
          }
        }
      }
    },
    showRule () {
      this.rule = true
    },
    hideRule () {
      this.rule = false
    },
    shareFunc () {
      let u = window.navigator.userAgent
      let app = /platformEmp\/\d+(\.\d+)*/i.test(u)
      let shareUrl = this.setShareUrl()
      let shareTitle = 'e城e家合伙赚钱计划，加入我们吧！'
      let shareDes = '服务者招募，注册享50元现金，邀请好友还可享现金礼包哦！'
      let shareIcon = window.location.origin + '/platformworker/logo.jpg'
      if (app) {
        // app内部拉取分享
        try {
          window.platformEmp.share(shareUrl, shareTitle, shareDes, shareIcon)
        } catch (err) {
          this.showBubble(err)
        }
      } else {
        this.sharePoint = true
      }
    },
    showBubble (msg, moudel = true, delay = 0) {
      this.bubbleMsg = msg
      this.bubbleMoudel.show = moudel
      this.bubbleDelay = delay
    },
    hideSharePoint () {
      this.sharePoint = false
    },
    setShareUrl () {
      if (this.sharePeopleId) {
        return window.location.origin + '/platformworker/index.html?recruitTypeCode=' + this.recruitTypeCode + '&refereeId=' + this.sharePeopleId
      } else {
        return window.location.origin + '/platformworker/index.html?recruitTypeCode=' + this.recruitTypeCode
      }
    },
    getQueryString(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    },
    setWXShareMes () {
      this.$http.get(this.apiUrl.recruit.propleMes).then(function (res) {
        let response = res.body
        if (response.resultCode === 200) {
          this.recruitTypeCode = response.data.recruitTypeCode
          this.sharePeopleId = response.data.sharePeopleId
          let shareUrl = this.setShareUrl()
          let shareTitle = 'e城e家合伙赚钱计划，加入我们吧！'
          let shareDes = '服务者招募，注册享50元现金，邀请好友还可享现金礼包哦！'
          let shareIcon = window.location.origin + '/platformworker/logo.jpg'
          let shareLocalHref = window.location.href
          if (this.isIOS) {
            shareLocalHref = shareLocalHref.split('#')[0]
          }
          this.wxconfig(shareTitle, shareDes, shareUrl, shareIcon, shareLocalHref)
        } else {
          this.showBubble(response.message)
        }
      }, function (err) {
        this.showBubble(err)
      })
    },
    getUserInfo () {
      this.recruitTypeCode = this.$route.query.recruitTypeCode || this.getQueryString('recruitTypeCode')
      this.sharePeopleId = this.$route.query.empId || this.getQueryString('empId')
    }
  },
  components: {
    Rule,
    bubble
  },
  mounted () {
    if (this.isWX) {
      this.setWXShareMes()
    } else {
      this.getUserInfo()
    } 
  },
  watch: {
    '$route': 'getUserInfo',
  }
}
</script>
<style scoped>
.success {
  padding-top: 0.333333rem;
}
.successbg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(../image/success_bg.png) repeat-y center;
  background-size: 100%;
  z-index: -1;
}
.qrcode {
  position: relative;
  width: 10.0rem;
  height: 10.893333rem;
  background: url(../image/success_qrcodebg.png);
  background-size: 100% 100%;
}
.qrcode .tips {
  position: absolute;
  top: 1.733333rem;
  left:1.173333rem;
  width: 7.626667rem;
  height: 4.04rem;
  background: url(../image/success_tips.png);
  background-size: 100% 100%;
}
.qrcode .code {
  position: absolute;
  top: 6.733333rem;
  left: 3.386667rem;
  width: 3.466667rem;
  height: 3.466667rem;
  background: url(../image/success_codebg.png);
  background-size: 100% 100%;
}
.qrcode .code img {
  position: absolute;
  top: 0.12rem;
  left: 0.133333rem;
  width: 3.026667rem;
  height: 3.026667rem;
}
.appsuccess {
   padding-top: 1.066667rem;
}
.appsuccess div {
  margin: 0 auto;
  width: 7.733333rem;
  height: 5.693333rem;
  background: url(../image/success_tips2.png);
  background-size: 100% 100%;
}
.rule {
  padding-top: 0.8rem;
  padding-left: 6.96rem;
}
.rule span {
  display: inline-block;
  width: 2.586667rem;
  height: 0.413333rem;
  background: url(../image/success_rule.png);
  background-size: 100% 100%;
}
.sharebtn {
  padding-top: 0.946667rem;
  text-align: center;
}
.sharebtn span {
  display: inline-block;
  width: 4.973333rem;
  height: 1.133333rem;
  background: url(../image/success_sharebtn.png);
  background-size: 100% 100%;
}
.sharetips {
  padding-top: 0.933333rem;
  padding-bottom: 0.533333rem;
  text-align: center;
}
.sharetips span {
  display: inline-block;
  width: 8.44rem;
  height: 2.373333rem;
  background: url(../image/success_sharetips.png);
  background-size: 100% 100%;
}
.sharepoint {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.sharepoint img {
  width: 13px;
  position: absolute;
  top: 5px;
  right: 20px;
  z-index: 2;
}
.sharepoint .sharepointbg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0.5;
  background: #000;
}
.sharepoint .content {
  position: absolute;
  top: 70px;
  right: 40px;
  width: 120px;
  z-index: 2;
  font-size: 20px;
  color: #fff;
  line-height: 2;
  text-align: right;
}
</style>

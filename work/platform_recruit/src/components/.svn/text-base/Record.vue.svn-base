<template>
  <div class="record">
    <div class="recordList">
      <div class="income">
        <div class="money">{{total}}<span>元</span></div>
        <div class="tips">邀请总收入</div>
      </div>
      <div class="incomelist">
        <div class="title" v-if="register">注册奖励</div>
        <ul class="list" v-if="register">
          <li>
            <span>{{register.empPhone}}</span>
            <span>{{register.inviteDate}}</span>
            <span class="yellow">{{register.reward}}元</span>
          </li>
        </ul>
        <div class="title invitetitle" v-if="inviteList.length !== 0">邀请奖励</div>
        <ul class="list invitelist" v-if="inviteList.length !== 0">
          <li v-for="invite in inviteList" :key="invite.empPhone">
            <span>{{invite.empPhone}}</span>
            <span>{{invite.inviteDate}}</span>
            <span class="yellow">{{invite.reward}}元</span>
          </li>
        </ul>
        <div class="title" v-if="register === undefined && inviteList.length === 0">暂无奖励</div>
      </div>
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
      <img src="../image/sharepoint.png">
      <div class="content">点击这里分享！</div>
      <div class="sharepointbg"></div>
    </div>
    <div class="recordbg"></div>
    <rule v-show="rule" @hideRule="hideRule"></rule>
    <bubble :msg="bubbleMsg" :moudel="bubbleMoudel" :delay="bubbleDelay" :box="'abox'"></bubble>
  </div>
</template>
<script>
import Rule from './Rule.vue'
import bubble from './bubble'
export default {
  name: 'Record',
  data () {
    return {
      inviteList: [],
      register: {},
      shareText: '',
      total: '',
      rule: false,
      recruitTypeCode: '',
      sharePeopleId: '',
      bubbleMsg: '',
      bubbleMoudel: {
        show: false
      },
      sharePoint: false,
      bubbleDelay: 0,
      isApp: /platformEmp\/\d+(\.\d+)*/i.test(window.navigator.userAgent),
      isIOS: !!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    }
  },
  mounted () {
    this.getRecord()
    this.getPeopleMes()
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
    hideSharePoint () {
      this.sharePoint = false
    },
    getRecord () {
      this.$http.get(this.apiUrl.recruit.record).then(function (res) {
        let response = res.body
        if (response.resultCode === 200) {
          this.inviteList = response.data.inviteList
          this.register = response.data.register
          this.shareText = response.data.shareText
          this.total = response.data.total
          this.recruitTypeCode = response.data.recruitTypeCode
        } else {
          this.showBubble(response.message)
        }
      }, function (err) {
        this.showBubble(err)
      })
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
      console.log(shareUrl)
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
      }
    },
    showBubble (msg, moudel = true, delay = 0) {
      this.bubbleMsg = msg
      this.bubbleMoudel.show = moudel
      this.bubbleDelay = delay
    },
    getPeopleMes () {
      this.$http.get(this.apiUrl.recruit.propleMes).then(function (res) {
        let response = res.body
        if (response.resultCode === 200) {
          this.recruitTypeCode = response.data.recruitTypeCode
          this.sharePeopleId = response.data.sharePeopleId
        } else {
          this.showBubble(response.message)
        }
      }, function (err) {
        this.showBubble(err)
      })
    },
    setShareUrl () {
      if (this.recruitTypeCode && this.sharePeopleId) {
        return window.location.origin + '/platformworker/index.html?recruitTypeCode=' + this.recruitTypeCode + '&refereeId=' + this.sharePeopleId
      } else if (this.recruitTypeCode) {
        return window.location.origin + '/platformworker/index.html?recruitTypeCode=' + this.recruitTypeCode
      } else if (this.sharePeopleId) {
        return window.location.origin + '/platformworker/index.html?refereeId=' + this.sharePeopleId
      } else {
        return window.location.origin + '/platformworker/index.html'
      }
    }
  },
  components: {
    Rule,
    bubble
  }
}
</script>
<style scoped>
.record {
  padding-top: 1.6rem;
}
.recordbg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(../image/record_bg.png) repeat-y center;
  background-size: 100%;
  z-index: -1;
}
.record .recordList {
  width: 10.0rem;
  height: 10.506667rem;
  background: url(../image/record_recordbg.png);
  background-size: 100% 100%;
}
.record .recordList .income {
  padding-top: 1.066667rem;
  padding-bottom: 1.12rem;
  text-align: center;
}
.record .recordList .income .money {
  font-size: 36px;
  color: #da2f33;
}
.record .recordList .income .money span {
  font-size: 27px;
}
.record .recordList .income .tips {
  font-size: 13px;
  color: #d7a340;
}
.record .recordList .incomelist {
  margin: 0 auto;
  width: 7.6rem;
  height: 5.466667rem;
  font-size: 13px;
  color: #f4d0d0;
  overflow-y: auto;
}
.record .recordList .incomelist .title {
  padding-bottom: 0.48rem;
  line-height: 1;
}
.record .recordList .incomelist .invitetitle {
  padding-top: 0.666667rem;
}
.record .recordList .incomelist .list li {
  display: flex;
  justify-content:space-between;
  padding-bottom: 0.373333rem;
  line-height: 1;
}
.record .recordList .incomelist .list li:last-child {
  padding-bottom: 0;
}

.record .recordList .incomelist .list li span.yellow {
  color: #fbd032;
}
.record .rule {
  padding-top: 0.2rem;
  padding-left: 6.96rem;
}
.record .rule span {
  display: inline-block;
  width: 2.586667rem;
  height: 0.413333rem;
  background: url(../image/success_rule.png);
  background-size: 100% 100%;
}
.record .sharebtn {
  padding-top: 0.946667rem;
  text-align: center;
}
.record .sharebtn span {
  display: inline-block;
  width: 4.973333rem;
  height: 1.133333rem;
  background: url(../image/success_sharebtn.png);
  background-size: 100% 100%;
}
.record .sharetips {
  padding-top: 0.933333rem;
  padding-bottom: 0.533333rem;
  text-align: center;
}
.record .sharetips span {
  display: inline-block;
  width: 8.44rem;
  height: 2.373333rem;
  background: url(../image/success_sharetips.png);
  background-size: 100% 100%;
}
</style>

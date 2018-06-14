<template>
  <div class="rules">
    <div class="bg"></div>
    <div class="content">
      <div class="close" @click="getHideRule"></div>
      <div class="title"><span>邀请规则</span></div>
      <div class="text">
        <ul>
          <li>1.新用户注册并成功服务过一张订单后可以获得50元现金奖励。</li>
          <li>2.邀请用户注册，被邀请者注册并成功完成一张订单，邀请者可以获得10元现金奖励。</li>
          <li>3.每个手机号只能注册一次，您推荐的新用户同一手机设备，同一手机号只可注册一次。</li>
          <li>4.邀请者可下载e城e家服务者APP，在我的-邀请有礼中查看奖励。</li>
          <li>5.邀请者和被邀请者完成订单后，平台每周二会将奖励存入到您的认证银行卡中。</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Rule',
  methods: {
    getHideRule () {
      this.$emit('hideRule')
    }
  }
}
</script>
<style scoped>
.rules {
  position: fixed;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
}
.rules .bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.5;
  z-index: 1;
}
.rules .content {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -4.16rem;
  margin-left: -4.0rem;
  z-index: 2;
  width: 8.0rem;
  height: 8.333333rem;
  border-radius:8px;
  background: #faf3e6;
}
.rules .content .close {
  width:0.853333rem;
  height: 0.853333rem;
  position: absolute;
  right: -0.293333rem;
  top: -0.293333rem;
  background: url(../image/pop_close.png);
  background-size: 100% 100%;
}
.rules .content .title {
  position: absolute;
  top: 0.84rem;
  left: -0.18rem;
  width: 2.6rem;
  height: 0.733333rem;
  line-height: 1.5;
  background: url(../image/pop_title.png);
  background-size: 100% 100%;
  font-size: 15px;
  color: #a44013;
}
.rules .content .title span {
  display: block;
  width: 2.613333rem;
  height: 0.68rem;
  text-align: center;
  line-height: 0.68rem;
}
.rules .content .text {
  padding-top: 2.0rem;
}
.rules .content .text ul {
  width: 6.933333rem;
  height: 5.6rem;
  margin: 0 auto;
  overflow-y: auto;
  line-height: 1.5;
  font-size: 13px;
  color: #a44013;
}
.rules .content .text ul li {
    padding-bottom: 0.2rem;
}
</style>

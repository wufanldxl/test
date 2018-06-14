<template>
  <div class="skillnames">
    <div class="bg"></div>
    <div class="content">
      <div class="close" @click="gethideSkillnames"></div>
      <div class="title"><span>{{skillnamesdes[0]}}</span></div>
      <div class="text">{{skillnamesdes[1]}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Skillnames',
  props: {
    skillnamesdes: {
      type: Array
    }
  },
  methods: {
    gethideSkillnames () {
      this.$emit('hideSkillnames')
    }
  }
}
</script>
<style scoped>
.skillnames {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.skillnames .bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.5;
  z-index: 1;
}
.skillnames .content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 8.0rem;
  border-radius:8px;
  background: #faf3e6;
}
.skillnames .content .close {
  width:0.853333rem;
  height: 0.853333rem;
  position: absolute;
  right: -0.293333rem;
  top: -0.293333rem;
  background: url(../image/pop_close.png);
  background-size: 100% 100%;
}
.skillnames .content .title {
  position: absolute;
  top: 0.84rem;
  left: -0.18rem;
  width: 3.413333rem;
  height: 0.733333rem;
  line-height: 1.5;
  background: url(../image/pop_title2.png);
  background-size: 100% 100%;
  font-size: 15px;
  color: #a44013;
}
.skillnames .content .title span {
  display: block;
  width: 3.413333rem;
  height: 0.68rem;
  text-align: center;
  line-height: 0.68rem;
}
.skillnames .content .text {
  padding-top: 2.0rem;
  width: 6.933333rem;
  margin: 0 auto;
  line-height: 1.5;
  font-size: 13px;
  color: #a44013;
  overflow-y: auto;
  padding-bottom: 0.6rem;
}
</style>

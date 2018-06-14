<template>
  <div class="skilldes">
    <div class="skilldesitem" v-for="skillDataDes in skillDataDesArr" :key="skillDataDes.labelTypeCode">
      <div class="title">{{skillDataDes.labelTypeName}}</div>
      <div class="content" v-html="skillDataDes.labelTypeNote"></div>
    </div>
    <bubble :msg="bubbleMsg" :moudel="bubbleMoudel" :delay="bubbleDelay" :box="'fbox'"></bubble>
    <div class="skilldesbg"></div>
  </div>
</template>
<script>
import bubble from './bubble'
export default {
  name: 'Skilldes',
  data () {
    return {
      skillDataDesArr: [],
      bubbleMsg: '',
      bubbleMoudel: {
        show: false
      },
      bubbleDelay: 0
    }
  },
  created () {
    this.fetchSkilldesData()
  },
  watch: {
    '$route': 'fetchSkilldesData'
  },
  methods: {
    fetchSkilldesData () {
      if (this.$route.query.skillDataArr) {
        let labelTypeCodeArr = []
        JSON.parse(this.$route.query.skillDataArr).forEach((item) => {
          labelTypeCodeArr.push(item.labelTypeCode)
        })
        this.$http.post(this.apiUrl.recruit.getSkilldes, labelTypeCodeArr).then(function (res) {
          let response = res.body
          if (response.resultCode === 200) {
            this.skillDataDesArr = response.data
          } else {
            this.showBubble(response.message)
          }
        }, function (err) {
          this.showBubble(err)
        })
      }
    },
    showBubble (msg, moudel = true, delay = 0) {
      this.bubbleMsg = msg
      this.bubbleMoudel.show = moudel
      this.bubbleDelay = delay
    }
  },
  components: {
    bubble
  }
}
</script>
<style scoped>
.skilldes {
  background: #eff0f3;
}
.skilldesbg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #eff0f3;
  z-index: -1;
}
.skilldes .skilldesitem {
  padding: 15px;
  margin-top: 10px;
  background: #fff;
}
.skilldes .skilldesitem:first-child {
  margin-top: 0;
}
.skilldes .skilldesitem .title {
  font-size: 15px;
  line-height: 1;
}
.skilldes .skilldesitem .content {
  font-size: 14px;
  color: #666666;
  line-height: 1;
  padding-top: 15px;
}
</style>

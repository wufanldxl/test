<template>
  <div class="skill">
    <div class="skilllist">
      <div class="content">
        <div class="title">您已获得<span>{{empHaveSkillList.length}}</span>项技能</div>
        <div class="list">
          <span v-for="empHaveSkill in empHaveSkillList" :key="empHaveSkill.skillLabelId">
              <img :src="empHaveSkill.finishedDisplayPic">
              <i>{{empHaveSkill.skillLabelName}}</i>
          </span>
        </div>
      </div>
    </div>
    <div class="process">
      <div class="tips">资质认证进度</div>
      <div class="content" v-for="skillAptitude in skillAptitudeList" :key="skillAptitude.labelTypeName">
        <div class="title">{{skillAptitude.labelTypeName}} <span @click="showSkillnames(skillAptitude.labelTypeName, skillAptitude.labelTypeNote)"></span></div>
        <ul class="list">
          <li v-for="aptitudeInfo in skillAptitude.aptitudeInfoList" :key="aptitudeInfo.aptitudeName"><span>{{aptitudeInfo.aptitudeName}}</span><span>{{aptitudeInfo.approvalStatusName}}</span></li>
        </ul>
         <div class="button" v-show="skillAptitude.isToAuthentication"><span @click="certification">去认证</span></div>
      </div>
    </div>
    <div class="skillbg"></div>
    <skillnames v-show="skillnames" @hideSkillnames="hideSkillnames" :skillnamesdes="skillnamesdes"></skillnames>
    <bubble :msg="bubbleMsg" :moudel="bubbleMoudel" :delay="bubbleDelay" :box="'ebox'"></bubble>
  </div>
</template>
<script>
import Skillnames from './Skillnames.vue'
import bubble from './bubble'
export default {
  name: 'Skill',
  data () {
    return {
      skillnames: false,
      empHaveSkillList: [],
      skillAptitudeList: [],
      skillnamesdes: [],
      bubbleMsg: '',
      bubbleMoudel: {
        show: false
      },
      bubbleDelay: 0
    }
  },
  mounted () {
    this.getSkill()
  },
  methods: {
    getSkill () {
      this.$http.get(this.apiUrl.recruit.skillList).then(function (res) {
        let response = res.body
        if (response.resultCode === 200) {
          this.empHaveSkillList = response.data.empHaveSkillList
          this.skillAptitudeList = response.data.skillAptitudeList
        } else {
          this.showBubble(response.message)
        }
      }, function (err) {
        this.showBubble(err)
      })
    },
    showSkillnames (labelTypeName, labelTypeNote) {
      this.skillnamesdes.push(labelTypeName)
      this.skillnamesdes.push(labelTypeNote)
      this.skillnames = true
    },
    hideSkillnames () {
      this.skillnames = false
    },
    certification () {
      try {
          window.platformEmp.goCertification()
      } catch (err) {
          this.showBubble(err)
      }
    },
    showBubble (msg, moudel = true, delay = 0) {
      this.bubbleMsg = msg
      this.bubbleMoudel.show = moudel
      this.bubbleDelay = delay
    }
  },
  components: {
    Skillnames,
    bubble
  }
}
</script>
<style scoped>
.skill {
  line-height: 1;
}
.skillbg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #eff0f3;
  z-index: -1;
}
.skill .skilllist {
  padding: 15px 10px 20px;
}
.skill .skilllist .content {
  padding: 2px 12px 0;
  padding-top: 2px;
  border-radius: 5px;
  background: #fff;
}
.skill .skilllist .content .title {
  height: 45px;
  border-bottom: 1px solid #e9e9e9;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
}
.skill .skilllist .content .title span {
  padding: 0 5px;
  font-weight: bold;
  color: #00a2d0;
}
.skill .skilllist .content .list {
  padding: 22px 0;
  overflow-x: auto;
  white-space:nowrap;
}
.skill .skilllist .content .list span {
  display: inline-block;
  padding: 0 25px;
  text-align: center;
}
.skill .skilllist .content .list span img {
  width: 42px;
}
.skill .skilllist .content .list span i {
  display: block;
  padding-top: 5px;
  font-size: 12px;
  font-style: normal;
}
.process {
  padding: 0 10px;
}
.process .tips {
  padding-left: 5px;
  padding-bottom: 10px;
  font-size: 14px;
  color: #666666;
}
.process .content {
  padding: 2px 12px 0;
  padding-top: 2px;
  border-radius: 5px;
  background: #fff;
}
.process .content .title {
  position: relative;
  height: 45px;
  border-bottom: 1px solid #e9e9e9;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
}
.process .content .title span {
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -8px;
  width: 16px;
  height: 16px;
  background: url(../image/skill_button.png);
  background-size: 100%;
}
.process .content .list {
  font-size: 14px;
  padding: 5px 0;
  border-bottom: 1px solid #e9e9e9;
}
.process .content .list li {
  display: flex;
  padding: 10px 0;
  justify-content: space-between;
}
.process .content .list li span:last-child {
  color: #fd714b;
}
.process .content .button {
  padding: 10px 0;
  text-align: center;
}
.process .content .button span {
  display: inline-block;
  width: 117px;
  height: 35px;
  background-color: #2288e4;
  border-radius: 3px;
  color: #fff;
  line-height: 35px;
  font-size: 17px;
}
</style>

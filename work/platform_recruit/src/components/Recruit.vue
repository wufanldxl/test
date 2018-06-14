<template>
  <div class="recruit">
    <div class="banner" ref="banner">
      <swiper :options="swiperOption" ref="mySwiper" v-show="bannerImgs.length > 1">
        <swiper-slide v-for="(bannerImg, index) in bannerImgs" :key="index"><img class="banner_img" :src="bannerImg"></swiper-slide>
      </swiper>
      <img :src="bannerImgs[0]" v-show="bannerImgs.length === 1" class="banner_img">
    </div>
    <div class="attr">
      <div class="type attr_list" v-show="recruitType">
        <div class="title">招募类型<i v-show="recruitTypeDataArr.length>8"></i></div>
        <div class="content">
          <ul>
            <li v-for="(recruitTypeData, index) in recruitTypeDataArr" :key="recruitTypeData.recruitTypeCode" :class="recruitTypeIndex===index?'on':''" @click="chooseRecruitType(index, recruitTypeData.recruitTypeCode, recruitTypeData.recruitTypeName)"><span><i>{{recruitTypeData.recruitTypeName}}</i></span></li>
          </ul>
        </div>
      </div>
      <div class="city attr_list" v-show="recruitTypeCode">
        <div class="title">城市<i v-show="cityDataArr.length>8" :class="iconCityState?'':'up'" @click="changeIconState('iconCityState', iconCityState)"></i></div>
        <div class="content">
          <ul :class="cityDataArr.length>8 && iconCityState?'contentheight':''">
            <li v-for="(cityData, index) in cityDataArr" :key="cityData.cityId" :class="cityIndex===index?'on':''"  @click="chooseCity(index, cityData.cityId, cityData.cityName)"><span>{{cityData.cityName}}</span></li>
          </ul>
        </div>
      </div>
      <div class="circle attr_list" v-show="cityId">
        <div class="title"><span>商圈</span><b @click="toArea">查看商圈范围</b><i v-show="areaDataArr.length>8" :class="iconAreaState?'':'up'" @click="changeIconState('iconAreaState', iconAreaState)"></i></div>
        <div class="content">
          <ul :class="areaDataArr.length>8 && iconAreaState?'contentheight':''">
            <li v-for="(areaData, index) in areaDataArr" :key="areaData.tradeAreaId" :class="areaIndex===index?'on':''" @click="chooseArea(index, areaData.tradeAreaId, areaData.tradeAreaName)"><span>{{areaData.tradeAreaName}}</span></li>
          </ul>
        </div>
      </div>
      <div class="skill attr_list" v-show="cityId">
        <div class="title"><span>技能标签</span><b @click="toSkilldes">查看技能描述</b><i v-show="skillDataArr.length>8" :class="iconSkillState?'':'up'" @click="changeIconState('iconSkillState', iconSkillState)"></i></div>
        <div class="content">
          <ul :class="skillDataArr.length>8 && iconSkillState?'contentheight':''">
            <li v-for="(skillData, index) in skillDataArr" :key="index" :class="skillIndex===index?'on':''" @click="chooseSkill(index, skillData.labelTypeCode, skillData.labelTypeName)"><span>{{skillData.labelTypeName}}</span></li>
          </ul>
        </div>
      </div>
    </div>
    <form class="info">
      <div>
        <label>姓名</label>
        <input type="text" name="name" v-model="formData.empName" placeholder="请输入姓名">
      </div>
      <div class="imgcode">
        <label>图形码</label>
        <input type="text" name="imgcode" v-model="imageCode" placeholder="请输入图形验证码">
        <span @click="changeImageCode"><img v-show="imageCodeUrl" :src="imageCodeUrl" /></span>
      </div>
      <div class="phone">
        <label>手机号</label>
        <input type="text" name="phone" v-model="formData.empPhone" placeholder="请输入手机号">
        <span v-show="codeState && formData.empPhone !== ''" @click="getCode">获取验证码</span>
        <span v-show="formData.empPhone === ''" class="gray">获取验证码</span>
        <span v-show="!codeState && formData.empPhone !== ''" class="gray">重新获取 <i>{{this.countdown}}</i></span>
      </div>
      <div>
        <label>验证码</label>
        <input type="text" name="code" v-model="formData.smsVerifyCode" placeholder="请输入验证码">
      </div>
    </form>
    <div class="submit">
      <div class="protocol"><span class="icon" :class="agreeMent?'on':''" @click="agreeMentPact"></span><span class="text">我已同意</span><a href="javascript:;" @click="goAgreement">用户注册协议</a></div>
      <div class="button" v-show="!subMitBtn">提交</div>
      <div class="button on" v-show="subMitBtn" @click="subMit">提交</div>
    </div>
    <bubble :msg="bubbleMsg" :moudel="bubbleMoudel" :delay="bubbleDelay" :box="'dbox'"></bubble>
    <div class="recruitbg"></div>
  </div>
</template>
<script>
import bubble from './bubble'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'Recruit',
  data () {
    return {
      swiperOption: {
        autoplay: {
          delay: 5000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        }
      },
      bannerImgs: [],
      localCity: '',
      recruitType: false,
      recruitTypeDataArr: [],
      recruitTypeCode: null,
      recruitTypeIndex: null,
      iconCityState: true,
      cityDataArr: [],
      cityId: null,
      cityIndex: null,
      iconAreaState: true,
      areaDataArr: [],
      areaIndex: null,
      iconSkillState: true,
      skillDataArr: [],
      skillIndex: null,
      imageCode: '',
      imageCodeUrl: '',
      codeState: true,
      countdown: '',
      agreeMent: false,
      formData: {
        cityId: '',
        cityName: '',
        empName: '',
        empPhone: '',
        labelTypeCode: '',
        labelTypeName: '',
        recruitTypeCode: '',
        recruitTypeName: '',
        refereeId: '',
        smsVerifyCode: '',
        tradeAreaId: '',
        tradeAreaName: '',
        agreeGvrp: 0
      },
      //subMitBtn: false,
      isApp: /platformEmp\/\d+(\.\d+)*/i.test(window.navigator.userAgent),
      isWX: /MicroMessenger/i.test(window.navigator.userAgent),
      bubbleMsg: '',
      bubbleMoudel: {
        show: false
      },
      bubbleDelay: 0
    }
  },
  mounted () {
    if (this.getCookie('_reg_info')) {
      this.$router.push({path: 'success', query: {recruitTypeCode: this.getCookie('recruitTypeCode')}})
    } else {
      this.changeImageCode()
      this.getLocalCity()
    } 
  },
  components: {
    bubble,
    swiper,
    swiperSlide
  },
  computed:{
    subMitBtn () {
      return this.formData.recruitTypeCode !== ''  && this.formData.cityId !== '' && this.formData.tradeAreaId !== ''&& this.formData.cityId !== '' && this.formData.labelTypeCode !== '' && this.formData.empName !== '' && this.formData.empPhone !== '' && this.formData.smsVerifyCode !== ''&& this.agreeMent === true
    }
  },
  methods: {
    getLocalCity () {
      let map = new BMap.Map("allmap")
      let geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition((r) => {
        if (r.address) {
          this.localCity = r.address.city.replace(/市$/g, '')
          this.getCity(this.recruitTypeCode)
        }
      })
    },
    initRecruitTypeData () {
      this.cityDataArr = []
      this.cityId = null
      this.cityIndex = null
      this.formData.cityId = ''
      this.formData.cityName = ''
      this.initCityData()
    },
    initCityData () {
      this.areaDataArr = []
      this.areaIndex = null
      this.skillDataArr = []
      this.skillIndex = null
      this.formData.labelTypeCode = ''
      this.formData.labelTypeName = ''
      this.formData.tradeAreaId = ''
      this.formData.tradeAreaName = '' 
    },
    changeIconState (iconState, iconCityState) {
      this[iconState] = !iconCityState
    },
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
    getRecruitType () {
      this.$http.get(this.apiUrl.recruit.recruitType).then(function (res) {
        let response = res.body
        if (response.resultCode === 200) {
          this.recruitTypeDataArr = response.data
          response.data.forEach((item) => {
            this.bannerImgs.push(item.imgs[0])
          })
          if (this.recruitTypeDataArr.length === 1) {
            this.chooseRecruitType(0, this.recruitTypeDataArr[0].recruitTypeCode, this.recruitTypeDataArr[0].recruitTypeName)
          }
        } else {
          this.showBubble(response.message)
        }
      }, function (err) {
        this.showBubble(err)
      })
    },
    chooseRecruitType (index, recruitTypeCode, recruitTypeName) {
      this.recruitTypeIndex = index
      this.recruitTypeCode = recruitTypeCode
      this.formData.recruitTypeCode = recruitTypeCode
      this.formData.recruitTypeName = recruitTypeName
      this.initRecruitTypeData()
      this.getCity(recruitTypeCode)
    },
    getCity (recruitTypeCode) {
      this.$http.get(this.apiUrl.recruit.city + '/' + recruitTypeCode).then(function (res) {
        let response = res.body
        if (response.resultCode === 200) {
          this.cityDataArr = response.data
          if (this.cityDataArr.length === 1) {
            this.chooseCity(0, this.cityDataArr[0].cityId, this.cityDataArr[0].cityName)
          } else if (this.localCity !== '') {
            this.cityDataArr.forEach((item, index) => {
              if (item.cityName === this.localCity) {
                this.chooseCity(index, item.cityId, item.cityName)
              }
            })
          }
        } else {
          this.showBubble(response.message)
        }
      }, function (err) {
        this.showBubble(err)
      })
    },
    chooseCity (index, cityId, cityName) {
      this.cityIndex = index
      this.cityId = cityId
      this.formData.cityId = cityId
      this.formData.cityName = cityName
      this.initCityData()
      this.getArea(cityId)
      this.getSkill(cityId)
      this.localCity = ''
    },
    getArea (cityId) {
      this.$http.get(this.apiUrl.recruit.area + '/' + this.recruitTypeCode + '/' + cityId).then(function (res) {
        let response = res.body
        if (response.resultCode === 200) {
          this.areaDataArr = response.data
          if (this.areaDataArr.length === 1) {
            this.chooseArea(0, this.areaDataArr[0].tradeAreaId, this.areaDataArr[0].tradeAreaName)
          }
        } else {
          this.showBubble(response.message)
        }
      }, function (err) {
        this.showBubble(err)
      })
    },
    chooseArea (index, tradeAreaId, tradeAreaName) {
      this.areaIndex = index
      this.formData.tradeAreaId = tradeAreaId
      this.formData.tradeAreaName = tradeAreaName
    },
    toArea () {
      this.$router.push({path: 'area', query: {areaDataArr: JSON.stringify(this.areaDataArr)}})
    },
    getSkill (cityId) {
      this.$http.get(this.apiUrl.recruit.skill + '/' + this.recruitTypeCode + '/' + cityId).then(function (res) {
        let response = res.body
        if (response.resultCode === 200) {
          this.skillDataArr = response.data
          if (this.skillDataArr.length === 1) {
            this.chooseSkill(0, this.skillDataArr[0].labelTypeCode, this.skillDataArr[0].labelTypeName)
          }
        } else {
          this.showBubble(response.message)
        }
      }, function (err) {
        this.showBubble(err)
      })
    },
    toSkilldes () {
      this.$router.push({path: 'skilldes', query: {skillDataArr: JSON.stringify(this.skillDataArr)}})
    },
    chooseSkill (index, labelTypeCode, labelTypeName) {
      // if (this.formData.tradeAreaId === '') {
        // this.showBubble('请先选择商圈！')
      // } else {
      this.skillIndex = index
      this.formData.labelTypeCode = labelTypeCode
      this.formData.labelTypeName = labelTypeName
      // }
    },
    changeImageCode () {
      this.imageCodeUrl = this.apiUrl.recruit.imageCode + '?timestamps=' + (new Date()).getTime()
    },
    checkMobile (phone) {
      if (!(/^[1][3-9][0-9]{9}$/.test(phone))) {
        return false
      } else {
        return true
      }
    },
    getCode () {
      if (this.imageCode === '') {
        this.showBubble('图形码不能为空！')
      } else if (this.formData.empPhone === '') {
        this.showBubble('手机号码不能为空！')
      } else if (this.checkMobile(this.formData.empPhone) === false) {
        this.showBubble('手机号码填写有误！')
      } else {
        this.$http.get(this.apiUrl.recruit.phoneCode + '/' + this.formData.empPhone + '/' + this.imageCode).then(function (res) {
          let response = res.body
          if (response.resultCode === 200) {
            this.showBubble('验证码已发送!')
            this.codeState = false
            this.countdown = 60
            let timer = setInterval(() => {
              if (this.countdown === 0) {
                clearInterval(timer)
                this.codeState = true
                this.countdown = ''
              } else {
                this.countdown--
              }
            }, 1000)
          } else {
            this.showBubble(response.message)
            this.changeImageCode()
            this.imageCode = ''
          }
        }, function (err) {
          this.showBubble(err)
        })
      }
    },
    goAgreement () {
      this.$router.push({path: 'agreement'})
    },
    agreeMentPact () {
      if (this.agreeMent) {
        this.agreeMent = false
        this.formData.agreeGvrp = 0
      } else {
        this.agreeMent = true
        this.formData.agreeGvrp = 1
      }
    },
    subMit () {
      this.$http.post(this.apiUrl.recruit.register, this.formData).then(function (res) {
        let response = res.body
        if (response.resultCode === 200) {
          this.$router.push({path: 'success', query: {recruitTypeCode: response.data.recruitTypeCode, empId: response.data.empId}})
        }else if (response.resultCode === 500) {
          this.imageCode = ''
          this.formData.smsVerifyCode = ''
          this.changeImageCode()
          this.showBubble(response.message)
        }else {
          this.showBubble(response.message)
        }
      }, function (err) {
        this.showBubble(err)
      })
    },
    getQueryString(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    },
    isWXDeal () {
      let recruitTypeCode = this.$route.query.recruitTypeCode || this.getQueryString('recruitTypeCode')
      this.formData.refereeId = parseInt(this.$route.query.refereeId) || parseInt(this.getQueryString('refereeId')) || ''
      if (recruitTypeCode) {
        this.formData.recruitTypeCode = recruitTypeCode
        this.$http.get(this.apiUrl.recruit.recruitType).then(function (res) {
          let response = res.body
          if (response.resultCode === 200) {
            response.data.forEach((item) => {
              if (item.recruitTypeCode === recruitTypeCode) {
                this.formData.recruitTypeName = item.recruitTypeName
                this.bannerImgs.push(item.imgs[0])
                this.getCity(recruitTypeCode)
                this.recruitTypeCode = recruitTypeCode
              }
            })
          } else {
            this.showBubble(response.message)
          }
        }, function (err) {
          this.showBubble(err)
        })
      } else {
        this.recruitType = true
        this.getRecruitType()
      }
    },
    showBubble (msg, moudel = true, delay = 0) {
      this.bubbleMsg = msg
      this.bubbleMoudel.show = moudel
      this.bubbleDelay = delay
    }
  },
  created () {
    this.isWXDeal()
  },
  beforeRouteEnter (to, from, next) {
    function getQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    }
    next(vm => {
      let isWX = /MicroMessenger/i.test(window.navigator.userAgent)
      if (isWX) {
        let recruitTypeCode = vm.$route.query.recruitTypeCode || getQueryString('recruitTypeCode')
        vm.$http.get(vm.apiUrl.recruit.recruitType).then(function (res) {
          let response = res.body
          if (response.resultCode === 200) {
            response.data.forEach((item) => {
              if (item.recruitTypeCode === recruitTypeCode) {
                document.title = item.recruitTypeName
              }
            })
          } else {
            vm.showBubble(response.message)
          }
        }, function (err) {
          vm.showBubble(err)
        })   
      }
    })
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.recruit .recruitbg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #eff0f3;
  z-index: -1;
}
.recruit .banner {
  font-size: 0;
  height: 12.0remrem;
  width: 100%;
  overflow: hidden;
  background: #fff;
}
.recruit .banner .banner_img {
  width: 100%;
  height: 12.0rem;
}
.recruit .attr {
  padding: 0 10px;
  padding-top: 20px;
  background: #fff;
}
.recruit .attr .title {
  position: relative;
  padding-left: 5px;
  font-size: 15px;
  line-height: 1;
}
.recruit .attr .title::after {
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -5px;
  width: 2px;
  height: 10px;
  content: ".";
  color: #2288e4;
  background-color: #2288e4;
}
.recruit .attr .title span {
  display: inline-block;
  vertical-align: middle;
}
.recruit .attr .title b {
  display: inline-block;
  border-bottom: 1px solid #acacac;
  margin-left: 15px;
  font-weight: normal;
  vertical-align: middle;
  font-size: 12px;
  color: #acacac;
}
.recruit .attr .title i {
  position: absolute;
  right: 0;
  top: 0;
  width: 10px;
  height: 16px;
  background: url(../image/index_arrow_down.png) center center no-repeat;
  background-size: 100%;
}
.recruit .attr .title i.up {
  background: url(../image/index_arrow.png) center center no-repeat;
  background-size: 100%;
}
.recruit .attr .attr_list {
  padding-bottom: 34px;
}
.recruit .attr .attr_list .content .contentheight {
  height: 84px;
  overflow: hidden;
}
.recruit .attr .circle .content, .recruit .attr .skill .content {
  margin-top: 11px;
}
.recruit .attr .skill {
  padding-bottom: 30px;
}
.recruit .attr .content {
  margin-top: 5px;
}
.recruit .attr .fold {
  height: 84px;
  overflow: hidden;
}
.recruit .attr .content ul {
  display: flex;
  flex-wrap: wrap;
}
.recruit .attr .content ul li {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 23.5%;
  height: 32px;
  margin-right: 2%;
  margin-top: 10px;
  border: 1px solid #dedede;
  border-radius: 3px;
  font-size: 12px;
  line-height: 1.1;
}
.recruit .attr .content ul li i {
  font-style: normal;
}
.recruit .attr .content ul li.on {
  border-color: #2288e4;
  color: #2288e4;
}
.recruit .attr .content ul li:nth-of-type(4n) {
  margin-right: 0;
}
.recruit attr .content ul li span {
  text-align: center;
}
.recruit .info {
  padding: 0 10px;
  padding-bottom: 15px;
  background: #fff;
}
.recruit .info div {
  padding: 18px 0;
  margin-bottom: 1px;
  font-size: 0;
  background: #f1f0f0;
}
.recruit .info div:last-child {
  margin-bottom: 0;
}
.recruit .info div label {
  display: inline-block;
  vertical-align: middle;
  margin-left: 15px;
  width: 45px;
  font-size: 14px;
}
.recruit .info div input {
  display: inline-block;
  vertical-align: middle;
  border: 0 none;
  margin-left: 14px;
  background: 0 none;
  font-size: 14px;
}
.recruit .info div.imgcode {
  position: relative;
}
.recruit .info div.imgcode span {
  position: absolute;
  right: 10px;
  height: 30px;
  top: 50%;
  margin-top: -15px;
}
.recruit .info div.imgcode span img {
  height: 30px;
}
.recruit .info div.phone {
  position: relative;
}
.recruit .info div.phone span {
  position: absolute;
  right: 10px;
  top: 50%;
  margin-top:-14px;
  font-size: 12px;
  padding: 0 10px;
  height: 28px;
  border: 1px solid #acacac;
  border-radius: 5px;
  text-align: center;
  line-height: 28px;
}
.recruit .info div.phone span.gray {
  border: 1px solid #ccc;
  color: #acacac;
}
.recruit .info div.phone span i {
  font-style: normal;
}
.recruit .submit {
  padding: 15px 15px 35px 15px;
}
.recruit .submit .protocol {
  padding-bottom: 30px;
}
.recruit .submit .protocol span {
  display: inline-block;
  vertical-align: middle;
}
.recruit .submit .protocol a {
  display: inline-block;
  vertical-align: middle;
}
.recruit .submit .protocol span.icon {
  width: 16px;
  height: 16px;
  border: 1px solid #acacac;
  border-radius: 16px;
}
.recruit .submit .protocol span.icon.on {
  position: relative;
  border-color: #2288e4;
}
.recruit .submit .protocol span.icon.on::after {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 8px;
  top: 50%;
  margin-top: -4px;
  left: 50%;
  margin-left: -4px;
  background: #2288e4;
  content: ".";
  overflow: hidden;
  color: #2288e4;
}
.recruit .submit .protocol span.text {
  padding-left: 10px;
  color: #666666;
}
.recruit .submit .protocol a {
  padding-left: 2px;
  color: #2288e4;
}
.recruit .submit .button {
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-size: 16px;
  color: #ffffff;
  background-color: #dedede;
  border-radius: 3px;
}
.recruit .submit .button.on {
  background: #2288e4;
}
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #c6c6c6;
}
input:-webkit-autofill {
  background-color: #f1f0f0;
  background-image: none;
  color: #222;
}
</style>

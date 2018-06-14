<template>
  <div class="area">
    <div class="areaitem" v-for="areaData in areaDataArr" :key="areaData.tradeAreaId">
      <div class="title">{{areaData.tradeAreaName}}</div>
      <div class="content"><img :src="areaData.tradeAreaPhoto"></div>
    </div>
    <div class="areabg"></div>
  </div>
</template>
<script>
export default {
  name: 'Area',
  data () {
    return {
      areaDataArr: []
    }
  },
  created () {
    this.fetchAreaData()
  },
  watch: {
    '$route': 'fetchAreaData'
  },
  methods: {
    fetchAreaData () {
      if (this.$route.query.areaDataArr) {
        this.areaDataArr = JSON.parse(this.$route.query.areaDataArr)
      }
    }
  }
}
</script>
<style scoped>
.area { 
  background: #eff0f3; 
}
.area .areabg { 
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #eff0f3;
  z-index: -1;
 }
.area .areaitem { padding: 10px; color: #222222; margin-top: 10px; background: #fff;}
.area .areaitem:first-child { margin-top: 0; }
.area .areaitem .title { padding-bottom: 15px; line-height: 1; font-size: 15px; padding-top: 5px;}
.area .areaitem .content { font-size: 0; }
.area .areaitem .content img { width: 100%; border-radius: 3px;}
</style>

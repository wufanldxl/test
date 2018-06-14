<template>
    <div class="master_list_bg">
        <ptop title="达人列表" :more="false" :go="back"></ptop>
        <div class="master_list_main" ref="wrapper">
            <div class="master_list">
                <div class="master_item clearfix" v-for="item in masterList" @click="choose(item)">
                    <div class="master_item_c">
                        <div class="master_himg">
                            <img :src="item.talentImg" alt="">
                        </div>
                        <div class="master_info">
                            <div class="master_name">{{item.talentName}}</div>
                            <div class="master_job">擅长行业：{{item.labelTypeStr}}</div>
                            <div class="master_num">已回答<i>{{item.answerCount||0}}</i>个问题</div>
                        </div>
                    </div>
                </div>
                <!--<div class="master_item clearfix">-->
                    <!--<div class="master_item_c">-->
                        <!--<div class="master_himg">-->
                            <!--<img src="./img/hm.jpg" alt="">-->
                        <!--</div>-->
                        <!--<div class="master_info">-->
                            <!--<div class="master_name">麻花儿</div>-->
                            <!--<div class="master_job">擅长行业：健康养生</div>-->
                            <!--<div class="master_num">已回答<i>210</i>个问题</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->

                <div v-show="scroll&&isscroll">
                    <p class="up_tips" v-show="!pulluping">{{pullupText}}</p>
                    <div class="loading" v-show="pulluping">
                        <img src="./img/loading.gif">
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll'
    import ptop from './ptop.vue';
    export default{
        props: ['go', 'type', 'show','page'],
        data(){
            return {
                scroll: null,
                isscroll:false,
                pulluping: false,
                pullupText: '加载更多',
                curPage: 1,
                pageSize: 10,
                isnone:false,
                masterList: [],
                token:'',
                appKey:null
            }
        },
        components: {
            ptop
        },
        methods: {
            back(){
                this.curPage=1;
                this.pullupText='加载更多';
                this.scroll&&this.scroll.destroy();
                this.scroll = null;
                this.$set(this.$data,'masterList',[]);
                this.go&&this.go();
            },
            choose(info){
                if(this.page){
                    if(this.$cookie().appToken){
                        let params={
                            token:this.$cookie().appToken,
                            talentId:info.talentId,
                            appKey:this.appKey
                        }
                        this.$http.get(this.$api.isMe,{params}).then(res=>{
                            let result=res.data.resultCode;
                            let data=res.data.data;
                            if(result===200){
                                if(data){
                                    window.location.href='masterMyAsk.html?talentId='+info.talentId
                                }else{
                                    window.location.href='masterIndex.html?talentId='+info.talentId
                                }
                            }else{
                                window.location.href='masterIndex.html?talentId='+info.talentId
                            }
                        },res=>{
                            window.location.href='masterIndex.html?talentId='+info.talentId
                        })
                    }else{
                        window.location.href='masterIndex.html?talentId='+info.talentId
                    }
                }else{
                    this.$emit('getmaster', info);
                    this.back();
                }
            },
            initData(callback){
                let params = {
                    curPage: this.curPage,
                    pageSize: this.pageSize
                };
                if (this.type) {
                    params.labelType = this.type
                }

                this.$http.get(this.$api.masterList, {params}).then(res => {
                    callback && callback(res.data);
                })
            },
            refreshScroll(){
                this.scroll.refresh();
                if(this.scroll.scrollerHeight>this.scroll.wrapperHeight){
                    this.isscroll=true;
                }else{
                    this.isscroll=false;
                }
            },
            initScroll(){
                if (this.scroll) {
                    this.refreshScroll();
                } else {
                    this.scroll = new BScroll(this.$refs.wrapper, {
                        click: true,
                        pullUpLoad: {
                            threshold: 0
                        }
                    });

                    if(this.scroll.scrollerHeight>this.scroll.wrapperHeight){
                        this.isscroll=true;
                    }else{
                        this.isscroll=false;
                    }


                    this.scroll.on('pullingUp', () => {
                        if(this.pulluping){
                            this.scroll.finishPullUp();
                            return;
                        }
                        if(this.isnone){
                            this.scroll.finishPullUp();
                            return;
                        }
                        this.pulluping = true;
                        this.curPage+=1;
                        let _this=this;
                        this.initData(function(res){
                            let data=res.data
                            if(data.length===0){
                                _this.curPage-=1;
                                _this.pullupText='没有更多达人了';
                                _this.scroll.finishPullUp();
                                _this.pulluping = false;
                                _this.isnone=true;
                            }else{
                                let arr=_this.masterList.concat(data);
                                _this.$set(_this.$data,'masterList',arr);
                                _this.scroll.finishPullUp();
                                _this.pulluping = false;
                                _this.refreshScroll();
                            }
                        });
                    })
                }
            }
        },
        mounted(){
            this.appKey = this.$cookie().appKey;
            this.token = this.$cookie().appToken || null;

            if (this.show) {
                let _this=this
                this.initData(function (res) {
                    if(_this.page){
                        let result=res.resultCode;
                        let data=res.data;

                        if(result===200){
                            _this.$set(_this.$data,'masterList',data);
                            setTimeout(function(){
                                _this.pullupText='加载更多';
                                _this.initScroll();
                            },100)
                        }
                    }else{
                        _this.$nextTick(() => {
                            _this.initScroll()
                        });
                    }
                })
            }


        },
        watch: {
            show(val, oldval){
                if (val) {
                    let _this=this;
                    this.initData(function (res) {
                        let result=res.resultCode;
                        let data=res.data;

                        if(result===200){
                            _this.$set(_this.$data,'masterList',data);
                            setTimeout(function(){
                                _this.pullupText='加载更多';
                                _this.initScroll();
                            },50)
                        }
                    })

                }
            }
        }
    }
</script>

<style>
    @import url("../assets/base-1.4.css");

    .master_list_bg {
        background: #f3f4f6;
        width: 100%;
        height: 100%;
    }

    .master_list_main {
        width: 100%;
        height: -webkit-calc(100% - 44px);
    }

    .master_item {
        height: 87px;
        padding: 0 15px;
        background: #fff;

    }

    .master_item_c {
        border-bottom: 1px solid #f3f3f3;
    }

    .master_item:last-child {
        border-bottom: none;
    }

    .master_himg {
        float: left;
        margin-top: 15px;
        width: 57px;
        height: 57px;
        border-radius: 10px;
        overflow: hidden;
    }

    .master_himg img {
        width: 100%;
        height: 100%;
    }

    .master_info {
        float: left;
        margin-top: 17px;
        margin-left: 10px;
    }

    .master_name {
        font-size: 14px;
        color: #222;
        line-height: 1;
    }

    .master_job {
        margin-top: 7.5px;
        font-size: 13px;
        line-height: 1;
        text-align: left;
        color: #666666;
    }

    .master_num {
        margin-top: 9px;
        line-height: 1;
        font-size: 11px;
        color: #acacac;
    }

    .master_num i {
        color: #666;
    }

    .up_tips {
        text-align: center;
        margin-top: 8px;
        color: #666;
        font-size: 14px;
    }

    .loading {
        margin-top: 8px;
        text-align: center;
    }

    .loading img {
        width: 20px;
        height: 20px;
    }
</style>

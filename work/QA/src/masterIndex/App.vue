<template>
    <div id="app">
        <ptop title="达人主页" :more="true" :report="false" :talent-id="masterInfo.talentId"></ptop>
        <div class="my_ask" ref="wrapper">
            <div class="wrapper_con">
                <div class="ask_info">
                    <div class="ask_img">
                        <img :src="masterInfo.talentImg" alt="">
                    </div>
                    <div class="master_info">
                        <div class="master_name">{{masterInfo.talentNickName}}</div>
                        <div class="master_like"><i>{{masterInfo.greateCount}}</i>人点赞</div>
                        <div class="master_job">擅长行业：{{masterInfo.labelTypeDesc}}</div>
                        <div class="master_abstract">达人简介：{{masterInfo.talentDesc}}</div>
                    </div>
                </div>
                <div class="ask_content">
                    <div class="content_title">
                        <div @click="switchTab(item,$index)" v-for="(item,$index) in tabList" :class="[{'show_detail':item.active},'title_item']"><i v-text="item.text"></i>(<i v-text="item.number"></i>)
                        </div>
                    </div>
                    <div v-show="this.tabList[0].active" class="content_detail">
                        <div class="detail_item" v-for="item in pageData[0]" @click="gotoPage(item.questionId, 1)">
                            <div class="detail_title">
                                {{item.questionTitle}}
                            </div>
                            <div class="detail_article">
                                {{item.answerContent}}
                            </div>
                            <operate :likenum="item.greatCount" :collectnum="item.collectCount"></operate>
                        </div>
                    </div>

                    <div class="content_detail" v-show="this.tabList[1].active">
                        <div class="detail_item" v-for="item in pageData[1]"  @click="gotoPage(item.questionId, item.questionType)">
                            <div class="detail_title">
                                {{item.questionTitle}}
                            </div>
                            <div class="detail_article">
                                {{item.answerContent}}
                            </div>
                            <operate :likenum="item.greatCount" :collectnum="item.collectCount"></operate>
                        </div>
                    </div>
                </div>

                <div v-show="scroll&&isscroll">
                    <p class="up_tips" v-show="!pulluping">{{pullupText}}</p>
                    <div class="loading" v-show="pulluping">
                        <img src="../components/img/loading.gif">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import ptop from '../components/ptop.vue';
    import operate from '../components/operate.vue';
    import BScroll from 'better-scroll';
    export default{
        name: 'app',
        data(){
            return {
                activeIndex: 0,
                //tabList
                tabList: [
                    {
                        number: 0,
                        text: 'ta的问答',
                        active: true,
                        curPage: 1,
                        pullupText: '加载更多',
                        isnull:false
                    },
                    {
                        number: 0,
                        text: 'ta的收藏',
                        active: false,
                        curPage: 1,
                        pullupText: '加载更多',
                        isnull:false
                    }
                ],
                pageData: [
                    null,
                    null
                ],
                masterInfo: {
                    talentId: null,
                    talentImg: '',
                    talentNickName: '',
                    talentDesc: '',
                    labelType: 0,
                    labelTypeDesc: '',
                    greateCount: 0
                },
                token: '',
                appKey: null,
                scroll: null,
                isscroll: false,
                pullupText: '加载更多',
                pulluping: false,
                talentId:null
            }
        },
        methods: {
            switchTab(item,index){
                for (let i = 0; i < this.tabList.length; i++) {
                    this.tabList[i].active = false;
                }
                item.active = true;
                this.activeIndex = index;

                if (this.pageData[index]) {
                    this.refreshScroll();
                } else {
                    let api = '';
                    switch (index) {
                        case 0:
                            api = this.$api.masterIndex.answers;
                            break;
                        case 1:
                            api = this.$api.masterIndex.collecs;
                            break;
                    }

                    let params = {
                        talentId: this.talentId,
                        appKey: this.appKey,
                        curPage: this.tabList[index].curPage,
                        pageSize: 10
                    };

                    this.$http.get(api, {params}).then(res => {
                        let data = res.data.data;
                        let result = res.data.resultCode;
                        if (result === 200) {
                            if (this.pageData[index] instanceof Array) {
                                this.$set(this.pageData, index, this.pageData[index].concat(data))
                            } else {
                                this.$set(this.pageData, index, data)
                            }
                            this.refreshScroll();
                        }
                    })
                }
                this.pullupText = item.pullupText;
            },
            gotoPage(id, type){
                if (type === 2) {
                    window.location.href = `indexDetail.html?questionId=${id}`
                } else if (type === 1) {
                    window.location.href = `questionsDetail.html?questionId=${id}`
                }
            },
            refreshScroll(){
                setTimeout(() => {
                    this.scroll.refresh();
                    if (this.scroll.scrollerHeight > this.scroll.wrapperHeight) {
                        this.isscroll = true;
                    } else {
                        this.isscroll = false;
                    }
                }, 100)
            },
            initScroll(){
                if (this.scroll) {
                    this.refreshScroll();
                } else {
                    this.scroll = new BScroll(this.$refs.wrapper, {
                        click: true,
                        probeType: 1,
                        pullUpLoad: {
                            threshold: -50
                        }
                    });
                    setTimeout(() => {
                        if (this.scroll.scrollerHeight > this.scroll.wrapperHeight) {
                            this.isscroll = true;
                        } else {
                            this.isscroll = false;
                        }
                    }, 100);

                    this.scroll.on('pullingUp', () => {
                        if (this.pulluping) {
                            return;
                        }
                        let active = this.activeIndex;

                        this.pulluping = true;

                        this.tabList[active].curPage++;

                        let api = '';
                        switch (active) {
                            case 0:
                                api = this.$api.masterIndex.answers;
                                break;
                            case 1:
                                api = this.$api.masterIndex.collecs;
                                break;

                        }


                        let params = {
                            talentId: this.talentId,
                            appKey: this.appKey,
                            curPage: this.tabList[active].curPage,
                            pageSize: 10
                        };

                        console.log(this.tabList[active].isnull)
                        if(this.tabList[active].isnull){
                            setTimeout(()=>{
                                this.scroll.finishPullUp();
                                this.pulluping = false;
                            },100);
                        }else{
                            this.$http.get(api, {params}).then(res => {
                                let data = res.data.data;
                                let result = res.data.resultCode;
                                if (result === 200) {
                                    if (data.length === 0) {
                                        this.tabList[active].curPage -= 1;
                                        this.tabList[active].pullupText = '没有更多了';
                                        this.tabList[active].isnull=true;
                                        this.pullupText = '没有更多了';
                                        this.scroll.finishPullUp();
                                        this.pulluping = false;
                                    } else {
                                        this.$set(this.pageData, active, this.pageData[active].concat(data));
                                        this.scroll.finishPullUp();
                                        this.pulluping = false;
                                        this.refreshScroll();
                                    }
                                }
                            })
                        }
                    })
                }
            }
        },
        components: {
            ptop,
            operate
        },
        mounted(){
            this.appKey = this.$cookie().appKey;
            this.token = this.$cookie().appToken || null;

            this.talentId=parseInt(this.$urlData.talentId);


            let params = {
                talentId: this.talentId,
                appKey: this.appKey,
            };

            this.$http.get(this.$api.masterIndex.masterInfo, {params}).then(res => {
                let data = res.data.data;
                let result = res.data.resultCode;
                if (result === 200) {
                    this.tabList[0].number = data.answerCount;
                    this.tabList[1].number = data.collectCount;
                    this.masterInfo.talentId = data.talentId;
                    this.masterInfo.talentImg = data.talentImg;
                    this.masterInfo.talentNickName = data.talentNickName;
                    this.masterInfo.talentDesc = data.talentDesc;
                    this.masterInfo.labelType = data.labelType;
                    this.masterInfo.labelTypeDesc = data.labelTypeDesc;
                    this.masterInfo.greateCount = data.greateCount;


                    let params = {
                        talentId: this.talentId,
                        appKey: this.appKey,
                        curPage: 1,
                        pageSize: 10
                    };
                    this.$http.get(this.$api.masterIndex.answers, {params}).then(res => {
                        let data = res.data.data;
                        let result = res.data.resultCode;
                        if (result === 200) {
                            this.$set(this.pageData, 0, data);

                            this.$nextTick(() => {
                                this.initScroll();
                            })
                        }
                    })

                }
            });
        }
    }
</script>

<style>
    @import url("../assets/base-1.4.css");
    html, body, #app {
        width: 100%;
        height: 100%;
    }

    .my_ask {
        height: calc(100% - 44px);
        background: #f3f4f6;
        overflow: hidden;
    }

    .ask_info {
        padding: 15px;
        height: 87px;
        background: #fff;
        /*border-bottom: 1px solid #f3f3f3;*/
        margin-bottom: 10px;
        display: flex;
    }

    .ask_img {
        width: 65px;
        height: 65px;
        border-radius: 5px;
        overflow: hidden;
    }

    .ask_img img {
        width: 100%;
        height: 100%;
    }

    .master_info {
        flex: 1;
        margin-top: 2px;
        margin-left: 10px;
        position: relative;
        top: 0;
        left: 0;
    }

    .master_name {
        font-size: 14px;
        color: #222;
        line-height: 1;
    }

    .master_like {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 12px;
        color: #acacac;
    }

    .master_like i {
        color: #222;
    }

    .master_job {
        margin-top: 9px;
        font-size: 13px;
        line-height: 1;
        text-align: left;
        color: #666666;
    }

    .master_abstract {
        margin-top: 9px;
        line-height: 1.67;
        font-size: 12px;
        color: #666;
    }

    .ask_content {
        /*background: #fff;*/
    }

    .content_title {
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        flex-direction: row;
        background: #fff;

    }

    .title_item {
        /*width:30%;*/
        flex-grow: 2;
        text-align: center;
        padding: 15px 0;
        margin: 0 30px;
    }

    .show_detail {
        border-bottom: 2px solid #ff5a00;
    }

    .content_detail {

    }

    .detail_item {
        padding: 15px 15px;
        background: #fff;
        border-bottom: 1px solid #e5e5e5;
    }

    .detail_title {
        font-size: 16px;
        font-weight: bold;
        color: #222;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .detail_article {
        color: #666;
        line-height: 1.68;
        font-size: 14px;
        padding-top: 12px;
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

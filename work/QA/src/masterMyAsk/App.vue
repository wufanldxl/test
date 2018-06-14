<template>
    <div id="app">
        <ptop title="我的问答" :more="true" :report="false" :talent-id="masterInfo.talentId"></ptop>
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
                        <div v-for="(item,$index) in tabList" @click="switchTab(item,$index)" :class="[{'show_detail':item.active},'title_item']"><i v-text="item.text"></i>(<i
                            v-text="item.number"></i>)<i
                            v-if="item.newMess===0" class="title_new"></i></div>
                    </div>
                    <!--1-->
                    <div v-show="this.tabList[0].active" class="content_detail">

                        <div class="detail_item" v-for="item in pageData[0]">
                            <div class="task_time">{{item.createTimeStr}}</div>
                            <div class="detail_title" @click="goToDetail(item.questionId,item.answerAuditStatus)">
                                {{item.questionTitle}}
                            </div>
                            <div class="detail_article" v-if="item.answerContent" @click="goToDetail(item.questionId,item.answerAuditStatus)">
                                <i>{{item.answerContent.substr(0,40)}}{{item.answerContent.length>40?'...':''}}</i>
                                <i class="be_report" v-if="item.answerAuditStatus===2">审核未通过</i>
                            </div>
                            <div class="reply_btn">
                                <a href="#" @click="gotoreply(item.questionId)">{{item.answerAuditStatus===2?'重新回答':'回答'}}</a>
                            </div>
                        </div>
                    </div>

                    <!--2-->
                    <div v-show="this.tabList[1].active" class="content_detail">
                        <div class="detail_item" v-for="item in pageData[1]" @click="gotoPage(item.questionId,1,item.reportFlag)">
                            <div class="detail_title" :class="{report:item.reportFlag===1}">
                                <i>{{item.questionTitle}}</i><i v-if="item.reportFlag===1" class="be_report">被举报</i><i v-if="item.readFlag===0" class="detail_title_new"></i>
                            </div>
                            <div class="detail_article" :class="{report:item.reportFlag===1}">
                                <i>{{item.answerContent.substr(0,40)}}{{item.answerContent.length>40?'...':''}}</i>
                                <i class="be_report" v-if="item.auditStatus===0">待审核</i>
                            </div>
                        </div>
                    </div>

                    <!--3-->
                    <div class="content_detail" v-show="this.tabList[2].active">
                        <div class="detail_item" v-for="item in pageData[2]" @click="gotoPage(item.questionId,item.questionType,item.reportFlag)">
                            <div class="detail_title" :class="{report:item.reportFlag===1}">
                                <i>{{item.questionTitle}}</i><i v-if="item.reportFlag===1" class="be_report">被举报</i><i v-if="item.readFlag===0" class="detail_title_new"></i>
                            </div>
                            <div class="detail_article" :class="{report:item.reportFlag===1}">
                                {{item.answerContent.substr(0,40)}}{{item.answerContent.length>40?'...':''}}
                            </div>
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
    import BScroll from 'better-scroll';
    export default{
        name: 'app',
        data(){
            return {
                //tabList
                activeIndex: 0,
                tabList: [
                    {
                        number: 0,
                        text: '我的任务',
                        active: true,
                        newMess: false,
                        curPage: 1,
                        pullupText: '加载更多',
                        isnull:false
                    },
                    {
                        number: 0,
                        text: '我的问答',
                        active: false,
                        newMess: false,
                        curPage: 1,
                        pullupText: '加载更多',
                        isnull:false
                    },
                    {
                        number: 0,
                        text: '我的收藏',
                        active: false,
                        newMess: false,
                        curPage: 1,
                        pullupText: '加载更多',
                        isnull:false
                    }
                ],
                pageData: [
                    null,
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
                pulluping: false
            }
        },
        methods: {
            gotoPage(id, type,report,auditStatus){
                if(report===1){
                    return;
                }
                if(auditStatus===2){
                    return;
                }
                if (type === 2) {
                    window.location.href = `indexDetail.html?questionId=${id}`
                } else if(type === 1){
                    window.location.href = `questionsDetail.html?questionId=${id}`
                }
            },
            goToDetail(questionId,auditStatus=1){
                window.location.href=`questionsDetail.html?master=${this.masterInfo.talentId}&auditStatus=${auditStatus}&questionId=${questionId}`
            },
            gotoreply(questionId){
                window.location.href='reply.html?questionId='+questionId;
            },
            switchTab(item, index){
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
                            api = this.$api.master.myTask;
                            break;
                        case 1:
                            api = this.$api.master.myAnswer;
                            break;
                        case 2:
                            api = this.$api.userInfo.myCollect;
                            break;
                    }

                    let params = {
                        token: this.$cookie().appToken,
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

            }
            ,
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
                    }, 100)


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
                                api = this.$api.master.myTask;
                                break;
                            case 1:
                                api = this.$api.master.myAnswer;
                                break;
                            case 2:
                                api = this.$api.userInfo.myCollect

                        }


                        let params = {
                            token: this.$cookie().appToken,
                            appKey: this.appKey,
                            curPage: this.tabList[active].curPage,
                            pageSize: 10
                        };

                        if(this.tabList[active].isnull){
                            this.scroll.finishPullUp();
                            this.pulluping = false;
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
        mounted(){
            this.appKey = this.$cookie().appKey;
            this.token = this.$cookie().appToken || null;

            if(!this.$cookie().appToken){
                if (!this.$cookie().appToken) {
                    try {
                        ecej.login();
                    } catch (er) {
                        alert('跳转登录失败')
                    }
                    return;
                }
            }
            let params = {
                token: this.$cookie().appToken,
                appKey: this.appKey,
            };

            this.$http.get(this.$api.master.masterInfo, {params}).then(res => {
                let data = res.data.data;
                let result = res.data.resultCode;
                if (result === 200) {
                    this.tabList[0].number = data.taskCount;
                    this.tabList[1].number = data.answerCount;
                    this.tabList[1].newMess = data.readFlag;
                    this.tabList[2].number = data.collectCount;
                    this.masterInfo.talentId = data.talentId;
                    this.masterInfo.talentImg = data.talentImg;
                    this.masterInfo.talentNickName = data.talentNickName;
                    this.masterInfo.talentDesc = data.talentDesc;
                    this.masterInfo.labelType = data.labelType;
                    this.masterInfo.labelTypeDesc = data.labelTypeDesc;
                    this.masterInfo.greateCount = data.greateCount;


                    let params = {
                        token: this.$cookie().appToken,
                        appKey: this.appKey,
                        curPage: 1,
                        pageSize: 10
                    };
                    this.$http.get(this.$api.master.myTask, {params}).then(res => {
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


        },
        components: {
            ptop
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
        background: #fff;
        /*border-bottom: 1px solid #f3f3f3;*/
        margin-bottom: 10px;
    }

    .ask_img {
        float: left;
        /*margin-top: 15px;*/
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
        /*float: left;*/
        margin-left: 75px;
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
        margin: 0 5px;
    }

    .show_detail {
        border-bottom: 2px solid #ff5a00;
    }

    .title_new {
        width: 10px;
        height: 10px;
        border: 1px solid #ff5a00;
        border-radius: 10px;
        background: #ff5a00;
        display: inline-block;
        margin-left: -5px;
        margin-bottom: 5px;
    }

    .content_detail {
        /*padding: 0 15px;*/
    }

    .detail_item {
        padding: 15px;
        border-bottom: 1px solid #e5e5e5;
        background: #fff;
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

    .detail_title_new {
        width: 10px;
        height: 10px;
        display: inline-block;
        border: 1px solid #ff5a00;
        border-radius: 10px;
        background: #ff5a00;
        margin-left: -10px;
        margin-bottom: 5px;
    }

    .be_report {
        font-size: 12px;
        color: #d81300;
        border: 1px solid #d81300;
        border-radius: 2px;
        padding: 2px;
        margin-left: 5px;
        display: inline-block;
        /*width: 36px;*/
        line-height: 1.3;
    }

    .detail_article {
        color: #666;
        line-height: 1.68;
        font-size: 14px;
        padding-top: 12px;
    }

    .report {
        color: #acacac;
    }

    .task_time {
        font-size: 13px;
        color: #acacac;
        line-height: 1;
        margin-bottom: 13px;
    }

    .reply_btn {
        overflow: hidden;
        margin-top: 12px;
    }

    .reply_btn a {
        float: right;
        padding: 2px 0 2px 18px;
        background: url('./img/icon.png') no-repeat left center;
        background-size: 13px;
        font-size: 13px;
        line-height: 1;
        color: #f78141;
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

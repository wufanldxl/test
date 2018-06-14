<template>
    <div id="app">
        <ptop title="我的问答" :more="false"></ptop>
        <div class="my_ask" ref="wrapper">
            <div class="ask_content">
                <div class="content_title">
                    <div v-for="(item,$index) in tabList" @click="switchTab(item,$index)" :class="[{'show_detail':item.active},'title_item']"><i v-text="item.text"></i>(<i
                        v-text="item.number"></i>)<i v-if="item.newMess" class="title_new"></i></div>
                </div>
                <!--1-->
                <div v-show="this.tabList[0].active" class="content_detail d1">
                    <div class="detail_item" v-for="item in pageData[0]" @click="gotoPage(item.questionId,1,item.reportFlag,item.questionAuditStatus)">
                        <div class="detail_time">{{item.createTimeStr}}</div>
                        <div class="detail_title" :class="{report:item.reportFlag===1||item.questionAuditStatus===2}">
                            <i>{{item.questionTitle.substr(0,40)}}{{item.questionTitle.length>40?'...':''}}</i><i v-if="item.reportFlag===1||item.questionAuditStatus===2" class="be_report">{{item.reportFlag===1?'被举报':''}}{{item.questionAuditStatus===2?'审核未通过':''}}</i>
                            <i class="detail_title_new" v-if="item.readFlag===0"></i>
                        </div>
                        <div class="user_info" v-if="item.answerId!==-1">
                            <div class="ask_img">
                                <img :src="item.talentImg" alt="">
                            </div>
                            <div class="user_name">
                                <i>{{item.talentName}}</i>回答了问题
                            </div>
                        </div>
                        <div class="detail_article">
                            {{item.answerContent||'暂无回答'}}
                        </div>
                    </div>
                </div>
                <!--2-->
                <div v-show="this.tabList[1].active" class="content_detail d2">
                    <div class="detail_item" v-for="item in pageData[1]" @click="gotoPage(item.questionId,item.questionType,item.reportFlag)">
                        <!--<div class="detail_time"></div>-->
                        <div class="detail_title" :class="{report:item.reportFlag===1}">
                            <i>{{item.questionTitle.substr(0,40)}}{{item.questionTitle.length>40?'...':''}}</i><i v-if="item.reportFlag===1" class="be_report">被举报</i>
                        </div>
                        <div class="detail_article_collect">
                            {{item.answerContent||'暂无回答'}}
                        </div>
                    </div>
                </div>

                <!--3-->
                <div class="content_detail comment d3" v-show="this.tabList[2].active">
                    <div class="detail_item" v-for="item in pageData[2]" @click="gotoPage(item.questionId,1,item.reportFlag)">
                        <div class="question_comment">评论：<i>{{item.discussContent}}</i><i v-if="item.discussAuditStatus===2" class="be_report">审核未通过</i></div>
                        <div class="question_item">
                            <div class="detail_title" :class="{report:item.reportFlag===1}">
                                <i>{{item.questionTitle.substr(0,40)}}{{item.questionTitle.length>40?'...':''}}</i><i v-if="item.reportFlag===1" class="be_report">被举报</i>
                            </div>
                            <div class="detail_article" :class="{report:item.reportFlag===1}">
                                {{item.answerContent}}
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
        <bubble :moudel="bubbleM" :msg="bubbleText"></bubble>
    </div>
</template>

<script type="text/ecmascript-6">
    import ptop from '../components/ptop.vue';
    import BScroll from 'better-scroll';
    import bubble from '../components/bubble'
    export default{
        name: 'app',
        data(){
            return {
                //tabList
                activeIndex: 0,
                tabList: [
                    {
                        number: 0,
                        text: '我的提问',
                        active: true,
                        newMess: false,
                        curPage: 1,
                        pullupText: '加载更多'
                    },
                    {
                        number: 0,
                        text: '我的收藏',
                        active: false,
                        newMess: false,
                        curPage: 1,
                        pullupText: '加载更多'
                    },
                    {
                        number: 0,
                        text: '我的评论',
                        active: false,
                        newMess: false,
                        curPage: 1,
                        pullupText: '加载更多'
                    }
                ],
                pageData: [
                    null,
                    null,
                    null
                ],
                token: '',
                appKey: null,
                scroll: null,
                isscroll: false,
                pullupText: '加载更多',
                pulluping: false,
                bubbleM:{
                    show:false
                },
                bubbleText:'',
            }
        },
        computed: {
        },
        methods: {
            showBubble(t){
                this.bubbleText=t;
                this.bubbleM.show=true;
            },
            gotoPage(id, type, report,auditStatus){
                if(report===1){
                    return;
                }
                if(auditStatus===2){
                    return;
                }
                if (type === 2) {
                    window.location.href = `indexDetail.html?questionId=${id}`
                } else {
                    window.location.href = `questionsDetail.html?questionId=${id}`
                }
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
                            api = this.$api.userInfo.myQuestions;
                            break;
                        case 1:
                            api = this.$api.userInfo.myCollect;
                            break;
                        case 2:
                            api = this.$api.userInfo.myComment

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
                                api = this.$api.userInfo.myQuestions;
                                break;
                            case 1:
                                api = this.$api.userInfo.myCollect;
                                break;
                            case 2:
                                api = this.$api.userInfo.myComment

                        }


                        let params = {
                            token: this.$cookie().appToken,
                            appKey: this.appKey,
                            curPage: this.tabList[active].curPage,
                            pageSize: 10
                        };

                        this.$http.get(api, {params}).then(res => {
                            let data = res.data.data;
                            let result = res.data.resultCode;
                            if (result === 200) {
                                if (data.length === 0) {
                                    this.tabList[active].curPage -= 1;
                                    this.tabList[active].pullupText = '没有更多了';
                                    this.pullupText = '没有更多了';
                                    this.scroll.finishPullUp();
                                    this.pulluping = false;
                                } else {
                                    this.$set(this.pageData, active, this.pageData[active].concat(data));
                                    this.scroll.finishPullUp();
                                    this.pulluping = false;
                                    this.refreshScroll();
                                }
                            }else if(result===310){
                                try{
                                    ecej.login();
                                }catch(er){
                                    this.showBubble('调取登录失败');
                                }
                            }else{
                                this.showBubble(res.data.message);
                            }
                        })


                    })
                }
            }
        },
        mounted(){
            this.appKey=this.$cookie().appKey;
            this.token=this.$cookie().appToken;

            if(!this.$cookie().appToken){
                try{
                    ecej.login();
                }catch(er){
                    this.showBubble('调取登录失败');
                }
                return;
            }

            let paramsT = {
                appKey: this.appKey,
                token: this.$cookie().appToken,
            };

            this.$http.get(this.$api.userInfo.count, {params: paramsT}).then(res => {
                let data = res.data.data;
                let result = res.data.resultCode;
                if (result === 200) {
                    this.tabList[0].number = data.questionCount;
                    this.tabList[0].newMess = data.hasUnRead;
                    this.tabList[1].number = data.collectCount;
                    this.tabList[2].number = data.discussCount;


                    let params = {
                        token: this.$cookie().appToken,
                        appKey: this.appKey,
                        curPage: 1,
                        pageSize: 10
                    };

                    this.$http.get(this.$api.userInfo.myQuestions, {params}).then(res => {
                        let data = res.data.data;
                        let result = res.data.resultCode;
                        if (result === 200) {
                            this.$set(this.pageData, 0, data);

                            this.$nextTick(() => {
                                this.initScroll();
                            })
                        }else if(result===310){
                            try{
                                ecej.login();
                            }catch(er){
                                this.showBubble('调取登录失败');
                            }
                        }else{
                            this.showBubble(res.data.message);
                        }
                    })
                }else if(result===310){
                    try{
                        ecej.login();
                    }catch(er){
                        this.showBubble('调取登录失败');
                    }
                }else{
                    this.showBubble(res.data.message);
                }
            });

        },
        components: {
            ptop,
            bubble
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
    }

    .ask_content {
        /*background: #fff;*/
    }

    .content_title {
        border-bottom: 1px solid #f3f3f3;
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

    .d1 .detail_item:last-child{
        border-bottom:0;
    }
    .d2 .detail_item:last-child{
        border-bottom:0;
    }
    .d3 .detail_item:last-child{
        border-bottom:0;
    }

    .detail_time {
        font-size: 13px;
        color: #acacac;
        margin-bottom: 11px;
    }

    .user_info {
        margin-top: 11px;
    }

    .ask_img {
        float: left;
        /*margin-top: 15px;*/
        width: 25px;
        height: 25px;
        border-radius: 5px;
        overflow: hidden;
    }

    .ask_img img {
        width: 100%;
        height: 100%;
    }

    .user_name {
        font-size: 13px;
        height: 25px;
        line-height: 25px;
        color: #acacac;
        margin-left: 25px;
    }

    .user_name i {
        color: #666;
        margin-right: 6px;
        margin-left: 5px;
    }

    .detail_title {
        font-size: 16px;
        font-weight: bold;
        color: #222;
    }

    .comment .detail_title {
        color: #666;
    }

    .detail_title_new {
        width: 10px;
        height: 10px;
        display: inline-block;
        border: 1px solid #ff5a00;
        border-radius: 10px;
        background: #ff5a00;
        margin-left: -5px;
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
    }

    .detail_article {
        color: #666;
        line-height: 1.68;
        font-size: 14px;
        padding-top: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .detail_article_collect {
        color: #666;
        line-height: 1.68;
        font-size: 14px;
        padding-top: 12px;
    }

    .report {
        color: #acacac;
    }

    .question_item {
        background: #f3f4f6;
        padding: 10px;
    }

    .question_comment {
        font-size: 15px;
        color: #222;
        margin-bottom: 13px;
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

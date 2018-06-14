<template>
    <div id="app">
        <ptop :title="questionInfo?questionInfo.questionTitle:'问题详情'" :more="true" :question-id="questionId"></ptop>
        <div class="questions" v-if="questionInfo">
            <user-info-bar :src="questionInfo.userHeadImg" :name="questionInfo.userName" :time="questionInfo.createTimeStr" style="margin-top: 10px;"></user-info-bar>
            <h2 class="q_title">
                {{questionInfo.questionTitle}}
            </h2>
            <div class="q_imgs">
                <div v-for="(item,$index) in questionInfo.questionImgList" :style="{'marginRight':($index===(questionInfo.questionImgList.length-1)?(3-$index-1)*5:5) +'px'}">
                    <img class="place" src="./img/place.png" alt="">
                    <img class="q_image" :src="item.s3" alt="" @click="showBigImg(item.s0)">
                </div>
            </div>
            <operate :like="false" :collect="iscollect" :collectnum="collectCount" :collectFlag="collect" :handleCollect="handleCollect" :answer="isMaster"
                     :answerText="answerText" :handleAnswer="handleAnswer"></operate>
        </div>
        <div class="answer" v-if="answerInfo">
            <user-info-bar :src="answerInfo.userHeadImg" :name="answerInfo.userName" :time="answerInfo.createTimeStr" style="margin-top: 15px;"></user-info-bar>
            <div class="answer_content" v-html="answerConent">
            </div>
            <operate :likenum="greatCount" :likeFlag="likeFlag" :collect="false" :comment="true" :handleLike="handleLike"
                     :handleComment="handleComment"></operate>
            <div class="line"></div>
            <div class="a_comment" v-if="discussList.length>0">
                <ul>
                    <li v-for="item in discussList" :key="item.discussId">
                        <div class="comment_user clearfix">
                            <div class="comment_user_img">
                                <img :src="item.userHeadImg" alt="">
                            </div>
                            <div class="comment_info">
                                <div class="comment_user_name">{{item.userName}}</div>
                                <div class="comment_user_time">{{item.createTimeStr}}</div>
                            </div>
                        </div>
                        <div class="comment_conent">{{item.discussContent}}</div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="show_big_img" v-show="showBig" @click="closeShow">
            <div class="show_box" ref="big">
                <img src="../components/img/loading.gif" v-show="loadImg" alt="" width="46" style="position: absolute; top: 50%; left: 50%; margin-left: -23px; margin-top: -23px;">
                <img :src="bigImg" @load="initBigImg">
            </div>
        </div>
        <bubble :moudel="bubbleM" :msg="bubbleText"></bubble>
    </div>
</template>

<script type="text/ecmascript-6">
    import ptop from '../components/ptop.vue';
    import operate from '../components/operate.vue';
    import userInfoBar from '../components/userInfoBar.vue';
    import xss from 'xss';
    import bubble from '../components/bubble';
    import popup from '../components/popup';

    export default{
        data(){
            return {
                questionId: null,
                token: 'b6757c6d7f854d12adace98e52019951',
                appKey: null,
                questionInfo: null,
                answerInfo: null,
                discussList: [],
                greatFlag: 1,
                greatCount: 0,
                collectFlag: 1,
                collectCount: 0,
                bubbleM: {
                    show: false
                },
                bubbleText: '',
                popupShow: false,
                popupText: '调取登录失败,请返回“我的”登录',
                iscollect: true,
                master: false,
                auditStatus: 1,
                bigImg: '',
                showBig: false,
                loadImg: false
            }
        },
        computed: {
            answerConent(){
                return filterXSS(this.answerInfo.answerContent)
            },
            likeFlag(){
                return this.greatFlag === 0;
            },
            collect(){
                return this.collectFlag === 0;
            },
            iscollect(){
                return !this.master;
            },
            isMaster(){
                return !!this.master
            },
            answerText(){
                return this.auditStatus === 2 ? '重新回答' : '回答';
            }
        },
        methods: {
            handleLike(){
                if (!this.$cookie().appToken) {
                    try {
                        ecej.login();
                    } catch (er) {
                        this.showBubble('登录失败')
                    }
                    return;
                }

                let params = {
                    token: this.$cookie().appToken,
                    appKey: this.appKey,
                    answerId: this.answerInfo.answerId,
                    greatFlag: this.greatFlag === 0 ? 1 : 0
                };
                this.$http.post(this.$api.like, params).then(res => {
                    let data = res.data.data;
                    let result = res.data.resultCode;
                    if (result === 200) {
                        this.greatFlag = data.greatFlag;
                        if (this.greatFlag === 0) {
                            this.greatCount++
                        } else {
                            this.greatCount--
                        }
                    }
                })
            },
            handleCollect(){
                if (!this.$cookie().appToken) {
                    try {
                        ecej.login();
                    } catch (er) {
                        this.showBubble('登录失败')
                    }
                    return;
                }

                let params = {
                    token: this.$cookie().appToken,
                    appKey: this.appKey,
                    questionId: this.questionInfo.questionId,
                    collectFlag: this.collectFlag === 0 ? 1 : 0
                };
                this.$http.post(this.$api.collect, params).then(res => {
                    let data = res.data.data;
                    let result = res.data.resultCode;
                    if (result === 200) {
                        this.collectFlag = data.collectFlag;
                        if (this.collectFlag === 0) {
                            this.collectCount++
                        } else {
                            this.collectCount--
                        }
                    }
                })
            },
            handleComment(){
                if (this.$cookie().appToken) {
                    window.location.href = `comment.html?questionId=${this.questionInfo.questionId}&answerId=${this.answerInfo.answerId}`
                } else {
                    try {
                        ecej.login();
                    } catch (er) {
                        this.popupShow = true
                    }
                }

            },
            handleAnswer(){
                window.location.href = 'reply.html?questionId=' + this.questionId
            },
            showBubble(t){
                this.bubbleText = t;
                this.bubbleM.show = true;
            },
            goApp(){
                try {
                    ecej.goToPage(JSON.stringify({'path': 'homePage ://?'}))
                } catch (er) {
                    this.showBubble('返回首页失败')
                }

            },
            cancelPop(){
                this.popupShow = false
            },
            showBigImg(src){
                this.showBig = true;
                this.loadImg = true;
                this.bigImg = src;
            },
            closeShow(){
                this.bigImg = '';
                this.showBig = false;
            },
            initBigImg(){
                this.loadImg = false;
                let p = this.$refs.big;
                if (p.scrollHeight === p.offsetHeight) {
                    p.style.display = 'flex';
                    p.style.display = 'webkitBox';
                } else {
                    p.style.display = 'block';
                    p.scrollTop = p.scrollHeight / 2 - p.offsetHeight / 2;
                    p.scrollLeft = p.scrollWidth / 2 - p.offsetWidth / 2
                }

            }
        },
        mounted(){
            this.appKey = this.$cookie().appKey;
            this.token = this.$cookie().appToken || null;
            //如果是从达人任务过来的会有这个参数
            this.master = this.$urlData.master;
            this.auditStatus = this.$urlData.auditStatus;

            let questionId = this.$urlData.questionId;
            this.questionId = parseInt(questionId);
            if (questionId) {
                let params = {
                    token: this.$cookie().appToken,
                    appKey: this.appKey,
                    questionId: this.questionId
                };
                this.$http.get(this.$api.questionDetail, {params}).then(res => {
                    let data = res.data.data;
                    let result = res.data.resultCode;
                    if (result === 200) {
                        this.$set(this.$data, 'questionInfo', data.question);
                        this.$set(this.$data, 'answerInfo', data.answer);
                        this.$set(this.$data, 'discussList', data.discussList);
                        this.greatFlag = data.answer.greatFlag ? 0 : 1;
                        this.greatCount = data.answer.greatCount;
                        this.collectFlag = data.question.collectFlag ? 0 : 1;
                        this.collectCount = data.question.collectCount;
                    } else {
                        this.showBubble(res.data.message)
                    }
                })
            } else {
                this.showBubble('questionId is not defined')
            }
        },
        components: {
            ptop,
            operate,
            userInfoBar,
            popup,
            bubble
        }
    }
</script>

<style>
    @import url("../assets/base-1.4.css");

    body {
        background: #f3f4f6;

    }

    .questions {
        background: #fff;
        padding: 0 15px 15px;
        overflow: hidden;
        border-bottom: 1px solid #f3f3f3;
    }

    .q_title {
        font-size: 16px;
        font-weight: bold;
        color: #222222;
        margin-top: 10px;
    }

    .q_imgs {
        margin-top: 14px;
        display: flex;
    }

    .q_imgs > div {
        flex: 0.333;
        position: relative;
        top: 0;
        left: 0;
        margin-right: 5px;
        overflow: hidden;
    }

    .q_imgs > div .place {
        width: 100%;
    }

    .q_imgs > div .q_image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }

    .answer {
        background: #fff;
        padding: 0 15px 15px;
        overflow: hidden;
    }

    .answer_content {
        padding-top: 15px;
        /*padding-bottom: 15px;*/
    }

    .answer_content img {
        max-width: 100%;
    }

    .a_comment {
        margin-top: 15px;
        border-top: 1px dashed #f3f3f3;
    }

    .a_comment li {
        margin-top: 20px;
    }

    .comment_user > div {
        float: left;
    }

    .comment_user_img {
        width: 25px;
        height: 25px;
        overflow: hidden;
        border-radius: 3px;
    }

    .comment_user_img img {
        width: 100%;
        height: 100%;
    }

    .comment_info {
        margin-left: 5px;
    }

    .comment_user_name {
        font-size: 12px;
        color: #666;
        line-height: 1;
    }

    .comment_user_time {
        margin-top: 2px;
        font-size: 12px;
        color: #acacac;
        line-height: 1;
    }

    .comment_conent {
        margin-left: 30px;
        margin-top: 5px;
        font-size: 14px;
        line-height: 1.68;
        color: #666;
    }

    .show_big_img {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 500;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
    }

    .show_box {
        width: 100%;
        height: 100%;
        position: relative;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .show_box img {
        max-width: 100%;
        margin: 10px 0;
    }
</style>

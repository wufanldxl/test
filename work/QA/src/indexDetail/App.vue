<template>
    <div id="app">
        <ptop :title="DetailInfo?DetailInfo.questionTitle:'问题详情'" :question-id="questionId" :report="false"  :more="true"></ptop>
        <section class="conent" v-if="DetailInfo">
            <div class="topimg" v-if="DetailInfo.qualityType===1">
                <div class="place-t"></div>
                <img :src="DetailInfo.questionImg" alt="">
            </div>
            <div class="top_video" v-if="DetailInfo.qualityType===2">
                <div class="place-t"></div>
                <div class="video_box" id="video_box"></div>
            </div>
            <div class="detail">
                <h2 class="detail_title">{{DetailInfo.questionTitle}}</h2>
                <div class="info" v-if="DetailInfo.qualityType===1" v-html="answerConent">
                </div>
                <operate :time="DetailInfo.createTimeStr" :likenum="greatCount" :collectnum="collectCount" :likeFlag="islike"
                         :collectFlag="iscollect" :handleLike="handleLike" :handleCollect="handleCollect"></operate>
            </div>
        </section>

        <div class="fine" v-if="recommends.length>0">
            <div class="fine_title">精品问答</div>
            <div class="fine_list">

                <div class="fine_item" v-for="item in recommends">
                    <a :href="'indexDetail.html?questionId='+item.questionId">
                        <div class="fine_item_title">{{item.questionTitle}}</div>
                        <div class="fine_item_img">
                            <div class="place-c"></div>
                            <img :src="item.questionImg" alt="">
                        </div>
                    </a>
                </div>

            </div>
        </div>
        <bubble :moudel="bubbleM" :msg="bubbleText"></bubble>
        <popup :popupShow="popupShow" :text="popupText" successText="返回首页" :success="goApp" :cancel="cancelPop"></popup>
    </div>
</template>

<script type="text/ecmascript-6">
    import ptop from '../components/ptop.vue';
    import operate from '../components/operate.vue';
    import xss from 'xss';
    import bubble from '../components/bubble';
    import popup from '../components/popup';

    export default{
        components: {
            ptop,
            operate,
            popup,
            bubble
        },
        data(){
            return {
                questionId:-1,
                DetailInfo: null,
                recommends: [],
                player: null,
                token: 'b6757c6d7f854d12adace98e52019951',
                appKey: null,
                greatFlag: 1,
                greatCount: 0,
                collectFlag: 1,
                collectCount: 0,
                bubbleM: {
                    show: false
                },
                bubbleText: '',
                popupShow: false,
                popupText: '调取登录失败,请返回“我的”登录'
            }
        },
        computed: {
            answerConent(){
                return filterXSS(this.DetailInfo.answerContent)
            },
            islike(){
                return this.greatFlag === 0
            },
            iscollect(){
                return this.collectFlag === 0
            }
        },
        methods: {
            handleLike(){
                if (!this.$cookie().appToken) {
                    try {
                        ecej.login();
                    } catch (er) {
                        this.popupShow = true
                    }
                    return;
                }

                let params = {
                    token: this.$cookie().appToken,
                    appKey: this.appKey,
                    answerId: this.DetailInfo.answerId,
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
                        this.popupShow = true
                    }
                    return;
                }

                let params = {
                    token: this.$cookie().appToken,
                    appKey: this.appKey,
                    questionId: this.DetailInfo.questionId,
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
            }
        },
        mounted(){
            this.appKey = this.$cookie().appKey;
            this.token = this.$cookie().appToken || null;

            let questionId = this.$urlData.questionId;
            this.questionId = parseInt(questionId);
            if (questionId) {
                let params = {
                    token: this.$cookie().appToken,
                    appKey: this.appKey,
                    questionId: parseInt(this.questionId)
                };
                this.$http.get(this.$api.indexDetail, {params}).then(res => {
                    let data = res.data.data;
                    let result = res.data.resultCode;
                    if (result === 200) {
                        this.$set(this.$data, 'DetailInfo', data.qaInfo);
                        this.$set(this.$data, 'recommends', data.recommends);
                        this.greatFlag = data.qaInfo.greatFlag ? 0 : 1;
                        this.greatCount = data.qaInfo.greatCount;
                        this.collectFlag = data.qaInfo.collectFlag ? 0 : 1;
                        this.collectCount = data.qaInfo.collectCount;

                        if(data.qaInfo.qualityType===2){
                            this.player = new YKU.Player('video_box', {
                                styleid: '0',
                                client_id: '5f88676b20eeb3d1',
                                vid: data.qaInfo.videoId,
                                newPlayer: false
                            });
                        }

                    } else {
                        this.showBubble(res.data.message)
                    }
                })
            } else {
                this.showBubble('questionId is not defined')
            }
        }
    }
</script>

<style>
    @import url("../assets/base-1.4.css");

    body {
        background: #f3f4f6;
        padding-bottom: 10px;
    }

    .conent {
        padding-bottom: 15px;
        background: #fff;
    }

    .topimg_box {
        padding: 15px 15px 0;
    }

    .topimg {
        position: relative;
        top: 0;
        left: 0;
        overflow: hidden;
    }

    .place-t {
        width: 100%;
        padding-top: 49.333%;
    }

    .topimg img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .top_video {
        width: 100%;
        position: relative;
        top: 0;
        left: 0;
        overflow: hidden;
    }

    .video_box {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .detail {
        padding: 0 15px;
        margin-top: 15px;
    }

    .detail_title {
        font-size: 16px;
        line-height: 1;
        font-weight: bold;
        color: #222222;
    }

    .info {
        margin-top: 18px;
    }

    .info * {
        line-height: 1.6;
    }

    .info img {
        max-width: 100%;
        margin-bottom: 10px;
    }

    .fine {
        margin-top: 10px;
    }

    .fine_title {
        padding: 0 15px;
        margin-bottom:5px;
        font-size: 15px;
        line-height: 25px;
        color: #666;
    }

    .fine_list {
        background: #fff;
    }

    .fine_item {
        padding: 15px;
        border-bottom: 1px solid #f3f3f3;
    }

    .fine_item:last-child {
        border-bottom: none;
    }

    .fine_item_title {
        font-size: 16px;
        line-height: 1;
        font-weight: 500;
        color: #222222;
    }

    .fine_item_img {
        margin-top: 10px;
        position: relative;
        top: 0;
        left: 0;
    }

    .place-c {
        width: 100%;
        padding-top: 49.275%;
    }

    .fine_item_img img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>

<template>
    <div>
        <div class="header_box">
            <div id="header">
                <a href="javascript:;" class="back" @click="goTo"></a>
                <h1 class="page_title">{{title}}</h1>
                <div class="more_a">
                    <a href="javascript:;" class="more_menu" @click="showMore" v-if="more"></a>
                    <a href="search.html" class="h_search" v-if="search"></a>
                </div>
            </div>
        </div>
        <div class="header_d"></div>

        <div class="more_menu_bg" v-if="more" style="display: none" ref="bg">
            <transition name="fade" v-on:before-enter="beforeEnter" v-on:after-leave="afterLeave">
                <div class="more_box" v-show="moreShow">
                    <div class="more_btns">
                        <a href="javascript:;" @click="shareWX" class="wx"></a>
                        <a href="javascript:;" @click="shareTimeLine" class="time_line"></a>
                        <a v-if="report" href="javascript:;" class="report" @click="goReport"></a>
                    </div>
                    <div class="more_cancel" @click="closeMore">取消</div>
                </div>
            </transition>
        </div>

        <bubble :moudel="bubbleM" :msg="bubbleText" box="bp"></bubble>
    </div>

</template>

<script type="text/ecmascript-6">
    import bubble from '../components/bubble'
    export default{
        props: {
            'title':{
                type:String
            },
            'more':{
                type:Boolean,
                default:false
            },
            'search':{
                type:Boolean,
                default:false
            },
            'report':{
                type:Boolean,
                default:true
            },
            'go':{
                type:Function
            },
            'questionId':{
                type:Number
            },
            'talentId':{
                type:Number
            }
        },
        data(){
            return {
                moreShow: false,
                bubbleM:{
                    show:false
                },
                bubbleText:'',
            }
        },
        components: {
            bubble
        },
        methods: {
            showBubble(t){
                this.bubbleText=t;
                this.bubbleM.show=true;
            },
            goTo(){
                if(this.go){
                    this.go();
                }else{
                    window.history.go(-1)
                }

            },
            showMore(){
                this.moreShow = true;
            },
            closeMore(){
                this.moreShow = false;
            },
            beforeEnter(){
                this.$refs['bg'].style.display = 'block';

            },
            afterLeave(){
                this.$refs['bg'].style.display = 'none'

            },
            share(type){
                let isIndex=/indexDetail/.test(window.location.href);
                if(this.questionId){
                    let params={
                        href:window.location.href,
                        questionId:this.questionId
                    };
                    this.$http.get(this.$api.questionShare,{params}).then(res=>{
                        let data = res.data.data;
                        let result = res.data.resultCode;
                        if(result===200){
                            let url='';
                            if(isIndex){
                                url=`${window.location.origin}/qaplatform/question/getQuestionDetailInfo2?questionId=${this.questionId}`
                            }else{
                                url=`${window.location.origin}/qaplatform/question/getQuestionDetailInfo?questionId=${this.questionId}`
                            }

                            try {
                                let sdata={
                                    'shareAddress':url,
                                    'titleName': data.shareTitle,
                                    'shareMsg': data.shareDesc,
                                    'shareImage': data.shareImgUrl,
                                    'shareType':type
                                };

                                ecej.share(JSON.stringify(sdata))
                            }catch(er){
                                this.showBubble('分享失败')
                            }

                        }else{
                            this.showBubble(res.data.message)
                        }
                        if(isIndex){
                            _hmt.push(['_trackEvent', '分享', '精品问答分享', '问题id:'+this.questionId]);
                        }else{
                            _hmt.push(['_trackEvent', '分享', '普通问答分享', '问题id:'+this.questionId]);
                        }
                    })
                }else if(this.talentId){
                    let params={
                        href:window.location.href,
                        talentId:this.talentId
                    };
                    this.$http.get(this.$api.talentShare,{params}).then(res=>{
                        let data = res.data.data;
                        let result = res.data.resultCode;
                        if(result===200){
                            try {
                                let sdata={
                                    'shareAddress': `${window.location.origin}/qaplatform/talent/getTalentInfo?talentId=${this.talentId}`,
                                    'titleName': data.shareTitle,
                                    'shareMsg': data.shareDesc,
                                    'shareImage': data.shareImgUrl,
                                    'shareType':type
                                };

                                ecej.share(JSON.stringify(sdata))
                            }catch (er){
                                this.showBubble('分享失败')
                            }
                        }else{
                            this.showBubble(res.data.message)
                        }
                        _hmt.push(['_trackEvent', '分享', '达人主页分享', '达人id:'+this.talentId]);
                    })
                }
            },
            shareWX(){
                this.share(1)
            },
            shareTimeLine(){
                this.share(2)
            },
            goReport(){
                if(this.questionId){
                    window.location.href ='report.html?questionId='+this.questionId;
                    localStorage.setItem('title',this.title);
                }
            }
        }
    }

</script>

<style>
    .header_box {
        width: 100%;
        height: 44px;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
    }

    .header_d{
        width: 100%;
        height: 44px;
    }

    #header {
        display: flex;
        height: 44px;
        line-height: 44px;
        padding: 0 15px;
        background: #fff;
        border-bottom: 1px solid #f3f3f3;
    }

    .page_title {
        flex: 1;
        margin-left: 20px;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        color: #222;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    #header a {
        display: block;
    }

    .back {
        width: 10px;
        height: 100%;
        background: url("./img/back.png") no-repeat center;
        background-size: 100%;
    }

    .more_a {
        width: 18px;
        height: 100%;
        margin-left: 20px;
    }

    .more_menu {
        width: 100%;
        height: 100%;
        background: url("./img/more.png") no-repeat center;
        background-size: 100%;
    }

    .h_search {
        width: 16.5px;
        height: 100%;
        background: url("./img/search.png") no-repeat center;
        background-size: 100%;
    }

    html, body {
        width: 100%;
        height: 100%;
    }

    .more_menu_bg {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
    }

    .more_box {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
    }

    .more_btns {
        display: flex;
        justify-content: space-around;
        height: 150px;
        background: #f3f4f6;
    }

    .more_btns a {
        margin-top: 42px;
        width: 50px;
        height: 50px;
        background-repeat: no-repeat;
        background-size: 100%;
    }

    .more_btns .wx {
        background-image: url("./img/wx.png");
    }

    .more_btns .time_line {
        background-image: url("./img/timeline.png");
    }

    .more_btns .report {
        background-image: url("./img/report.png");
    }

    .more_cancel {
        width: 100%;
        height: 50px;
        background: #fff;
        line-height: 50px;
        font-size: 19px;
        color: #000000;
        text-align: center;
    }

    /*过渡*/
    .fade-enter-active, .fade-leave-active {
        transition: all .2s
    }

    .fade-enter, .fade-leave-to {
        transform: translateY(200px);
    }
</style>

<template>
    <div id="app">
        <ptop title="评论" :more="false"></ptop>
        <div class="main">
            <div class="editcomment">
                <textarea class="comment_text" maxlength="300" placeholder="请输入评论内容" v-model.trim="text" @input="contText"></textarea>
                <div class="cont">{{cont}}/300</div>
            </div>
        </div>
        <div class="loading_d" v-show="isLodaing">
            <div>
                <img src="../components/img/loading.gif" alt="" width="50">
            </div>
        </div>
        <button class="submit" :class="{formok:formok}" type="button" @click="submit">提交</button>
        <bubble :moudel="bubbleM" :msg="bubbleText"></bubble>
    </div>
</template>

<script type="text/ecmascript-6">
    import ptop from '../components/ptop.vue'
    import bubble from '../components/bubble'
    export default{
        components: {
            ptop,
            bubble
        },
        data(){
            return {
                text: '',
                cont: 0,
                formok: false,
                questionId: null,
                answerId: null,
                token: '',
                appKey: null,
                bubbleM: {
                    show: false
                },
                bubbleText: '',
                isLodaing: false
            }
        },
        methods: {
            showBubble(t){
                this.bubbleText = t;
                this.bubbleM.show = true;
            },
            contText(){
                if (this.text.length > 0) {
                    this.formok = true;
                } else {
                    this.formok = false;
                }

                if (this.text.length >= 300) {
                    this.showBubble('字数不能超过300')
                }
                //this.text = this.text.substr(0, 300);
                this.cont = this.text.length
            },
            submit(){
                if (this.formok) {
                    if (!this.$cookie().appToken) {
                        try {
                            ecej.login();
                        } catch (er) {
                            this.showBubble('调取登录失败');
                        }
                        return;
                    }
                    this.isLodaing = true;
                    let params = {
                        questionId: this.questionId,
                        answerId: this.answerId,
                        discussContent: this.text,
                        token: this.$cookie().appToken,
                        appKey: this.appKey
                    }

                    this.$http.post(this.$api.comment, params).then(res => {
                        this.isLodaing = false;
                        let result = res.data.resultCode;
                        if (result === 200) {
                            this.showBubble('提交成功');
                            setTimeout(() => {
                                window.location.replace(`questionsDetail.html?questionId=${this.questionId}`)
                                //window.history.go(-1)
                            }, 1000)
                        } else if (result === 310) {
                            try {
                                ecej.login();
                            } catch (er) {
                                this.showBubble('调取登录失败');
                            }
                        }else{
                            this.showBubble(res.data.message);
                        }
                    }, res => {
                        this.isLodaing = false;
                    })
                }
            }
        },
        mounted(){
            this.appKey = this.$cookie().appKey;
            this.token = this.$cookie().appToken;

            this.questionId = this.$urlData.questionId;
            this.answerId = this.$urlData.answerId;
        }
    }
</script>

<style>
    @import url("../assets/base-1.4.css");

    body {
        background: #f3f4f6;
    }

    .main {
        background: #fff;
        padding: 15px;
    }

    .editcomment {
        margin-bottom: 8px;
        font-size: 0;
        position: relative;
        top: 0;
        left: 0;
    }

    .comment_text {
        width: 100%;
        height: 200px;
        padding: 10px 10px 26px;
        border: none;
        box-sizing: border-box;
        font-size: 13px;
        color: #222;
        background-color: #f3f4f6;
        resize: none;
        line-height: 1.4;
    }

    .comment_text::-webkit-input-placeholder {
        color: #acacac;
    }

    .cont {
        position: absolute;
        right: 10px;
        bottom: 10px;
        color: #666;
        font-size: 11px;
    }
</style>

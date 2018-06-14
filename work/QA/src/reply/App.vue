<template>
    <div id="app">
        <ptop title="回答问题" :more="false"></ptop>
        <div class="main">
            <div class="question">
                <div class="question_con">
                    <textarea class="question_text" maxlength="600" v-model.trim="qtext" placeholder="请输入您的回答" @input="contText"></textarea>
                    <div class="cont">{{cont}}/600</div>
                </div>

                <div class="question_img">
                    <div class="flex_item" v-for="(img,$index) in showImgs" :key="$index" :style="{'marginRight':($index===(showImgs.length-1)?(4-$index-1)*10:10) +'px'}">
                        <div class="p-c"></div>
                        <label>
                            <input type="file" accept="image/gif, image/jpeg, image/png" @change="upload($event,$index)" @click="deleteImg($event,$index)">
                            <img src="./img/camera.png" v-show="!img" alt="">
                            <img v-show="img" :src="img" alt="">
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div class="loading_d" v-show="isLodaing">
            <div>
                <img src="../components/img/loading.gif" alt="" width="50">
            </div>
        </div>

        <button class="submit" :class="{'formok':qtext}" @click="submit" type="button">提交</button>
        <bubble :moudel="bubbleM" :msg="bubbleText"></bubble>
        <popup :popupShow="popupShow" :text="popupText" successText="返回首页" :success="goApp" :cancel="cancelPop"></popup>
    </div>
</template>

<script>
    import ptop from '../components/ptop.vue'
    import bubble from '../components/bubble'
    import popup from '../components/popup'
    export default{
        name: 'app',
        components: {
            ptop,
            bubble,
            popup
        },
        data(){
            return {
                type: '',
                qtext: '',
                cont: 0,
                //预览用的图片
                showImgs: [''],
                //后台返回的图片字符串
                images: [],
                appKey: null,
                token: 'b6757c6d7f854d12adace98e52019951',
                questionId: -1,
                answerImage: [],
                bubbleM: {
                    show: false
                },
                bubbleText: '',
                popupShow: false,
                popupText: '调取登录失败,请返回“我的”登录',
                uploading: false,
                isLodaing: false
            }
        },
        computed: {
            answerContent(){
                let t = this.qtext.replace(/\n/g, '<br>');
                let p = `<p>${t}</p>`;
                for (let img in this.images) {
                    p += `<p><img src="${this.images[img]}"></p>`
                }
                return p;
            },
            answerText(){
                return this.qtext.replace(/\n/g, '');
            }
        },
        methods: {
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
            upload(ev, n){
                let narr = this.showImgs.join('|').split('|');
                narr[n] = './static/img/loading.gif';
                this.$set(this.$data, 'showImgs', narr);

                this.uploading = true;

                let then = ev.target;
                let _this = this;

                if (then.files.length > 1) {
                    this.showBubble('每次只能上传一张图片')
                }


                if (then.files.length > 0) {
                    let bImg = /image/i.test(then.files[0].type);
                    if (!bImg) {
                        this.showBubble('请上传图片文件');
                        return;
                    }

                    let read = new FileReader();
                    read.readAsDataURL(then.files[0]);

                    read.addEventListener('load', function () {
                        let form = document.createElement('form');
                        let formData = new FormData(form);
                        formData.append('file', then.files[0]);
                        let config = {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }

                        _this.$http.post(_this.$api.image.uploadImg, formData, config).then(res => {
                            _this.uploading = false;
                            let data = res.data.data;
                            let result = res.data.resultCode;
                            if (result === 200) {
                                let iarr = _this.showImgs.join('|').split('|');
                                iarr[n] = window.URL.createObjectURL(then.files[0]);
                                _this.$set(_this.$data, 'showImgs', iarr);
                                _this.images[n] = data.imageFile;
                            } else {
                                this.showBubble(res.data.message);
                                let iarr = _this.showImgs.join(',').split(',');
                                iarr[n] = '';
                                _this.$set(_this.$data, 'showImgs', iarr);
                            }
                        })
                    }, false)
                }

            },
            deleteImg(ev, n){
                if (this.showImgs[n]) {
                    ev.target.value = '';
                    let iarr = this.showImgs.join(',').split(',');
                    iarr.splice(n, 1);
                    this.images.splice(n, 1);
                    this.$set(this.$data, 'showImgs', iarr);
                    ev.preventDefault()
                }

            },
            submit(){
                if (this.qtext !== '' && !this.uploading) {
                    if (!this.$cookie().appToken) {
                        try {
                            ecej.login();
                        } catch (er) {
                            this.popupShow = true;
                        }
                        return;
                    }
                    this.isLodaing = true;
                    let params = {
                        token: this.$cookie().appToken,
                        appKey: this.appKey,
                        questionId: this.questionId,
                        answerContent: this.answerContent,
                        answerText: this.answerText,
                        answerImage: this.images
                    };

                    this.$http.post(this.$api.answer, params).then(res => {
                        this.isLodaing = false;
                        let result = res.data.resultCode;
                        if (result === 200) {
                            this.showBubble('提交成功');
                            setTimeout(() => {
                                window.location.href = 'masterMyAsk.html';
                            }, 1000);
                        } else {
                            this.showBubble(res.data.message)
                        }
                    }, res => {
                        this.isLodaing = false;
                    })
                }
            },
            contText(){
                if (this.qtext.length >= 600) {
                    this.showBubble('最多600字')
                }
//                this.qtext = this.qtext.substr(0, 300);
                this.cont = this.qtext.length
            },
            closeDaren(){
                this.darenshow = false;
            }
        },
        watch: {
            showImgs(val, oldval){
                let l = val.length;
                if (l === 0) {
                    this.showImgs.push('')
                } else {
                    if (val[l - 1] && l <= 1) {
                        this.showImgs.push('')
                    }
                }
            }
        },
        mounted(){
            this.appKey = this.$cookie().appKey;
            this.token = this.$cookie().appToken;

            this.questionId = parseInt(this.$urlData.questionId);
        }
    }
</script>

<style>
    @import url("../assets/base-1.4.css");

    body, html {
        width: 100%;
        height: 100%;
    }

    body {
        background: #f3f4f6;
    }

    .main {
        padding: 0 15px;
        background: #fff;
        overflow: hidden;
    }

    .question {
        padding-bottom: 15px;
        margin-top: 15px;
        border-bottom: 1px solid #f3f3f3;
        background: #fff;
        overflow: hidden;
    }

    .question h3 {
        line-height: 1;
        margin-top: 15px;
        font-size: 15px;
        color: #222222;
    }

    .question_con {
        margin-bottom: 8px;
        font-size: 0;
        position: relative;
        top: 0;
        left: 0;
    }

    .question_text {
        width: 100%;
        height: 200px;
        padding: 10px 10px 26px;
        border: none;
        box-sizing: border-box;
        font-size: 13px;
        color: #222;
        background-color: #f3f4f6;
        resize: none;
    }

    .question_text::-webkit-input-placeholder {
        color: #acacac;
    }

    .question_img {
        display: flex;
    }

    .question_img .flex_item {
        flex: 0.25;
        margin-right: 10px;
        position: relative;
        top: 0;
        left: 0;
        overflow: hidden;
    }

    .question_img .flex_item img, .question_img .flex_item label {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .question_img .flex_item input[type=file] {
        opacity: 0;
        width: 1px;
    }

    /*.question_img .flex_item:last-child {*/
    /*margin-right: 0;*/
    /*}*/

    .question_img .flex_item .p-c {
        width: 100%;
        padding-top: 100%;
    }

    .cont {
        position: absolute;
        right: 10px;
        bottom: 10px;
        color: #666;
        font-size: 11px;
    }

    .daren {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 105;
        overflow: hidden;
        background: #f3f4f6;
    }
</style>

<template>
    <div id="app">
        <ptop title="我要提问" :more="false"></ptop>
        <div class="main">
            <div class="question">
                <h3>问题类型</h3>
                <div class="radio_group">
                    <div class='radio-check' v-for="item in questionLabel" :key="item.value">
                        <label><input type="radio" name="question_type" :value="item.value" v-model="type"/><i></i>{{item.name}}</label>
                    </div>

                </div>

                <div class="question_con">
                    <textarea class="question_text" v-model.trim="qtext" maxlength="300" placeholder="请描述您的问题" @input="contText"></textarea>
                    <div class="cont">{{cont}}/300</div>
                </div>

                <div class="question_img">
                    <div class="flex_item" v-for="(img,$index) in showImgs" :key="$index">
                        <div class="p-c"></div>
                        <label>
                            <input type="file" accept="image/gif, image/jpeg, image/png" @change="upload($event,$index)" @click="deleteImg($event,$index)">
                            <img src="./img/camera.png" v-show="!img" alt="">
                            <img v-show="img" :src="img" alt="">
                        </label>
                    </div>

                    <!--占位-->
                    <div class="flex_item" v-show="showImgs.length<2">
                        <div class="p-c"></div>
                    </div>
                    <div class="flex_item" v-show="showImgs.length<3">
                        <div class="p-c"></div>
                    </div>
                    <div class="flex_item">
                        <div class="p-c"></div>
                    </div>
                    <!--占位 end-->
                </div>
            </div>
            <div class="invite clearfix" :class="{'disable':!type}" @click="choosemaster">
                <div class="invite_tit">邀请回答</div>
                <a href="javascript:;" class="invite_name">{{chooseM}}</a>
            </div>
        </div>
        <button class="submit" :class="{'formok':qtext&&!uploading}" @click="submit" type="button">提交</button>


        <div class="daren" v-show="darenshow">
            <master-list :go="closeDaren" @getmaster="getmaster" :show="darenshow" :type="type"></master-list>
        </div>

        <div class="loading_d" v-show="isLodaing">
            <div>
                <img src="../components/img/loading.gif" alt="" width="50">
            </div>
        </div>

        <bubble :moudel="bubbleM" :msg="bubbleText"></bubble>
        <popup :popupShow="popupShow" :text="popupText" successText="返回首页" :success="goApp" :cancel="cancelPop"></popup>
    </div>
</template>

<script type="text/ecmascript-6">
    import ptop from '../components/ptop'
    import masterList from '../components/masterList';
    import bubble from '../components/bubble'
    import popup from '../components/popup'

    export default{
        name: 'app',
        components: {
            ptop,
            masterList,
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
                questionLabel: [],
                talentId: null,
                darenshow: false,
                chooseM: '选择达人',
                token: '',
                appKey: null,
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
                                this.showBubble(res.data.message)
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
                    let iarr = this.showImgs.join('|').split('|');
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
                        appKey: null,
                        labelType: this.type || 0,
                        questionTitle: this.qtext,
                        imageList: this.images,
                        talentId: this.talentId || 0
                    };

                    this.$http.post(this.$api.ask, params).then(res => {
                        this.isLodaing = false;
                        let result = res.data.resultCode;
                        if (result === 200) {
//                            history.replaceState(null, ' ', '/');
                            window.location.href = 'success.html'
                        } else if (result === 310) {
                            try {
                                ecej.login();
                            } catch (er) {
                                this.popupShow = true
                            }
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
                //this.qtext = this.qtext.substr(0, 300);
                this.cont = this.qtext.length
            },
            closeDaren(){
                this.darenshow = false;
            },
            choosemaster(){
                if (this.type) {
                    this.darenshow = true;
                }
            },
            getmaster(info){
                this.talentId = info.talentId;
                this.chooseM = info.talentName;
            }
        },
        watch: {
            showImgs(val, oldval){
                let l = val.length;
                if (l === 0) {
                    this.showImgs.push('')
                } else {
                    if (val[l - 1] && l <= 2) {
                        this.showImgs.push('')
                    }
                }
            },
            type(val, oldval){
                this.talentId = null;
                this.chooseM = '选择达人';
            }
        },
        mounted(){
            this.appKey = this.$cookie().appKey;
            this.token = this.$cookie().appToken;

            this.$http.get(this.$api.index.questionLabel).then(res => {
                let data = res.data.data;
                let result = res.data.resultCode;
                if (result === 200) {
                    let list = data.filter(function (item) {
                        return item.value !== 1;
                    });
                    this.$set(this.$data, 'questionLabel', list)
                } else {
                    this.showBubble('获取失败')
                }
            })
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
        flex: 1;
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

    .invite {
        height: 45px;
        line-height: 45px;
        background: #fff;
    }

    .invite_tit {
        float: left;
        font-size: 15px;
        color: #222;
    }

    .invite_name {
        float: right;
        padding-right: 14px;
        font-size: 15px;
        color: #222;
        background: url("./img/arrow.png") no-repeat right center;
        background-size: 10px;
    }

    .disable, .disable .invite_name, .disable .invite_tit {
        color: #acacac;
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

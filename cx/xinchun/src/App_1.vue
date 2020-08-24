<template>
    <div id="app">
        <div class="content">
            <div class="top"><img src="./assets/top_bg.png" alt=""/></div>
            <a href="javascript:;" class="rule_btn" @click="showRule"><img src="./assets/rule.png" alt=""/></a>
            <a href="javascript:;" class="my_prize" @click="myPrize"><img src="./assets/myPrize.png" alt=""/></a>
            <main-sel :active.sync="go"></main-sel>
            <div class="sel_2">
                <p>
                    还剩余
                    <span>{{ totalTimes }}</span>
                    次摇一摇机会
                </p>
                <button class="go" @click="active">参与摇奖</button>
                <div class="nickname" v-if="nickname">当前登录：{{nickname}}<a href="javascript:;" @click="switchUser">切换账号</a></div>
                <div class="list">
                    <div class="box">
                        <ul>
                            <li v-for="item in prizeList">{{'恭喜'+item.userId+'****  获得'+item.optionName}}</li>
                            <li v-for="item in prizeList">{{'恭喜'+item.userId+'****  获得'+item.optionName}}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="sel_3">
                <p class="tip">成为财新订户，可解锁更多摇奖机会！</p>
                <a class="link" href="javascript:;"
                   @click="buyLink(304,'http://mall.caixin.com/mall/web/product/product.html?id=733&channel=1022&channelSource=xinchun')">成为财新通订户</a>
                <a class="link" href="javascript:;"
                   @click="buyLink(305,'http://mall.caixin.com/mall/web/product/product.html?id=816&channel=1022&channelSource=xinchun')">成为财新数据通Lite订户</a>
                <a class="link" href="javascript:;"
                   @click="buyLink(306,'http://mall.caixin.com/mall/web/product/product.html?id=615&channel=1022&channelSource=xinchun')">成为财新数据通Pro订户</a>
            </div>
            <div class="set_4">
                <img src="./assets/img/img_01.jpg" alt=""/>
                <img src="./assets/img/img_02.jpg" alt=""/>
                <img src="./assets/img/img_03.jpg" alt=""/>
                <img src="./assets/img/img_04.jpg" alt=""/>
                <img src="./assets/img/img_05.jpg" alt=""/>
            </div>
        </div>

        <div class="pops">
            <pop ref="rulePop" class="rulePop" :visible="layerIndex">
                <div class="rule_con">
                    <p class="tit">活动说明</p>
                    <ul class="rule_list">
                        <li>本活动仅限财新注册用户参与，活动期间，用户每天可获得1次摇一摇机会；</li>
                        <li>活动期间，购买财新通连续包年/财新数据通Lite连续包年/财新数据通Pro连续包年产品，可额外获得3次摇一摇机会；</li>
                        <li>优惠券可在「我的账户」/「购买选项」—「我的优惠券」中查看；</li>
                        <li>实物礼品会在活动结束后10个工作日内寄出，春节期间快递可能出现延迟，请您耐心等待；</li>
                        <li>出现恶意行为，财新传媒有权取消其资格；</li>
                        <li>本活动解释权归财新传媒所有。</li>
                    </ul>
                    <div class="contact">
                        客服热线：400-696-0110；
                        <br/>
                        客服微信：caixinkefu001。
                    </div>
                </div>
            </pop>
            <pop ref="myPrizePop" :visible="layerIndex">
                <div class="my_prize_con">
                    <p class="tit">我的奖品</p>
                    <ul v-if="MyPrizeList.length">
                        <li v-for="item in MyPrizeList">{{item.optionName}}</li>
                    </ul>
                    <p v-if="MyPrizeList.length == 0" class="tit" style="margin-top: 2rem;">抱歉，您还未获得奖品。</p>
                </div>
            </pop>

            <pop ref="winPop" :visible="layerIndex">
                <win :type="prizeType" :prizeName="prizeName" :id="prizeId" @success="closeWin"></win>
            </pop>
        </div>


        <div class="share" v-show="sharePop"><img src="./assets/share.png" alt=""></div>
    </div>
</template>

<script>
    import mainSel from './components/main';
    import pop from './components/pop';
    import win from './components/win';

    export default {
        name: 'app',
        components: {
            mainSel,
            pop,
            win
        },
        data() {
            return {
                rulePop: false,
                myPrizePop: false,
                winPop: false,
                sharePop: false,
                go: false,
                uid: '',
                activitesId: '26',
                totalTimes: 0,
                prizeType: '',
                prizeName: '',
                prizeId: '',
                MyPrizeList: [],
                mode: 'web',
                prizeList:[],
                nickname:'',
                layerIndex:''
            };
        },
        methods: {
            openLayer(model, close) {
                let _this = this;
                const index = layer.open({
                    type: 1,
                    title: false,
                    closeBtn: 0,
                    // area: '9.04rem',
                    shadeClose: true,
                    scrollbar:false,
                    skin: 'layui-layer-nobg no-hide',
                    content: model,
                    cancel() {
                        _this.layerIndex = '';
                        close && close();
                    }
                });

                this.layerIndex = index;
            },
            closeWin(){
                layer.closeAll()
            },
            showRule(){
                this.openLayer($(this.$refs.rulePop.$el))
            },
            switchUser(){
                this.$api.logout().finally(()=>{
                    this.$clearCookie();
                    window.location.href='http://u.caixin.com/user/login.html?url=' + encodeURIComponent(window.location.href);
                })
            },
            myPrize() {
                if (!this.uid) {
                    window.location.href = 'http://u.caixin.com/user/login.html?url=' + encodeURIComponent(window.location.href);
                } else {
                    this.$api.getPrizeList({
                        activitesId: this.activitesId,
                        userId:this.uid
                    }).then(res => {
                        const data = res.data.data;
                        if (data) {
                            this.MyPrizeList = data
                            this.openLayer($(this.$refs.myPrizePop.$el))
                        } else {
                            this.$msg('获取中奖列表失败')
                        }
                    })
                }
            },
            active() {
                this.go = true;
                setTimeout(() => {
                    this.go = false;
                    this.openLayer($(this.$refs.winPop.$el))
                }, 5000)
                if (this.go) return;
                if (!this.uid) {
                    window.location.href = 'http://u.caixin.com/user/login.html?url=' + encodeURIComponent(window.location.href);
                    return;
                }
                if (this.totalTimes) {
                    this.$msg('晃动手机，大奖正在开启');
                    this.$api.lottery({
                        activitesId: this.activitesId,
                        userId: this.uid,
                        code:this.$getCookie('USER_LOGIN_CODE'),
                        unit:this.$getCookie('SA_USER_UNIT'),
                        deviceType:this.$getCookie('SA_USER_DEVICE_TYPE')
                    }).then(res => {
                        /**
                         * res.data.data.type
                         * 1 财新网权限 2财新网优惠券。3 第三方券码。 4实物。5 其他
                         * **/
                        const data = res.data.data
                        if (res.data.code === 0) {
                            this.go = true;
                            this.prizeType = data.type;
                            this.prizeName = data.optionName;
                            this.prizeId = data.id;
                            if(data.type == 1 || data.type == 2){
                                this.$api.use({
                                    id:data.id,
                                    userId: this.uid
                                }).then(res=>{
                                    console.log(res.data)
                                }).catch(err=>{
                                    console.log(err)
                                })
                            }
                            setTimeout(() => {
                                this.go = false;
                                this.openLayer($(this.$refs.winPop.$el))
                            }, 5000)
                        } else {
                            this.$msg(res.data.msg)
                        }
                        this.getTimes();
                    });
                }
            },
            getTimes() {
                this.$api.getRewardTimes({
                    activitesId: this.activitesId,
                    userId: this.uid
                }).then(res => {
                    const data = res.data[0];
                    if (res.data.length) {
                        this.totalTimes = data.limitTimes + data.rewardTimes - data.times;
                    } else {
                        this.$msg('获取次数失败');
                    }
                });
            },
            buyLink(paySourceId, link) {
                if (this.mode === 'android') {
                    try {
                        caixin.buyWithProductInfo({
                            "paySourceId": paySourceId,
                            "channelSource": 'xinchun',
                            "uid": this.uid,
                            "channel": 1022
                        })
                    } catch (e) {

                    }

                } else if (this.mode === 'iosApp') {
                    this.sharePop = true;
                } else {
                    window.location.href = link
                }
            },
            checkLogin(){
                return this.$api.checkLogin().then(res=>{
                    if(res.code==0){
                        this.uid = res.data.uid;
                        this.nickname = res.data.nickname;
                    }else{
                        this.uid = '';
                    }
                }).catch(res=>{
                    this.uid = '';
                });
            }
        },
        async mounted() {
            const ua = navigator.userAgent;
            const IosReg = /iphone|ios|ipad/i;
            const AndroidReg = /android/i;
            if (this.$getCookie('appType')) {
                if (IosReg.test(ua)) {
                    this.mode = 'iosApp';
                } else if (AndroidReg.test(ua)) {
                    this.mode = 'android';
                }
            } else {
                this.mode = 'web';
            }

            await this.checkLogin();

            if (this.uid) {
                this.$api.loginRewardUpdate({
                    userId: this.uid,
                    activitesId: this.activitesId,
                    rewardType: 1
                }).then(res => {
                    console.log(res.data);
                }).finally(res => {
                    this.getTimes();
                });
            }

            this.$api.getPrizeList({
                activitesId: this.activitesId,
                page: 1,
                rows: 10,
                sortby:'id',
                order:'desc'
            }).then(res=>{
                const data = res.data.data;
                if (data) {
                    this.prizeList = data
                    this.$nextTick(()=>{
                        let ul=document.querySelector('.box ul');
                        ul.style.width=ul.scrollWidth+'px';
                        ul.className='roll'
                    })
                } else {
                    this.$msg('获取中奖列表失败')
                }
            })
        }
    };
</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    a {
        text-decoration: none;
    }

    button {
        background: none;
        border: none;
    }

    a,
    button {
        outline: none;
        -webkit-tap-highlight-color: transparent;
    }

    img {
        vertical-align: text-top;
    }

    #app {
        max-width: 10rem;
        margin: 0 auto;
    }

    ul {
        list-style: none;
    }


    input {
        -webkit-appearance: none;
        -webkit-tap-highlight-color: transparent;
    }

    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    input::-webkit-outer-spin-button {
        -webkit-appearance: none;
    }

    .content {
        position: relative;
        top: 0;
        left: 0;
        background: url(./assets/page_bg.jpg) no-repeat;
        background-size: 100% 100%;
        overflow: hidden;
    }

    .top img {
        width: 100%;
        display: block;
    }

    .sel_2 {
        margin-top: 0.4533rem;
    }

    .sel_2 p {
        line-height: 1;
        font-size: 0.4533rem;
        color: #f7dfaf;
        text-align: center;
        font-weight: 300;
    }

    .sel_2 p span {
        display: inline-block;
        min-width: 2em;
        border-bottom: 2px solid #f7dfaf;
    }

    .go {
        display: block;
        width: 6.6666rem;
        height: 1.1466rem;
        border-radius: 0.5733rem;
        text-align: center;
        margin: 0.2666rem auto 0;
        background: url(./assets/btn_bg.png) no-repeat;
        background-size: 100% 100%;
        font-size: 0.4266rem;
        font-weight: bold;
        color: #000;
    }

    .list {
        width: 9.3066rem;
        height: 1.5066rem;
        margin: 0.2666rem auto 0;
        background: url(./assets/list.png) no-repeat;
        background-size: 100% 100%;
        padding: 0 0.32rem;
        box-sizing: border-box;
        font-size: 0.32rem;
        line-height: 1.5066rem;
        overflow: hidden;
    }


    .sel_3 {
        margin-top: 0.32rem;
    }

    .sel_3 .tip {
        text-align: center;
        line-height: 1;
        font-size: 0.5066rem;
        color: #f7dfaf;
        margin-bottom: 1.0133rem;
        font-weight: 800;
    }

    .link {
        display: block;
        width: 6.0266rem;
        height: 1.4266rem;
        margin: 0.5333rem auto 0;
        line-height: 1.4266rem;
        background: url(./assets/link_bg.png) no-repeat;
        background-size: 100%;
        font-size: 0.4533rem;
        text-align: center;
        color: #ffeb3b;
        font-weight: bold;
    }

    .set_4 {
        font-size: 0;
        margin-top: 0.2666rem;
    }

    .set_4 img {
        display: block;
        width: 100%;
    }

    .rule_btn,
    .my_prize {
        position: absolute;
        top: 1.2rem;
        z-index: 30;
        width: 0.8133rem;
        height: 2.16rem;
    }

    .rule_btn img,
    .my_prize img {
        width: 100%;
    }

    .my_prize {
        right: 0.32rem;
    }

    .rule_btn {
        right: 1.28rem;
    }

    .rule_con {
        padding: 2.5066rem 0.7466rem 0 1.12rem;
        color: #fff;
    }

    .rule_con .tit {
        text-align: right;
        font-size: 0.6133rem;
        font-weight: 800;
        line-height: 1;
    }

    body {
        counter-reset: li;
    }

    .rule_list li {
        position: relative;
        top: 0;
        left: 0;
        margin-top: 0.2666rem;
        font-size: 0.32rem;
        font-weight: 200;
    }

    .rule_list li:before {
        counter-increment: li;
        content: counter(li) '、';
        position: absolute;
        left: -0.4533rem;
        top: 0;
    }

    .contact {
        font-size: 0.32rem;
        font-weight: 200;
    }

    .my_prize_con {
        padding-top: 2.9333rem;
        text-align: center;
        color: #fff;
    }

    .my_prize_con .tit {
        font-size: 0.6133rem;
        font-weight: 800;
        line-height: 1;
    }

    .my_prize_con ul {
        max-height: 6rem;
        overflow-y: auto;
        margin-top: 0.4533rem;
    }

    .my_prize_con li {
        font-size: 0.48rem;
        line-height: 2;
    }

    .share {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 900;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
    }

    .share img {
        width: 6rem;
        position: absolute;
        right: 0.453rem;
        top: 0.453rem;
    }

    .v_msg {
        position: fixed;
        /* bottom: 25%; */
        bottom: -10%;
        left: 50%;
        z-index: 1000;
        transform: translateX(-50%);
        color: #ccc;
        margin: 0 auto;
        max-width: 40%;
        padding: 10px;
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.8);
    }

    .v_msg_show {
        animation: msgShow 0.1s ease-in forwards;
    }

    .v_msg_hide {
        animation: msgHide 0.1s ease-in forwards;
    }

    @keyframes msgShow {
        from {
            bottom: -10%;
        }
        to {
            bottom: 25%;
        }
    }

    @keyframes msgHide {
        from {
            bottom: 25%;
        }
        to {
            bottom: -10%;
        }
    }

    .loding {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 400;
        width: 100%;
        height: 100%;
        display: none;
    }

    .loding img {
        width: 1.5rem;
        height: 1.5rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -0.75rem;
        margin-top: -0.75rem;
        animation: load 1.3s ease infinite;
    }

    @keyframes load {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .list ul{
        display: flex;
        flex-wrap: nowrap;
    }
    .list li{
        font-weight: 800;
        flex-shrink: 0;
        padding-right: 0.267rem;
    }
    .list .box{
        height: 100%;
        overflow: hidden;
    }
    .roll{
        animation: rollList 30s linear infinite;
    }

    .sel_2 .nickname{
        line-height: 1;
        font-size: 0.373rem;
        margin-top: 0.267rem;
        text-align: center;
        color: #f7dfaf;
    }
    .nickname a{
        display: inline-block;
        margin-left: 0.133rem;
        font-size: 0.373rem;
        color: #f7dfaf;
        text-decoration: underline;
    }
    @keyframes rollList {
        0%{
            transform: translateX(0);
        }
        100%{
            transform: translateX(-50%);
        }
    }


    .no-hide .layui-layer-content {
        overflow: inherit !important;
    }
</style>

<template>
    <div id="app" ref="wrapper">
        <div class="scrollbox">
            <header>
                <a href="javascript:;" @click="goApp" class="back"></a>
                <a href="JavaScript:;" class="searchlink" @click="goSearch">搜索您感兴趣的内容</a>
                <a href="javascript:;" class="account" @click="account"></a>
            </header>
            <div class="menu" ref="menu">
                <div ref="menuc">
                    <div ref="menuitem" class="menu_item" :class="{'on':$index===activePage}" v-for="(item,$index) in cp" @click="menuhandler(item,$index)">{{item.name}}</div>
                </div>
            </div>
            <div class="pages">
                <div v-for="(page,$index) in cp" v-show="$index===activePage">
                    <!--banner-->
                    <section class="banner" v-if="page.value===1&&banner.length>0">
                        <div class="swiper-container" style="width: 100%;">
                            <div class="swiper-wrapper" style="width: 100%;">
                                <div class="swiper-slide" style="width: 100%;" v-for="b in banner" @click="indexDetail(b.questionId)">
                                    <img :src="b.bannerImg" alt=""/>
                                    <div class="banner_title">{{b.bannerTitle}}</div>
                                </div>
                            </div>
                            <div class="pagination"></div>
                        </div>
                    </section>

                    <template v-if="cpData[$index].pageData" v-for="(item,$pindex) in cpData[$index].pageData">
                        <!--三图-->
                        <div class="hot_content" v-if="item.illustrationImages&&(item.illustrationImages.length>=3||page.value!==1)" @click="linkTo(item)">
                            <div class="hot_content_title">{{item.questionTitle}}</div>
                            <div class="hot_content_asker clearfix">
                                <div class="asker_headimg">
                                    <img :src="item.talentAvatar" alt="">
                                </div>
                                <span class="asker_name">{{item.talentName}}</span>
                                <span>回答了问题</span>
                            </div>
                            <div class="hot_content_img">
                                <div v-for="(img,$index1) in item.illustrationImages">
                                    <img class="place" src="./img/place.png" alt="">
                                    <img class="cimg" :src="img" alt="">
                                </div>

                                <!--占位-->
                                <template v-if="item.illustrationImages&&item.illustrationImages.length>0">
                                    <div v-show="item.illustrationImages.length<2">
                                        <img class="place" src="./img/place.png" alt="">
                                    </div>
                                    <div v-show="item.illustrationImages.length<3">
                                        <img class="place" src="./img/place.png" alt="">
                                    </div>
                                </template>

                            </div>
                            <div class="hot_content_desc">{{item.answerContent}}</div>
                        </div>

                        <!--一图-->
                        <div class="hot_content_ogg" v-if="item.illustrationImages&&item.illustrationImages.length<3&&page.value===1" @click="linkTo(item)">
                            <div class="ogg_l">
                                <div class="hot_content_title">{{item.questionTitle}}</div>
                                <div class="hot_content_asker clearfix">
                                    <div class="asker_headimg">
                                        <img :src="item.talentAvatar" alt="">
                                    </div>
                                    <span class="asker_name">{{item.talentName}}</span>
                                    <span>回答了问题</span>
                                </div>
                            </div>
                            <div class="ogg_r">
                                <img class="place" src="./img/place.png" alt="">
                                <img class="cimg" :src="item.illustrationImages[0]" alt="">
                            </div>
                        </div>

                        <!--达人榜-->
                        <section class="master_top" v-if="item.talents">
                            <div class="hot_title">
                                <span>达人榜</span>
                                <a href="javascript:;" @click="goMasterList">更多</a>
                            </div>
                            <div class="master_list">
                                <div class="master_item" v-for="(talent,$index2) in item.talents" @click="goMaster(talent)"
                                     :style="{'marginRight':($index2===(item.talents.length-1)?(5-$index2-1)*15:15) +'px'}">
                                    <div class="m_place">
                                        <img :src="talent.talentAvatar" alt="">
                                    </div>
                                    <div class="master_name">{{talent.talentName}}</div>
                                    <div class="master_class">{{talent.labelTypeStr}}</div>
                                </div>
                            </div>
                        </section>
                    </template>
                </div>
                <div v-show="scroll&&isscroll">
                    <p class="up_tips" v-show="!pulluping">{{pullupText}}</p>
                    <div class="loading" v-show="pulluping">
                        <img src="../components/img/loading.gif">
                    </div>
                </div>
            </div>


        </div>
        <div class="question">
            <a href="javascript:;" @click="ask">
                <img src="./img/question.png" alt="">
                <span>提问</span>
            </a>
        </div>

        <bubble :moudel="bubbleM" :msg="bubbleText"></bubble>
    </div>
</template>

<script>
    import Swiper from '../assets/swiper';
    import BScroll from 'better-scroll';
    import bubble from '../components/bubble';
    export default {
        name: 'app',
        components: {
            bubble
        },
        data(){
            return {
                //activePage从0开始,不是那个value
                activePage: 0,
                cp: [],
                cpData: [],
                banner: [],
                scroll: null,
                isscroll: false,
                pulluping: false,
                pullupText: '加载更多',
                slide: null,
                currentPageIndex: 0,
                timer: null,
                bannerIndex: 0,
                children: [],
                dots: [],
                myswiper: null,
                //b6757c6d7f854d12adace98e52019951
                token: '',
                appKey: null,
                bubbleM: {
                    show: false
                },
                bubbleText: '',
                dbtimer: null
            }
        },
        methods: {
            startDebug(){
                this.dbtimer = setTimeout(() => {
                    window.location.href = 'http://10.4.81.120:8020/testother/1.html'
                }, 5000)
            },
            endDebug(){
                clearTimeout(this.dbtimer)
            },
            ask(){
                if (!this.$cookie().appToken) {
                    try {
                        ecej.login();
                    } catch (er) {
                        this.showBubble('登录失败');
                    }
                } else {
                    window.location.href = 'ask.html'
                }
            },
            goMaster(talent){
                if (this.$cookie().appToken) {
                    let params = {
                        token: this.$cookie().appToken,
                        talentId: talent.talentId,
                        appKey: this.appKey
                    };
                    this.$http.get(this.$api.isMe, {params}).then(res => {
                        let result = res.data.resultCode;
                        let data = res.data.data;
                        if (result === 200) {
                            if (data) {
                                window.location.href = 'masterMyAsk.html?talentId=' + talent.talentId
                            } else {
                                window.location.href = 'masterIndex.html?talentId=' + talent.talentId
                            }
                        } else {
                            window.location.href = 'masterIndex.html?talentId=' + talent.talentId
                        }
                    }, res => {
                        window.location.href = 'masterIndex.html?talentId=' + talent.talentId
                    })
                } else {
                    window.location.href = 'masterIndex.html?talentId=' + talent.talentId
                }
            },
            showBubble(t){
                this.bubbleText = t;
                this.bubbleM.show = true;
            },
            goApp(){
                try {
                    ecej.finishPage()
                } catch (er) {
                    this.showBubble('返回APP首页失败')
                }
            },
            goSearch(){
                window.location.href = 'search.html'
            },
            goMasterList(){
                window.location.href = 'masterList.html'
            },
            account(){
                if (this.$cookie().appToken) {
                    let params = {
                        appKey: this.appKey,
                        token: this.$cookie().appToken
                    }

                    this.$http.get(this.$api.IDType, {params}).then(res => {
                        let result = res.data.resultCode;
                        let data = res.data.data;
                        if (result === 200) {
                            if (data.identityType === 0) {
                                window.location.href = `userMyAsk.html`
                            } else if (data.identityType === 1) {
                                window.location.href = `masterMyAsk.html`
                            }
                        } else if (result === 310) {
                            try {
                                ecej.login();
                            } catch (er) {
                                this.showBubble('登录失败')
                            }
                        } else {
                            this.showBubble(res.data.message)
                        }
                    })
                } else {
                    try {
                        ecej.login();
                    } catch (er) {
                        this.showBubble('登录失败')
                    }
                }
            },
            indexDetail(id){
                window.location.href = `indexDetail.html?questionId=${id}`
            },
            linkTo(item){
                //添加一个标签标记
//                if (window.location.search) {
//                    if(this.$urlData.tag){
//                        history.replaceState(null, '', location.href.replace(/(&|\?)tag=\d+/g,`$1tag=${this.activePage}`));
//                    }else{
//                        history.replaceState(null, '', location.href.replace(location.search, location.search + '&tag=' + this.activePage));
//                    }
//                } else {
//                    history.replaceState(null, '', location.href + '?tag=' + this.activePage);
//                }

                sessionStorage.setItem('IndexTag', this.activePage)
                if (item.questionType === 1) {
                    //window.location.href=`indexDetail.html?answerId=${item.questionId}`
                    window.location.href = `questionsDetail.html?questionId=${item.questionId}`
                } else {
                    window.location.href = `questionsDetail.html?questionId=${item.questionId}`
                }
            },
            //切换标签
            menuhandler(item, index){
                if (this.pulluping) {
                    return;
                }

                this.activePage = index;
                //看标签下是否已经有内容
                let ADL = Object.keys(this.cpData[index]).length;

                if (ADL === 0) {

                    //判断是否是第一页
                    if (index === 0) {
                        let params = {
                            appKey: this.appKey,
                            curPage: this.cp[index].curPage,
                            pageSize: this.cp[index].pageSize
                        }
                        this.$http.get(this.$api.index.recommend, {params}).then(res => {
                            let data = res.data.data;
                            let result = res.data.resultCode;
                            if (result === 200) {
                                if (data.questions.length >= 3) {
                                    data.questions.splice(3, 0, {talents: data.talents})
                                } else {
                                    data.questions.push({talents: data.talents})
                                }
                                this.$set(this.cpData, 0, {'pageData': data.questions});
                                this.$set(this.$data, 'banner', data.banners);

                                this.$nextTick(() => {
                                    this.myswiper = new Swiper('.swiper-container', {
                                        autoplay: 4000,
                                        loop: false,
                                        pagination: '.pagination',
                                        paginationClickable: true,
                                        autoplayDisableOnInteraction: false
                                    });
                                })

                            }
                        })
                    } else {
                        let params = {
                            appKey: this.appKey,
                            labelType: this.cp[index].value,
                            curPage: 1,
                            pageSize: this.cp[index].pageSize
                        }
                        this.$http.get(this.$api.index.getQuestList, {params}).then(res => {
                            let data = res.data.data;
                            let result = res.data.resultCode;
                            if (result === 200) {
                                this.$set(this.cpData, index, {pageData: data.list})
                            }
                        })
                    }

                }
                this.pullupText = item.pullupText;
                this.refreshScroll();
                _hmt.push(['_trackEvent', '首页', '频道名称', item.name]);

            },
            refreshScroll(){
                if (!this.scroll) return;
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
                        let active = this.cp[this.activePage];

                        this.pulluping = true;

                        active.curPage += 1;

                        if (active.value === 1) {
                            let params = {
                                appKey: this.appKey,
                                curPage: active.curPage,
                                pageSize: active.pageSize
                            };
                            this.$http.get(this.$api.index.recommend, {params}).then(res => {
                                let data = res.data.data.questions;
                                let result = res.data.resultCode;
                                if (result === 200) {
                                    if (data.length === 0) {
                                        active.curPage -= 1;
                                        active.pullupText = '没有更多了';
                                        this.pullupText = '没有更多了';
                                        this.scroll.finishPullUp();
                                        this.pulluping = false;
                                        active.isnone = true;
                                    } else {
                                        let arr = this.cpData[this.activePage].pageData.concat(data);
                                        this.$set(this.cpData[this.activePage], 'pageData', arr);
                                        this.scroll.finishPullUp();
                                        this.pulluping = false;
                                        this.refreshScroll();
                                    }
                                }
                            })
                        } else {
                            let params = {
                                appKey: this.appKey,
                                labelType: active.value,
                                curPage: active.curPage,
                                pageSize: active.pageSize
                            };

                            this.$http.get(this.$api.index.getQuestList, {params}).then(res => {
                                let data = res.data.data;
                                let result = res.data.resultCode;
                                if (result === 200) {
                                    if (data.list.length === 0) {
                                        active.curPage -= 1;
                                        active.pullupText = '没有更多了';
                                        this.pullupText = '没有更多了';
                                        this.scroll.finishPullUp();
                                        this.pulluping = false;
                                        active.isnone = true;
                                    } else {
                                        this.$set(this.cpData[this.activePage], 'pageData', this.cpData[this.activePage].pageData.concat(data.list));
                                        this.scroll.finishPullUp();
                                        this.pulluping = false;
                                        this.refreshScroll();
                                    }
                                }
                            })
                        }

                    })
                }
            },
            setSlideWidth(isResize) {
                let children = this.$refs.slideWrapper[0].children;
                this.children = children;
                let width = 0;
                let slideWidth = this.$refs.slide[0].clientWidth;


                for (let i = 0; i < children.length; i++) {
                    let child = children[i];
                    child.className += ' slide-item';
                    child.style.width = slideWidth + 'px';
                    width += slideWidth
                }
                if (this.loop && !isResize) {
                    width += 2 * slideWidth
                }
                this.$refs.slideWrapper[0].style.width = width + 'px';
            }
        },
        mounted(){
            this.appKey = this.$urlData.appKey;
            document.cookie = 'appKey=' + this.$urlData.appKey;
            this.token = this.$cookie().appToken;


            this.$http.get(this.$api.index.questionLabel).then(res => {
                let result = res.data.resultCode;
                let data = res.data.data;
                if (result === 200) {
                    let cp = [];
                    let cpData = [];
                    for (let i in data) {
                        let json = {
                            value: data[i].value,
                            name: data[i].name,
                            curPage: 1,
                            pageSize: 10,
                            isnone: false,
                            pullupText: '加载更多'
                        }
                        cp.push(json);
                        cpData.push({})
                    }

                    this.$set(this.$data, 'cp', cp);
                    this.cpData = cpData;

                    //单独处理标签栏
                    this.$nextTick(() => {
                        let menus = this.$refs.menuitem;
                        let width = 0;
                        if (menus) {
                            for (let i in menus) {
                                width += menus[i].offsetWidth
                            }
                        }
                        this.$refs.menuc.style.width = width + 'px';
                        new BScroll(this.$refs.menu, {
                            probeType: 1,
                            scrollX: true,
                            scrollY: false
                        });
                    });

                    //判断是否带有目标标签
                    //如果有渲染目标标签，如果没有，渲染第一屏
                    //this.$urlData.tag
                    if (sessionStorage.IndexTag&&sessionStorage.IndexTag!=0) {
                        let IndexTag=sessionStorage.IndexTag;
                        this.menuhandler(this.cp[IndexTag], parseInt(IndexTag));

                        //需要时打开
                        //sessionStorage.removeItem('IndexTag');
                        this.$nextTick(() => {
                            this.initScroll();
                        })

                    } else {
                        let params = {
                            appKey: this.appKey,
                            curPage: this.cp[0].curPage,
                            pageSize: this.cp[0].pageSize
                        }
                        this.$http.get(this.$api.index.recommend, {params}).then(res => {
                            let data = res.data.data;
                            let result = res.data.resultCode;
                            if (result === 200) {
                                if (data.questions.length >= 3) {
                                    data.questions.splice(3, 0, {talents: data.talents})
                                } else {
                                    data.questions.push({talents: data.talents})
                                }
                                this.$set(this.cpData, 0, {'pageData': data.questions});
                                this.$set(this.$data, 'banner', data.banners);

                                this.$nextTick(() => {
                                    this.myswiper = new Swiper('.swiper-container', {
                                        autoplay: 4000,
                                        loop: false,
                                        pagination: '.pagination',
                                        paginationClickable: true,
                                        autoplayDisableOnInteraction: false
                                        //其他设置
                                    });

                                    this.initScroll();
                                })

                            }else{
                                alert(res.data.message)
                            }
                        })
                    }

                }
            })
        }
    }
</script>

<style>
    @import url("../assets/base-1.4.css");
    @import url("../assets/swiper.min.css");

    body {
        background: #f3f4f6;
    }

    body, html {
        height: 100%;
    }

    header {
        height: 44px;
        position: relative;
        top: 0;
        left: 0;
        background-color: #fff;
        overflow: hidden;
        z-index: 1000;
    }

    .back {
        position: absolute;
        top: 0;
        left: 0;
        width: 40px;
        height: 100%;
        background: url("./img/back.png") no-repeat center;
        background-size: 10px;
    }

    .searchlink {
        display: block;
        height: 30px;
        line-height: 30px;
        margin: 7px 46px 0 40px;
        padding-left: 28px;
        box-sizing: border-box;
        border-radius: 3px;
        background: #f3f3f3 url("./img/search.png") no-repeat 10px center;
        background-size: 13px;
        font-size: 13px;
        font-weight: 300;
        color: #acacac;
    }

    .account {
        width: 16px;
        height: 19px;
        position: absolute;
        top: 13px;
        right: 15px;
        background: url("./img/account.png") no-repeat center;
        background-size: 100%;
    }

    #app {
        height: 100%;
        overflow: hidden;
    }

    /*轮播*/
    .swiper-slide {
        position: relative;
        top: 0;
        left: 0;
        overflow: hidden
    }

    .banner {
        height: 150px;
        margin-bottom: 10px;
    }

    .swiper-container, .swiper-wrapper, .swiper-slide {
        height: 100%;
    }

    .swiper-slide img {
        width: 100%;
        height: 100%;
    }

    .pagination {
        position: absolute;
        z-index: 20;
        bottom: 1px !important;
        width: 100%;
        text-align: center;
    }

    .swiper-pagination-bullet {
        display: inline-block;
        width: 7px;
        height: 7px;
        margin-right: 15px;
        border-radius: 50%;
        background-color: #fff;
        opacity: 0.8;
        box-shadow: 0px 1px 2px 0 rgba(0, 0, 0, 0.3);
    }

    .pagination .swiper-pagination-bullet:last-child {
        margin-right: 0;
    }

    .swiper-pagination-bullet-active {
        background-color: #666;
    }

    .banner_title {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 44px;
        padding-left: 15px;
        box-sizing: border-box;
        line-height: 44px;
        background: rgba(34, 34, 34, 0.7);
        font-size: 15px;
        color: #fff;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: left;
    }

    .menu {
        height: 44px;
        padding: 0 4px;
        white-space: nowrap;
        /*overflow-x: auto;*/
        overflow: hidden;
        background: #fff;
        border-bottom: 1px solid #f3f3f3;
        position: relative;
        top: 0;
        left: 0;
        z-index: 1000;
    }

    .menu_item {
        display: inline-block;
        padding: 15px 8px 13px;
        line-height: 1;
        box-sizing: border-box;
        font-size: 14px;
        color: #666;
    }

    .on {
        font-weight: bold;
        color: #d81300;
        border-bottom: 2px solid #d81300;
    }

    /*热点问题*/
    .hot_title {
        height: 40px;
        background: #fff;
        border-bottom: 1px solid #f3f3f3;
    }

    .hot_title span {
        float: left;
        line-height: 1;
        margin-left: 15px;
        margin-top: 15px;
        font-size: 15px;
        color: #222;
    }

    .hot_title a {
        float: right;
        line-height: 1;
        margin-right: 15px;
        margin-top: 16px;
        padding-right: 9px;
        font-size: 13px;
        color: #acacac;
        background: url("./img/more.png") no-repeat right center;
        background-size: 4px;
    }

    .hot_content {
        margin-bottom: 10px;
        padding: 0 15px 13px;
        border-bottom: 1px solid #f3f3f3;
        overflow: hidden;
        background: #fff;
    }

    .hot_content:last-child {
        border: none;
    }

    .hot_content_title {
        margin-top: 15px;
        font-size: 16px;
        font-weight: bold;
        color: #222222;
        line-height: 20px;

    }

    .hot_content_asker {
        margin-top: 13px;
    }

    .asker_headimg {
        float: left;
        width: 25px;
        height: 25px;
        border-radius: 3px;
        overflow: hidden;
    }

    .asker_headimg img {
        width: 100%;
        height: 100%;
    }

    .hot_content_asker span {
        margin-left: 5px;
        margin-top: 6px;
        float: left;
        font-size: 13px;
        line-height: 1;
        color: #acacac;
    }

    .asker_name {
        margin-left: 5px;
        color: #666666;
    }

    .hot_content_img {
        margin-top: 10px;
        display: flex;
        /*justify-content: space-between;*/
    }

    .hot_content_img div {
        display: block;
        flex: 1;
        margin-right: 5px;
        position: relative;
        top: 0;
        left: 0;
    }

    .hot_content_img div:last-child {
        margin-right: 0;
    }

    .hot_content_img div .cimg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .hot_content_img div .place {
        width: 100%;
        position: relative;
        top: 0;
        left: 0;
    }

    .hot_content_desc {
        margin-top: 7px;
        /*padding-bottom: 13px;*/
        font-size: 14px;
        line-height: 1.32;
        color: #666666;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    /*达人榜*/
    .master_top {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .master_list {
        display: flex;
        /*justify-content: space-between;*/
        padding: 15px 15px 20px;
        background: #fff;
    }

    .master_item {
        display: block;
        width: 1px;
        flex: 0.2;
        margin-right: 15px;
        text-align: center;
    }

    .master_item:last-child {
        margin-right: 0;
    }

    .master_item img {
        border-radius: 10px;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }

    .master_name {
        margin-top: 4px;
        line-height: 1.3;
        font-size: 13px;
        text-align: center;
        color: #666666;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .master_class {
        font-size: 10px;
        color: #666;
        margin-top: 3px;
        text-align: center;
    }

    .question {
        position: fixed;
        bottom: 25px;
        right: 15px;
        width: 45px;
        height: 45px;
        border-radius: 10px;
        background-color: #ff5a00;
        text-align: center;
    }

    .question a {
        display: block;
        width: 100%;
    }

    .question img {
        margin-top: 7px;
        width: 16px;
        height: 16px;
    }

    .question span {
        display: block;
        line-height: 1;
        font-size: 10px;
        color: #ffffff;
        margin-top: 3px;
    }

    .hot_content_ogg {
        margin-bottom: 10px;
        display: flex;
        padding: 15px;
        background: #fff;
    }

    .hot_content_ogg .hot_content_asker {
        margin-top: 20px;
        position: absolute;
        bottom: 0;
        left: 0;
    }

    .ogg_l {
        margin-right: 10px;
        flex: 2;
        position: relative;
        top: 0;
        left: 0;
    }

    .ogg_r {
        flex: 1;
        margin-top: 0;
        width: 100%;
        position: relative;
        top: 0;
        left: 0;
    }

    .hot_content_ogg .hot_content_title {
        margin-top: 0;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;

    }

    .ogg_r .place {
        width: 100%;
    }

    .hot_content_ogg .cimg {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
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

    .m_place {
        width: 100%;
        position: relative;
        top: 0;
        left: 0;
        overflow: hidden;
    }

    .m_place:after {
        content: "";
        display: block;
        width: 100%;
        padding-top: 100%;
    }
</style>

<template>
    <div id="app">
    	<div>
    		<header>
	        	<a href="javascript:window.history.go(-1);" class="back"></a>
	            <div class="text">
	                <input type="search" @keypress="keyCodeSearch" autofocus v-model="content">
	                <a href="javascript:;" class="clear" @click="clearContent" v-show="clearBol"></a>
	            </div>
	            <div class="cancel" @click="searchEvent">搜索</div>
	        </header>
	        <div class="seat"></div>
    	</div>
        <div class="con" ref="wrapper">
            <!--<div class="about_list" style="display: none">
                <ul>
                    <li>油烟机坏了</li>
                    <li>油烟机坏了</li>
                    <li>油烟机坏了</li>
                    <li>油烟机坏了</li>
                </ul>
            </div>-->

            <div class="result">
           		<result-item
           			v-for="(resultItem,index) in itemList"
           			:key="index"
           			:resultItem="resultItem"
           			></result-item>
           		<div v-show="scroll&&isscroll">
	                <p class="up_tips" v-show="!pulluping">{{pullupText}}</p>
	                <div class="loading" v-show="pulluping">
	                    <img src="../components/img/loading.gif">
	                </div>
	       		 </div>
            </div>

			<div class="result_null" v-show="resultBol">
                <img src="./img/null.png" alt="">
                <div>很抱歉，没有搜索到相关问题!</div>
                <a href="javascript:;" @click="ask">立即提问</a>
            </div>
        </div>
        <bubble :moudel="bubbleM" :msg="bubbleText"></bubble>
    </div>
</template>

<script>
    import resultItem from './components/result-item.vue'
    import BScroll from 'better-scroll';
    import bubble from '../components/bubble';

    export default {
        name: 'app',
        data(){
        	return{
        		token: 'b6757c6d7f854d12adace98e52019951',
                appKey: null,
                curPage: 1,
                pageSize: 10,
                scroll: null,
                isscroll: false,
                pullupText: '加载更多',
                pulluping: false,
                content:'',
                itemList:[],
                clearBol:false,
                resultBol:false,
                bubbleM: {
                    show: false
                },
                bubbleText: ''
        	}
        },
        components: {
            resultItem,
            bubble
        },
        methods:{
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
        	clearContent(){
        		this.content = ''
        	},
            showBubble(t){
                this.bubbleText = t;
                this.bubbleM.show = true;
            },
        	searchEvent(){
        		this.itemList = [];
        		this.isscroll = false;
        		this.curPage = 1;
        		this.pullupText = '加载更多';
				if(this.content){
					let params = {
                        appKey: this.appKey,
                        token: this.$cookie().appToken,
                        keyword:this.content,
                        curPage:this.curPage,
                        pageSize:this.pageSize
                   }
                    this.$http.get(this.$api.search, {params}).then(res => {
                    	if(res.data.resultCode === 200){
                    		this.itemList = res.data.data;
                    		setTimeout(() => {
                                this.initScroll();
                            }, 100)
                    		if(this.itemList.length !== 0){
                    			this.resultBol = false
                    		}else{
                    			this.resultBol = true
                    		}
                    	}else{
                    		this.itemList = []
		        			this.isscroll = false
		        			this.resultBol = false
                    		this.showBubble(res.data.message)
                    	}
                    })
                    _hmt.push(['_trackEvent', '搜索', '搜索关键词', this.content]);
				}else{
                    this.showBubble('请输入要搜索的内容')
				}
        	},
            keyCodeSearch(ev){
            	if(ev.keyCode === 13){
            		this.searchEvent()
            	}
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
                    this.scroll.scrollTo(0,0)
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
                        this.pulluping = true;
                        this.curPage++;
                        let params = {
	                        appKey: this.appKey,
	                        token: this.$cookie().appToken,
	                        keyword:this.content,
	                        curPage:this.curPage,
	                        pageSize:this.pageSize
	                   }

                        this.$http.get(this.$api.search, {params}).then(res => {
                            let data = res.data.data;
                            let result = res.data.resultCode;
                            if (result === 200) {
                                if (data.length === 0) {
                                    this.curPage -= 1;
                                    this.pullupText = '没有更多了';
                                    this.scroll.finishPullUp();
                                    this.pulluping = false;
                                } else {
                                	let arr=this.itemList.concat(data);
                                	this.$set(this.$data,'itemList',arr);
                                    this.scroll.finishPullUp();
                                    this.pulluping = false;
                                    this.refreshScroll();
                                }
                            }
                        })


                    })
                }
            }
        },
        watch:{
        	content(val,oldVal){
        		if(val){
        			this.clearBol = true
        		}else{
        			this.itemList = []
        			this.isscroll = false
        			this.clearBol = false
        			this.resultBol = false
        		}
        	}
        }
    }
</script>

<style>
    @import url("../assets/base-1.4.css");

    body {
        background: #f3f4f6;
    }

    html, body,#app{
    	width: 100%;
        height: 100%;
    }
	.con {
        height: calc(100% - 45px);
        background: #f3f4f6;
    }
    header {
        background: #fff;
        padding: 8px 15px;
        display: flex;
        border-bottom: 1px solid #f3f3f3;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 30;
        width: 100%;
    	box-sizing: border-box;
    }
    .seat{
    	width: 100%;
    	height: 45px;
    }
	.back {
	    position: absolute;
	    top: 13px;
	    left: 15px;
	    width: 10px;
        height: 18px;
        background: url("./img/back.png") no-repeat center;
        background-size: 100%;
	}
    .text {
        flex: 1;
        height: 28px;
        padding-left: 27px;
        padding-right: 27px;
        margin:0 15px 0 25px;
        background: #f3f4f6 url("./img/search.png") no-repeat 10px 7px;
        background-size: 13px;
        position: relative;
        top: 0;
        left: 0;
    }

    .text input {
        width: 100%;
        height: 18px;
        line-height: 18px;
        margin-top: 5px;
        border: none;
        background: transparent;
        font-size: 13px;
        font-weight: 300;
        color: #222;
    }
	 input[type=search]::-webkit-search-cancel-button{
	    -webkit-appearance: none;
	}
    .clear {
        position: absolute;
        top: 7px;
        right: 10px;
        width: 14px;
        height: 14px;
        background: url("./img/del.png") no-repeat center;
        background-size: 100%;
    }

    .cancel {
        text-align: center;
        font-size: 15px;
        line-height: 28px;
        color: #222;
    }

    .about_list {
        background: #fff;
        padding: 0 15px;
    }

    .about_list li {
        height: 50px;
        line-height: 50px;
        color: #666;
        border-bottom: 1px solid #f3f3f3;
    }

    .about_list li:last-child {
        border-bottom: none;
    }

    .result {
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
    .result_null {
        position: absolute;
        top: 25.3%;
        left: 0;
        width: 100%;
        text-align: center;
        font-size: 0;
    }

    .result_null img{
        width: 55px;
    }

    .result_null div{
        margin-top:15px;
        font-size: 14px;
        line-height: 1;
        color: #666666;
    }

    .result_null a{
        display: block;
        margin: 14px auto 0;
        width: 100px;
        height: 33px;
        line-height: 33px;
        border-radius: 5px;
        background-color: #f78141;
        font-size: 14px;
        text-align: center;
        color: #ffffff;
    }
</style>

<template>
    <div id="app">
        <ptop title="举报" :more="false" :go="clearLocal"></ptop>
        <div class="main">
            <div class="q-title">
                <p>{{title}}</p>
            </div>
            <div class="q_c">
                <div class="radio_group report_radio">
                    <div class='radio-check' v-for="(item,index) in typeArr" @click="getValue(item)">
                    	<label>
                    		<input type="radio" name="question_type" value="item.value"/>
                    		<i></i>{{item.name}}
                    	</label>
                    </div>
                </div>
                <div class="other_text" v-show="type==6">
                    <input type="text" placeholder="请输入举报内容" v-model.trim="reportReason">
                </div>
            </div>
        </div>
        <button class="submit" :disabled="butBol" :class="{formok:!butBol}" type="button" @click="submitMes">提交</button>
        <bubble :moudel="bubbleM" :msg="bubbleText"></bubble>
    </div>
</template>

<script type="text/ecmascript-6">
    import ptop from '../components/ptop.vue'
    import bubble from '../components/bubble'
    export default{
        data(){
            return {
            	token: '',
                appKey: null,
            	typeArr:[],
                type: '',
                title:'',
                questionId:'',
                reportReason:'',
                butBol:true,
                bubbleM:{
                    show:false
                },
                bubbleText:'',
            }
        },
        components: {
            ptop,
            bubble
        },
        methods:{
            showBubble(t){
                this.bubbleText=t;
                this.bubbleM.show=true;
            },
        	getValue(i){
        		this.type = i.value;
        		if(this.type !==''){
        			if(this.type === 6){
        				if(this.reportReason){
        					this.butBol = false
        				}else{
        					this.butBol = true
        				}
        			}else{
        				this.butBol = false
        			}
        		}else{
        			this.butBol = true
        		}
        	},
        	submitMes(){
        		if (this.questionId) {
        		    if(!this.$cookie().appToken){
                        try{
                            ecej.login();
                        }catch(er){
                            this.showBubble('调取登录失败')
                        }
                        return;
                    }

        			let params = {
	                    token: this.$cookie().appToken,
	                    appKey: this.appKey,
	                    questionId: parseInt(this.questionId),
	                    labelType:this.type,
	                    reportReason:this.reportReason||null
                	};
                	 this.$http.post(this.$api.report.add, params).then(res => {
                	 	if(res.data.resultCode === 200){
                	 		localStorage.removeItem('title');
                	 		this.showBubble('举报成功');
                            setTimeout(()=>{
//                                window.location.href=document.referrer;
                                window.history.go(-1);
                            },1000);
                	 	}else if(res.data.resultCode === 310){
                            if(!this.$cookie().appToken){
                                try{
                                    ecej.login();
                                }catch(er){
                                    this.showBubble('调取登录失败')
                                }
                            }
                	 	}else{
                            this.showBubble(res.data.message)
                        }
                	 })
               	}else{
                    this.showBubble('questionId is not defined')
               	}
        	},
        	clearLocal(){
        		localStorage.removeItem('title');
        		window.history.go(-1)
        	}
        },
        mounted(){
            this.appKey=this.$cookie().appKey;
            this.token=this.$cookie().appToken;

        	if(localStorage.getItem('title')){
        		let getTitle = localStorage.getItem('title').toString()
        		this.title =getTitle
        	}
        	this.questionId = this.$urlData.questionId
        	this.$http.get(this.$api.report.getReportLabel).then(res => {
        		if(res.data.resultCode === 200){
        			this.typeArr = res.data.data
        		}else{
                    this.showBubble(res.data.message)
        		}
            })
        },
        watch:{
        	reportReason(val,oldVal){
        		if(this.reportReason){
        			this.butBol = false
        		}else{
        			this.butBol = true
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

    .main {
        background: #fff;
        padding: 10px 10px 0;
    }

    .q-title {
        padding: 10px 12px;
        background: #f3f4f6;
    }

    .q-title p {
        font-weight: bold;
        font-size: 16px;
        color: #222;
        line-height: 1.4;
    }

    .q_c {
        padding: 0 5px;
    }

    .report_radio {
        margin-right: 0;
        margin-bottom: 0;
    }

    .report_radio > div {
        width: 50%;
        margin-bottom: 10px;
    }

    .other_text {
        height: 50px;
        padding: 0 20px;
        background: #f3f4f6;
        overflow: hidden;
    }

    .other_text input {
        display: block;
        width: 100%;
        height: 23px;
        margin-top: 14px;
        border: none;
        font-size: 13px;
        line-height: 1.77;
        background: transparent;
    }

    .other_text input::-webkit-input-placeholder{
        color: #acacac;
    }
</style>

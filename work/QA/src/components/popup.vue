<template>
    <div class="popup_box" style="display: none;" :ref="box">
        <div class="popup">
        	<transition name="fade" v-on:before-enter="beforeEnter" v-on:after-leave="afterLeave"
                        v-on:after-enter="afterEnter">
	            <div class="popup_main" v-if="popupShow">
	                <div class="popup_des">{{text}}</div>
	                <div class="popup_button">
	                    <div class="popup_cancel" v-if="type==2" @click="cancelFn">{{cancelText}}</div>
	                    <div class="popup_pay" @click="successFn">{{successText}}</div>
	                </div>
	            </div>
            </transition>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        props:{
        	popupShow:{
        		type:Boolean,
        		default:false
        	},
            text:{
                type:String
            },
            type:{
                type:Number, //1:一个按钮 2：两个按钮
                default:2
            },
            successText:{
                type:String,
                default:'确定'
            },
            cancelText:{
                type:String,
                default:'取消'
            },
            success:{
                type:Function
            },
            cancel:{
                type:Function
            },
            box:{
        	    type:String,
                default:'pp'
            }
        },
        methods: {
            cancelFn(){
                this.cancel&&this.cancel()
            },
            successFn(){
                this.success&&this.success()
            },
            beforeEnter(){
                this.$refs[this.box].style.display = 'block';
            },
            afterEnter(){
//              setTimeout(() => {
//              	this.$emit('change', false)
//              }, 3000)
            },
            afterLeave(){
                this.$refs[this.box].style.display = 'none';
            }
        }
    }
</script>

<style>
    html, body {
        width: 100%;
        height: 100%;
    }
    .popup_box{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2000;
        width: 100%;
        height: 100%;
    }
    .popup {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        z-index: 30;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
    }

    .popup_main {
        width: 270px;
        background: #fff;
        border-radius: 2px;
    }

    .popup_des {
        padding: 25px;
        font-size: 15px;
        color: #222;
        text-align: center;
    }

    .popup_button {
        display: flex;
        display: -webkit-flex;
        width: 100%;
        height: 43px;
        border-top: 1px solid #acacac;
        align-items: center;
        justify-content: center;
    }

    .popup_cancel {
        height: 100%;
        flex: 1;
        font-size: 15px;
        color: #acacac;
        border-right: 1px solid #acacac;
        text-align: center;
        line-height: 43px;

    }

    .popup_pay {
        height: 100%;
        flex: 1;
        font-size: 15px;
        color: #d61f08;
        text-align: center;
        line-height: 43px;
    }
    .fade-enter-active, .fade-leave-active {
        -webkit-transition: all .2s;
        transition: all .2s;
    }

    .fade-enter, .fade-leave-active {
        -webkit-transform: scale(0);
        transform: scale(0);
    }
</style>

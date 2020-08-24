<template>
    <div class="pop_box" ref="pop" v-show="bgshow" :style="styleObj" @click="close">
        <transition name="fade" @before-enter="beforeEnter" @after-leave="afterLeave">
            <div class="pop_bg" v-show="visible" @click.stop>
                <img class="zs" src="../assets/pop_bg.png" alt="" />
                <div class="pop_con">
                    <slot></slot>
                </div>
                <button @click="close" class="close"><img src="../assets/close.png" alt="" /></button>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'pop',
        props: ['visible'],
        data() {
            return {
                bgshow: this.visible,
                vW:0,
                vH:0,
                sT:0,
                showMode:'normal'
            };
        },
        computed:{
            height(){
                return this.vH+'px'
            },
            width(){
                return this.vW+'px'
            },
            top(){
                return this.sT+'px'
            },
            styleObj(){
                if(this.showMode==='low'){
                    return {
                        'height':this.height,
                        'width':this.width,
                        'top':this.top
                    }
                }else{
                    return {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width:'100%',
                        height:'100%'
                    }
                }
            }
        },
        methods: {
            close() {
                this.$emit('update:visible', false);
            },
            beforeEnter() {
                this.bgshow = true;
                $(document.documentElement).css('overflow','hidden');
                $(document.body).css('overflow','hidden')
            },
            afterLeave() {
                this.bgshow = false;
                $(document.documentElement).css('overflow','');
                $(document.body).css('overflow','')
            },
            setLocal(){
                this.vW=document.documentElement.clientWidth;
                this.vH=document.documentElement.clientHeight;
                this.sT=document.documentElement.scrollTop||document.body.scrollTop;
            }
        },
        watch:{
            visible(val){
                setTimeout(()=>{
                    this.setLocal()
                }, 300);
            }
        },
        created(){
            const ua=navigator.userAgent
            let v=ua.match(/cpu iphone os (.*?) like mac os/i)
            if(v && v[1].split('_')[0] <= 11){
                this.showMode='low'
            }else{
                this.showMode='normal'
            }
        },
        mounted() {
            if(this.showMode==='low'){
                this.setLocal()
                window.addEventListener('resize',()=>{
                    this.setLocal()
                },false)
                window.addEventListener('scroll',()=>{
                    this.setLocal()
                },false)
            }
        }
    };
</script>

<style>
    .pop_box {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .pop_bg {
        background: url(../assets/pop_con_bg.png) no-repeat;
        background-size: 100%;
        width: 8.9066rem;
        height: 11.4133rem;
        border-radius: 0.4rem;
        position: relative;
        top: 0;
        left: 0;
    }
    .pop_bg .zs {
        width: 7.3066rem;
        position: absolute;
        left: 0.0533rem;
        top: -1.1733rem;
    }
    .pop_con{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .close {
        width: 0.8533rem;
        height: 0.8533rem;
        position: absolute;
        left: 50%;
        margin-left: -0.4266rem;
        bottom: -1.6rem;
        background: none;
        border: none;
    }
    .close img {
        width: 100%;
        display: block;
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.2s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        transform: scale(0);
    }
</style>

<template>
    <div class="sel_1" :class="{'active':active}">
        <img class="yao" src="../assets/yao.png" alt="" />
        <img class="main_img" src="../assets/img_1.png" alt="" />

        <img class="dl dl1" src="../assets/dl_1.png" alt="" />
        <img class="dl dl2" src="../assets/dl_2.png" alt="" />
        <img class="dl dl3" src="../assets/dl_3.png" alt="" />
        <img class="dl dl4" src="../assets/dl_4.png" alt="" />
        <img class="dl dl5" src="../assets/dl_5.png" alt="" />

        <img class="yun yun1" src="../assets/yun_1.png" alt="" />
        <img class="yun yun2" src="../assets/yun_2.png" alt="" />
        <img class="yun yun3" src="../assets/yun_3.png" alt="" />

        <img class="sw sw1" src="../assets/sw_1.png" alt="" />
        <img class="sw sw2" src="../assets/sw_2.png" alt="" />
    </div>
</template>

<script>
export default {
    name: 'mainSel',
    props:['active'],
    data(){
        return{
            timer:null,
        }
    },
    watch:{
        active(val){
            if(val){
                this.timer=setTimeout(()=>{
                    // this.$emit('update:active',false)
                },5000)
            }else{
                clearTimeout(this.timer)
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.sel_1{
    position: relative;
    top: 0;
    left: 0;
    height: 13.0133rem;
    margin-top: 0.6666rem;
}
.yao{
    width: 3.7466rem;
    position: absolute;
    top: -0.6133rem;
    right: 2.2933rem;
    transform-origin: 50% 100%;
    
}
.main_img{
    display: block;
    width: 9.48rem;
    margin-left: 0.2666rem;
    position: relative;
    top: 0;
    left: 0;
    z-index: 20;
}
.dl{
    position: absolute;
    transform-origin:50% 0;
    transform: rotate(0);
}
.dl1{
    width: 2.7733rem;
    top: 5.2rem;
    left: -0.1066rem;
    z-index: 1;
    
}
.dl2{
    width: 4.6666rem;
    left: 1.0133rem;
    top: 3.0133rem;
    z-index: 10;
}
.dl3{
    width: 3.28rem;
    left: 3.2rem;
    top: 2.0533rem;
    z-index: 8;
}
.dl4{
    width: 2.2533rem;
    left: 5.84rem;
    top: 3.4666rem;
    z-index: 7;
}
.dl5{
    width: 2.52rem;
    left: 7.52rem;
    top: 3.5733rem;
    z-index: 6;
}


.yun{
    position: absolute;
    z-index: 15;
    
}
.yun1{
    width: 2.0266rem;
    left: 0;
    top: 8.88rem;
    animation: yun 15s linear infinite;
}
.yun2{
    width: 1.9866rem;
    left: 4.5333rem;
    top: 7.4133rem;
    animation: yun 10s linear infinite;
}
.yun3{
    width: 2.4266rem;
    left: 7.4133rem;
    top: 8.64rem;
    animation: yun 20s linear infinite;
}

.sw{
    position: absolute;
}
.sw1{
    width: 2.3733rem;
    left: 4.9066rem;
    top: 10.5066rem;
}
.sw2{
    width: 2.32rem;
    left: 7.2rem;
    top: 10.6133rem;
}


.active .dl1{
    animation: dl 3s ease-in-out infinite;
}
.active .dl2{
    animation: dl 6s ease-in-out infinite;
}
.active .dl3{
    animation: dl 4s ease-in-out infinite;
}
.active .dl4{
    animation: dl 3s ease-in-out infinite;
}
.active .dl5{
    animation: dl 5s ease-in-out infinite;
}
.active .yao{
    animation: yao 0.1s linear infinite;
}

@keyframes dl{
    0%,100%{
        transform: rotate(6deg);
    }
    50%{
        transform: rotate(-6deg);
    }
}

@keyframes yun{
    0%,100%{
        transform: translateX(30px);
    }
    50%{
        transform: translateX(-30px);
    }
}

@keyframes yao{
    0%,50%{
        transform: rotate(0);
    }
    25%{
        transform: rotate(15deg);
    }
    75%{
        transform: rotate(-15deg)
    }
}
</style>

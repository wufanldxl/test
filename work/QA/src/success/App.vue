<template>
    <div id="app">
        <ptop title="提交成功" :more="false" :go="back"></ptop>
        <div class="success_box clearfix">
            <div class="icon"><img src="./img/success.png" alt=""></div>
            <div class="conent">
                <div class="c1">提交成功</div>
                <div class="c2">我们会根据 <a href="clause.html">问题审核条款</a> 进行审核，可能会对您的内容进行编辑！</div>
                    <!--<div class="c3">恭喜您，获得<i>30</i>成长值</div>-->
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import ptop from '../components/ptop.vue';
    export default{
        components: {
            ptop
        },
        methods:{
            back(){
                window.location.href='./index.html'
            }
        }
    }
</script>

<style>
    @import url("../assets/base-1.4.css");

    body {
        background: #f3f4f6;
    }

    .success_box {
        display: flex;
        padding: 40px 15px;
        background: #fff;
    }

    .icon {
        width: 27.5px;
    }

    .icon img {
        width: 100%;
    }

    .conent {
        flex: 1;
        margin-left: 10px;
        margin-top: 7px;
        line-height: 1rem;

    }

    .c1 {
        font-size: 19px;
        font-weight: 500;
        color: #222;
    }

    .c2 {
        margin-top: 5px;
        font-size: 15px;
        line-height: 1.47;
        color: #acacac;
    }

    .c2 a {
        color: #666;
        text-decoration: underline;
    }

    .c3{
        margin-top:10px;
        font-size: 15px;
        color: #666;
    }

    .c3 i{
        color: #ff5a00;
    }
</style>

<template>
    <div class="result_item" @click="goDetail(resultItem)">
        <h3>{{resultItem.questionTitle}}</h3>
        <div class="result_con">{{resultItem.answerContent}}</div>
        <operate :collectFlag="!Boolean(resultItem.collectFlag)" :likeFlag ="!Boolean(resultItem.greatFlag)" :likenum="resultItem.greatCount" :collectnum="resultItem.collectCount"></operate>
    </div>
</template>

<script type="text/ecmascript-6">
    import operate from '../../components/operate.vue'

    export default{
    	props:['resultItem'],
        components:{
            operate
        },
        methods:{
            goDetail(result){
            	if(result.questionType === 1){
            		window.location.href=`questionsDetail.html?questionId=${this.resultItem.questionId}`
            	}else{
            		window.location.href=`indexDetail.html?questionId=${this.resultItem.questionId}`
            	}
            }
        }
    }
</script>

<style>
    .result_item {
        padding: 15px;
        background:#fff;
        border-bottom: 1px solid #f3f3f3;
    }

    .result_item:last-child {
        border-bottom: none;
    }

    .result_item h3 {
        font-size: 16px;
        line-height: 1;
        color: #222222;
    }

    .result_con {
        margin-top: 14px;
        font-size: 14px;
        line-height: 1.32;
        color: #666666;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
/*
    .operate {
        margin-top: 15px;
        line-height: 15px;
        height: 15px;
        text-align: right;
        font-size: 0;
    }

    .operate a, .operate i {
        display: inline-block;
        vertical-align: top;
    }

    .operate i {
        margin-left: 5px;
        font-size: 13px;
        color: #acacac;
    }

    .like, .collect {
        display: inline-block;
        vertical-align: top;
    }

    .collect {
        margin-left: 30px;
    }

    .like_icon, .collect_icon {
        width: 15px;
        height: 15px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
    }

    .like_icon {
        background-image: url("../img/like.png");
    }

    .collect_icon {
        background-image: url("../img/collect.png");
    }

    .active i {
        color: #f78141;
    }

    .active .like_icon {
        background-image: url("../img/like-active.png");
    }

    .active .collect_icon {
        background-image: url("../img/collect-active.png");
    }
*/
</style>

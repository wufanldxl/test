<template>
    <div class="operate clearfix">
        <div class="o-l">
            <span class="o_time" v-if="time">{{time}}</span>
        </div>
        <div class="o-r">
            <div class="like" :class="{active:likeFlag}" v-if="like" @click="onlike">
                <a href="javascript:;" class="like_icon"></a>
                <i>{{likenum}}</i>
            </div>
            <div class="collect" :class="{active:collectFlag}" v-if="collect" @click="oncollect">
                <a href="javascript:;" class="collect_icon"></a>
                <i>{{collectnum}}</i>
            </div>
            <div class="comment" :class="{active:commentFlag}" v-if="comment" @click="oncomment">
                <a href="javascript:;" class="comment_icon"></a>
                <i>评论</i>
            </div>
            <div class="answer_o" v-if="answer" @click="onanswer">
                <a href="javascript:;" class="answer_icon"></a>
                <i>{{answerText}}</i>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        props: {
            'time': String,
            'like': {
                type: Boolean,
                default: true
            },
            'collect': {
                type: Boolean,
                default: true
            },
            'answer': {
                type: Boolean,
                default: false
            },
            'answerText': {
                type: String,
                default: '回答'
            },
            'likenum': [String, Number],
            'collectnum': [String, Number],
            'comment': {
                type: Boolean,
                default: false
            },
            'collectFlag': {
                type: Boolean,
                default: false
            },
            'likeFlag': {
                type: Boolean,
                default: false
            },
            'commentFlag': {
                type: Boolean,
                default: false
            },
            'handleCollect': Function,
            'handleLike': Function,
            'handleComment': Function,
            'handleAnswer': Function

        },
        methods: {
            onlike(){
                this.handleLike && this.handleLike();
            },
            oncollect(){
                this.handleCollect && this.handleCollect();
            },
            oncomment(){
                this.handleComment && this.handleComment();
            },
            onanswer(){
                this.handleAnswer && this.handleAnswer()
            }
        }
    }
</script>

<style>
    .operate {
        margin-top: 15px;
        line-height: 15px;
        height: 15px;
        font-size: 0;
    }

    .o-l {
        float: left;
        font-size: 13px;
        color: #acacac;
    }

    .o-r {
        float: right;
        text-align: right;
    }

    .operate a, .operate i {
        display: inline-block;
        vertical-align: top;
    }

    .operate i {
        margin-left: 5px;
        padding: 2px 0;
        font-size: 13px;
        color: #acacac;
        line-height: 1;
    }

    .like, .collect, .comment, .answer_o {
        display: inline-block;
    }

    .collect, .comment, .answer_o {
        margin-left: 25px;
    }

    .like_icon, .collect_icon, .comment_icon, .answer_icon {
        width: 15px;
        height: 15px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
    }

    .like_icon {
        background-image: url("./img/like.png");
    }

    .collect_icon {
        background-image: url("./img/collect.png");
    }

    .comment_icon {
        background-image: url("./img/comment.png");
    }

    .answer_icon {
        background-image: url("./img/answer.png");
    }

    .active i {
        color: #f78141;
    }

    .active .like_icon {
        background-image: url("./img/like-active.png");
    }

    .active .collect_icon {
        background-image: url("./img/collect-active.png");
    }

    .active .comment_icon {
        background-image: url("./img/comment_active.png");
    }
</style>

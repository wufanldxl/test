<template>
    <div class="info clearfix">
        <div class="userinfo">
            <img :src="src" alt="">
            <span class="user_name">{{name}}</span>
            <i class="info_c" v-if="tip">{{tip}}</i>
        </div>
        <div class="info_time" v-if="time">{{time}}</div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        props:['src','name','tip','time'],

    }
</script>

<style>
    .info {
        line-height: 25px;
        font-size: 0;
    }

    .info img {
        width: 25px;
        height: 25px;
        border-radius: 3px;
    }

    .userinfo {
        float: left;
    }

    .user_name {
        display: inline-block;
        vertical-align: top;
        margin-left: 5px;
        color: #666;
        font-size: 13px;
    }

    .info_c {
        display: inline-block;
        vertical-align: top;
        margin-left: 6px;
        font-size: 13px;
        color: #acacac;
    }

    .info .info_time {
        float: right;
        line-height: 25px;
        font-size: 12px;
        color: #acacac;
    }
</style>

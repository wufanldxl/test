<template>
    <div id="app">
        <master-list :go="back" :show="true" :page="true"></master-list>
    </div>
</template>

<script type="text/ecmascript-6">
    import masterList from '../components/masterList.vue';
    export default{
        components: {
            masterList
        },
        methods:{
            back(){
                window.history.go(-1)
            }
        }
    }
</script>

<style>
    @import url("../assets/base-1.4.css");

    body {
        background: #f3f4f6;
    }

    body,html,#app{
        height: 100%;
    }


</style>

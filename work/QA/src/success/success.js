import Vue from 'vue'
import App from './App.vue'
import {tongji} from '../common/common'
new Vue({
    el:'#app',
    template:'<App/>',
    components:{
        App
    },
    mounted(){
        tongji()
    }
})

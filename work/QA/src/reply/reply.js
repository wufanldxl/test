import Vue from 'vue'
import App from './App'
import axios from 'axios'
import {api, host} from '../common/apiConfig'
import {urlData, tongji, getCookie} from '../common/common'

Vue.prototype.$http = axios;
Vue.use(api);
Vue.prototype.$urlData = urlData;
Vue.prototype.$cookie = getCookie;

new Vue({
    el: '#app',
    template: '<App/>',
    components: {App},
    mounted(){
        tongji()
    }
})

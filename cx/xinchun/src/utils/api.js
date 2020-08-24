import axios from 'axios'
import {msg,loading} from './msg.js'

const host = '//gateway.caixin.com/api/'
const http = axios;
axios.interceptors.request.use(function(config) {
    loading.open();
    return config;
});
axios.interceptors.response.use(function (response) {
    loading.close()
    return response;
  }, function (error) {
    msg('网络错误')
    return Promise.reject(error);
  });

export default {
    loginRewardUpdate(data){   //告诉后台登录了,给我权限
        return axios.post(host+'lottery/tRewardConfig/rewardTimes',data)
    },
    getRewardTimes(data){
        return axios.post(host+'lottery/tActivitesUserTimes/getTimes',data)
    },
    lottery(data){
        return axios.post(host+'lottery/tLotteryRecord/lottery',data)
    },
    submitUserInfo(data){
        return axios.post(host+'lottery/tLotteryRecord/updateSelective',data)
    },
    getPrizeList(data){
        return axios.post(host+'lottery/tLotteryRecord/getByCondition',data)
    },
    use(data){
        return axios.post(host+'lottery/tLotteryRecord/receiveOption',data)
    },
    checkLogin(){
        //获取登录信息（验证登录信息是否有效）
        return new Promise((resolve, reject) => {
            $.ajax({
                url:'//gateway.caixin.com/api/ucenter/userinfo/get',
                type: 'GET',
                dataType: "jsonp",
                timeout: 5000,
                success: function (res) {
                    resolve(res)
                },
                error: function (res) {
                    reject(res)
                }
            })
        })
    },
    //ucenter/user/v1/logout
    logout(){
        return new Promise((resolve, reject) => {
            $.ajax({
                url:'//gateway.caixin.com/api/ucenter/user/v1/logout',
                type: 'GET',
                dataType: "jsonp",
                timeout: 5000,
                success: function (res) {
                    resolve(res)
                },
                error: function (res) {
                    reject(res)
                }
            })
        })
    }
}

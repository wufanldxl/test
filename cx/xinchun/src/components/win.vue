<template>
    <div class="win" :class="{'virtual':virtual}">
        <p class="tit">恭喜您！获得</p>
        <p class="prize">{{prizeName}}</p>
        <div class="user_info">
            <ul>
                <li><span>姓名：</span><input type="text" v-model="name"></li>
                <li><span>电话：</span><input type="tel" v-model="tel"></li>
                <li><span>地址：</span><textarea v-model="addr"></textarea></li>
            </ul>
            <button class="submit_user_info" @click="submit">提交</button>
        </div>
        <div class="btns" v-if="type == 2">
            <a class="gouse" href="http://u.caixin.com/user/coupon.html">去使用</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'win',
        props: ['type', 'prizeName', 'id'],
        data() {
            return {
                name: '',
                tel: '',
                addr: '',
            }
        },
        computed:{
            virtual(){
                return this.type !== 4
            }
        },
        methods: {
            submit() {
                if (!this.name) {
                    this.$msg('姓名不能为空！')
                    return;
                }
                if (!this.tel || !(/^1[\d]{10}$/.test(this.tel))) {
                    this.$msg('请填写正确手机号！')
                    return;
                }
                if (!this.addr) {
                    this.$msg('地址不能为空！')
                    return;
                }
                this.$api.submitUserInfo({
                    id: this.id,
                    name: this.name,
                    mobile: this.tel,
                    address: this.addr,
                }).then(res => {
                    if (res.data.error) {
                        this.$msg('提交失败');
                    } else {
                        this.$msg('信息提交成功！')
                        this.$emit('success')
                    }
                })
            },
            cancel(){
                this.$emit('success');
            }
        },
        watch:{

        }
    }
</script>

<style scoped>
    .win {
        padding-top: 3.2533rem;
        color: #fff;
    }

    .win .tit {
        font-size: 0.5333rem;
        text-align: center;
        line-height: 1;
        font-weight: 800;
    }

    .win .prize {
        margin-top: 0.24rem;
        font-size: 0.5333rem;
        text-align: center;
        line-height: 1;
        font-weight: 800;
    }

    .user_info ul {
        padding-left: 1.4666rem;
        margin-top: 0.56rem;
    }

    .user_info span {
        float: left;
        font-size: 0.32rem;
        line-height: 0.6133rem;
    }

    .user_info input {
        height: 0.6133rem;
        padding: 0.1333rem;
        box-sizing: border-box;
    }

    .user_info input,
    .user_info textarea {
        border: none;
        float: left;
        width: 4.0266rem;
        font-size: 0.32rem;
        font-weight: 200;
    }

    .user_info textarea {
        height: 1.7066rem;
        padding: 0.1333rem;
        box-sizing: border-box;
        resize: none;
    }

    .user_info li {
        margin-bottom: 0.2133rem;
        overflow: hidden;
    }

    .submit_user_info {
        display: block;
        width: 4.0266rem;
        height: 0.9866rem;
        background: #ffeb3b;
        font-size: 0.427rem;
        margin: 1.0666rem auto 0;
    }

    .virtual .user_info {
        display: none;
    }

    .virtual {
        padding-top: 4.9333rem;
    }

    .virtual .prize {
        font-size: 0.5333rem;
        font-weight: 400;
    }


    .btns a{
        display: block;
        width: 4.0266rem;
        height: 0.9866rem;
        line-height: 0.9866rem;
        background: #ffeb3b;
        font-size: 0.427rem;
        margin: 1.0666rem auto 0;
        text-align: center;
        color: #000;
        text-decoration: none;
    }

</style>

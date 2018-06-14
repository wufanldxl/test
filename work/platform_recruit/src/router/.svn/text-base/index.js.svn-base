import Vue from 'vue'
import Router from 'vue-router'
import Recruit from '@/components/Recruit'
import Area from '@/components/Area'
import Skilldes from '@/components/Skilldes'
import Record from '@/components/Record'
import Success from '@/components/Success'
import Skill from '@/components/Skill'
import Agreement from '@/components/Agreement'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Recruit',
      component: Recruit,
      meta: {
        title: '招募平台'
      }
    },
    {
      path: '/area',
      name: 'Area',
      component: Area,
      meta: {
        title: '商圈'
      }
    },
    {
      path: '/skilldes',
      name: 'Skilldes',
      component: Skilldes,
      meta: {
        title: '服务技能'
      }
    },
    {
      path: '/record',
      name: 'Record',
      component: Record,
      meta: {
        title: '邀请记录'
      }
    },
    {
      path: '/success',
      name: 'Success',
      component: Success,
      meta: {
        title: '成功注册'
      }
    },
    {
      path: '/skill',
      name: 'Skill',
      component: Skill,
      meta: {
        title: '我的技能'
      }
    },
    {
      path: '/agreement',
      name: 'Agreement',
      component: Agreement,
      meta: {
        title: '用户注册协议'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {//如果设置标题，拦截后设置标题
    document.title = to.meta.title
  }
  next()
})

export default router
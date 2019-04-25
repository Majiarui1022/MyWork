import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/components/layout/layout'
import autotest from '@/views/autoTest/autoTest'
// import mapping from '@/views/mapping/mapping'
// import timing from '@/views/timing/timing'
Vue.use(Router)

export default new Router({
  linkActiveClass:'router-link-active',
  routes: [
    {
      path: '',
      name: 'layout',
      component: layout,
      redirect:'/autotest',
      children:[
        {
          path:'autotest',
          name:'autotest',
          component:autotest
        },
        {
          path:'mapping',
          name:'mapping',
          component:() => import('@/views/mapping/mapping')
        },
        {
          path:'timing',
          name:'timing',
          component:() => import('@/views/timing/timing')
        },
        {
          path:'operand',
          name:'operand',
          component:() => import('@/views/Operand/Operand')
        },
        {
          path:'Manual',
          name:'Manual',
          component:() => import('@/views/Manual/Manual')
        },
      ]
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
// import Calculator from '@/views/calculator/Calculator'
import MarkDownEdit from '@/views/mark-down/edit'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'landing-page',
    //   component: require('@/components/LandingPage').default
    // },
    {
      path: '/',
      name: 'mark-down-edit',
      component: MarkDownEdit
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

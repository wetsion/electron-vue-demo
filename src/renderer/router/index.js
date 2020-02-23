import Vue from 'vue'
import Router from 'vue-router'
// import Calculator from '@/views/calculator/Calculator'
import Main from '@/views/main/main'
import About from '@/views/about/about'

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
      name: 'main',
      component: Main
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

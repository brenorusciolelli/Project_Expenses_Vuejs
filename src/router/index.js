import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        icon: 'home', title: 'Home'
      },
      component: () => import(/* webpackChunkName: "home" */ '../pages/home/Home')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: 'Login'
      },
      component: () => import(/* webpackChunkName: "login" */ '../pages/login/Login')
    },
    {
      path: '/lista-gastos',
      name: 'lista-gastos',
      meta: {
        icon: 'list-ul', title: 'Lista Gastos'
      },
      component: () => import(/* webpackChunkName: "lista-gastos" */ '../pages/lista-gastos/ListaGastos')
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - Expenses`
  if (!window.uid && to.name !== 'login') {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router

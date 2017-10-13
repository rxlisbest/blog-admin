import Vue from 'vue'
import Router from 'vue-router'
import menuModule from 'vuex-store/modules/menu'
Vue.use(Router)

export default new Router({
  mode: 'hash', // Demo is living in GitHub.io, so required!
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    // {
    //   name: 'Dashboard',
    //   path: '/',
    //   component: require('../views/dashboard')
    // },
    {
      name: 'Article',
      path: '/video/page/:id',
      meta: {
        auth: true
      },
      component: require('../views/video')
    },
    {
      name: 'updateArticle',
      path: '/video/update/:id',
      meta: {
        auth: true
      },
      component: require('../views/video/update')
    },
    {
      name: 'createArticle',
      path: '/video/create',
      meta: {
        auth: true
      },
      component: require('../views/video/update')
    },
    {
      name: 'Article2',
      path: '/article/page/:id',
      meta: {
        auth: true
      },
      component: require('../views/article')
    },
    {
      name: 'updateArticle2',
      path: '/article/update/:id',
      meta: {
        auth: true
      },
      component: require('../views/article/update')
    },
    {
      name: 'createArticle2',
      path: '/article/create',
      meta: {
        auth: true
      },
      component: require('../views/article/update')
    },
    {
      name: 'Login',
      path: '/login',
      component: require('../views/auth/Login')
    },
    // {
    //   name: 'Dashboard',
    //   path: '/dashboard',
    //   component: require('../views/dashboard/index')
    // },
    ...generateRoutesFromMenu(menuModule.state.items),
    {
      path: '*',
      redirect: '/dashboard'
    }
  ]
})

// Menu should have 2 levels.
function generateRoutesFromMenu (menu = [], routes = []) {
  for (let i = 0, l = menu.length; i < l; i++) {
    let item = menu[i]
    if (item.path) {
      routes.push(item)
    }
    if (!item.component) {
      generateRoutesFromMenu(item.children, routes)
    }
  }
  return routes
}

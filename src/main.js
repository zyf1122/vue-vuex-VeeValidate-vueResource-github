import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueResource from 'vue-resource'
Vue.use(VueResource)

import {store} from './store/index'
import routes from './router'

import {VeeValidate, Veeconfig} from './validation';

window.Vue = require('vue')

const router = new VueRouter({
  mode:'history',
  routes // short for routes: routes
})

router.beforeEach((to, from, next) => {

  if(to.matched.some(record => record.meta.requiresAuth)){
    if(store.getters.token){
      next()
    }else{
      next({name: 'login'})
    }
  }else{
    next();
  }
})

Vue.use(VeeValidate,Veeconfig);
// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app = new Vue({
  router,
  store
}).$mount('#app')
// for App.vue router-view
import Vue from 'vue'
import Router from 'vue-router'
import Check from 'modules/check/Check.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      // 首页路由
      path: '/',
      name: 'Check',
      component: Check
    },
  ]
});

export default router;


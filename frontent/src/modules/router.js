// for App.vue router-view
import Vue from 'vue'
import Router from 'vue-router'
import Page1 from 'modules/Page1.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      // 首页路由
      path: '/',
      name: 'Page1',
      component: Page1
    },
    // {
    //   // ring路由
    //   path: '/page2',
    //   name: 'Page2',
    //   component: Page2
    // },
  ]
});

export default router;

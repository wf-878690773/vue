import Vue from 'vue'
import Router from 'vue-router'

import Login from "../views/Login"
import Main from '../views/Main'

import UserProfile from "../views/user/UserProfile";
import UserList from "../views/user/UserList";
import NotFound from "../views/error/NotFound";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      // 登录页
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      // 首页
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        {path: '/user/profile/:id', name: 'UserProfile', component: UserProfile, props: true},
        {path: '/user/list', name: 'UserList', component: UserList},
      ]
    },

    {
      path: '/goHome',
      redirect: '/main'
    },
    {
      path: '*',
      component: NotFound
    }

  ]
});

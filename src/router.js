import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import login from "./views/auth/login";
import register from "./views/auth/register";
import search from "./views/search";
import documents from "./views/documents/documents";
import add_documents from "./views/documents/add_documents";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        requiresVisitor: true,
      }
    },
    {
      path:'/documents',
      name: 'documents',
      component: documents,

    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: {
        requiresVisitor: true,
      }
    },
    {
      path:'/add-documents',
      name:'add-documents',
      component:add_documents,
      meta: {
        requiresAuth: true,
      }
    },
    { path: '*', redirect: '/home' }
  ],
  mode:'history'
})

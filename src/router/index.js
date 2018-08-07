import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: resolve => require(['../pages/Home.vue'], resolve)
    },
    {
      path: '/scroll',
      name: 'Scroll',
      component: resolve => require(['../pages/cube/Scroll.vue'], resolve)
    },

    {
      path: '/markdown',
      name: 'Markdown',
      component: resolve => require(['../pages/Markdown.vue'], resolve)
    },
    {
      path: '/1024',
      name: 'img-1024',
      component: resolve => require(['../pages/fun/Img1024.vue'], resolve)
    },
    {
      path: '/ElemeFEPopup',
      name: 'elemefe-popup',
      component: resolve => require(['../pages/BluAside.vue'], resolve)
    },
    {
      path: '/ElemeFEDialog',
      name: 'elemefe-Dialog',
      component: resolve => require(['../pages/ElemeFEDialog.vue'], resolve)
    },
    {
      path: '/Audio',
      name: 'elemefe-audio',
      component: resolve => require(['../pages/ElemeFEAudio.vue'], resolve)
    },
    {
      path: '/FileUpload',
      name: 'elemefe-upload',
      component: resolve => require(['../pages/ElemeFileUpload.vue'], resolve)
    },
    {
      path: '/MarqueeTips',
      name: 'marquee-tips',
      component: resolve => require(['../pages/mobile/VueMarqueeTips.vue'], resolve)
    },
    {
      path: '/LoginDemo',
      name: 'login-demo',
      component: resolve => require(['../pages/LoginDemo.vue'], resolve)
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'DashBoard',
      component: resolve => require(['../pages/Dashboard.vue'], resolve)
    },
    {
      path: '/dialog',
      name: 'Dialog',
      component: resolve => require(['../pages/DialogDemo.vue'], resolve)
    },
    {
      path: '/hr',
      name: 'HR',
      component: resolve => require(['../pages/Hr.vue'], resolve)
    },
    {
      path: '/qiniu',
      name: 'qiniu',
      component: resolve => require(['../pages/QiNiuUpload.vue'], resolve)
    },
    {
      path: '/img-crop',
      name: 'img-crop',
      component: resolve => require(['../pages/ImageCropperDemo.vue'], resolve)
    },
    {
      path: '/excel',
      name: 'excel',
      component: resolve => require(['../pages/Excel.vue'], resolve)
    },
    {
      path: '/excelBeautify',
      name: 'excelBeautify',
      component: resolve => require(['../pages/excelBeautify.vue'], resolve)
    },
    {
      path: '/scroll',
      name: 'scroll',
      component: resolve => require(['../pages/nativeStyle/ScrollBarDemo.vue'], resolve)
    },
    {
      path: '/compressorjs',
      name: 'compressorjs',
      component: resolve => require(['../pages/Compressorjs.vue'], resolve)
    },
    {
      path: '/ws',
      name: 'ws',
      component: resolve => require(['../pages/WebSocketDemo.vue'], resolve)
    },
    {
      path: '/card',
      name: 'Card',
      component: resolve => require(['../pages/CardPage.vue'], resolve)
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: resolve => require(['../pages/Calendar.vue'], resolve)
    },
    {
      path: '/scanner',
      name: 'Scanner',
      component: resolve => require(['../pages/Scanner.vue'], resolve)
    },
    {
      path: '/aside',
      name: 'aside',
      component: resolve => require(['../pages/Aside.vue'], resolve)
    },
    {
      path: '/eleAudio',
      name: 'eleAudio',
      component: resolve => require(['../pages/ElemeFEAudio.vue'], resolve)
    },
    {
      path: '/mobile',
      name: 'mobile',
      component: resolve => require(['../pages/mobile/Mobile.vue'], resolve),
      children: [
        // {
        //   path: '/mobile/marqueeTips',
        //   name: 'marqueeTips',
        //   component: resolve => require(['../pages/mobile/VueMarqueeTips.vue'], resolve)
        // },
        {
          path: '/mobile/scrollTabBar',
          name: 'scrollTabBar',
          component: resolve => require(['../pages/mobile/ScrollTabBar.vue'], resolve)
        },
      ]
    },
    {
      path: '/native/styledSelect',
      name: 'styledSelect',
      component: resolve => require(['../pages/nativeStyle/NativeStyledSelect.vue'], resolve)
    },
  ]
})

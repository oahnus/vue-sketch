import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Aside from 'vue-blu/src/components/aside'
// import 'vue-blu/dist/css/vue-blu.min.css'
Vue.config.productionTip = false

import Blu from 'vue-blu'
Vue.use(ElementUI)
// Vue.use(Blu)
// Vue.component('b-side', Aside)
// Vue.use(VueBlu)
/* eslint-disable no-new */
import vSelect from 'vue-select'
Vue.component('v-select', vSelect)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

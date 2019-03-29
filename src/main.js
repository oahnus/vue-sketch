import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

import {
  Field,
  Button,
  CellGroup, Cell,
  AddressList, Area,
  Collapse, CollapseItem,
  DatetimePicker, Picker, Popup, Icon,
  Row, Col,
  Radio, RadioGroup,
  Panel
} from 'vant'
import 'vant/lib/index.css';

Vue.use(Field).use(Cell).use(CellGroup)
  .use(Collapse).use(CollapseItem)
  .use(DatetimePicker).use(Popup)
  .use(AddressList).use(Area).use(Picker)
  .use(Button).use(Icon)
  .use(Row).use(Col).use(Radio).use(RadioGroup).use(Panel);

Vue.use(ElementUI)
/* eslint-disable no-new */
import vSelect from 'vue-select'
Vue.component('v-select', vSelect)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

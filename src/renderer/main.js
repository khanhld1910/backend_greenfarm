import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

// jquery
global.$ = global.jQuery = require('jquery')
// popper.js
require('popper.js')
// bootstrap
require('bootstrap/dist/js/bootstrap.min')
require('bootstrap/dist/css/bootstrap.min.css')
// font-awesome
require('font-awesome/css/font-awesome.min.css')
// admin-lte
require('admin-lte/dist/js/adminlte.min')
require('admin-lte/dist/css/AdminLTE.min.css')
require('admin-lte/dist/css/skins/_all-skins.min.css')
// iCheck
require('icheck/icheck.min')
require('icheck/skins/all.css')
// inputMask
global.Inputmask = require("inputmask")
Vue.directive('input-mask', {
	bind: function(el) {
		new Inputmask().mask(el)
	},
})


/* eslint-disable no-new */

import Datatable from 'vue2-datatable-component'
require('vue2-datatable-component/dist/min.css')
Vue.use(Datatable) // done!
// Vuefire
var VueFire = require('vuefire')
Vue.use(VueFire)


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app')

// --------------------------->





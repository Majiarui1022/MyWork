// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import VCharts from 'v-charts';
import echarts from 'echarts'
import store from './store/index'
import axios from './api/request.js';
import $ from 'jquery'

Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.use(ElementUI)
// Vue.use(VCharts)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

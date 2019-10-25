import Vue from 'vue'
import App from './App.vue'

//引入路由
import router from './router'

//引入UI框架
//引入UI框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入axios
import axios from 'axios'

let hui  = axios.create({
  // baseURL:'http://116.62.209.91:1907/'
  baseURL:'http://116.62.209.91:1907/'

})

Vue.prototype.$axios = axios /*写入vue原型*/
Vue.prototype.$hui = hui

//引入vuex
import store from './store'

Vue.config.productionTip = false

//注入实例
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

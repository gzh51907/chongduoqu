import Vue from 'vue'
import App from './App.vue'



//引入路由
import router from './router'

//引入UI框架
//引入UI框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'vant/lib/index.css'
import { Checkbox, CheckboxGroup ,Button,SubmitBar,Card,Tag,Col,Icon,Cell,CellGroup,Swipe,Toast,SwipeItem,GoodsAction,GoodsActionIcon,GoodsActionButton} from 'vant'


  
Vue.use(ElementUI);

Vue.use(Checkbox)
.use(CheckboxGroup)
.use(Button)
.use(SubmitBar)
.use(Card)
.use(Tag)
.use(Col)
.use(Icon)
.use(Cell)
.use(CellGroup)
.use(Swipe)
.use(Toast)
.use(SwipeItem)
.use(GoodsAction)
.use(GoodsActionIcon)
.use(GoodsActionButton)

//引入axios
import axios from 'axios'

let hui  = axios.create({
  baseURL:'http://192.168.4.103:1907/'
})

Vue.prototype.$axios = axios /*写入vue原型*/
Vue.prototype.$hui = hui;

//引入vuex
import store from './store'

Vue.config.productionTip = false

//注入实例
new Vue({
  router,
  store,
  render: h => h(App),
})
.$mount('#app')

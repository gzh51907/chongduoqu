import Vue from 'vue';

// 1. 引入Vuex
import Vuex from 'vuex';

import category from './category';
import common from './common';
import cart from './cart';

// 2. 使用（安装）Vuex
Vue.use(Vuex);

// 3. 创建store实例
const store = new Vuex.Store({
  // 创建state

  // 只用模块化store后会影响state数据的获取
  // store.state.xxx -> store.state.cart.xxx
  modules:{
    category,
    common,
    cart
  }
});

export default store;
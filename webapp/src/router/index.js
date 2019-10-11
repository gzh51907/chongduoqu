import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//引入组件
import Home from '../pages/Home.vue'
import Category from '../pages/Category.vue'
import Cart from '../pages/Cart.vue'
import Mine from '../pages/Mine.vue'
import Goods from '../pages/Goods.vue'
import Detail from '../pages/Detail.vue'
import Login from '../pages/Login.vue'
import Reg from '../pages/Reg.vue'
import Agreement from '../pages/Agreement.vue'

//创建路由实例
let router = new VueRouter({
    routes:[{
        name:"home",
        path:"/home",
        component:Home
    },{
        //当浏览器地址为/home时，显示Home组件的内容
        path: '/',  
        redirect: '/home'
    },{
        name:"category",
        path:"/category",
        component:Category
    },{
        name:"cart",
        path:"/cart",
        component:Cart
    },{
        name:"mine",
        path:"/mine",
        component:Mine
    },{
        name:"goods",
        path:"/goods",
        component:Goods
    },{
        name:"detail",
        path:"/detail",
        component:Detail
    },{
        name:"login",
        path:"/login",
        component:Login
    },{
        name:"reg",
        path:"/reg",
        component:Reg
    },{
        name:"agreement",
        path:"/agreement",
        component:Agreement
    }]
})


export default router
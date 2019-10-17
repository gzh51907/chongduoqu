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
import Setter from '../pages/Setter.vue'

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
        component:Cart,
        meta:{
            requiresAuth:true
        }
    },{
        name:"setter",
        path:"/setter",
        component:Setter
    },{
        name:"mine",
        path:"/mine",
        component:Mine
    },{
        name:"goods",
        path:"/goods/:id",
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
    },]
})


//设置全局路由守卫
router.beforeEach(function(to,from,next){
    window.console.log('beforeEach',to,from);
    //设置页面访问权限
    //先判断目标路由是否需要鉴权--->路由中是否有reuqireAuth属性
    if(to.meta.requiresAuth){
        let Authorization = localStorage.getItem("Authorization")
        if(Authorization){
            next()
        }else{
            router.push({
                path:'/login',
                query:{
                    targetUrl:to.fullPath
                }
            })
        }
    }else if(to.path!=from.path){
        next()
    }
    

})


export default router
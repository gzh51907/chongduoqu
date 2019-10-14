import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//引入组件
import Goodslist from '../components/goods/Goodslist.vue'
import Goodscategory from '../components/goods/Goodscategory.vue'
import Goodsadd from '../components/goods/Goodsadd.vue'
import Userlist from '../components/user/Userlist.vue'
import Usermanage from '../components/user/Usermanage.vue'
import Useradd from '../components/user/Useradd.vue'

// import Login from '../pages/Login.vue'
// import Reg from '../pages/Reg.vue'
// import Agreement from '../pages/Agreement.vue'

//创建路由实例
let router = new VueRouter({
    routes:[{
        name:"goodslist",
        path:"/goodslist",
        component:Goodslist
    },{
        //当浏览器地址为/home时，显示Home组件的内容
        path: '/',  
        redirect: '/goodslist'
    },{
        name:"goodscategory",
        path:"/goodscategory",
        component:Goodscategory
    },{
        name:"goodsadd",
        path:"/goodsadd",
        component:Goodsadd
    },{
        name:"userlist",
        path:"/userlist",
        component:Userlist
    },{
        name:"useradd",
        path:"/useradd",
        component:Useradd
    },{
        name:"usermanage",
        path:"/usermanage",
        component:Usermanage
    }]
})


export default router
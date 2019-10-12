<template>
  <div id="bigbox">
    <router-view v-model="show" ></router-view>
    <el-menu :default-active="activeIndex" class="el-menu-demo app-nav" mode="horizontal" @select="handleSelect" router v-show="show" >
      <el-menu-item :index="item.path" v-for="item in menus" :key="item.name" class="nav-item"><i :class="item.icon"></i><span>{{item.text}}</span></el-menu-item>
    </el-menu>
  </div>
</template>

<script>


export default {
  name: 'app',
  
  data(){
    return{
      activeIndex:'/home',
      show:this.$route.name=='home'||this.$route.name=='cart'||this.$route.name=='category'||this.$route.name=='mine',
      showa:'/home'||'/category',
      showb:"home"||"category"||"cart"||"mine",
      menus:[{
        name:"home",
        path:"/home",
        text:"首页",
        icon:"el-icon-s-home"
      },{
        name:"category",
        path:"/category",
        text:"分类",
        icon:"el-icon-menu"
      },{
        name:"cart",
        path:"/cart",
        text:"购物车",
        icon:"el-icon-shopping-cart-1"
      },{
        name:"mine",
        path:"/mine",
        text:"我的",
        icon:"el-icon-s-custom"
      }]
    }
  },
  watch:{
    $route(){
      console.log(222222222222)
      if(this.$route.name=="home"||this.$route.name=="category"||this.$route.name=="cart"||this.$route.name=="mine"){
        this.show = true
      }else{
        this.show = false
      }
      //监听$router将url和nav实时绑定
      this.activeIndex = this.$route.path;
    }
  }
  ,
  methods:{
    handleSelect(index) {
      this.activeIndex = index;
    }
    
  },
  created(){console.log(this.show)
    //刷新页面、浏览器停留在当前组件
     this.activeIndex = this.$route.path;
     
  },
 
  
  components: {
    
  }
}
</script>

<style>
#bigbox,#app,html,body{
  height: 100%;
  width:100%;
  margin:0;
  padding:0;
}
#bigbox{
  background:#f0f0f0;
  display:flex;
  flex-direction: column;
}
.box,.router-view{
  flex:1;
  overflow-y: scroll;
}
.app-nav-hid{
  height: 0;
}
.app-nav{
  height: 50px;
  display:flex;
  width: 100%;
  border-top: 1px solid #e5e5e5;
  margin-top: 1px;
  overflow:hidden;
  z-index:1000;
}
.nav-item{
  display: flex;
  padding:0 !important;
  text-align: center;
  justify-items: center !important;
  align-items: center !important;
  flex:1;
  flex-direction: column;
}
.nav-item span{
  line-height: 20px;
}
.nav-item i{
  line-height:30px;
  font-size: 22px !important;
  margin-right: 0 !important;
  text-align: center
}
.reg-box{
  flex:1;
  overflow-y: scroll;
}
.is-active{
  color:#f56c02 !important;
}
.ca-search .el-input__inner,.gd-search .el-input__inner{
    border-radius: 20px !important;
    background:#f0f2f5;
    height: 38px;
    border:0;
}
.gd-search .el-input__inner{
  background:#e5e5e5;
}


</style>

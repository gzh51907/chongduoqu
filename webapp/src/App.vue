<template>
  <div id="bigbox">
    <router-view></router-view>
    <el-menu :default-active="activeIndex" class="el-menu-demo app-nav" mode="horizontal" @select="handleSelect" router v-if="hid!='reg'" v-model="hid">
      <el-menu-item :index="item.path" v-for="item in menus" :key="item.name" class="nav-item"><i :class="item.icon"></i><span>{{item.text}}</span></el-menu-item>
    </el-menu>
  </div>
</template>

<script>


export default {
  name: 'app',
  data(){
    return{
      activeIndexIndex:'/home',
      hid:"",
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
  methods:{
    handleSelect(index) {
      this.activeIndex = index;
      // this.$router.push(index)
    }
  },
  created(){
    this.hid = this.$route.name
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
.app-nav{
  height: 50px;
  display:flex;
  width: 100%;
  border-top: 1px solid #ccc;
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
</style>

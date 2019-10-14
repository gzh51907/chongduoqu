<template>
  <div class="bigbox">
    <h2>宠多趣后台管理系统</h2>
    <el-container>
        <el-aside width="200px" style="background:#545c64;">
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item :title="item.text" name="1" v-for="item in nav" :key="item.text" style="background:#545c64;">
                    <div v-for="ele in item.menus" :key="ele.text">{{ele.text}}</div>
                </el-collapse-item>
                
            </el-collapse>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
        nav:[{
            text:"商品管理",   
            menus:[{
                name:"goodslist",
                path:"/goodslist",
                text:"商品订单"
            },{
                name:"goodsadd",
                path:"/goodsadd",
                text:"添加商品"
            },{
                name:"goodscategory",
                path:"/goodscategory",
                text:"商品分类"
            }]
        },{
            text:"用户管理",   
            menus:[{
                name:"goodslist",
                path:"/goodslist",
                text:"用户列表"
            },{
                name:"goodsadd",
                path:"/goodsadd",
                text:"添加用户"
            },{
                name:"goodscategory",
                path:"/goodscategory",
                text:"管理人员"
            }]
        },{
            text:"订单管理",   
            menus:[{
                name:"goodslist",
                path:"/goodslist",
                text:"订单列表"
            }]
        }]
        
    }
    
  },
  methods: {
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
        console.log(key, keyPath);
    },
    goto(url){
        this.$router.push(url)
    }
  }
};
</script>
<style scoped>
.bigbox {
  width: 100%;
  height: 100%;
  display:flex;
  flex-direction: column;
  /* background:skyblue; */
}
h2 {
  padding: 10px 20px;
  background: pink;
  font-size: 30px;
  margin:0; 
  line-height: 50px;
  height: 50px;
}
.el-collapse /deep/ .el-collapse-item{
    background: #545c64 !important;
}
.el-collapse /deep/ .el-collapse-item div{
    background: #545c64 !important;
    color:#fff;
    padding-left: 10px;
    padding-right: 5px;
    
}
 
</style>
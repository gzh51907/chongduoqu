<template>
  <div class="box">
    <div class="title">
      <el-autocomplete
        v-model="state"
        :fetch-suggestions="querySearchAsync"
        placeholder="想找什么？"
        @select="handleSelect"
        class="ca-search"
      ></el-autocomplete>
    </div>
    <el-tabs :tab-position="tabPosition" style="height:100%">
      <el-tab-pane :label="ele.name" v-for="ele in category" :key="ele._id" class="dis-tab">
        <div class="cate-item" v-for="type in ele.categories" :key="type.id">
          <div class="cate-title" style="color:#999;padding:5px;">
              {{type.name}}
            <span @click="goto('goods',215)">全部></span>
          </div>
          <ul class="cate-ul">
            <li v-for="item in type.categories" :key="item.name" @click="gogoods(item.id)">
              <img :src="item.photo?item.photo.thumb:noimg" alt="" style="width:62px;height:62px;border-radius:50%">
       
              <span>{{item.name}}</span>
            </li>
          </ul>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      noimg:require("../assets/img/default.png"),
      tabPosition: "left",
      category:[],
      restaurants: [],
      state: "",
      timeout: null,
      goods:[],
    };
  },
  methods: {
    goto(url,id){
        this.$router.push({name:url,params:{id:id}})
    },
    gogoods(id){
        this.$router.push({name:"goods",params:{id:id}})
    },
    loadAll() {
       var arr = []
        this.goods.forEach((item)=>{
          var obj = {}
          obj.value = item.name,
          obj.address = item.id
          // obj = JSON.stringify(obj)
          arr.push(obj)
        })
        return arr 
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1200 * Math.random());
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
  },
  async created(){
    let {data:{data}} = await this.$hui.get("/goods/all?collection=category")
    
    this.category = data
    
  },
  async mounted(){
    let {data:{data}} = await this.$hui.get("/goods/all?collection=goodslist_all")
    console.log(data)
    this.goods = data
    this.restaurants = this.loadAll();

  }
};
</script>
<style  scoped>
.box {
  background: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
  
}
.title {
  height: 44px;
  padding-bottom: 5px;
  text-align: center;
  line-height: 44px;
  margin: 0;
  font-size: 18px;
  border-bottom: 1px solid #e5e5e5;
}
.tab-list {
  list-style: none;
  padding-left: 0;
  margin: 10px auto;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-items: space-between;
}
.tab-list li {
  width: 44%;
  height: 36px;
  line-height: 36px;
  background: #e5e5e5;
  text-align: center;
  margin-right: 10px;
  margin-top: 10px;
}
.el-tabs /deep/ .el-tabs__header {
  width: 28%;
  text-align: center;
  background: #f0f2f5;
  font-size: 16px;
}
.el-tabs>>>.el-tabs__content{
  overflow-y:scroll !important;
  height: 100%;
  padding-right: 5px;
}
.el-tabs >>> .active {
  background: #fff;
}
.el-tabs >>> .el-tabs__active-bar {
  display: none !important;
  
}
.el-tabs >>> .el-tabs__nav /deep/ .el-tabs__item {
  text-align: center;
  line-height: 58px;
  height: 58px;
}
.el-tabs >>> .is-active {
  background: #fff;
}
.ca-search {
  width: 80% !important;
  height: 38px;
  margin-bottom: 5px;
  border-radius: 10px;
}
.el-input /deep/ .el-input__inner {
  /* width: 300px !important; */
  border-radius: 10px !important;
  background: #e5e5e5;
}
.ca-search .el-input__inner {
  border-radius: 10px !important;
  /* width: 300px !important; */
}
.cate-title {
  padding: 10px;
}
.cate-title span {
  float: right;
}
.el-tabs__content{
  overflow-y:scroll;
}
.cate-ul {
  overflow: hidden;
  padding-left: 0;
  margin: 0;
  display:flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.cate-ul li {
  float: left;
  list-style: none;
  width: 24%;
  font-size: 12px;
  color: #555;
  text-align: center;
  margin-top: 10px;
  overflow:hidden;
  padding:0 7px;

}
.cate-ul li img{
  border-radius: 50%
}
</style>

    
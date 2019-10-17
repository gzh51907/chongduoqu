<template>
  <div class="box">
    <div class="title">
      <el-button class="el-icon-arrow-left" @click="goto('category')"></el-button>
      <el-autocomplete
        v-model="state"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入你要搜索的商品"
        @select="handleSelect"
        class="gd-search"
      ></el-autocomplete>
      <el-button class="el-icon-shopping-cart-2" @click="goto('cart')"></el-button>
    </div>
    <el-row class="gd-sort">
      <el-button plain @click="sort()">综合排序</el-button>
      <el-button plain @click="sort(isup,'sales_count')">销量排序</el-button>
      <el-button plain @click="sort(isup,'price')">价格排序</el-button>
    </el-row>
    <div class="goodlist" style="flex:1;">
      <el-row class="infinite-list goods-box" s v-infinite-scroll="load" style="overflow:auto padding:5px;" infinite-scroll-delay=1000 infinite-scroll-distance=400>
        <el-col v-for="item in goods" v-model="goods" class="infinite-list-item" :key="item.id" :span="11" style="margin:2%;padding:7px;border:1px solid #e5e5e5;border-radius:10px">
            <img :src="item.default_photo.thumb" alt="" style="max-width  :100%">
            <p style="font-size:12px;height:36px;overflow:hidden;line-height:18px;">{{item.name}}</p>
            <p style="color:orange;font-size:14px">￥{{item.current_price}}<del>{{item.price}}</del></p>
            <p  class="gs-info"><span>0%好评</span><span>销量{{item.sales_count}}</span><i class="el-icon-shopping-cart-full"></i></p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      goods:[],
      restaurants: [],
      state: '',
      timeout:  null,
      count:0,
      isup:true
    }
  },
  methods:{
    goto(url,id){
      this.$router.push({name:url,params:{id:id}})
    },
    loadAll() {
      return [
        { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
        { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
      ];
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    load () {
      this.count += 2
    },
    async sort(ud,query){
      let id = this.$route.params.id
      if(this.isup == true){
         let {data} = await this.$axios.get(`http://10.3.133.40:1907/goods/${id}/up?sort=${query}`)
         
         this.isup = !this.isup
         this.goods = data
      }else if(this.isup == false){
        let {data} = await this.$axios.get(`http://10.3.133.40:1907/goods/${id}/down?sort=${query}`)
         
         this.isup = !this.isup
         this.goods = data
      }else if(!ud){
        let {data:{data}} = await this.$axios.get(`http://10.3.133.40:1907/goods/${id}`)
        this.goods = data
      }

    },
    async sellsort(){

    }
  },
  async created(){
    let id = this.$route.params.id
    let {data:{data}} = await this.$axios.get(`http://10.3.133.40:1907/goods/${id}`)
    this.goods = data
    console.log(data)

  },
  mounted() {
    this.restaurants = this.loadAll();
  }
};
</script>
    
<style scoped>
.box {
  background: #fff;
  display: flex;
  height: 100%;
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
  display:flex;
  justify-content: space-between
}
.title .el-button{
  border:0;
  font-size: 22px;
}
.gd-search{
  width: 70%;
}
.ca-search .el-input__inner {
  border-radius: 10px !important;
}
.cate-title {
  padding: 10px;
}
.cate-title span {
  float: right;
}
.gd-sort{
    height: 46px !important;
    line-height:46px;
    /* background:skyblue; */
    display:flex;
    border:1px solid #e9e9e9;
}
.gd-sort .el-button{
    flex:1;
    border:0;
    border-radius: 0;
}

.goodlist{
  flex:1;
}
.gs-info{
  color:#999;
  font-size:10px;
  display:flex;
  justify-content: space-between;
  padding:0 10px;
}
.gs-info i{
  font-size: 14px;
  color:orange;
}
del{
  color:#999;
  padding-left:10px;
}
li{
    list-style: none;
}
p{
  margin:3px 0;
}
</style>
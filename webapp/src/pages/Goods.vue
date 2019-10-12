<template>
  <div class="box">
    <div class="title">
      <el-autocomplete
        v-model="state"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入你要搜索的商品"
        @select="handleSelect"
        class="gd-search"
      ></el-autocomplete>
    </div>
    <div class="gd-sort"></div>
    <div class="goodlist">
      <ul>
        <li></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {};
</script>
    
<style scoped>
.box {
  background: #fff;
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
    height: 46px;
    background:skyblue;
}
li{
    list-style: none;
}
</style>
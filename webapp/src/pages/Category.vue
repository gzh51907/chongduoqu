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
      <el-tab-pane :label="item.tabTitle" v-for="item in tab" :key="item.tabTitle" class="dis-tab">
        <div class="cate-item">
            <div class="cate-title">title<span>全部></span></div>
            <ul class="cate-ul">
                <li v-for="item in 10" :key="item">
                    <!-- <img src="" alt=""> -->
                    <div class="img"></div>
                    <span>衣服</span>
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
      tabPosition: "left",
      tab: [
        {
          tabTitle: "宠物服饰"
        },
        {
          tabTitle: "宠物服饰"
        },
        {
          tabTitle: "宠物服饰"
        },
        {
          tabTitle: "宠物服饰"
        },
        {
          tabTitle: "宠物服饰"
        },
        {
          tabTitle: "宠物服饰"
        },
        {
          tabTitle: "宠物服饰"
        },
        {
          tabTitle: "宠物服饰"
        },
        {
          tabTitle: "宠物服饰"
        }
      ],
      list: [
        "宠物服饰",
        "宠物服饰",
        "宠物服饰",
        "宠物服饰",
        "宠物服饰",
        "宠物服饰",
        "宠物服饰"
      ]
    };
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
.ca-search{
    width: 90% !important;
    height: 38px;
    margin-bottom: 5px;
    border-radius: 10px;
}
.el-input /deep/ .el-input__inner{
    border-radius: 10px !important;
    background:#e5e5e5;
}
.ca-search .el-input__inner{
    border-radius: 10px !important;
}
.cate-title{
    padding:10px;

}
.cate-title span{
    float: right;
}
.cate-ul{
    overflow: hidden;
    padding-left:0;
    margin:0;
}
.cate-ul li{
    float: left;
    list-style: none;
    width: 70px;
    height: 70px;
    background: skyblue;   
    margin-left: 5px;
    margin-top: 5px;
}

</style>
<template>
  <div class="box">
    <div id="001"></div>
    <el-carousel indicator-position="outside" height="260px">
      <el-carousel-item v-for="item in banner" :key="item">
        <img :src="item" style="width:100%" />
      </el-carousel-item>
    </el-carousel>
    <ul class="classify">
      <li v-for="item in classify" :key="item">
        <img :src="item" @click="gogoods(215)" />
      </li>
    </ul>
    <div class="floor-theme">
      <div class="left">
        <img src="../assets/img/quchufumao.jpg" alt />
      </div>
      <div class="right">
        <img src="../assets/img/gouniao.jpg" alt />
        <img src="../assets/img/yangnaifen.jpg" alt />
      </div>
    </div>
    <div v-for="ele in homelist" :key="ele.title">
      <h4>{{ele.title}}</h4>
      <el-row :gutter="20">
        <el-col
          :span="12"
          v-for="item in ele.data1"
          :key="item.id"
          style="height:300px"
          @click.native="goto(4165)"
        >
          <el-image style="width:100%" :src="item.default_photo.thumb" fit="contain"></el-image>
          <p class="name">{{item.name}}</p>
          <p class="price">
            <span>￥{{item.price}}</span>
          </p>
        </el-col>
      </el-row>
    </div>
    <a href="#001" class="totop el-icon-top" ref="gotop"></a>
  </div>
</template>
<script>
export default {
  data() {
    return {
      homelist: [
        {
          title: "每日精选",
          data1:[]
        },
        {
          title: "精品推荐",
          data1:[]
        }
        
      ],
      banner: [
        require("../assets/img/banner1.jpg"),
        require("../assets/img/banner2.jpg"),
        require("../assets/img/banner3.jpg"),
        require("../assets/img/banner4.jpg"),
        require("../assets/img/banner5.jpg")
      ],
      classify: [
        require("../assets/img/fushi.png"),
        require("../assets/img/wodian.png"),
        require("../assets/img/zhuliang.png"),
        require("../assets/img/lingsi.png"),
        require("../assets/img/wanju.png"),
        require("../assets/img/qingjie.png"),
        require("../assets/img/baojian.png"),
        require("../assets/img/huli.png")
      ]
    };
  },
  async created() {
    let {
      data: { data }
    } = await this.$hui.get(
      "/goods/all?collection=home_list"
    );
    this.homelist[0].data1 = data[0].recently_products.slice(0, 6);
    this.homelist[1].data1 = data[0].good_products.slice(0, 6);
    console.log(data[0].good_products.slice(0, 6));
    console.log(this.homelist[0].data1);
  },
  methods: {
    goto(id) {
      this.$router.push({ name: "detail", params: {id:id} });
    },
    gogoods(id){
      this.$router.push({ name: "goods", params: {id:id} });
    }
  }
};
</script>
    
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.box {
  background: #fff;
}
.classify {
  list-style: none;
  margin: auto;
  background: #fff;
  margin: 0 3%;
  margin-top: -35px;
  box-sizing: border-box;
  padding-left: 2%;
  overflow: hidden;
  padding-top: 15px;
  border-radius: 10px;
  box-shadow: 0 0 5px #ddd;
  margin-bottom: 20px;
  width: 94%;
}
.classify li {
  float: left;
  width: 24.5%;
  padding: 15px;
  box-sizing: border-box;
}
.classify li img {
  max-width: 100%;
}
.floor-theme {
  display: flex;
  height: 251px;
  margin-top: 20px;
  border-radius: 10px;
  margin: 0 3%;
  width: 94%;
  box-shadow: 0 0 5px #ddd;
}
.floor-theme .left {
  width: 50%;
}
.floor-theme .left img {
  width: 100%;
}
.floor-theme .right {
  width: 50%;
}
.floor-theme .right img {
  width: 100%;
}
h4 {
  text-align: center;
  line-height: 44px;
  background: #e7e6e6;
  font-weight: normal;
}
.price {
  text-align: center;
  color: red;
  margin-top: 5px;
}
.name {
  width: 100%;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 5px;
  font-size: 12px;
  line-height: 16px;
}
.totop {
  position: fixed;
  width: 40px;
  height: 40px;
  right: 10px;
  bottom: 65px;
  border-radius: 50%;
  color: #fff;
  font-size: 26px;
  text-align: center;
  background: rgb(78, 76, 76);
  opacity: 0.3;
}
</style>
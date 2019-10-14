<template>
  <div class="box">
    <div class="header">
      <div class="el-icon-message"></div>
      <div class="el-icon-setting"></div>
      <div class="headerimg">
        <div class="himg">
          <img src="../assets/img/default.png" alt />
        </div>
      </div>
      <el-col :span="24" class="loginreg">
        <el-button type="text" class="loginreg">登录/注册</el-button>
      </el-col>
    </div>
    <div class="content">
      <div class="info-wrapper">
        <el-col :span="12">
          <i class="el-icon-star-off"></i>
          <br />余额
        </el-col>
        <el-col :span="12">
          <i class="el-icon-tickets"></i>
          <br />积分
        </el-col>
      </div>
      <div class="main1">
        <div class="orderbox">
          <div class="order">我的订单</div>
          <div class="allorder">查看全部订单 <i class="el-icon-arrow-right"></i></div>
        </div>
        <ul>
          <li v-for="item in orderlist" :key="item.text">
            <i :class="item.icon"></i>
            <p>{{item.text}}</p>
          </li>
        </ul>
      </div>
      <div class="main2">
        <div class="bage">
          <p>我的钱包</p>
          <span>资金管理 <i class="el-icon-arrow-right"></i></span>
        </div>
        <div class="list"
        v-for="item in list"
        :key="item.text">
          <i :class="item.icon"></i>
          <p>{{item.text}}</p>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderlist: [
        {
          icon: "el-icon-news",
          text: "待付款"
        },
        {
          icon: "el-icon-printer",
          text: "待发货"
        },
        {
          icon: "el-icon-circle-plus-outline",
          text: "待收货"
        },
        {
          icon: "el-icon-tickets",
          text: "待评价"
        }
      ],
      list:[
        {
          icon:'el-icon-star-off',
          text:'我的收藏'
        },{
          icon:'el-icon-time',
          text:'我的红包'
        },{
          icon:'el-icon-location-outline',
          text:'收货地址'
        },{
          icon:'el-icon-picture-outline',
          text:'我的推荐'
        }
        ,{
          icon:'el-icon-date',
          text:'推广二维码'
        }
        ,{
          icon:'el-icon-tickets',
          text:'帮助中心'
        }
        
        ]
    };
  }
};
</script>
    
<style scoped>
.list{
  line-height: 44px;
  display: flex;
  box-sizing: border-box;
  padding: 0 10px;
  border-top: 1px solid #e7e4e4;
}
.list p{
  flex: 1;
  margin-left: 5px;
}
.list i{
  line-height: 44px;
}
.box {
  overflow-y: scroll;
}
.header {
  position: relative;
  height: 180px;
  margin-bottom: 26px;
  width: 100%;
  background: url(../assets/img/uer_header_bg.faa3f5b.png);
}
.content {
  width: 90%;
  margin: 0 auto;
  margin-top: -60px;
  position: relative;
  z-index: 11;
}
.el-icon-message {
  color: #ffffff;
  font-size: 28px;
  position: absolute;
  width: 44px;
  height: 44px;
  top: 11px;
  left: 11px;
}
.el-icon-setting {
  color: #ffffff;
  font-size: 28px;
  position: absolute;
  width: 44px;
  height: 44px;
  top: 11px;
  right: 11px;
  text-align: right;
}
.headerimg {
  padding-top: 30px;
}
.himg {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  margin: auto;
}
.himg img {
  width: 100%;
  height: 100%;
}
.loginreg {
  color: #ffffff;
  text-align: center;
  font-size: 16px;
}
.info-wrapper {
  height: 60px;
  width: 100%;
  border-radius: 10px;
  background: #ffffff;
  text-align: center;
  padding-top: 10px;
}
.info-wrapper i {
  font-size: 26px;
}
.main1,.main2 {
  background: #ffffff;
  width: 100%;
  margin-top: 20px;
  overflow: hidden;
  border-radius: 5px;
}
.orderbox {
  display: flex;
}
.order {
  padding-left: 10px;
  font-size: 16px;
  line-height: 44px;
  flex: 1;
}
.allorder {
  text-align: right;
  padding-right: 10px;
  font-size: 14px;
  line-height: 44px;
}
ul {
  width: 100%;
  display: flex;
  list-style: none;
  justify-content: space-around;
  padding-left: 0px;
  margin-top: 20px;
  margin-bottom: 15px;
}
li {
  flex: 1;
  text-align: center;
}
li i {
  font-size: 26px;
}
* {
  margin: 0;
  padding: 0;
}
.bage{
  display: flex;
}
.bage p{
  flex: 1;
  padding-left: 10px;
  font-size: 16px;
  line-height: 44px;
}
.bage span{
  flex: 1;
  text-align: right;
  padding-right: 10px;
  font-size: 14px;
  line-height: 44px;
}
</style>
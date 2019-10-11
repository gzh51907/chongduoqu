<template>
  <div class="box">
    <h3>
      <el-link class="regbtn el-icon-arrow-left" @click="goto('/reg')"></el-link>
      <span>注册协议</span>
    </h3>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    goto(url) {
      this.$router.push(url);
    }
  }
};
</script>
    
<style scoped>
.box {
  text-align: center;
  background-color: #f0f2f5;
}
h3 {
  height: 44px;
  line-height: 44px;
  text-align: center;
  background: #fff;
  margin: 0;
  font-weight: 500;
  padding: 0 15px;
  position: relative;
}
h3 span {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  line-height: 44px;
  color: #999;
}
.regbtn {
  font-size: 16px;
  float: right;
}
.el-icon-arrow-left {
  font-size: 20px;
  float: left;
  line-height: 44px;
}
</style>
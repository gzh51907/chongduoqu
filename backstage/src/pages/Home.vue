<template>
  <div class="bigbox">
    <h2>宠多趣后台管理系统</h2>
    <el-container>
      <el-aside width="200px" style="background:#545c64;">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item
            :title="item.text"
            :name="i"
            v-for="(item,i) in nav"
            :key="item.text"
            style="background:#545c64;border:0;"
          >
            <el-button
              type="text"
              v-for="ele in item.menus"
              :key="ele.text"
              @click="goto(ele.path)"
            >{{ele.text}}</el-button>
          </el-collapse-item>
        </el-collapse>
      </el-aside>
      <el-main>
        <div class="status">
          <div class="status-content">
            <el-button type="text" class="username">亲爱的{{user}}</el-button>
            <el-button type="text" class="exit" @click.native="goback()">退出</el-button>
          </div>
        </div>
        <div class="main-box">
          <div class="step-top">
            <el-steps :active="3" finish-status="success" simple style="margin-top: 10px">
              <el-step title="首页"></el-step>
              <el-step :title="step2" v-model="step2"></el-step>
              <el-step :title="step3" v-model="step3"></el-step>
            </el-steps>
          </div>
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeNames: ["1"],
      user: "",
      step2: "",
      step3: "",
      nav: [
        {
          text: "商品管理",
          menus: [
            {
              name: "goodslist",
              path: "/goodslist",
              text: "商品列表"
            },
            {
              name: "goodsadd",
              path: "/goodsadd",
              text: "添加商品"
            }
          ]
        },
        {
          text: "用户管理",
          menus: [
            {
              name: "userlist",
              path: "/userlist",
              text: "用户列表"
            },
            {
              name: "useradd",
              path: "/useradd",
              text: "添加用户"
            },
            {
              name: "usermanage",
              path: "/usermanage",
              text: "管理人员"
            }
          ]
        },
        {
          text: "订单管理",
          menus: [
            {
              name: "listmenus",
              path: "/listmenus",
              text: "订单列表"
            }
          ]
        }
      ]
    };
  },
  watch: {
    $route() {
      this.nav.forEach(item => {
        item.menus.forEach((ele, i) => {
          if (this.$route.name == ele.name) {
            this.step3 = ele.text;
            this.step2 = item.text;
          }
        });
      });
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    goto(url) {
      this.$router.push(url);
    },
    handleChange(val) {
      console.log(val);
    },
    goback() {
      console.log(22222);
      this.$store.state.common.show = false;
      localStorage.clear();
    }
  },
  async created() {
    this.user = localStorage.getItem("user");
    console.log(this.user, this.$route);
    //   let {data} = await this.$axios.get("http://10.3.133.40:1907/goods/all?collection=goods_2")
    //   console.log(data)

    //判断步骤条

    this.nav.forEach(item => {
      item.menus.forEach((ele, i) => {
        if (this.$route.name == ele.name) {
          this.step3 = ele.text;
          this.step2 = item.text;
        }
      });
    });
  }
};
</script>
<style scoped>
.bigbox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* background:skyblue; */
}
h2 {
  padding: 10px 20px;
  background: #545c64;
  font-size: 30px;
  margin: 0;
  line-height: 50px;
  height: 50px;
  color: #fff;
}
.el-collapse /deep/ .el-collapse-item {
  background: #545c64 !important;
}
.el-collapse /deep/ .el-collapse-item div {
  background: #545c64 !important;
  color: #fff;
  padding-left: 10px;
  padding-right: 5px;
}
.el-collapse-item >>> .el-collapse-item__wrap {
  border: 0 !important;
}
.el-collapse-item >>> .el-collapse-item__header {
  border: 0;
}
.el-collapse-item .el-button {
  display: block;
  text-align: center;
  color: #fff;
  margin-left: 10px;
}
.status {
  height: 50px;
  background: #e9e9e9;
}
.status-content {
  padding-right: 20px;
  float: right;
}
.status-content .el-button {
  padding: 0;
  height: 50px;
  line-height: 50px;
}
.status-content .el-button span {
  height: 50px;
  line-height: 50px;
}
.el-main {
  padding: 0;
}
.main-box {
  /* border:2px dashed skyblue; */
  width: 100%;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04) */
}
</style>
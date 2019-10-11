<template>
  <div class="box">
    <h3>
      <el-link class="regbtn el-icon-arrow-left"></el-link>
      <span>登录</span>
      <el-link class="regbtn" @click="goReg()">快速注册</el-link>
    </h3>
    <img src="../assets/login.png" class="loginimg" />
    <div class="login-box">
      <div class="ip">
        <i class="el-icon-user"></i>
        <el-input placeholder="用户名/邮箱号/手机号"></el-input>
      </div>
      <div class="ip">
        <i class="el-icon-key"></i>
        <el-input placeholder="请输入密码" show-password></el-input>
      </div>
    </div>
    <el-button type="warning" @click="loginBtn()" class="login">登录</el-button>
  </div>
</template>
<script>
export default {
  data() {
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };

    return {
      ruleForm: {
        pass: "",
        username: "",
        mdl: true
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: checkUsername, trigger: "blur" }]
      }
    };
  },
  methods: {
    async loginBtn() {
      let { username, pass, mdl } = this.ruleForm;
      let { data } = await this.$axios.get("http://localhost:1907/user/login", {
        params: {
          username,
          password: pass,
          mdl
        }
      });
      if (data.code == 1) {
        let { targetUrl } = this.$route.query;
        this.$router.replace({
          path: targetUrl || "/mine"
        });
        localStorage.setItem("Authorization", data.data);
      } else {
        alert("用户名或密码不正确");
      }
    },
    goReg(){
        this.$router.push("/reg")
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
.loginimg {
  margin: 50px auto;
  display: block;
}
.login-box {
  width: 95%;
  height: 125px;
  margin: 0 auto;
  background: #ffff;
  border-radius: 5px;
  padding-top: 1px;
  margin-top: -20px;
}

.ip {
  background: #f3f3f3;
  height: 45px;
  line-height: 45px;
  margin: 10px auto;
  border-radius: 5px;
  width: 95%;
  border:1px solid #e5e5e5;
}
.el-input{
    width: 80%;
    box-sizing: border-box;
}
.el-input>>>.el-input__inner{
    border:0;
    background-color: #f3f3f3 !important;
    height: 45px;
    line-height: 45px;
    box-sizing: border-box;
    color:#e5e5e5;
}
.el-button {
  width: 95%;
  height: 44px;
  margin: 20px auto;
  background: #f56c02;
}
</style>
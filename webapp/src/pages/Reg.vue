<template>
  <div class="box">
    <h3>
      <el-link class="regbtn el-icon-arrow-left" @click="goto('/login')"></el-link>
      <span>注册</span>
    </h3>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="20px"
      class="demo-ruleForm"
    >
      <div class="ip username">
        <el-form-item label prop="username">
          <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
        </el-form-item>
      </div>
      <el-alert title="用户名为3-25位，可以包含英文与数字" type="info" :closable="false"></el-alert>
      <div class="ip pass">
        <el-form-item label prop="pass">
          <el-input type="password" v-model="ruleForm.pass" placeholder="设置密码"></el-input>
        </el-form-item>
      </div>
      <div class="ip checkPass">
        <el-form-item label prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" placeholder="确认密码"></el-input>
        </el-form-item>
      </div>
      <el-alert title="6-20位数字/字母/符号" type="info" :closable="false"></el-alert>
      <div class="ip email">
        <el-form-item label prop="email">
          <el-input type="e-mail" v-model="ruleForm.email" placeholder="邮箱地址"></el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="warning" @click="regbtn()" class="reg-submit">注册</el-button>
      </el-form-item>
    </el-form>
    <div class="warning">
      <span class="left-text">点击注册表示同意</span>
      <span class="right-text" style="color:#f56c02" @click="goto('/agreement')">《用户协议》</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }

      setTimeout(async () => {
        let {
          data: { data }
        } = await this.$hui.get("/user/check", {
          params: {
            username: this.ruleForm.username
          }
        });
        if (data.length != 0) {
          callback(new Error("该用户名已存在"));
          this.ruleForm.usernameExit = true; //true则存在，false则不存在
        }
        if (data.length == 0) {
          this.ruleForm.usernameExit = false;
        }
      }, 1200);
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
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    //邮箱校验--未完成
    var checkEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("邮箱不能为空"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        username: "",
        usernameExit: "",
        email: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        username: [{ validator: checkUsername, trigger: "blur" }],
        email: [{ validator: checkEmail, trigger: "blur" }]
      }
    };
  },
  methods: {
    goto(url) {
      this.$router.push(url);
    },
    async regbtn() {
      if (
        this.ruleForm.usernameExit == false &&
        this.ruleForm.pass == this.ruleForm.checkPass &&
        this.ruleForm.username.length != 0 &&
        this.ruleForm.pass.length != 0 &&
        this.ruleForm.email.length != 0
      ) {
        
        let { data } = await this.$hui.post(
          "/user/reg",
          {
            username: this.ruleForm.username,
            password: this.ruleForm.pass,
            email: this.ruleForm.email
          }
        );
        //注册成功，跳转到登录页面
        alert("注册成功");
        setTimeout(() => {
          this.$router.push("/login");
        }, 2000);
      }else {
        alert("注册失败");
      }
    }
  },
  async created() {}
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
.ip {
  background-color: #fff;
  padding-right: 20px;
}
.el-input >>> .el-input__inner {
  border: 0;
}
.username {
  margin-top: 20px;
}
.el-form-item {
  margin-bottom: 0;
}
.el-button {
  width: 95%;
  height: 44px;
  margin-top: 20px;
  background: #f56c02;
}
.el-form-item >>> .el-form-item__content {
  width: 100%;
  margin: 0 auto !important;
  text-align: center;
  margin-left: 0px !important;
}
.el-alert {
  padding: 12px;
}
.warning {
  padding-top: 15px;
  text-align: center;
  font-size: 14px;
  color: #c3c3c3;
}
</style>
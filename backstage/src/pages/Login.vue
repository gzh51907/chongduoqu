<template>
  <div class="box">
    <div class='logo'><img src="" alt=""></div>
    <div id="login">
      <h2>后台管理系统</h2>
      <div class="form">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="80px"
          class="demo-ruleForm"
        >
          <div class="ip">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
          </div>
          <div class="ip">
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
          </div>
          <div class="ip remenber">
             <el-checkbox v-model="checked">记住密码</el-checkbox>
             <span>忘记密码?</span>
          </div>
          <el-form-item>
            <el-button type="success" @click="loginBtn()" class="regbtn">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
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
      checked:false,
      ruleForm: {
        pass: "",
        username: "",
        mdl: true,
        
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
      let { data } = await this.$hui.get("/user/login", {
        params: {
          username,
          password: pass,
          mdl
        }
      });
      
       
      if (data.code==1) {
        
        if(this.checked == true){
          
        localStorage.setItem("Authorization", data.data); 
        localStorage.setItem("user", this.ruleForm.username); 
        this.$store.state.common.show = true
        this.$store.state.common.user = this.ruleForm.username;
        }else if(this.checked == false){
          localStorage.setItem("user", this.ruleForm.username); 
          this.$store.state.common.show = true
          this.$store.state.common.user = this.ruleForm.username;
        }
 
      } else {
        alert("用户名或密码不正确");
        this.$store.state.common.show = false
      }
    }
  },
  created(){
    let Authorization = localStorage.getItem("Authorization");
    if(Authorization){
      this.$store.state.common.show = true
    }
  }
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
  position: relative;
  background: #545c64;
}
#login {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 500px;
  background: #999;
  color:#fff;
  box-shadow: 0 2px 6px #fff, 0 0 6px#fff;
  border-radius: 20px;
}
h2 {
  text-align: center;
  font-size: 26px;
}
.form {
  width: 500px;
  height: 300px;
  background: #f3f3f3;
  margin: 20px auto;
  padding: 20px;
  border-radius: 20px;
  
}
.el-form{
    width: 90%;
    margin:0 auto;
    font-size: 12px;
}
.ip{
    margin-top: 20px;
    height: 45px;
    line-height: 45px;
    padding-top: 14px;
}
.el-form-item{
    margin-bottom: 0;
    line-height: 45px;
}
.el-form-item>>>.el-input__inner{
    border:0 !important;
}
.el-form>.el-form-item>>>.el-form-item__content{
    margin-left:0 !important;
    margin-top: 15px;
}
.el-button{
    width: 82%;
    float:right;
    margin-top: 10px;
}
.remenber{
  padding-left: 80px;
  height: 30px;
  line-height: 30px;
  padding-top: 10px;
  margin-top:0;
}
.remenber span{
  float:right;
  color:skyblue;
}
</style>
<template>
  <div class="box">
    <div class="form">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      > 
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        
        <el-form-item label="密码:" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="btn()">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {

    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("昵称不能为空"));
      }else{
          callback()
      }
    };
    var checkUsername2 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("昵称不能为空"));
      }else{
          callback()
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
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else {
        callback();
      }
    };
   
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        username: "",
        
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        username: [{ validator: checkUsername, trigger: "blur" }],
        
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async btn(){
        let has = await this.$axios.get(`http://10.3.133.40:1907/user/managecheck?username=${this.ruleForm.username}`)
        console.log(has.data)
        if(has.data.code==0){
            alert('用户名已存在')
        }else if(has.data.code==1){
            if(this.ruleForm.pass != this.ruleForm.checkPass){
                alert("两次输入密码不一致")
            }else{
                let {data} = await this.$axios.post('http://10.3.133.40:1907/user/managereg',{
                    username:this.ruleForm.username,
                    password:this.ruleForm.pass
                });
                alert("插入成功")
                console.log('data:',data)
            }
        }
        
    }
  },
  created(){

      
  }
};
</script>
<style scoped>
    .form{
        width: 60%;
        margin:30px;
    }

</style>
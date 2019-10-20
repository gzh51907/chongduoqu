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
        
        <el-form-item label="昵称:" prop="username2">
          <el-input v-model="ruleForm.username2"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号:" prop="phone" style="width:50%">
          <el-input v-model.number="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址:" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
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
    
    var checkEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("邮箱不能为空"));
      } else {
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("手机号不能为空"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        username2: "",
        email:"",
        phone:"",
        username:""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        username2: [{ validator: checkUsername2, trigger: "blur" }],
        email: [{ validator: checkEmail, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }]
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
        let {data} = await this.$hui.post("/user/change",{
            username2:this.ruleForm.username2,
            password:this.ruleForm.pass,
            email:this.ruleForm.email,
            phone:this.ruleForm.phone,
            username:this.$route.params.paname
        })

        //判断是否成功
        if(data.code==1){
            alert("插入成功")
        }else{
            alert("插入失败")
        }
    }
  },
  async created(){
      let username = this.$route.params.paname
      let {data:{data}} = await this.$hui.get(`/user/check?username=${username}`)
      
      data = data[0]
        this.ruleForm.username2 = data.username2
        this.ruleForm.username = data.username
        this.ruleForm.pass =data.password
        this.ruleForm.email= data.email
        this.ruleForm.phone = data.phone

  }
};
</script>
<style scoped>
    .form{
        width: 50%;
        margin:30px;
    }

</style>
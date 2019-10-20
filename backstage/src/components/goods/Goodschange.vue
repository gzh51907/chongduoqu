<template>
  <div class="box">
    <div class="form" s>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        
      > 
        <el-form-item label="商品名称:" prop="productname" >
          <el-input v-model="ruleForm.productname" ></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="11">
            <el-form-item label="原价:" prop="price">
                <el-input v-model="ruleForm.price"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
              <el-form-item label="销售价格:" prop="current_price">
                <el-input v-model="ruleForm.currentprice"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="width:120%">
            <el-col :span="11">
                <el-form-item label="库存:" prop="kucun">
                    <el-input  v-model="ruleForm.kucun" autocomplete="off"></el-input>
                </el-form-item>    
            </el-col>
        </el-row>
        
        <el-row>
            <el-col  :span="4" style="padding-left:60px;font-size: 14px;color: #606266;">商品图片:</el-col>
            <el-col  :span="4" style="margin:0 5px;border:1px dashed skyblue;width:144px" >
                <img width="100%" :src="majorurl" alt="">
            </el-col>
            <el-col class="img-wall" style="margin-bottom:20px;" :span="15">  
                    <el-upload
                        :limit="3"  
                        :action="uploadurl()"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :on-success="handleSuccess"
                        :on-exceed ="overcount">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>        
                
                
            </el-col>    
        </el-row>
        
        <el-form-item label="商品描述:" prop="info">
            <el-input type="textarea" v-model="ruleForm.info" autocomplete="off"></el-input>
        </el-form-item> 
        
        <el-form-item>
          <el-button type="primary" @click="btn()">修改</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {

    var checkproductname = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("商品名称不能为空"));
      }else{
          callback()
      }
    };
    var checkprice = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("价格不能为空"));
      }else{
          callback()
      }
      
    };
    var checkcurruntkprice = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("价格不能为空"));
      }else{
          callback()
      }
      
    };
    
    var checkkucun = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("库存不能为空"));
      } else {
        callback();
      }
    };
    return {
        majorurl:"",
        ruleForm: {
          currentprice: "",
          info:"",
          productname: "",
          price: "",
          kucun:"",
          putid:20002
        },
        rules: {
          currentprice: [{ validator: checkcurruntkprice, trigger: "blur" }],
          productname: [{ validator: checkproductname, trigger: "blur" }],
          price: [{ validator: checkprice, trigger: "blur" }],
          kucun: [{ validator: checkkucun, trigger: "blur" }],
        },
        dialogImageUrl: '',
        dialogVisible: false,
        cate:[{
          num:1,
          text:"宠物服饰"
        },{
          num:1,
          text:"宠物窝垫"
        },{
          num:1,
          text:"宠物主粮"
        },{
          num:1,
          text:"宠物零食"
        },{
          num:1,
          text:"宠物玩具"
        },{
          num:1,
          text:"宠物清洁"
        },{
          num:1,
          text:"宠物生活"
        },{
          num:1,
          text:"护理美容"
        },{
          num:1,
          text:"宠物出行"
        },]
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
        // {name,price,currentprice,majorimg,kucun,info,sellcount,id,brand}
        
        // console.log(this.ruleForm.productname,this.ruleForm.price,this.ruleForm.info)
        let {data} = await this.$hui.post("/goods/change",{
            psname:this.ruleForm.productname,
            price:this.ruleForm.price,
            currentprice:this.ruleForm.currentprice,
            majorimg:this.ruleForm.majorurl,
            info:this.ruleForm.info,
            kucun:this.ruleForm.kucun,
        })
        //会有bug，待修复
        var randomNum = (Math.random()*50000+1).toFixed(0)
        this.ruleForm.putid+=randomNum
        console.log(data)

        //判断是否成功
        if(data.code==1){
            alert("插入成功")
        }else{
            alert("插入失败")
        }
        
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        console.log(this.dialogImageUrl)
    },
    handleSuccess(a,url,c){
        console.log(url)
        this.major = url.url
    },
    uploadurl(){
        return "https://jsonplaceholder.typicode.com/posts/"
    },
    overcount(){
        alert("最多只能上传三张图片")
    }
  },
  async created(){
      
      let keyword = this.$route.params.paname
      let {data:{data}} = await this.$hui.get(`/goods/keyword?keyword=${keyword}`)
      data = data[0]
        this.ruleForm.currentprice = data.current_price
        this.ruleForm.info =data.goods_brief
        this.ruleForm.productname= data.name
        this.ruleForm.price = data.price
        this.ruleForm.kucun =data.kucun
        this.majorurl = data.default_photo.thumb
      
  }
};
</script>
<style scoped>
    .form{
        width: 70%;
        margin:30px;
    }

</style>
<template>
    <div class="box">
        <h3>购物车</h3>
        <el-row style="background:#fafafa;margin-top:10px;" v-for="(item,idx) in showgoods" :key="item.id">
            <el-col :span="2" style="position:realitive;height:100%;">
                <input type="checkbox" class="cbox" :checked="item.true" >
            </el-col>
            <el-col :span="19">
                <van-card
                    :num="item.qty"
                    :price="item.price"
                    desc="描述信息"  
                    :title="item.name"
                    :thumb="item.img"
                    >
                    
                    <div slot="footer">
                        <el-input-number v-model="item.qty" @change="handleChange" :min="1" :max="Number(item.kucun)" size="small" label="描述文字"></el-input-number>
                    </div>
                </van-card>
            </el-col>
            <el-col :span="3" style="position:relative">
                <el-button type="danger" icon="el-icon-delete" circle size="mini" class="deletebtn" @click="remove(idx)"></el-button>
            </el-col>
        </el-row>
        
        <van-submit-bar
        :price="totalPrice*100"
        button-text="提交订单"
        @submit="onSubmit"
        >
        <van-checkbox v-model="checked" @change="isall()">全选</van-checkbox>
        <span slot="tip">
            你的收货地址不支持同城送, <span>修改地址</span>
        </span>
        </van-submit-bar>
    </div>

</template>
<script>
export default {
  data() {
    return {
      result: [],
      checked:false,
      num:1,
      goodslist:[]
    }
  },
  computed:{
      cartlist(){
          return this.$store.state.cart.cartlist
      },
      totalPrice(){
        let num = 0  
        this.goodslist.forEach((item)=>{
            num+=Number(item.price)*item.qty
        })
        return num
      },
      all(){
          return this.isall()
      },
      showgoods(){
          return this.goodslist
      }
  },
  methods: {
    // checkAll() {
    //   this.$refs.checkboxGroup.toggleAll(true);
    // },
    // toggleAll() {
    //   this.$refs.checkboxGroup.toggleAll();
    // },
    async onSubmit(){
        let user = localStorage.getItem('user')
        this.goodslist.forEach(async(item,i)=>{
            let {res} = await this.$hui.post('/list/addlist',{
                user:user,
                qty:this.goodslist[i].qty,
                product:this.goodslist[i].name,
                totalprice:this.goodslist[i].qty*Number(this.goodslist[i].price)
            })
            // console.log(res)
        })
        
        setTimeout(()=>{
            this.$router.push("/home")
            this.goodslist = []
        },1000)
    },
    isall(){
        if(this.checked==true){
            this.$store.state.cart.cartlist.forEach(item=>item.checked = true)
            
        }else if(this.checked==false){
            this.$store.state.cart.cartlist.forEach(item=>item.checked = false)
        }
        console.log(this.$store.state.cart.cartlist)
    },
    async handleChange(value) {
        let user = localStorage.getItem('user')
        let {data} = await this.$hui.post('/list/changeqty',{
            user:user,
            cart:this.goodslist
        })
        console.log(this.goodslist);
    },
    async remove(idx){
        this.goodslist.splice(idx,1)
        console.log(this.goodslist)
        let user = localStorage.getItem('user')
        let {data} = await this.$hui.post('/list/changeqty',{
            user:user,
            cart:this.goodslist
        })
    },
    async getData(){
  
    }

  },
   async created(){
    //    console.log(this.$refs.checkboxGroup)
    console.log(this.$store.state.cart.cartlist)
    //    console.log(this.totalPrice)
    let user = localStorage.getItem("user")
    if(user){
        let {data:{data}} = await this.$hui.get(`/cart/keyword?user=${user}`,)
        // data = cart
        this.goodslist = data[0].cart
        console.log(this.goodslist)
    }

    
    
    
   }
}
</script>
    
<style scoped>

.van-submit-bar{
    bottom:50px !important;
}
h3{
    margin:0;
    background:#f56c02;
    text-align: center;
    color:#fff;
    height:50px;
    line-height: 50px;
}
.van-submit-bar button{
    background:#f56c02;
    border-color: #f56c02;
}
.van-card__bottom{
    font-size: 16px;
}
.van-card__title,.van-card__desc{
    font-size: 14px;
}

.van-icon{
    border-color:#555 !important;
}
.van-card__footer{
    margin-top: -20px;
}
.van-card__bottom{
    padding-right: 10px;
}
.cbox{
    margin-top: 45px;
    margin-left: 10px;
    border-radius: 50%;
    width: 16px;
    height: 16px;
}
.van-checkbox{
    padding-left: 10px;
}
.deletebtn{
    margin-top: 40px;
}
</style>
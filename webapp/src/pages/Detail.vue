<template>
  <div class="goods">
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="thumb in goods.thumb" :key="thumb">
        <img :src="thumb" >
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ goods.title }}</div>
        <div class="goods-price">{{ goods.price}}</div>
      </van-cell>
      <van-cell class="goods-express">
        <van-col span="10">运费：{{ goods.express }}</van-col>
        <van-col span="14">剩余：{{ goods.kucun }}</van-col>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell value="进入店铺" icon="shop-o" is-link @click="sorry">
        <template slot="title">
          <span class="van-cell-text">有赞的店</span>
          <van-tag class="goods-tag" type="danger">官方</van-tag>
        </template>
      </van-cell>
      <van-cell title="线下门店" icon="location-o" is-link @click="sorry" />
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell title="查看商品详情" is-link @click="sorry" />
    </van-cell-group>

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" @click="sorry">
        客服
      </van-goods-action-icon>
      
      <van-goods-action-icon icon="cart-o" @click="add2cart()">
        购物车
      </van-goods-action-icon>
      
      <van-goods-action-button type="warning" @click="gocart()">
        加入购物车
      </van-goods-action-button>
      <van-goods-action-button type="danger" @click="sorry">
        立即购买
      </van-goods-action-button>
    </van-goods-action>
  </div>
</template>

<script>

export default {
  
  data() {
    return {
      cartgoods:{},
      targetid:"",
      goods: {
        title:'',
        price:'',
        express: '免运费',
        kucun:999,
        thumb: [
          'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
          'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg'
        ]
      }
    };
  },
  methods: {
    formatPrice() {
      return '¥' + (this.goods.price / 100).toFixed(2);
    },
    onClickCart() {
      this.$router.push('cart');
    },
    sorry() {

    },
    gocart(){
      this.$router.push("/cart")
    },
    async add2cart(){
      // this.$store.commit('add2cart',this.cartgoods)
      // 判断当前商品是否已经存在购物车
      let id = this.cartgoods.id
      let currentGoods = this.$store.state.cart.cartlist.filter(item=>item.id===id)[0]
      if(currentGoods){
          // 存在：修改商品数量
          let qty = currentGoods.qty+1;
          this.$store.commit('changeQty',{id,qty});
      }else{
          // 添加一个商品
          
          this.$store.commit('add2cart',this.cartgoods)
          
      }
      let user = localStorage.getItem('user')
      if(user){
        let {data} = await this.$hui.post('/cart/add2cart',{
          user:user,
          cart:this.$store.state.cart.cartlist
          
        })
        console.log(data)
      }
      
    },
    async getData(id){
      let {data:{data}} = await this.$hui.get(`/list/${id}`)
          data = data[0]
          this.goods.title = data.name
          this.goods.price = data.price
          this.goods.kucun = 999
          this.goods.thumb[0] = data.default_photo.thumb
          data.checked = true
          data.qty = 1

          let goods = data
          this.cartgoods = goods
          console.log(this.cartgoods)
    }
  },
  // beforeRouteUpdate(to,from,next){
  //     console.log('beforeRouteUpdate:',to,from);
  //     if(to.params.id != from.params.id){
  //         this.getData(to.params.id);
  //     }
  //     next();
  // },
  created(){
    let id = this.$route.params.id
    this.getData(id)
    console.log(id)
    
    
  }
};
</script>

<style lang="less">
.goods {
  padding-bottom: 50px;
  &-swipe {
    img {
      width: 100%;
      display: block;
    }
  }
  &-title {
    font-size: 16px;
  }
  &-price {
    color: #f44;
  }
  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }
  &-cell-group {
    margin: 15px 0;
    .van-cell__value {
      color: #999;
    }
  }
  &-tag {
    margin-left: 5px;
  }
}

</style>
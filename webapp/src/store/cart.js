import axios from 'axios';

export default{
    state:{
        category:"",                                                                                                                                                                           
        id:[],
        cartlist:[],
        render:[],
    },
    getters:{
        cartlength(state){
            return state.cartlist.length;
        },
         totalPrice(state){
            return state.cartlist.reduce((prev,item)=>prev+item.price*item.qty,0)
        },
        carnum(state){
            return state.cartlist
        },
        removeFromCart(state,id){
            state.cartlist = state.cartlist.filter(item=>item.id!=id);
          },
    },
    mutations:{
        add2cart(state,goods){
            state.cartlist.unshift(goods);
        },
          removeFromCart(state,id){
            state.cartlist = state.cartlist.filter(item=>item.id!=id);
        },
          clearCart(state){
            state.cartlist = [];
        },
        changeQty(state,{id,qty}){
            console.log('changeQty:',id,qty)
          state.cartlist.forEach(item=>{
              if(item.id === id){
                  item.qty = qty;
              }
          })
        }
    },
    actions:{
        
    }, 
    
}
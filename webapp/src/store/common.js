import axios from 'axios';

export default{
    state:{
        category:"",
    },
    getters:{

    },
    mutations:{

    },
    actions:{
        async getCategory(){
            let {data:{data}} = await axios.get("http://10.3.133.40:1907/goods/all?collection=category")
            return data
        }
    }, 
    async created(){
        let {data:{data}} = await this.$axios.get("http://10.3.133.40:1907/goods/all?collection=category")
            this.category = data
    }
}
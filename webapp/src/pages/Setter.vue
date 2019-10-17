<template>
    <div class="box">
        <h3><i class="el-icon-arrow-left" @click="go('/mine')"></i>设置</h3>
        <el-button type="danger" @click="goback('/mine')">退出</el-button>
    </div>
</template>>
<script>
export default{
    data(){
        return{

        }
    },
    methods:{
        go(url){
            this.$router.push(url)
        },
        goback(url){
            this.$router.push(url)
            localStorage.clear()
        }
    }

}



</script>
<style scoped>
.box{
    height: 100%;
    position: relative;
}
h3{
    text-align: center;
    background:#fff;
    height: 50px;
    line-height: 50px;
    margin:0;
}
h3 i{
    float:left;
    padding-left: 15px;
    line-height: 50px;
}
.el-button{
    width: 100%;
    padding:15px;
    position: absolute;
    bottom: 0;
    text-align: center;
}
</style>
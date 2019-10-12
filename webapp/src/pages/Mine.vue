<template>
    <div class="box" ref="box">
        <h1>个人</h1>
    </div>

</template>
<script>
export default {
    mounted(){
        console.log(this.$refs.box)
        this.$refs.box.style.backgroundColor="red"
    }
}
</script>
    
<style scoped>

</style>
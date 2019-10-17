<template>
  <div class="box">
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      lazy:true
      height="500"
      
      highlight-current-row
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column width="60" type="index"></el-table-column>
      <el-table-column prop="username" label="用户名" width="120"></el-table-column>
      <el-table-column prop="username2" label="昵称" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="phone" label="手机号" show-overflow-tooltip></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: []
    };
  },

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
      console.log(index, row);
      let paname = row.username
      this.$router.push({name:"userchange",params:{paname}})
    },
    async handleDelete(index, row) {
      console.log(index, row);
      this.tableData.splice(index,1)
      console.log(row.username)

      let {data} = await this.$axios.post("http://10.3.133.40:1907/user/delback",{
        username:row.username
      })
    }
      
  },
  async created(){
      let {data:{data}} = await this.$axios.get("http://10.3.133.40:1907/user/all")
      console.log(data)
      var userO={}
      data.forEach((item,i)=>{
        userO.username=item.username
        userO.username2=item.username2
        userO.phone=item.phone
        userO.email=item.email
        userO.password=item.password
        this.tableData.push(item)
        
      })

      this.tableData.forEach((item,i)=>{
        if(item.email==null){
          item.email="无"
        }
        if(item.phone==null){
          item.phone="没买手机"
        }
        if(item.username2==null){
          item.username2="无"
        }
      })
      console.log(this.tableData)
     
  }
};
</script>
<style scoped>
.block{
  margin:40px auto;
  text-align: center;
}
.el-table{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  margin-top: 20px;
  
}
.el-table__header /deep/ tr{
  background:skyblue !important;
}
</style>
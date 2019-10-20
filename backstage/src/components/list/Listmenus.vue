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
      
      :default-sort = "{prop: 'date', order: 'descending'}"
      highlight-current-row
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column width="60" type="index"></el-table-column>
      <el-table-column prop="product" label="商品名称" width="200"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column prop="yunfei" label="运费" width="120">10元</el-table-column>
      <el-table-column prop="qty" label="数量(件)" width="100"></el-table-column>
      <el-table-column prop="totalprice" label="订单总价" width="100"></el-table-column>
      <el-table-column
      prop="date"
      label="日期"
      sortable
      width="240">
    </el-table-column>
      <!-- <el-table-column prop="date" label="日期" width="180"></el-table-column> -->
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
          size="mini"
          ype="success"
          @click="handleEdit(scope.$index, scope.row)" t>编辑</el-button>
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

      let {data} = await this.$hui.post("/list/delback",{
        product:row.product
      })
    }
      
  },
  async created(){
      let {data:{data}} = await this.$hui.get("/list/all")
      console.log(data)
      var userO
      data.forEach((item,i)=>{
        userO={}
        userO.username=item.username
        userO.product=item.product
        userO.totalprice=item.totalprice+'元'
        userO.qty=item.qty
        userO.date = "2019-10-19"
        this.tableData.push(userO)
        
      })

      this.tableData.forEach((item,i)=>{
        if(item.qty==null){
          item.qty="无"
        }
        if(item.totalprice==null){
          item.totalprice="没买手机"
        }
        if(item.product==null){
          item.product="无"
        }
      })
      console.log(this.tableData)
     
  }
};
</script>

<style scoped>
.el-table>>>.cell{
  text-align: center;
}
.el-table>>>td{
  height: 48px !important;
}
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
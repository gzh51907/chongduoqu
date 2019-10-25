<template>
  <div class="box">
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      lazy:true
      height="400"
      
      highlight-current-row
    > 
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column width="60" type="index"></el-table-column>
      <el-table-column prop="name" label="商品名称" show-overflow-tooltip width="300"></el-table-column>
      <el-table-column prop="current_price" label="价格(原价)" width="140"></el-table-column>
      <el-table-column prop="price" label="价格(现价)" width="140"></el-table-column>
      <el-table-column prop="kucun" label="库存(件)" width="140"></el-table-column>
      <el-table-column fixed="right" label="操作" show-overflow-tooltip width="240">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" >删除</el-button>
          <!-- <el-button size="mini" @click="handleUpDown(scope.$index, scope.row)" ref="isup" v-model="isup">{{isup?"上架":"下架"}}</!-->
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="1020"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      currentPage3: 1,
      isup:true,
      psname:"",
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
      console.log(index, row,this.$route);
      let paname = row.name
      this.$router.push({name:"goodschange",params:{paname}})
    },
    handleUpDown(index, row) {
      // console.log(index, row);
      // this.isup = !this.isup
    },
    async handleDelete(index, row) {
      console.log(index, row);
      this.tableData.splice(index, 1);
      console.log(row.username);

      let { data } = await this.$hui.post(
        "/user/delback",
        {
          username: row.username
        }
      );
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    async handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.tableData = [];
      let page = val*10+"";
      console.log(page)
      let {data: { data }} = await this.$hui.get(`/goods/pages?collection=goodslist_all&limit=10&skip=${page}`);
      
      data.forEach((item) => {
        var userO = {};
        userO.name = item.name;
        userO.current_price = item.current_price+"元";
        userO.price = item.price+" 元";
        userO.kucun = item.kucun+" 件";
        this.tableData.push(userO);
      });
      console.log(data)
    },
    goto(url){
      this.$router.push(url)
    }
  },
  watch:{
    
  },
  async created() {
    let {
      data: { data }
    } = await this.$hui.get("/goods/pages?collection=goodslist_all&limit=10&skip=10");
    // console.log(data);
    
    data.forEach((item, i) => {
        var userO = {};
        userO.name = item.name;
        userO.current_price = item.current_price+"元";
        userO.price = item.price+" 元";
        userO.kucun = item.kucun+" 件";
        this.tableData.push(userO);
      });

    
    
   
    
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
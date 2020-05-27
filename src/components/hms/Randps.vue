<template>
  <div>
    <el-table :data="randps.filter(data => !search || data.sname.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <el-table-column prop="sid" label="员工号">
      </el-table-column>
      <el-table-column prop="sname" label="姓名">
      </el-table-column>
      <el-table-column prop="sremark" label="奖惩">
      </el-table-column>
      <el-table-column align="right">
        <!--eslint-disable-next-line vue/no-unused-vars-->
        <template slot="header" slot-scope="scope">
          <el-input type="text" v-model="search" size="mini" placeholder="输入姓名关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="editRandp(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteRandp(scope.row.sid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button style="margin:15px;float:right" type="primary" @click="editRandp()" round>添加新的奖惩信息</el-button>
    <el-dialog title="添加/修改" :visible.sync="editFormVisible" @close="clear">
      <el-form v-model="editForm">
        <el-form-item label="姓名" prop="sname">
          <el-input v-model="editForm.sname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="奖惩" prop="sremark">
          <el-input v-model="editForm.sremark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        randps: [],
        editForm: [],
        search: "",
        editFormVisible: false
      }
    },
    mounted: function () {
      this.loadRandps()
    },
    methods: {
      loadRandps() {
        this.axios.get('/randps').then(response => {
          if (response && response.status === 200) {
            this.randps = response.data
          }
        })
      },
      deleteRandp(sid) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios
            .post('/randpsdelete', {
              sid: sid
            }).then(resp => {
              if (resp && resp.status === 200) {
                this.loadRandps()
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      editRandp(randp) {
        this.editFormVisible = true
        //console.log(randp.sid);
        this.editForm = {
          sid: randp.sid,
          sname: randp.sname,

          sremark: randp.sremark
        }
      },
      onSubmit() {
        //console.log(this.editForm.sname);
        this.$confirm('是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios
            .post('/randps', {
              sid: this.editForm.sid,
              sname: this.editForm.sname,

              sremark: this.editForm.sremark
            }).then(resp => {
              if (resp && resp.status === 200) {
                this.editFormVisible = false
                this.loadRandps()
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      clear() {
        this.editForm = {
          sid: '',
          sname: '',
          sremark: ''
        }
      }
    }
  }
</script>
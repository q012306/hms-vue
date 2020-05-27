<template>
  <div>
    <el-table :data="salarys.filter(data => !search || data.sname.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <el-table-column prop="sid" label="员工号">
      </el-table-column>
      <el-table-column prop="sname" label="姓名">
      </el-table-column>

      <el-table-column prop="ssalary" label="月薪(单位:K)">
      </el-table-column>
      <el-table-column align="right">
        <!--eslint-disable-next-line vue/no-unused-vars-->
        <template slot="header" slot-scope="scope">
          <el-input type="text" v-model="search" size="mini" placeholder="输入姓名关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="editSalary(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteSalary(scope.row.sid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button style="margin:15px;float:right" type="primary" @click="editSalary()" round>添加新的薪资信息</el-button>
    <el-dialog title="添加/修改" :visible.sync="editFormVisible" @close="clear">
      <el-form v-model="editForm">
        <el-form-item label="姓名" prop="sname">
          <el-input v-model="editForm.sname" autocomplete="off"></el-input>
        </el-form-item>
        <div>
          <el-form-item label="月薪(单位:K)" prop="ssalary"></el-form-item>
        </div>
        <div>
          <el-slider v-model="editForm.ssalary" :step="1" :min="2" :max="50" show-input></el-slider>
        </div>
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
        salarys: [],
        editForm: [],
        search: "",
        editFormVisible: false
      }
    },
    mounted: function () {
      this.loadSalarys()
    },
    methods: {
      loadSalarys() {
        this.axios.get('/salarys').then(response => {
          if (response && response.status === 200) {
            this.salarys = response.data
          }
        })
      },
      deleteSalary(sid) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios
            .post('/salarysdelete', {
              sid: sid
            }).then(resp => {
              if (resp && resp.status === 200) {
                this.loadSalarys()
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      editSalary(salary) {
        this.editFormVisible = true
        //console.log(salary.sid);
        this.editForm = {
          sid: salary.sid,
          sname: salary.sname,
          ssalary: salary.ssalary
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
            .post('/salarys', {
              sid: this.editForm.sid,
              sname: this.editForm.sname,

              ssalary: this.editForm.ssalary
            }).then(resp => {
              if (resp && resp.status === 200) {
                this.editFormVisible = false
                this.loadSalarys()
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
          ssalary: ''
        }
      }
    }
  }
</script>
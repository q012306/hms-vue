<template>
  <div>
    <el-table :data="departments.filter(data => !search || data.ename.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <el-table-column prop="sid" label="ID 号">
      </el-table-column>
      <el-table-column prop="ename" label="部门名">
      </el-table-column>
      <el-table-column prop="emanager" label="管理人">
      </el-table-column>
      <el-table-column prop="eintro" label="主要职务">
      </el-table-column>
      <el-table-column align="right">
        <!--eslint-disable-next-line vue/no-unused-vars-->
        <template slot="header" slot-scope="scope">
          <el-input type="text" v-model="search" size="mini" placeholder="输入部门名关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="editDepartment(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteDepartment(scope.row.sid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button style="margin:15px;float:right" type="primary" @click="editDepartment()" round>添加新部门</el-button>
    <el-dialog :append-to-body="true" title="添加/修改" :visible.sync="editFormVisible" @close="clear">
      <el-form v-model="editForm">
        <el-form-item label="部门名" prop="ename">
          <el-input v-model="editForm.ename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理人" prop="emanager">
          <el-input v-model="editForm.emanager" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="主要职务" prop="eintro">
          <el-input v-model="editForm.eintro" autocomplete="off"></el-input>
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
        departments: [],
        editForm: [],
        search: "",
        editFormVisible: false
      }
    },
    mounted: function () {
      this.loadDepartments()
    },
    methods: {
      loadDepartments() {
        this.axios.get('/departments').then(response => {
          if (response && response.status === 200) {
            this.departments = response.data
          }
        })
      },
      deleteDepartment(sid) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios
            .post('/departmentsdelete', {
              sid: sid
            }).then(resp => {
              if (resp && resp.status === 200) {
                this.loadDepartments()
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      editDepartment(department) {
        this.editFormVisible = true
        //console.log(department.sid);
        this.editForm = {
          sid: department.sid,
          ename: department.ename,
          emanager: department.emanager,
          eintro: department.eintro
        }
      },
      onSubmit() {
        //console.log(this.editForm.ename);
        this.$confirm('是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios
            .post('/departments', {
              sid: this.editForm.sid,
              ename: this.editForm.ename,
              emanager: this.editForm.emanager,
              eintro: this.editForm.eintro
            }).then(resp => {
              if (resp && resp.status === 200) {
                this.editFormVisible = false
                this.loadDepartments()
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
          ename: '',
          emanager: '',
          eintro: ''
        }
      }
    }
  }
</script>
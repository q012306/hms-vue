<template>
  <div>
    <el-table :data="users.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <el-table-column prop="id" label="ID 号">
      </el-table-column>
      <el-table-column prop="username" label="用户名">
      </el-table-column>
      <el-table-column prop="password" label="密码密文">
      </el-table-column>
      <el-table-column prop="sid" label="关联员工号">
      </el-table-column>
      <el-table-column align="right">
        <!--eslint-disable-next-line vue/no-unused-vars-->
        <template slot="header" slot-scope="scope">
          <el-input type="text" v-model="search" size="mini" placeholder="输入用户名关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="editUser(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button style="margin:15px;float:right" type="primary" @click="editUser()" round>添加新账号</el-button>
    <el-dialog title="添加/修改" :visible.sync="editFormVisible" @close="clear">
      <el-form v-model="editForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码（需要修改添加则输入明文新密码即可）" prop="password">
          <el-input v-model="editForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="关联员工号" prop="sid">
          <el-input v-model="editForm.sid" autocomplete="off"></el-input>
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
        users: [],
        editForm: [],
        search: "",
        editFormVisible: false
      }
    },
    mounted: function () {
      this.loadUsers()
    },
    methods: {
      loadUsers() {
        this.axios.get('/users').then(response => {
          if (response && response.status === 200) {
            this.users = response.data
          }
        })
      },
      deleteUser(sid) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios
            .post('/usersdelete', {
              sid: sid
            }).then(resp => {
              if (resp && resp.status === 200) {
                this.loadUsers()
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      editUser(user) {
        this.editFormVisible = true
        this.editForm = {
          id: user.id,
          username: user.username,
          password: user.password,
          sid: user.sid
        }
      },
      onSubmit() {
        this.$confirm('是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios
            .post('/users', {
              id: this.editForm.id,
              username: this.editForm.username,
              password: this.editForm.password,
              sid: this.editForm.sid
            }).then(resp => {
              if (resp && resp.status === 200) {
                this.editFormVisible = false
                this.loadUsers()
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
          id: '',
          username: '',
          password: '',
          sidsid: ''
        }
      }
    }
  }
</script>
<template>
<body id="poster">
  <el-form class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">系统登录</h3>
    <el-form-item>
      <el-input type="text" v-model="loginForm.username" maxlength="32"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="loginForm.password" maxlength="32" show-password
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录</el-button>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="editFormVisible = true">注册</el-button>
    </el-form-item>    
  </el-form>

  <el-dialog title="注册" :visible.sync="editFormVisible" :append-to-body="true">
    <el-form>
        <el-form-item>
          <el-input maxlength="32" show-word-limit type="text" v-model="registerForm.username" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input maxlength="32" show-password type="password" v-model="registerForm.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="register">确 定</el-button>
    </div>
  </el-dialog>

</body>
</template>

<script scoped>

  export default {
    name: 'Login',
    data () {
      return {
        registerForm: {
          username: '',
          password: '',
        },
        loginForm: {
          username: '',
          password: '',
        },
        editFormVisible: false,
        responseResult: []
      }
    },
    methods: {
      login () {
        this.axios
          .post('/login', {
            username: this.loginForm.username,
            password: this.loginForm.password
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              this.$message({
                message: '登录成功！',
                type: 'success'
              });
              this.$router.replace({path: '/index'})
            }else if(successResponse.data.code === 400){
              this.$message({
                message: '用户名密码错误，登陆失败！',
                type: 'warning'
              });
            }
          })
          // eslint-disable-next-line no-unused-vars
          .catch(failResponse => {
          })
      },
      register () {
        this.axios
          .post('/register', {
            username: this.registerForm.username,
            password: this.registerForm.password
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              this.editFormVisible = false;
              this.$message({
                message: '注册成功！',
                type: 'success'
              });
            }else if(successResponse.data.code === 400){
              this.$message({
                message: '注册失败！',
                type: 'warning'
              });
            }
          })
          // eslint-disable-next-line no-unused-vars
          .catch(failResponse => {
          })
      }
    }
  }
</script>

<style>
  body{
    margin: 0px;
  }
</style>

<style scoped>

  .login-container {
    border-radius: 10px;
    background-clip: padding-box;
    margin: 200px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 15px #cac6c6;
  }
  
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  
  #poster {
    background:url("../assets/touhou_background.png") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
</style>
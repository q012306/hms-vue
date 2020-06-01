<template>
<el-menu
  :default-active="$route.path" 
  router
  mode="horizontal"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
    {{ item.navItem }}
  </el-menu-item>
  <el-button @click="logout" round icon="el-icon-close" style="float:right;margin:10px 10px auto" type="danger">注销</el-button>
</el-menu>
</template>

<script>
  export default {
    name: 'NavMenu',
    data () {
      return {
        navList: [
          {name: '/index', navItem: '首页'},
          {name: '/user', navItem: '个人中心'}
        ]
      }
    },
    mounted: function () {
      this.axios.get('/usergetmyperson').then(response => {
        if (response && response.status === 200) {
          if(response.data.sjob.indexOf("经理",0)!=-1 ||response.data.sjob.indexOf("董事长",0)!=-1){
            this.navList.push({name: '/hms', navItem: '人事管理系统'})
          }
        }
      })
    },
    methods: {
      logout () {
        this.axios
          .get('/logout')
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              this.$message({
                message: '登出成功！',
                type: 'success'
              });
              this.$router.replace({path: '/login'})
            }else{
              this.$message({
                message: '登出失败！',
                type: 'warning'
              });
            }
          })
      }
    }
  }
</script>

<style scoped>
  a{
    text-decoration: none;
  }

  span {
    pointer-events: none;
  }
</style>
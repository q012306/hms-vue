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
</el-menu>
</template>

<script>
  export default {
    name: 'NavMenu',
    data () {
      return {
        navList: [
          {name: '/index', navItem: '首页'},
          {name: '/hms', navItem: '人事管理系统'},
          {name: '/user', navItem: '个人中心'}
        ]
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
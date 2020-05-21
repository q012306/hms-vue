<template>
  <el-container>
    <el-aside style="width: 200px;margin-top: 20px">
      <switch></switch>
      <SideMenu></SideMenu>
    </el-aside>
    <el-main>
      <Departments class="Departments-area"></Departments>
    </el-main>
  </el-container>
</template>

<script>
    import SideMenu from './SideMenu'
    import Departments from './Departments'
        export default {
        name: 'AppPms',
        components: {SideMenu, Departments}
    }
</script>

<style scoped>
  .books-area {
    width: 990px;
    margin-left: auto;
    margin-right: auto;
  }
</style>


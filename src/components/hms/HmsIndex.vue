<template>
  <el-container>
    <el-aside style="width: 200px;margin-top: 20px">
      <switch></switch>
      <SideMenu class="slide-in-top" @indexSelect="listByCategory" ref="sideMenu"></SideMenu>
    </el-aside>
    <el-main class="slide-in-right">
      <el-card class="box-card">
        <el-alert
          v-if="cidd == -1"
          title="温馨提示"
          type="info"
          center
          description="请选择左侧的功能模块进行操作！"
          :closable="false"
          show-icon></el-alert>
      <Departments v-if="cidd == 0"></Departments>
      <Person v-if="cidd == 1"></Person>
      <Recruitment v-if="cidd == 2"></Recruitment>
      <Salarys v-if="cidd == 3"></Salarys>
      <Training v-if="cidd == 4"></Training>
      <Randps v-if="cidd == 5"></Randps>
      <Users v-if="cidd == 6"></Users>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
    import SideMenu from './SideMenu'
    import Departments from './Departments'
    import Person from './Person'
    import Randps from './Randps'
    import Recruitment from './Recruitment'
    import Salarys from './Salarys'
    import Training from './Training'
    import Users from './Users'
    export default {
        name: 'AppPms',
        components: {SideMenu, Departments,Person,Randps,Recruitment,Salarys,Training,Users},
        data () {
          return {
            cidd: -1
          }
        },
        methods: {
          listByCategory () {
            this.cidd = this.$refs.sideMenu.cid;
          }
        }
    }
</script>

<style scoped>
  .books-area {
    width: 990px;
    margin-left: auto;
    margin-right: auto;
  }
  .slide-in-right{animation:slide-in-right .5s cubic-bezier(.25,.46,.45,.94) both}
  @keyframes slide-in-right{0%{transform:translateX(1000px);opacity:0}100%{transform:translateX(0);opacity:1}}
  .slide-in-top{animation:slide-in-top .5s cubic-bezier(.25,.46,.45,.94) both}
  @keyframes slide-in-top{0%{transform:translateY(-1000px);opacity:0}100%{transform:translateY(0);opacity:1}}
</style>


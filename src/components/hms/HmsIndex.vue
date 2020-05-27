<template>
  <el-container>
    <el-aside style="width: 200px;margin-top: 20px">
      <switch></switch>
      <SideMenu @indexSelect="listByCategory" ref="sideMenu"></SideMenu>
    </el-aside>
    <el-main>
      <Departments v-if="cidd == 0"></Departments>
      <Person v-if="cidd == 1"></Person>
      <Recruitment v-if="cidd == 2"></Recruitment>
      <Salarys v-if="cidd == 3"></Salarys>
      <Training v-if="cidd == 4"></Training>
      <Randps v-if="cidd == 5"></Randps>
      <Users v-if="cidd == 6"></Users>
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
            cidd: 0
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
</style>


<template>
   <el-menu
    class="categories"
    default-active="0"
    >
      <el-menu-item index="0">
        <i class="el-icon-menu"></i>
        <span slot="title">部门管理</span>
      </el-menu-item>
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">员工管理</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">招聘管理</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-menu"></i>
        <span slot="title">培训管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-menu"></i>
        <span slot="title">奖惩管理</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-menu"></i>
        <span slot="title">系统管理</span>
      </el-menu-item>
      <el-menu-item index="6">
        <i class="el-icon-menu"></i>
        <span slot="title">用户修改</span>
      </el-menu-item>
    </el-menu>
</template>

<script>
export default {
    name: 'SideMenu'
  }
</script>


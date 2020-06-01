<template>
   <el-menu
    class="categories"
    default-active="-1"
    @select="handleSelect"
    >
      <el-menu-item index="0" v-if="dsz">
        <i class="el-icon-s-home"></i>
        <span slot="title">部门管理</span>
      </el-menu-item>
      <el-menu-item index="1" v-if="dsz || rsjl">
        <i class="el-icon-s-custom"></i>
        <span slot="title">员工管理</span>
      </el-menu-item>
      <el-menu-item index="2" v-if="dsz || rsjl">
        <i class="el-icon-s-order"></i>
        <span slot="title">招聘管理</span>
      </el-menu-item>
      <el-menu-item index="3" v-if="dsz || cwjl">
        <i class="el-icon-s-finance"></i>
        <span slot="title">薪资管理</span>
      </el-menu-item>
      <el-menu-item index="4" v-if="dsz || jsjl">
        <i class="el-icon-s-opportunity"></i>
        <span slot="title">培训管理</span>
      </el-menu-item>
      <el-menu-item index="5" v-if="dsz || cwjl">
        <i class="el-icon-s-check"></i>
        <span slot="title">奖惩管理</span>
      </el-menu-item>
      <el-menu-item index="6" v-if="dsz">
        <i class="el-icon-s-platform"></i>
        <span slot="title">系统管理</span>
      </el-menu-item>
    </el-menu>
</template>

<script>
export default {
    name: 'SideMenu',
    data () {
      return {
        cid: '',
        rsjl : false,
        jsjl: false,
        cwjl: false,
        dsz: false
      }
    },
    mounted: function () {
      this.axios.get('/usergetmyperson').then(response => {
        if (response && response.status === 200) {
          if(response.data.sjob == "人事经理"){
            this.rsjl = true;
          }else if(response.data.sjob == "财务经理"){
            this.cwjl = true;
          }else if(response.data.sjob == "技术经理"){
            this.jsjl = true;
          }else if(response.data.sjob == "董事长"){
            this.dsz = true;
          }
        }else{
            this.dsz = false;
            this.jsjl = false;
            this.cwjl = false;
            this.rsjl = false;
          }
      })
    },
    methods: {
      handleSelect (key) {
        this.cid = key;
        this.$emit('indexSelect');
      }
    }
  }
</script>


<template>
  <div class="item_name">
    <el-alert title="错误提示 Error" type="error" show-icon center :closable="false">
      页面不存在或者没有授权访问！{{totalTime}}秒后跳转！
    </el-alert>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        totalTime: 3 //记录具体倒计时时间
      }
    },
    mounted: function () {
      this.countDown()
    },
    methods: {
      countDown() {
        window.setInterval(() => {
          this.totalTime--
          if (this.totalTime == 0) {
            this.$router.replace({
              path: '/login'
            })
          }
        }, 1000)
      }
    }
  }
</script>

<style scoped>
  .item_name {
    margin: 36px;
  }
</style>
<template>
  <el-card class="box-card slide-in-elliptic-left-fwd">
    <div slot="header" class="clearfix">
      <span>个人信息</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="openchangepassword()">修改密码</el-button>
    </div>
    <div class="text item">
        {{'用户名 ' + userForm.username }}
    </div>
    <div class="text item">
        {{'密码密文 ' + userForm.password }}
    </div>
    <div v-show="DivVisible">
      <div class="text item">
        {{'编号 ' + personForm.sid }}
      </div>
      <div class="text item">
        {{'姓名 ' + personForm.sname }}
      </div>
      <div class="text item">
        {{'性别 ' + personForm.ssex }}
      </div>
      <div class="text item">
        {{'生日 ' + personForm.sbirthday }}
      </div>
      <div class="text item">
        {{'部门 ' + personForm.sdepartment }}
      </div>
      <div class="text item">
        {{'职位 ' + personForm.sjob }}
      </div>
      <div class="text item">
        {{'学历 ' + personForm.sedu_level }}
      </div>
      <div class="text item">
        {{'技能 ' + personForm.sspcialty }}
      </div>
      <div class="text item">
        {{'地区 ' + personForm.saddress }}
      </div>
      <div class="text item">
        {{'电话 ' + personForm.stel }}
      </div>
      <div class="text item">
        {{'邮箱 ' + personForm.semail }}
      </div>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: 'UserIndex',
    data () {
      return {
        personForm: {
          sid: '',
          sname: '',
          ssex: '',
          sbirthday: '',
          sdepartment: '',
          sjob: '',
          sedu_level: '',
          sspcialty: '',
          saddress: '',
          stel: '',
          semail: ''
        },
        userForm: {
          username: '',
          password: ''
        },
        DivVisible: false
      }
    },
    mounted: function () {
      this.judgment();
    },
    methods: {
      loadpersonForm () {
        this.axios.get('/person').then(response => {
          if (response && response.status === 200) {
            this.personForm = response.data
          }
        })
      },
      loaduserForm () {
        this.axios.get('/user').then(response => {
          if (response && response.status === 200) {
            this.userForm = response.data
          }
        })
      },
      judgment () {
        this.loadpersonForm();
        this.loaduserForm();
        if(this.personForm.sid == '')
          {
            this.DivVisible = false;
            this.$message({
              message: '您尚未入职！',
              type: 'warning'
            });
          }
        else
          this.DivVisible = true;
      },
      openchangepassword () {
        this.$prompt('请输入新密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.axios
            .post('/changepassword', {password: value}).then(resp => {
              if (resp && resp.status === 200) {
                this.loaduserForm();
                this.$message({
                  type: 'success',
                  message: '你的新密码是: ' + value
                });
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      }
    }
  }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .box-card {
    width: 480px;
    margin: 30px auto;
  }

  .slide-in-elliptic-left-fwd{animation:slide-in-elliptic-left-fwd .7s cubic-bezier(.25,.46,.45,.94) both}
  @keyframes slide-in-elliptic-left-fwd{0%{transform:translateX(-800px) rotateY(30deg) scale(0);transform-origin:-100% 50%;opacity:0}100%{transform:translateX(0) rotateY(0) scale(1);transform-origin:1800px 50%;opacity:1}}
</style>
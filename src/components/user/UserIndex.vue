<template>
  <div>
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
      <div v-if="DivVisible">
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
          {{'学历 ' + personForm.sedu }}
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
      <div v-else>
        <el-button type="primary" @click="editForm">入职申请</el-button>
      </div>
    </el-card>

    <el-dialog title="申请提交" :visible.sync="editFormVisible" @close="clear">
      <el-form v-model="personForm">
        <el-form-item label="姓名" prop="sname">
          <el-input v-model="personForm.sname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="ssex">
          <el-input v-model="personForm.ssex" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="sbirthday">
          <el-input v-model="personForm.sbirthday" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="sdepartment">
          <el-input v-model="personForm.sdepartment" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="职务" prop="sjob">
          <el-input v-model="personForm.sjob" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学历" prop="sedu">
          <el-input v-model="personForm.sedu" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="技能" prop="sspcialty">
          <el-input v-model="personForm.sspcialty" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地区" prop="saddress">
          <el-input v-model="personForm.saddress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="stel">
          <el-input v-model="personForm.stel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="semail">
          <el-input v-model="personForm.semail" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: 'UserIndex',
    data() {
      return {
        personForm: {
          sid: '',
          sname: '',
          ssex: '',
          sbirthday: '',
          sdepartment: '',
          sjob: '',
          sedu: '',
          sspcialty: '',
          saddress: '',
          stel: '',
          semail: ''
        },
        userForm: {
          username: '',
          password: ''
        },
        DivVisible: false,
        editFormVisible: false
      }
    },
    mounted: function () {
      this.judgment();
    },
    methods: {
      loadpersonForm() {
        this.axios.get('/usergetmyperson').then(response => {
          if (response && response.status === 200) {
            this.personForm = response.data
          }
          if (this.personForm.sid == null) {
            this.DivVisible = false;
            this.$message({
              message: '您尚未入职！',
              type: 'warning'
            });
          } else
            this.DivVisible = true;
        })
      },
      loaduserForm() {
        this.axios.get('/user').then(response => {
          if (response && response.status === 200) {
            this.userForm = response.data
          }
        })
      },
      judgment() {
        this.loaduserForm();
        this.loadpersonForm();
      },
      editForm(person) {
        this.editFormVisible = true
        //console.log(person.sid);
        this.personForm = {
          sid: person.sid,
          sname: person.sname,
          ssex: person.ssex,
          sbirthday: person.sbirthday,
          sdepartment: person.sdepartment,
          sjob: person.sjob,
          sedu: person.sedu,
          sspcialty: person.sspcialty,
          saddress: person.saddress,
          stel: person.stel,
          semail: person.semail
        }
      },
      onSubmit() {
        this.$confirm('是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios
            .post('/recruitments', {
              sid: this.personForm.sid,
              sname: this.personForm.sname,
              ssex: this.personForm.ssex,
              sbirthday: this.personForm.sbirthday,
              sdepartment: this.personForm.sdepartment,
              sjob: this.personForm.sjob,
              sedu: this.personForm.sedu,
              sspcialty: this.personForm.sspcialty,
              saddress: this.personForm.saddress,
              stel: this.personForm.stel,
              semail: this.personForm.semail
            }).then(resp => {
              if (resp && resp.status === 200) {
                this.editFormVisible = false
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      openchangepassword() {
        this.$prompt('请输入新密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({
          value
        }) => {
          this.axios
            .post('/changepassword', {
              password: value
            }).then(resp => {
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
      },
      clear() {
        this.personForm = []
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

  .slide-in-elliptic-left-fwd {
    animation: slide-in-elliptic-left-fwd .7s cubic-bezier(.25, .46, .45, .94) both
  }

  @keyframes slide-in-elliptic-left-fwd {
    0% {
      transform: translateX(-800px) rotateY(30deg) scale(0);
      transform-origin: -100% 50%;
      opacity: 0
    }

    100% {
      transform: translateX(0) rotateY(0) scale(1);
      transform-origin: 1800px 50%;
      opacity: 1
    }
  }
</style>
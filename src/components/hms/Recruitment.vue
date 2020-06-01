<template>
    <div>
        <el-table :data="recruitment.filter(data => !search || data.sname.toLowerCase().includes(search.toLowerCase()))"
                  style="width: 100%">
            <el-table-column prop="sid"
                             label="ID 号">
            </el-table-column>
            <el-table-column prop="sname"
                             label="姓名">
            </el-table-column>
            <el-table-column prop="ssex"
                             label="性别">
            </el-table-column>
            <el-table-column prop="sdepartment"
                             label="部门">
            </el-table-column>
            <el-table-column prop="sjob"
                             label="职务">
            </el-table-column>
            <el-table-column prop="sedu"
                             label="学历">
            </el-table-column>
            <el-table-column prop="sbirthday"
                             label="生日">
            </el-table-column>
            <el-table-column prop="sspcialty"
                             label="技能">
            </el-table-column>
            <el-table-column prop="saddress"
                             label="地区">
            </el-table-column>
            <el-table-column prop="stel"
                             label="电话">
            </el-table-column>
            <el-table-column prop="semail"
                             label="邮箱">
            </el-table-column>
            <el-table-column align="right">
                <!--eslint-disable-next-line vue/no-unused-vars-->
                <template slot="header" slot-scope="scope">
                    <el-input type="text"
                              v-model="search"
                              size="mini"
                              placeholder="输入姓名关键字搜索" />
                </template>
                <template slot-scope="scope">
                    <el-button size="mini"
                               @click="editRecruitment(scope.row)">编辑</el-button>
                    <el-button size="mini"
                               type="danger"
                               @click="deleteRecruitment(scope.row.sid)">删除</el-button>
                    <el-button size="mini"
                               type="success"
                               @click="Hire(scope.row)">聘用</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button style="margin:15px;float:right" type="primary" @click="editRecruitment()" round>添加入职申请</el-button>
        <el-dialog :append-to-body="true" title="添加/修改" :visible.sync="editFormVisible" @close="clear">
            <el-form v-model="editForm" :inline="true">
                <el-row :gutter="20" >
                    <el-col :span="12">
                        <div>
                            <el-form-item label="姓名" prop="sname">
                                <el-input v-model="editForm.sname" autocomplete="off"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                            <el-form-item label="性别" prop="ssex">
                                <el-select style="float:left" v-model="editForm.ssex" placeholder="请选择">
                                    <el-option v-for="item in esex"
                                           :key="item.value"
                                           :label="item.label"
                                           :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div>
                            <el-form-item label="部门" prop="sdepartment">
                                <el-select style="float:left" v-model="editForm.sdepartment" placeholder="请选择">
                                    <el-option v-for="item in edepartmrnts"
                                               :key="item.value"
                                               :label="item.label"
                                               :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div>
                            <el-form-item label="职务" prop="sjob">
                                <el-select style="float:left" v-model="editForm.sjob" placeholder="请选择">
                                    <el-option v-for="item in ejobs"
                                               :key="item.value"
                                               :label="item.label"
                                               :value="item.value"
                                               :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div>
                            <el-form-item label="学历" prop="sedu">
                                <el-select style="float:left" v-model="editForm.sedu" placeholder="请选择">
                                    <el-option v-for="item in eedu"
                                               :key="item.value"
                                               :label="item.label"
                                               :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div>
                            <el-form-item label="生日" prop="sbirthday">
                                <el-input v-model="editForm.sbirthday" autocomplete="off"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div>
                            <el-form-item label="技能" prop="sspcialty">
                                <el-input v-model="editForm.sspcialty" autocomplete="off"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div>
                            <el-form-item label="地区" prop="saddress">
                                <el-input v-model="editForm.saddress" autocomplete="off"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div>
                            <el-form-item label="电话" prop="stel">
                                <el-input v-model="editForm.stel" autocomplete="off"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div>
                            <el-form-item label="邮箱" prop="semail">
                                <el-input v-model="editForm.semail" autocomplete="off"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
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
    data () {
      return {
        recruitment: [],
        editForm: [],
        search: "",
          editFormVisible: false,
          esex: [{
              value: '男',
              label: '男'
          }, {
              value: '女',
              label: '女'
          }],
          edepartmrnts: [{
              value: '财务部',
              label: '财务部'
          }, {
              value: '人事部',
              label: '人事部'
          }, {
              value: '营销部',
              label: '营销部'
          },{
              value: '技术部',
              label: '技术部'
          }, {
              value: '安保部',
              label: '安保部'
          }],
          ejobs: [{
              value: '员工',
              label: '员工'
          }, {
                  value: '人事经理',
              label: '人事经理'
          }, {
                  value: '营销经理',
              label: '营销经理'
          }, {
                  value: '技术经理',
              label: '技术经理'
          }, {
                  value: '安保经理',
              label: '安保经理'
          }, {
                  value: '董事长',
              label: '董事长',
              disabled: true
              }],
          eedu: [{
              value: '小学',
              label: '小学'
          }, {
                  value: '初中',
              label: '初中'
          }, {
                  value: '高中',
              label: '高中'
          }, {
                  value: '大专',
              label: '大专'
          }, {
                  value: '本科',
              label: '本科'
          }, {
                  value: '硕士',
              label: '硕士'
          }, {
                  value: '博士',
              label: '博士'
          }],
          value: ''
      }
    },
    mounted: function () {
        this.loadRecruitments()
    },
    methods: {
        loadRecruitments () {
            this.axios.get('/recruitments').then(response => {
            if (response && response.status === 200) {
                this.recruitment = response.data
          }
        })
      },
        deleteRecruitment(sid) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.axios
                .post('/recruitmentsdelete', {sid: sid}).then(resp => {
              if (resp && resp.status === 200) {
                  this.loadRecruitments()
              }
            })
          }
        ).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      editRecruitment(recruitment) {
        this.editFormVisible = true
        //console.log(recruitment.sid);
          this.editForm = {
           sid: recruitment.sid,
           sname: recruitment.sname,
           ssex: recruitment.ssex,
           sdepartment: recruitment.sdepartment,
           sjob: recruitment.sjob,
           sbirthday: recruitment.sbirthday,
           sedu: recruitment.sedu,
           sspcialty: recruitment.sspcialty,
           saddress: recruitment.saddress,
           stel: recruitment.stel,
           semail: recruitment.semail
        }
       },
        Hire(recruitment) {
            this.$confirm('是否聘用该员工?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'primary'
            }).then(() => {
                this.axios
                    .post('/personhire', {
                        sid: recruitment.sid,
                        sname: recruitment.sname,
                        ssex: recruitment.ssex,
                        sdepartment: recruitment.sdepartment,
                        sjob: recruitment.sjob,
                        sbirthday: recruitment.sbirthday,
                        sedu: recruitment.sedu,
                        sspcialty: recruitment.sspcialty,
                        saddress: recruitment.saddress,
                        stel: recruitment.stel,
                        semail: recruitment.semail
                    }).then(resp => {
                        if (resp && resp.status === 200) {
                            this.loadRecruitments()
                        }
                    })
            }
            ).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
      onSubmit () {
        //console.log(this.editForm.sname);
        this.$confirm('是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.axios
                .post('/recruitments', {
                sid: this.editForm.sid,
                sname: this.editForm.sname,
                ssex: this.editForm.ssex,
                sdepartment: this.editForm.sdepartment,
                sjob: this.editForm.sjob,
                sbirthday: this.editForm.sbirthday,
                sedu: this.editForm.sedu,
                sspcialty: this.editForm.sspcialty,
                saddress: this.editForm.saddress,
                stel: this.editForm.stel,
                semail: this.editForm.semail
              }).then(resp => {
              if (resp && resp.status === 200) {
                this.editFormVisible = false
                  this.loadRecruitments()
              }
            })
          }
        ).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      clear () {
        this.editForm = {
          sid: '',
          sname: '',
          ssex: '',
          sdepartment:'',
          sjob:'',
          sbirthday: '',
          sedu: '',
          sspcialty: '',
          saddress: '',
          stel: '',
          semail: ''
        }
      }
    }
 }
</script>


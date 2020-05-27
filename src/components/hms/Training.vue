<template>
    <div>
        <el-table :data="training.filter(data => !search || data.sname.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%">
            <el-table-column prop="sid" label="ID 号">
            </el-table-column>
            <el-table-column prop="sname" label="姓名">
            </el-table-column>
            <el-table-column prop="sremark" label="备注">
            </el-table-column>
            <el-table-column align="right">
                <!--eslint-disable-next-line vue/no-unused-vars-->
                <template slot="header" slot-scope="scope">
                    <el-input type="text" v-model="search" size="mini" placeholder="输入姓名关键字搜索" />
                </template>
                <template slot-scope="scope">
                    <el-button size="mini" @click="editTraining(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="deleteTraining(scope.row.sid)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button style="margin:15px;float:right" type="primary" @click="editTraining()" round>添加培训计划</el-button>
        <el-dialog title="添加/修改" :visible.sync="editFormVisible" @close="clear">
            <el-form v-model="editForm">
                <el-form-item label="姓名" prop="sname">
                    <el-input v-model="editForm.sname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="sremark">
                    <el-input v-model="editForm.sremark" autocomplete="off"></el-input>
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
        data() {
            return {
                training: [],
                editForm: [],
                search: "",
                editFormVisible: false
            }
        },
        mounted: function () {
            this.loadTrainings()
        },
        methods: {
            loadTrainings() {
                this.axios.get('/trainings').then(response => {
                    if (response && response.status === 200) {
                        this.training = response.data
                    }
                })
            },
            deleteTraining(sid) {
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios
                        .post('/trainingsdelete', {
                            sid: sid
                        }).then(resp => {
                            if (resp && resp.status === 200) {
                                this.loadTrainings()
                            }
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },
            editTraining(training) {
                this.editFormVisible = true
                //console.log(training.sid);
                this.editForm = {
                    sid: training.sid,
                    sname: training.sname,
                    sremark: training.sremark
                }
            },
            onSubmit() {
                //console.log(this.editForm.sname);
                this.$confirm('是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios
                        .post('/trainings', {
                            sid: this.editForm.sid,
                            sname: this.editForm.sname,
                            sremark: this.editForm.sremark
                        }).then(resp => {
                            if (resp && resp.status === 200) {
                                this.editFormVisible = false
                                this.loadTrainings()
                            }
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })
            },
            clear() {
                this.editForm = {
                    sid: '',
                    sname: '',
                    sremark: ''
                }
            }
        }
    }
</script>
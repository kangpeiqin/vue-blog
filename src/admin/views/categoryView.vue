<template>
  <div>
     <el-table
       :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
       style="width: 100%">
       <el-table-column
         label="创建时间"
         prop="createTime">
       </el-table-column>
       <el-table-column
         label="分类名"
         prop="name">
       </el-table-column>
       <el-table-column
         label="操作"
         align="center">
         <template slot-scope="scope">
           <el-button
             size="mini"
             @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
           <el-button
             size="mini"
             type="danger"
             @click="handleDelete(scope.$index, scope.row)">删除</el-button>
         </template>
       </el-table-column>
     </el-table>
    <div>
      <el-dialog title="分类" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="分类名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div>
      <footer-tool-bar style="margin: 30px;">
        <a-space style="float: right;margin-bottom: 50px;">
          <a-button
            type="primary"
            @click="add(false)"
          >新增</a-button>
        </a-space>
      </footer-tool-bar>
    </div>
  </div>
</template>

<script>
import config from 'config'
import FooterToolBar from '@/admin/components/FooterToolbar'
import {Message} from 'element-ui'

export default {
  name: 'categoryView',
  components: {
    FooterToolBar
  },
  data () {
    return {
      form: {
        name: ''
      },
      headers: {
        Authorization: sessionStorage.getItem('token')
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',
      tableData: [],
      search: ''
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
      this.form = {id: row.id, name: row.name}
      this.dialogFormVisible = true
    },
    handleDelete (index, row) {
      console.log(index, row)
      this.deleteRequest(config.apiBaseUrl + '/admin/category', {id: row.id}, this.headers).then(resp => {
        if (resp.code === 200) {
          Message.success({message: resp.msg})
          this.getAll()
        }
      })
    },
    add () {
      this.form = {id: null, name: ''}
      this.dialogFormVisible = true
    },
    submit () {
      if (this.form.name === null || this.form.name === undefined || this.form.name.trim() === '') {
        Message.error({message: '分类名不能为空'})
      } else {
        this.addOrUpdate(this.form)
      }
    },
    addOrUpdate (data) {
      this.postRequest(config.apiBaseUrl + '/admin/category', data, this.headers).then(resp => {
        if (resp.code === 200) {
          console.log('addCategory:', resp)
          Message.success({message: resp.msg})
          this.getAll()
          this.dialogFormVisible = false
        }
      })
    },
    getAll () {
      this.getRequest(config.apiBaseUrl + '/category/all').then(resp => {
        if (resp) {
          console.log('categories', resp)
          this.tableData = resp.data
        }
      })
    }
  },
  created () {
    this.getAll()
  }
}
</script>

<style scoped>

</style>

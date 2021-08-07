<template>
  <div>
      <el-table
        :data="tableData"
        border
        style="width: 100%;min-height: 650px">
        <el-table-column
          fixed
          prop="title"
          label="文章标题"
        >
        </el-table-column>
        <el-table-column
          prop="postStatus"
          label="发布状态"
         >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.postStatus"
              :active-value=true
              :inactive-value=false
              @change="postStatusSwitch(scope.row)"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="browseTimes"
          label="浏览次数"
        >
        </el-table-column>
        <el-table-column
          prop="categoryName"
          label="所属分类"
         >
        </el-table-column>
        <el-table-column
          prop="tags"
          label="标签"
        >
        </el-table-column>
        <el-table-column
          prop="allowComment"
          label="是否允许被评论"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.allowComment"
              :active-value=true
              :inactive-value=false
              @change="allowCommentSwitch(scope.row)"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="recommend"
          label="是否推荐"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.recommend"
              :active-value=true
              :inactive-value=false
              @change="recommendSwitch(scope.row)"/>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          prop="createTime"
          label="创建时间"
        >
        </el-table-column>
        <el-table-column
          align="center"
          width="200">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索" style="width: 100px"/>
            <el-button @click="query(search)" type="primary" size="small">搜索</el-button>
          </template>
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
<!--            <el-button @click="remove(scope.row)" type="text" size="small">删除</el-button>-->
            <el-popover placement="top" width="160">
              <p>确定删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text">取消</el-button>
                <el-button type="primary" size="mini" @click="remove(scope.row)">确定</el-button>
              </div>
              <el-button slot="reference">删除</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
  </div>
</template>

<script>
import config from 'config'
import ElSwitch from 'element-ui/packages/switch/src/component'
import {mapState} from 'vuex'
import {Message} from 'element-ui'
export default {
  name: 'PostView',
  components: {ElSwitch},
  methods: {
    edit (row) {
      this.$store.commit('setEditPostId', row.id)
      this.$router.push('/editPost')
    },
    query (content) {
      console.log(content)
      this.getPostList()
    },
    remove (row) {
      this.visible = false
      console.log(row)
      this.deleteRequest(config.apiBaseUrl + '/admin/post', {id: row.id}, this.headers).then(resp => {
        if (resp) {
          if (resp.code === 200) {
            Message.success({
              message: '删除成功',
              type: 'success'
            })
            this.getPostList()
          } else {
            Message.error({
              message: resp.msg,
              type: 'warning'
            })
          }
        }
      })
    },
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      this.getPostList()
    },
    handleCurrentChange (pageNum) {
      this.pageNum = pageNum
      this.getPostList()
    },
    postStatusSwitch (row) {
      let data = {id: row.id, status: row.postStatus, type: 0}
      this.changeStatus(data)
    },
    recommendSwitch (row) {
      let data = {id: row.id, status: row.recommend, type: 2}
      this.changeStatus(data)
    },
    allowCommentSwitch (row) {
      let data = {id: row.id, status: row.allowComment, type: 1}
      this.changeStatus(data)
    },
    changeStatus (data) {
      this.putRequest(config.apiBaseUrl + '/admin/post/status/change', data, this.headers).then(resp => {
        if (resp) {
          console.log('status:', resp)
          if (resp.code === 401 || resp.code === 403) {
            this.$router.push('/login')
          }
        }
      })
    },
    getPostList () {
      this.getRequest(config.apiBaseUrl + '/api/post/all', {pageNum: this.pageNum, pageSize: this.pageSize, keyWord: this.search}).then(resp => {
        if (resp) {
          console.log(resp)
          this.tableData = resp.data.records
          this.total = resp.data.total
        }
      })
    }
  },
  data () {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 100,
      search: '',
      headers: {
        Authorization: sessionStorage.getItem('token')
      },
      tableData: [{
        id: '1',
        title: '文章标题',
        description: '简介',
        postStatus: '发布状态',
        browseTimes: '浏览次数',
        categoryName: '所属分类',
        allowComment: true,
        recommend: false,
        tags: ''
      }, {
        id: '2',
        title: '文章标题',
        description: '简介',
        postStatus: '发布状态',
        browseTimes: '浏览次数',
        categoryName: '所属分类',
        allowComment: false,
        recommend: true,
        tags: ''
      }]
    }
  },
  computed: mapState(['editPostId']),
  created () {
    this.getPostList()
  }
}
</script>

<style scoped>

</style>

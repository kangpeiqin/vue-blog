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
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="editPost(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deletePost(scope.row)" type="text" size="small">删除</el-button>
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

export default {
  name: 'PostView',
  components: {ElSwitch},
  methods: {
    editPost (row) {
      console.log(row)
    },
    deletePost (row) {
      console.log(row)
    },
    handleSizeChange () {

    },
    handleCurrentChange () {

    },
    postStatusSwitch (row) {

    },
    recommendSwitch (row) {
      console.log(row)
    },
    allowCommentSwitch (row) {
      console.log(row)
    }
  },
  data () {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 100,
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
  created () {
    this.getRequest(config.apiBaseUrl + '/api/post', {pageNum: this.pageNum, pageSize: this.pageSize}).then(resp => {
      if (resp) {
        console.log(resp)
        this.tableData = resp.data.records
      }
    })
  }
}
</script>

<style scoped>

</style>

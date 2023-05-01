<template>
  <div>
    <el-row :gutter="12" style="font-size: 30px">
      <el-col :span="8">
        <el-card shadow="hover">
          文章总数
          <div>
            {{statistics.postCount}}
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          评论总数
          <div>
            {{statistics.commentCount}}
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          阅读量
          <div>{{statistics.visitCount}}</div>
        </el-card>
      </el-col>
    </el-row>
<!--    <div>-->
<!--      <el-row :gutter="12" >-->
<!--        <el-col :span="24">-->
<!--          <el-card shadow="hover">-->
<!--              <div style="font-size: 20px">新动态</div>-->
<!--            <el-tabs v-model="activeName" @tab-click="handleClick">-->
<!--              <el-tab-pane label="最近文章" name="first">最近文章</el-tab-pane>-->
<!--              <el-tab-pane label="最近评论" name="second">最近评论</el-tab-pane>-->
<!--            </el-tabs>-->
<!--          </el-card>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--    </div>-->
  </div>
</template>

<script>
import config from 'config'

export default {
  name: 'DashBoard',
  data () {
    return {
      statistics: {
        postCount: 15,
        commentCount: 16,
        visitCount: 200
      },
      activeName: 'first'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  },
  created () {
    this.getRequest(config.apiBaseUrl + '/post/statistics').then(resp => {
      if (resp) {
        console.log(resp)
        this.statistics = resp.data
      }
    })
  }
}
</script>

<style scoped>

</style>

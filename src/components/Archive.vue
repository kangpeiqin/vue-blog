<template>
  <section class="article" v-loading="loading">
    <el-backtop :visibility-height="80">
      <i class="el-icon-caret-top"></i>
    </el-backtop>
    <h1 class="title">很好！目前共计 {{total}} 篇文章，继续努力</h1>
    <div class="article-content">
      <div class="meta">
        <el-timeline>
          <div  v-for="(item, index) in list" :key="index">
            <el-timeline-item type="primary" size="large" placement="top" style="height:70px;font-weight: 900;color: black;"
                              :timestamp="item.year.toString()+'年'">
            </el-timeline-item>
            <el-timeline-item type="info" size="normal" placement="top" style="height:80px;font-size: 15px;font-weight: 600"
                              v-for="(post, key) in item.posts"
                              :key="key"
                              :timestamp="post.createTime">
              <li style="cursor: pointer" @click="goToDetails(post)">{{post.title}}</li>
            </el-timeline-item>
          </div>
        </el-timeline>
      </div>
      <el-pagination layout="prev, pager, next" background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="pageNum" :page-size="pageSize"
                     :total="total">
      </el-pagination>
    </div>
  </section>
</template>

<script>
import config from 'config'
export default {
  name: 'Archive',
  data () {
    return {
      loading: true,
      pageNum: 1,
      pageSize: 10,
      total: 4,
      list: []
    }
  },
  methods: {
    handleSizeChange (pageSize) {
      console.log(`每页 ${pageSize} 条`)
      this.pageSize = pageSize
      this.getData()
    },
    handleCurrentChange (pageNum) {
      console.log(`当前页: ${pageNum}`)
      this.pageNum = pageNum
      this.getData()
    },
    goToDetails: function (param) {
      // this.$store.commit('setArticleId', param.id)
      sessionStorage.setItem('articleId', param.id)
      this.$store.commit('setSearchShow', false)
      this.$router.push({path: '/article'})
    },
    getData: function () {
      this.loading = true
      this.getRequest(config.apiBaseUrl + '/post/archives', {pageNum: this.pageNum, pageSize: this.pageSize}).then(resp => {
        if (resp) {
          console.log('archivies:', resp)
          this.list = resp.data.list
          this.total = resp.data.total
          this.loading = false
        }
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Trebuchet MS",Arial,"Lucida Grande",Verdana,Lucida,Helvetica,sans-serif;
  }
  h1 {
    font-size: 1.5em;
    font-weight: 500;
    color: black;
  }
  .classification:hover{
    cursor: pointer;
    color: #8bb5f5;
  }
  section {
    /*display: flex;*/
    /*flex-direction: column;*/
    align-items: center;
    min-height: 600px;
    padding: 0 80px;
  }
  /* 区域大标题 */
  .title {
    /*font-size: 25px;*/
    /*color: #2e2e2e;*/
    margin-top: 34px;
  }
  /* 大标题下方红线 */
  .title::after {
    content: "";
    display: block;
    width: 85%;
    height: 2px;
    transform: translateX(10%);
    margin-top: 5px;
    /*background-color: #ff434f;*/
  }

  .article {
    margin-top: 120px;
  }

  .article-content{
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.1);
    padding: 24px;
    transition: 0.4s;
    margin-top: 10px;
    margin-bottom: 100px;
  }
  /* 动态图片 */
  .act-image-wrapper img {
    min-height: 200px;
    object-fit: cover;
  }

  /* 动态元数据 */
  .article-content .meta {
    margin-top: 20px;
    margin-bottom: 10px;
    color: #c6c6c6;
    /*font-size: 30px;*/
    display: flex;
    min-height: 400px;
    flex-direction: column;
    align-items: center;
  }

  .article-content .meta > p:last-child {
    margin-left: 36px;
  }
  .article-content article {
    /*color: #8b8b8b;*/
    letter-spacing: 0.54px;
    line-height: 24px;
  }
  @media (max-width: 768px) {
    section{
      padding: 0 10px;
    }
  }
</style>

<template>
  <section class="article" v-loading="loading">
    <h1 class="title">目前共计 {{total}} 个分类</h1>
    <div class="article-content">
      <div class="meta">
        <ul v-for="(type, index) in types" :key="index" style="margin-bottom: 15px">
          <li style="list-style: none" @click="goToDetails(type)">
            <a class="classification">
              <h1> <img src="../assets/images/lantern.png" style="width: 30px;height: 30px;margin-bottom: -5px"/>
                {{type.name}}({{type.postNum}})</h1>
            </a>
          </li>
        </ul>
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
import {mapState} from 'vuex'

export default {
  name: 'Classification',
  data () {
    return {
      pageNum: 1,
      pageSize: 3,
      loading: true,
      total: 5,
      types: []
    }
  },
  methods: {
    getAll: function () {
      this.getRequest(config.apiBaseUrl + '/api/category', {pageNum: this.pageNum}).then(resp => {
        if (resp) {
          console.log('classification:', resp)
          this.types = resp.data.records
          this.pageSize = resp.data.size
          this.total = resp.data.total
          this.loading = false
        }
      })
    },
    handleSizeChange (pageSize) {
      console.log(`每页 ${pageSize} 条`)
      this.pageSize = pageSize
      this.getAll()
    },
    handleCurrentChange (pageNum) {
      console.log(`当前页: ${pageNum}`)
      this.pageNum = pageNum
      this.getAll()
    },
    goToDetails: function (param) {
      sessionStorage.setItem('cateId', param.id)
      sessionStorage.setItem('cateName', param.name)
      this.$router.push({path: '/categories/details'})
    }
  },
  computed: mapState({
    category: state => state.category
  }),
  created () {
    this.getAll()
  }
}
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Trebuchet MS", Arial, "Lucida Grande", Verdana, Lucida, Helvetica, sans-serif;
  }

  li {
    color: #555;
    text-decoration: none;
    outline: none;
    border-bottom: 1px solid #999;
    word-wrap: break-word;
  }

  h1 {
    font-size: 1.5em;
    font-weight: 500;
    color: black;
  }

  .classification:hover {
    cursor: pointer;
    color: #8bb5f5;
    text-decoration: none;
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

  .article-content {
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.1);
    padding: 24px;
    transition: 0.4s;
    margin-top: 10px;
    margin-bottom: 10px;
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
    section {
      padding: 0 10px;
    }
  }
</style>

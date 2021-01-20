<template>
  <div class="type-container">
    <el-container>
        <h2 class="title">标签</h2>
        <el-header style="height: 20px; display: flex;justify-items: center;max-width: 1180px;padding: 0 80px;">
          <el-tag class="blog-tag" style="margin: 4px"  v-for="(tag,index) in tags" :key="index" @click="showArticles(tag.id,tag.name)">{{tag.name}} &nbsp;{{tag.artNum}}</el-tag>
        </el-header>
        <div class="content-wrapper" v-loading="loading">
          <section id="company-activities" class="company-activities">
            <div class="activities">
              <!-- 动态 -->
              <div class="activity" v-for="(article,index) in post" :key="index">
                <!-- 动态图片 -->
                <div class="act-image-wrapper" style="height: 50px">
                  <img :src="article.imgUrl" alt="" />
                </div>
                <!-- 动态元数据，包括发表日期和评论数量 -->
                <div class="meta">
                  <!-- 发布日期 -->
                  <p class="date-published">
                    <i class="far fa-calendar"></i>{{article.createTime}}
                  </p>
                  <p class="comments"><i class="far fa-comments"></i>阅读&nbsp;&nbsp;{{article.views}}</p>
                </div>
                <!-- 动态标题 -->
                <h2 class="act-title">{{article.title}}</h2>
                <!-- 动态内容摘要 -->
                <article>
                  {{article.description}}
                </article>
                <!-- 阅读更多按钮 -->
                <button class="readmore-btn" @click="showDetail(article.id,article.imgUrl)">阅读更多</button>
              </div>
            </div>
          </section>
          <div v-show="seen" style="margin-top: 50px;font-size: 25px;color: #ff434f">{{message}}</div>
        </div>
    </el-container>
  </div>
</template>

<script>
import config from 'config'
export default {
  name: 'BlogTag',
  data () {
    return {
      message: '没有内容哦',
      seen: false,
      loading: true,
      tags: [{id: '1', name: 'Java', artNum: '12'},
        {id: '2', name: 'Python', artNum: '2'},
        {id: '2', name: 'Python', artNum: '2'}
      ],
      post: [
        // {title: 'Java8', imgUrl: '', createTime: '2020年09月10日', views: '21', description: '这是一篇关于Java8的学习文章，可以帮你理清Java8的新特性'},
        // {title: 'Java8', imgUrl: '', createTime: '2020年09月10日', views: '21', description: '这是一篇关于Java8的学习文章，可以帮你理清Java8的新特性'},
        // {title: 'Java8', imgUrl: '', createTime: '2020年09月10日', views: '21', description: '这是一篇关于Java8的学习文章，可以帮你理清Java8的新特性'}
      ]
    }
  },
  methods: {
    showDetail: function (blogId, imgUrl) {
      this.$router.push({
        path: 'article',
        query: {
          id: blogId
        }
      })
    },
    showArticles: function (tagId, tagName) {
      const axios = require('axios')
      var vm = this
      this.loading = true
      axios.get(config.apiBaseUrl + '/tags/' + tagId)
        .then(function (response) {
          // handle success
          console.log(response)
          var data = response.data.data
          vm.post = data
          vm.seen = data.length === 0
          vm.loading = false
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
        .then(function () {
          // always executed
        })
    }
  },
  created () {
    const axios = require('axios')
    var vm = this
    axios.get(config.apiBaseUrl + '/allTags')
      .then(function (response) {
        // handle success
        console.log(response)
        vm.tags = response.data
        vm.showArticles(response.data[0].id)
        vm.loading = false
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
      .then(function () {
        // always executed
      })
  }
}
</script>

<style scoped>
  .blog-tag:hover{
    cursor: pointer;
  }
  .type-container{
    margin: 100px 20px 20px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 600px;
  }
  .el-header {
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  /* 图片默认宽度100% */
  img {
    width: 100%;
  }

  /* ============= 内容区域 ================== */

  /* 通用样式  */
  .content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 500px;
  }

  /* 所有section都按grid布局 */
  section {
    display: grid;
    /* 单元格都居中对齐 */
    justify-items: center;
    max-width: 1180px;
    padding: 0 80px;
  }

  /* 区域背景色，因为区域有最大宽度限制，用before来设置占满浏览器宽度 */
  .section-bg {
    position: relative;
  }

  .section-bg::before {
    content: "";
    display: block;
    position: absolute;
    background-color: #f9fbfb;
    width: 100vw;
    height: 100%;
    z-index: -1;
  }

  /* ============= 公司动态 ================== */
  /* 公司动态 */
  .company-activities {
    margin-top: 0;
  }

  /* 动态栅格布局 */
  .activities {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 24px;
  }
  /* 动态 */
  .activity {
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.1);
    padding: 24px;
    transition: 0.4s;
    margin-top: 54px;
  }

  /* 动态图片容器 */
  .act-image-wrapper {
    height: 250px;
    overflow: hidden;
    /* 抵消activity的padding */
    margin: -24px -24px 0;
  }

  /* 动态图片 */
  .act-image-wrapper img {
    min-height: 200px;
    object-fit: cover;
  }

  /* 动态元数据 */
  .activity .meta {
    margin-top: 20px;
    margin-bottom: 12px;
    color: var(--text-color-light-gray);
    font-size: 12px;
    display: flex;
  }

  /* 评论 */
  .activity .meta > p:last-child {
    margin-left: 36px;
  }

  /* 动态标题 */
  .act-title {
    color: var(--text-color-dark);
    font-size: 18px;
    margin-bottom: 16px;
  }

  /* 动态摘要 */
  .activity article {
    color: var(--text-color-gray);
    letter-spacing: 0.54px;
    line-height: 24px;
  }

  /* 阅读更多按钮 */
  .readmore-btn {
    border: 0;
    color: white;
    background-color: #ff434f;
    border-radius: 4px;
    padding: 6px 14px;
    margin-top: 24px;
  }
  .readmore-btn:hover{
    cursor: pointer;
  }
  /* 动态鼠标移上时 */
  .activity:hover {
    transform: translateY(-20px) scale(1.05);
    box-shadow: 0 0 36px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  /* 小于768象素时 */
  @media (max-width: 768px) {
    /* 区域的左右内边距设置为40象素 */
    section,
    .footer-menus {
      padding: 0 40px;
    }
    /* 公司动态设置为1列 */
    .activities {
      grid-template-columns: 1fr;
      row-gap: 36px;
    }
  }
</style>

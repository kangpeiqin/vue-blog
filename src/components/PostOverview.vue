<template>
  <div class="content-wrapper" v-loading="loading">
<!-- 回到顶部功能按钮   -->
    <el-backtop :visibility-height="80">
      <i class="el-icon-caret-top"></i>
    </el-backtop>
    <section id="company-activities" class="company-activities">
      <div class="activities">
        <!-- 动态 -->
        <div class="activity" v-for="(article, index) in post" :key="index">
          <!-- 动态图片 -->
          <div class="act-image-wrapper" style="height: 100px">
            <img :src="article.coverImage" alt="" />
          </div>
          <!-- 动态元数据，包括发表日期和评论数量 -->
          <div class="meta">
            <!-- 发布日期 -->
            <p class="date-published">
              <i class="far fa-calendar"></i>{{ article.createTime }}
            </p>
            <p class="comments">
              <i class="far fa-comments"></i>阅读&nbsp;&nbsp;{{ article.views }}
            </p>
          </div>
          <!-- 动态标题 -->
          <h2 class="act-title">{{ article.title }}</h2>
          <!-- 动态内容摘要 -->
          <article>
            {{ article.description }}
          </article>
          <!-- 阅读更多按钮 -->
          <button
            class="readmore-btn"
            @click="showDetail(article.id, article.coverImage)"
          >
            阅读更多
          </button>
        </div>
      </div>
    </section>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[3,6,9,12]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import config from 'config'
export default {
  name: 'PostOverview',
  data () {
    return {
      searchContent: this.$router.query,
      total: 12,
      pageNum: 1,
      pageSize: 3,
      loading: true,
      post: [
        {
          title: 'Java8',
          coverImage: '',
          createTime: '2020年09月10日',
          views: '21',
          description: '这是一篇关于Java8的学习文章，可以帮你理清Java8的新特性'
        },
        {
          title: 'Java8',
          coverImage: '',
          createTime: '2020年09月10日',
          views: '21',
          description: '这是一篇关于Java8的学习文章，可以帮你理清Java8的新特性'
        },
        {
          title: 'Java8',
          coverImage: '',
          createTime: '2020年09月10日',
          views: '21',
          description: '这是一篇关于Java8的学习文章，可以帮你理清Java8的新特性'
        },
        {
          title: 'Java8',
          coverImage: '',
          createTime: '2020年09月10日',
          views: '21',
          description: '这是一篇关于Java8的学习文章，可以帮你理清Java8的新特性'
        },
        {
          title: 'Java8',
          coverImage: '',
          createTime: '2020年09月10日',
          views: '21',
          description: '这是一篇关于Java8的学习文章，可以帮你理清Java8的新特性'
        },
        {
          title: 'Java8',
          coverImage: '',
          createTime: '2020年09月10日',
          views: '21',
          description: '这是一篇关于Java8的学习文章，可以帮你理清Java8的新特性'
        },
        {
          title: 'Java8',
          coverImage: '',
          createTime: '2020年09月10日',
          views: '21',
          description: '这是一篇关于Java8的学习文章，可以帮你理清Java8的新特性'
        },
        {
          title: 'Java8',
          coverImage: '',
          createTime: '2020年09月10日',
          views: '21',
          description: '这是一篇关于Java8的学习文章，可以帮你理清Java8的新特性'
        }
      ]
    }
  },
  methods: {
    showDetail: function (blogId, coverImage) {
      alert(this.$route.query.content)
      this.$router.push({
        path: 'article',
        query: {
          id: blogId
        }
      })
    },
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
    getData () {
      const axios = require('axios')
      let vm = this
      vm.loading = false
      axios.get(config.apiBaseUrl + '/api/post' + '?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
        .then(function (response) {
          // handle success
          console.log(response)
          vm.post = response.data.data.records
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
    let vm = this
    vm.loading = false
    axios.get(config.apiBaseUrl + '/api/post' + '?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
      .then(function (response) {
        // handle success
        console.log(response)
        vm.post = response.data.data.records
        vm.total = response.data.data.total
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Helvetica, "PingFang SC", "Microsoft Yahei", sans-serif;
  font-size: 14px;
}
/* 图片默认宽度100% */
img {
  width: 100%;
}
.block{
  margin-top: 75px;
}
/* 定义变量 */
:root {
  --primary-color: #ff434f;
  --secondary-color: #e3e3e3;
  --text-color-lightest: #e7e9ec;
  --text-color-darker: #2e2e2e;
  --text-color-dark: #494949;
  --text-color-gray: #8b8b8b;
  --text-color-dark-gray: #727272;
  --text-color-light-gray: #c6c6c6;
  --backdrop-color: rgba(42, 42, 42, 0.69);
}

/* ============= 内容区域 ================== */

/* 通用样式  */
.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 600px;
}

/* 所有section都按grid布局 */
section {
  display: grid;
  /* 单元格都居中对齐 */
  justify-items: center;
  max-width: 1180px;
  padding: 0 80px;
}

/* 区域大标题 */
.title1 {
  /* justify-self: center; */
  /* position: relative; */
  font-size: 34px;
  color: #2e2e2e;
}
/* 大标题下方红线 */
.title1::after {
  content: "";
  display: block;
  width: 80%;
  height: 4px;
  transform: translateX(10%);
  margin-top: 14px;
  background-color: #ff434f;
}

/* 大d标题下方简介 */
.intro {
  margin: 28px 0 60px 0;
  font-size: 18px;
  color: var(--text-color-dark-gray);
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
  margin-top: 88px;
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
.readmore-btn:hover {
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

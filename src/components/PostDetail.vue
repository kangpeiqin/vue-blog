<template>
  <section class="article">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">返回</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">上一篇</a></el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">下一篇</a></el-breadcrumb-item>
    </el-breadcrumb>
    <h1 class="title">{{article.title}}</h1>
    <div class="article-content">
      <div class="act-image-wrapper">
        <img :src="article.coverImage" alt=""/>
      </div>
      <div class="meta">
        <p class="date-published">
          <i class="far fa-calendar">{{article.createTime}}</i>
        </p>
        <p class="comments"><i class="far fa-comments">阅读&nbsp;&nbsp;{{article.browseTimes}}</i> </p>
      </div>
<!--      <h2 class="act-title">{{message}}</h2>-->
      <article class="post-content" v-html="article.formatContent">
<!--        {{article.content}}-->
      </article>
    </div>
    <div>
      <comment v-bind="comment"></comment>
    </div>
  </section>
</template>

<script>
import {mapState} from 'vuex'
import config from 'config'
import comment from 'hbl-comment'
export default {
  name: 'PostDetail',
  components: {
    comment
  },
  data () {
    return {
      loading: true,
      comment: {
        commentNum: 10,
        placeholder: '在此输入评论'
      },
      article: {
        title: '梦境', browseTimes: '22', createTime: '2020-09-10', coverImage: 'http://localhost:8080/static/img/background.1272215.jpg', formatContent: 'This is a test'
      }
    }
  },
  computed: mapState({
    articleId: state => state.articleId
  }),
  created () {
    this.getRequest(config.apiBaseUrl + '/api/post/' + this.articleId, null).then(resp => {
      if (resp) {
        console.log('article:', resp)
        this.article = resp.data
      }
    })
    // const axios = require('axios')
    // var vm = this
    // axios.get(config.apiBaseUrl + '/api/post/' + this.$route.query.id)
    //   .then(function (response) {
    //     // handle success
    //     console.log(response)
    //     vm.article = response.data.data
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error)
    //   })
    //   .then(function () {
    //     // always executed
    //   })
  }
}
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Trebuchet MS",Arial,"Lucida Grande",Verdana,Lucida,Helvetica,sans-serif;
    /*font-size: 14px;*/
  }
  h1 {
    font-size: 1.5em;
    font-weight: 500;
  }
  /* 图片默认宽度100% */
  img {
    width: 100%;
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
    color: #2e2e2e;
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
    margin-bottom: 40px;
  }

  /* 动态图片容器 */
  .act-image-wrapper {
    height: 250px;
    overflow: hidden;
    margin: -24px -24px 0;
  }

  /* 动态图片 */
  .act-image-wrapper img {
    min-height: 200px;
    object-fit: cover;
  }

  /* 动态元数据 */
  .article-content .meta {
    margin-top: 20px;
    margin-bottom: 12px;
    color: #c6c6c6;
    /*font-size: 12px;*/
    display: flex;
  }

  .article-content .meta > p:last-child {
    margin-left: 36px;
  }

  .act-title {
    color: #494949;
    /*font-size: 18px;*/
    margin-bottom: 16px;
  }

  .article-content article {
    /*color: #8b8b8b;*/
    letter-spacing: 0.54px;
    line-height: 24px;
  }

  .post-content{
    text-align: left;
    background-color: lightgoldenrodyellow;
    border-radius: 22px;
    padding: 30px;
    box-shadow: #3a8ee6
  }

  @media (max-width: 768px) {
    section{
      padding: 0 40px;
    }
    .post-content{
      text-align: left;
      background-color: lightgoldenrodyellow;
      padding: 2px;
      box-shadow: #3a8ee6;
      -ms-overflow-x: scroll;
    }
  }
</style>

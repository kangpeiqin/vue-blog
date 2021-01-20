<template>
  <section class="article" v-loading="loading">
    <h2 class="title">{{article.title}}</h2>
    <div class="article-content">
      <div class="act-image-wrapper">
        <img :src="article.imgUrl" alt=""/>
      </div>
      <div class="meta">
        <p class="date-published">
          <i class="far fa-calendar">{{article.createTime}}</i>
        </p>
        <p class="comments"><i class="far fa-comments">阅读&nbsp;&nbsp;{{article.views}}</i> </p>
      </div>
<!--      <h2 class="act-title">{{message}}</h2>-->
      <article class="post-content" v-html="article.content">
<!--        {{article.content}}-->
      </article>
    </div>
  </section>
</template>

<script>
import config from 'config'
export default {
  name: 'PostDetail',
  data () {
    return {
      loading: true,
      article: {
        title: '梦境', views: '22', createTime: '2020-09-10', imgUrl: 'http://localhost:8080/static/img/background.1272215.jpg', content: 'This is a test'
      }
    }
  },
  created () {
    const axios = require('axios')
    var vm = this
    axios.get(config.apiBaseUrl + '/blog/' + this.$route.query.id)
      .then(function (response) {
        // handle success
        console.log(response)
        vm.article = response.data.data
        // vm.loading = true
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

  section {
    /*display: flex;*/
    /*flex-direction: column;*/
    align-items: center;
    min-height: 600px;
    padding: 0 80px;
  }

  /* 区域大标题 */
  .title {
    font-size: 25px;
    color: #2e2e2e;
  }
  /* 大标题下方红线 */
  .title::after {
    content: "";
    display: block;
    width: 85%;
    height: 2px;
    transform: translateX(10%);
    margin-top: 5px;
    background-color: #ff434f;
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
    font-size: 12px;
    display: flex;
  }

  .article-content .meta > p:last-child {
    margin-left: 36px;
  }

  .act-title {
    color: #494949;
    font-size: 18px;
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

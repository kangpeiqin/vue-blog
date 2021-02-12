<template>
  <section class="article">
    <h1 class="title">目前共计 {{total}} 个分类</h1>
    <div class="article-content">
      <div class="meta">
        <ul v-for="(type, index) in types" :key="index" style="margin-bottom: 15px">
          <li>
            <a class="classification">
              <h1>{{type.name}}({{type.artNum}})</h1>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import config from 'config'
export default {
  name: 'Classification',
  data () {
    return {
      loading: true,
      total: '12',
      article: {
        title: '梦境', browseTimes: '22', createTime: '2020-09-10', imgUrl: 'http://localhost:8080/static/img/background.1272215.jpg', content: 'This is a test'
      },
      types: [{id: '1', name: '随笔', artNum: '12'},
        {id: '2', name: '考研笔记', artNum: '2'},
        {id: '2', name: '旅游', artNum: '21'},
        {id: '2', name: '其他', artNum: '22'},
        {id: '2', name: '服务器端', artNum: '28'},
        {id: '2', name: '手机端', artNum: '2'}
      ]
    }
  },
  created () {
    const axios = require('axios')
    var vm = this
    axios.get(config.apiBaseUrl + '/api/post/' + this.$route.query.id)
      .then(function (response) {
        // handle success
        console.log(response)
        vm.article = response.data.data
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
    section{
      padding: 0 40px;
    }
  }
</style>

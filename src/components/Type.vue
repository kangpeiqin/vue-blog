<template>
  <div class="type-container">
    <h2 class="title" style="font-weight: 200">目前共计 12 个分类</h2>
    <ul v-for="(type, index) in types" :key="index">
      <li>
        <a class="classification">{{type.name}}({{type.artNum}})</a>
      </li>
    </ul>
  </div>
</template>

<script>
import config from 'config'
export default {
  name: 'Type',
  data () {
    return {
      seen: false,
      message: '没有内容哦',
      loading: false,
      types: [{id: '1', name: '随笔', artNum: '12'},
        {id: '2', name: '考研笔记', artNum: '2'},
        {id: '2', name: '旅游', artNum: '2'}
      ]
    }
  },
  methods: {
    showBlogDetail: function (blogId, imgUrl) {
      this.$router.push({
        path: 'article',
        query: {
          id: blogId
        }
      })
    },
    showArticles: function (typeId, typeName) {
      const axios = require('axios')
      var vm = this
      // this.loading = true
      axios.get(config.apiBaseUrl + '/types/' + typeId)
        .then(function (response) {
          // handle success
          console.log(response)
          var data = response.data.data
          vm.post = data
          vm.seen = data.length === 0
          // vm.loading = false
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
    // vm.loading = true
    axios.get(config.apiBaseUrl + '/allTypes')
      .then(function (response) {
        // handle success
        console.log(response)
        vm.types = response.data
        vm.showArticles(response.data[0].id)
        // vm.loading = false
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
  .type-container{
    margin: 100px 20px 20px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 600px;
  }
  .classification:hover{
    cursor: pointer;
  }
  .classification{
    list-style-type: circle;
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

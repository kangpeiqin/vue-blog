<template>
<!--  <div class="about-container">-->
<!--    <el-container>-->
<!--      <el-aside width="200px">Aside</el-aside>-->
<!--      <el-container>-->
<!--        <el-main>Main</el-main>-->
<!--      </el-container>-->
<!--    </el-container>-->
<!--  </div>-->
  <section class="article">
    <h2 class="title">关于我</h2>
    <div class="article-content">
      <div class="act-image-wrapper">
        <img src="../assets/images/background.jpg" alt=""/>
      </div>
      <div class="meta">
        <p class="date-published">
          <i class="far fa-calendar"></i>
        </p>
        <p class="comments"><i class="far fa-comments"></i> </p>
      </div>
      <!--      <h2 class="act-title">{{message}}</h2>-->
      <article style="text-align: left;font-weight: 300;font-size: 20px">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;你好啊,我是KANGPEIQIN,一个爱运动、爱思考、爱动手、爱学习的90后理工男，我是一个正经的后端开发工程师，同时也是个业余的前端爱好者。
        （就是大家常常说`码农`，其实我更喜欢别人称呼我们为工程师，就像别的领域的工程师一样）。良好的代码风格很重要，一直以来我也在努力让自己写的代码更加优雅。
        我的个人兴趣爱好比较广泛，接触比较多的是计算机、三维设计、PS等，同时我也是一个摄影爱好者
        (<a href="https://tuchong.com/16656346/" style="text-decoration: none;font-weight: 300;font-size: 20px">图虫主页</a>)。
      </article>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutMe',
  data () {
    return {}
  },
  created () {
  }
}
</script>

<style scoped>
  .experience li{
    margin-left: 20px;
    text-align: left;
    font-weight: 300;
    font-size: 18px
  }
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
    width: 80%;
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
    padding: 24px 24px 100px 24px;
    transition: 0.4s;
    margin-top: 10px;
    margin-bottom: 80px;
  }

  /* 动态图片容器 */
  .act-image-wrapper {
    height: 5px;
    overflow: hidden;
    margin: -24px -24px 0;
    border-radius: 15px;
  }

  /* 动态图片 */
  /*.act-image-wrapper img {*/
  /*  min-height: 200px;*/
  /*  object-fit: cover;*/
  /*}*/

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

  @media (max-width: 768px) {
    section {
      padding: 0 40px;
    }
  }
</style>

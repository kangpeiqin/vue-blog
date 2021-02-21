<template>
  <section class="article">
    <div class="article-content">
      <div class="meta">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="Repositories" name="first">
            <el-dropdown @command="chooseLanguage">
                <span class="el-dropdown-link">
                  {{language}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in languageList" :key="item.index" :command="item">{{item.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            &nbsp; &nbsp;
            <el-dropdown @command="chooseTime">
                <span class="el-dropdown-link">
                  {{since}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in timeList" :key="item.index" :command="item">{{item.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-tab-pane>
          <el-tab-pane label="Developer" name="second"></el-tab-pane>
        </el-tabs>
        <el-card class="box-card" v-for="(item, index) in trendingData" :key="index" style="margin-top: 20px">
          <div class="text item">
            <div>项目： <a v-bind:href="item.url">{{item.title}}</a> &nbsp; 作者：{{item.author}} &nbsp; 语言：{{item.programmingLanguage}}
            &nbsp; stars：{{item.stars}} &nbsp; forks：{{item.forks}} &nbsp;
              贡献者：
              <span v-for="(contribute,dex) in item.contributors" :key="dex">
                <a v-bind:href="contribute.accountLink">
                  <img v-bind:src="contribute.avatar" style="width: 16px;height: 16px;margin-right: 5px;margin-bottom: -2px"/>
                </a>
                </span>
              <div>
                <span>项目简介：{{item.description}}</span>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </section>
</template>

<script>
import config from 'config'
export default {
  name: 'githubTrendingPage',
  data () {
    return {
      currentLang: '',
      currentTime: '',
      language: 'Any',
      since: 'Today',
      loading: true,
      activeName: 'first',
      total: 4,
      languageList: [
        {'name': 'Any', index: ''},
        {'name': 'Java', index: 'java'},
        {'name': 'Python', index: 'python'},
        {'name': 'Go', index: 'go'},
        {'name': 'JavaScript', index: 'javascript'},
        {'name': 'C++', index: 'C++'},
        {'name': 'C', index: 'C'}
      ],
      timeList: [
        {'name': 'Today', index: 'daily'},
        {'name': 'This week', index: 'weekly'},
        {'name': 'This month', index: 'monthly'}
      ],
      trendingData: [
        {
          title: 'JavaGuide',
          author: 'Snailclimb',
          url: 'https://www.github.com/Snailclimb/JavaGuide',
          programmingLanguage: 'Java',
          description: '「Java学习+面试指南」一份涵盖大部分 Java 程序员所需要掌握的核心知识。准备 Java 面试，首选 JavaGuide！',
          stars: '97,468',
          forks: '33,621',
          contributors: [
            {
              avatar: 'https://avatars.githubusercontent.com/u/29880145?s=40&v=4',
              accountLink: 'https://www.github.com/Snailclimb'
            },
            {
              avatar: 'https://avatars.githubusercontent.com/u/15909210?s=40&v=4',
              accountLink: 'https://www.github.com/LiWenGu'
            }
          ]
        }]
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    chooseLanguage (item) {
      this.language = item.name
      console.log('language', item)
      this.currentLang = item.index
      this.getData()
    },
    chooseTime (item) {
      this.since = item.name
      console.log('time', item)
      this.currentTime = item.index
      this.getData()
    },
    getData: function () {
      this.getRequest(config.apiBaseUrl + '/api/trending/' + this.currentLang, {since: this.currentTime}).then(resp => {
        if (resp) {
          console.log('trending:', resp)
          this.trendingData = resp.data
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
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
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

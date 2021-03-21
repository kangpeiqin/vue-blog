<template>
  <section class="article" v-loading="loading">
    <el-backtop :visibility-height="80">
      <i class="el-icon-caret-top"></i>
    </el-backtop>
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
        <div class="trending" v-show="trendingShow">
          <el-card class="box-card" v-for="(item, index) in trendingData" :key="index" style="margin-top: 20px;font-size: 18px">
            <div class="text item">
              <div>项目： <a v-bind:href="item.url" target="view_window">{{item.title}}</a> &nbsp; 作者：{{item.author}} &nbsp; 语言：{{item.programmingLanguage}}
                &nbsp; stars：{{item.stars}} &nbsp; forks：{{item.forks}} &nbsp;
                贡献者：
                <span v-for="(contribute,dex) in item.contributors" :key="dex">
                <a v-bind:href="contribute.accountLink" target="view_window">
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
        <div class="trending" v-show="developerShow">
          <el-card class="box-card" v-for="(item, index) in developerList" :key="index" style="margin-top: 20px;font-size: 18px">
            <div class="text item">
              <div>作者：<img v-bind:src="item.avatar" style="width: 16px;height: 16px;margin-right: 5px;margin-bottom: -2px"/>
                {{item.author}} &nbsp;
                <a v-bind:href="item.accountLink" target="view_window">账号链接</a> &nbsp;
                <span v-if="item.popularRepoName">最火仓库：<a v-bind:href="item.popularRepoUrl" target="view_window">{{item.popularRepoName}}</a></span> &nbsp;
                <p v-if="item.popularRepoDescription">描述：{{item.popularRepoDescription}}</p>
              </div>
            </div>
          </el-card>
        </div>
      </div>
      <el-pagination v-show="trendingShow"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[6,12,18]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <el-pagination v-show="developerShow"
                     @size-change="handleSizeChangeDev"
                     @current-change="handleCurrentChangeDev"
                     :current-page="pageNumDev"
                     :page-sizes="[6,12,18]"
                     :page-size="pageSizeDev"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalDev"
      >
      </el-pagination>
    </div>
  </section>
</template>

<script>
import config from 'config'
export default {
  name: 'githubTrendingPage',
  data () {
    return {
      pageNumDev: 1,
      pageSizeDev: 6,
      totalDev: 5,
      currentLang: '',
      currentTime: 'daily',
      language: 'Any',
      since: 'Today',
      loading: true,
      activeName: 'first',
      pageNum: 1,
      pageSize: 6,
      total: 4,
      trendingShow: true,
      developerShow: false,
      languageList: [
        {'name': 'Any', index: ''},
        {'name': 'Java', index: 'java'},
        {'name': 'Python', index: 'python'},
        {'name': 'Go', index: 'go'},
        {'name': 'JavaScript', index: 'javascript'},
        {'name': 'C++', index: 'c++'},
        {'name': 'C', index: 'c'}
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
        }],
      developerList: [
        {
          author: 'Isaac Hinman',
          avatar: 'https://avatars.githubusercontent.com/u/10575782?s=96&v=4',
          accountLink: 'https://www.github.com/isaachinman',
          popularRepoName: 'next-i18next',
          popularRepoUrl: 'https://www.github.com/isaachinman/next-i18next',
          popularRepoDescription: 'The easiest way to translate your NextJs apps.'
        }
      ]
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
    handleSizeChangeDev (pageSize) {
      this.pageSizeDev = pageSize
      this.getDeveloperList()
    },
    handleCurrentChangeDev (pageNum) {
      this.pageNumDev = pageNum
      this.getDeveloperList()
    },
    handleClick (tab, event) {
      console.log(tab.index)
      if (tab.index === '0') {
        this.trendingShow = true
        this.developerShow = false
      } else {
        this.trendingShow = false
        this.developerShow = true
      }
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
      this.loading = true
      this.getRequest(config.apiBaseUrl + '/api/trending/' + this.currentLang,
        {since: this.currentTime, pageNum: this.pageNum, pageSize: this.pageSize}).then(resp => {
        if (resp) {
          console.log('trending:', resp)
          this.trendingData = resp.data.records
          this.total = resp.data.total
          this.loading = false
        }
      })
    },
    getDeveloperList: function () {
      this.loading = true
      this.getRequest(config.apiBaseUrl + '/api/trending/developer', {pageNum: this.pageNumDev, pageSize: this.pageSizeDev}).then(resp => {
        if (resp) {
          this.developerList = resp.data.records
          this.totalDev = resp.data.total
          this.loading = false
        }
      })
    }
  },
  created () {
    this.getData()
    this.getDeveloperList()
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
      padding: 0 2px;
    }
  }
</style>

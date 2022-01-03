<template>
  <section class="article" v-loading="loading">
    <el-backtop :visibility-height="80">
      <i class="el-icon-caret-top"></i>
    </el-backtop>
    <h1 class="title">{{article.title}}</h1>
    <div class="article-content">
      <div class="act-image-wrapper">
        <img :src="article.coverImage" alt=""/>
      </div>
      <div class="meta">
        <p class="date-published" style="margin-right: 25px;color: black">
          <i class="far fa-calendar">{{article.createTime}}</i>
        </p>
        <p class="comments"><i class="far fa-comments" style="margin-right: 30px;color: black">浏览次数：{{article.browseTimes}}</i> </p>
      </div>
      <article class="post-content" v-html="article.formatContent">
      </article>
      <p style="margin-bottom: 30px">
        <span v-for="(item,index) in postTags" :key="index" style="margin-top: -10px;margin-right:10px;float: right">{{item}}</span>
      </p>
        <p style="margin-bottom: 20px;font-size: 1.4em;">
          <span style="float: left;cursor: pointer" v-if="article.last"> 上一篇：<a @click="lastPost()">{{article.last.title}}</a></span>
          <span style="float: right;cursor: pointer" v-if="article.next"> 下一篇: <a @click.prevent="nextPost()">{{article.next.title}}</a></span>
        </p>
    </div>
    <div v-show="article.allowComment">
      <el-form :inline="true" :model="dynamicValidateForm" :rules=rule ref="dynamicValidateForm" style="text-align: left;padding: 42px">
        <el-form-item
          prop="email"
          label="邮箱"
        >
          <el-input v-model="dynamicValidateForm.email"></el-input>
        </el-form-item>
        <el-form-item
          label="用户名"
          prop="userName"
        >
          <el-input v-model="dynamicValidateForm.userName"></el-input>
        </el-form-item>
      </el-form>
      <comment v-bind="comment" ref="comm" v-on:doSend="this.doSend" v-on:doChidSend="doChidSend(arguments)"></comment>
    </div>
  </section>
</template>

<script>

import config from 'config'
import comment from 'hbl-comment'
import {Message} from 'element-ui'
export default {
  name: 'PostDetail',
  components: {
    comment
  },
  data () {
    return {
      loading: true,
      articleId: sessionStorage.getItem('articleId'),
      postTags: [],
      comment: {
        commentNum: 2,
        // placeholder: '在此输入评论',
        // authorId: 2,
        // label: '作者',
        commentList: []
      },
      rule: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        userName: [
          {required: true, message: '用户名不能为空', trigger: 'blur'}
        ]
      },
      article: {},
      dynamicValidateForm: {
        userName: '',
        email: ''
      }
    }
  },
  methods: {
    lastPost () {
      // this.$store.commit('setArticleId', this.article.last.id)
      sessionStorage.setItem('articleId', this.article.last.id)
      this.articleId = sessionStorage.getItem('articleId')
      this.getData()
    },
    nextPost () {
      sessionStorage.setItem('articleId', this.article.next.id)
      // this.$store.commit('setArticleId', this.article.next.id)
      this.articleId = sessionStorage.getItem('articleId')
      this.getData()
    },
    doSend: function () {
      this.$refs['dynamicValidateForm'].validate((valid) => {
        if (valid) {
          let content = this.$refs['comm']
          console.log(content.textareaMap[0])
          console.log('formContent', this.dynamicValidateForm)
          let data = {
            author: this.dynamicValidateForm.userName,
            commentStatus: true,
            content: content.textareaMap[0],
            email: this.dynamicValidateForm.email,
            parentId: '0',
            postId: this.articleId
          }
          this.submitComment(data)
        } else {
          Message.error({message: '请填写邮箱和用户名'})
        }
      })
    },
    doChidSend: function (argument) {
      console.log('回复一下：', argument)
      let data = {
        author: this.dynamicValidateForm.userName,
        commentStatus: true,
        content: argument[0],
        email: this.dynamicValidateForm.email,
        parentId: argument[2],
        postId: this.articleId
      }
      this.submitComment(data)
    },
    getCommentData: function () {
      this.getRequest(config.apiBaseUrl + '/api/comment/' + sessionStorage.getItem('articleId'), null).then(resp => {
        if (resp) {
          console.log('comment', resp.data)
          this.comment = resp.data
        }
      })
    },
    submitComment: function (data) {
      this.postRequest(config.apiBaseUrl + '/api/comment/', data).then(resp => {
        console.log('commentResp:', resp)
        this.getCommentData()
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    getData () {
      this.getRequest(config.apiBaseUrl + '/api/post/details', {postId: this.articleId}).then(resp => {
        if (resp) {
          console.log('article:', resp)
          this.article = resp.data
          if (resp.data.tags !== null || resp.data.tags !== '') {
            this.postTags = resp.data.tags.split(',')
          }
          this.loading = false
        }
      })
      this.getCommentData()
    }
  },
  created () {
    if (!this.articleId) {
      this.$router.push({path: '/index'})
    } else {
      this.getData()
    }
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
    background-color: lightgoldenrodyellow;
    padding: 24px 24px 70px 24px;
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
    margin-bottom: 4px;
    color: #c6c6c6;
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
    font-style: normal;
    padding: 1px;
    letter-spacing: -0.01em;
    font-family: Georgia,serif;
  }
  @media (max-width: 768px) {
    section{
      padding: 0 2px;
    }
    /* 动态元数据 */
    .article-content .meta {
      margin-top: -20px;
      margin-bottom: 2px;
      color: #c6c6c6;
      /*font-size: 12px;*/
      display: flex;
    }
    .post-content{
      text-align: left;
      font-style: normal;
      padding: 1px;
      letter-spacing: -0.01em;
      font-family: Georgia,serif;
      box-shadow: #3a8ee6;
      -ms-overflow-x: scroll;
    }
    .post-content img {
      max-width: 95%;
      overflow: auto;
      border: .15em solid #e0dfcc;
    }
  }
</style>

<template>
  <div style="margin: 30px 60px 80px 80px">
    <div class="mb-4" style="margin-bottom: 20px">
      <a-input
        v-model="postToStage.title"
        placeholder="请输入文章标题"
        size="large"
      />
    </div>
    <div class="mb-4" style="margin-bottom: 20px">
      <a-input
        v-model="postToStage.coverImage"
        placeholder="封面图片链接"
        size="large"
      />
    </div>
    <div class="mb-4" style="margin-bottom: 20px">
      <a-textarea style="height: 80px"
                  v-model="postToStage.description"
                  placeholder="文章简介"
                  size="large"
      />
    </div>
    <!--    <div style="margin-bottom: 20px;">-->
    <!--      <el-upload-->
    <!--        class="upload-demo"-->
    <!--        :limit = "limit"-->
    <!--        :action="actionsUrl"-->
    <!--        :on-preview="handlePreview"-->
    <!--        :on-remove="handleRemove"-->
    <!--        :file-list="fileList"-->
    <!--        :on-exceed = "onExceed"-->
    <!--        :on-success = "onSuccess"-->
    <!--        :headers = "headers"-->
    <!--        list-type="picture">-->
    <!--        <el-button size="small" type="primary">上传文章封面</el-button>-->
    <!--        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
    <!--      </el-upload>-->
    <!--    </div>-->
    <div id="editor">
      <MarkdownEditor
        :originalContent="postToStage.originalContent"
        @onSaveDraft="handleSaveDraft(true)"
        @onContentChange="onContentChange"
      ></MarkdownEditor>
    </div>
    <footer-tool-bar style="margin: 30px;">
      <a-space style="float: right;margin-bottom: 50px">
        <span>标签：</span>
        <el-select
          v-model="postToStage.tagIds"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择文章标签">
          <el-option
            v-for="item in tags"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <span>文章分类选择：</span>
        <el-select v-model="postToStage.categoryId" placeholder="请选择">
          <el-option
            v-for="item in categories"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <span>推荐：</span>
        <el-switch
          v-model="postToStage.recommend"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
        <span>允许被评论：</span>
        <el-switch
          v-model="postToStage.allowComment"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
        <!--        <reactive-button-->
        <!--          type="danger"-->
        <!--          @click="handleSaveDraft(false)"-->
        <!--          @callback="draftSavederrored = false"-->
        <!--          :loading="draftSaving"-->
        <!--          :errored="draftSavederrored"-->
        <!--          text="保存草稿"-->
        <!--          loadedText="保存成功"-->
        <!--          erroredText="保存失败"-->
        <!--        ></reactive-button>-->
        <a-button
          type="primary"
          @click="handleSaveDraft(false)"
        >发布</a-button>
      </a-space>
    </footer-tool-bar>
  </div>
</template>

<script>
import MarkdownEditor from '../components/MarkdownEditor'
import config from 'config'
import FooterToolBar from '@/admin/components/FooterToolbar'
import ReactiveButton from '@/admin/components/ReactiveButton'
import ATextarea from 'ant-design-vue/es/input/TextArea'
export default {
  components: {
    ATextarea,
    ReactiveButton,
    MarkdownEditor,
    FooterToolBar
  },
  name: 'postEditPage',
  data () {
    return {
      limit: 1,
      attachmentDrawerVisible: false,
      postSettingVisible: false,
      categories: [{
        id: '选项1',
        name: '黄金糕'
      }],
      tags: [],
      postToStage: {
        id: '',
        title: '',
        originalContent: '',
        description: '',
        coverImage: '',
        recommend: true,
        allowComment: false,
        categoryId: '',
        tagIds: [],
        postStatus: 1
      },
      fileList: [],
      selectedTagIds: [],
      selectedCategoryIds: [],
      selectedMetas: [],
      contentChanges: 0,
      draftSaving: false,
      previewSaving: false,
      draftSavederrored: false,
      headers: {
        Authorization: sessionStorage.getItem('token')
      },
      actionsUrl: config.apiBaseUrl + '/admin/upload'
    }
  },
  mounted () {
    window.onbeforeunload = function (e) {
      e = e || window.event
      if (e) {
        e.returnValue = '当前页面数据未保存，确定要离开吗？'
      }
      return '当前页面数据未保存，确定要离开吗？'
    }
  },
  watch: {
    temporaryContent: function (newValue, oldValue) {
      if (newValue) {
        this.contentChanges++
      }
    }
  },
  computed: {
    temporaryContent () {
      return this.postToStage.originalContent
    },
    editPostId () {
      return this.$store.getters.getEditPostId
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    onSuccess (response, file, fileList) {
      console.log(response)
      this.postToStage.coverImage = response.data.url
    },
    onExceed () {
      alert('封面图片已上传')
    },
    onContentChange (val) {
      this.postToStage.originalContent = val
    },
    handleSaveDraft: function (draftOnly = false) {
      console.log(this.postToStage)
      this.postToStage.id = this.editPostId
      this.putRequest(config.apiBaseUrl + '/admin/post', this.postToStage, this.headers).then(resp => {
        if (resp) {
          console.log(resp)
          if (resp.code === 200) {
            this.$router.push('/postView')
          }
        }
      })
    }
  },
  created () {
    this.getRequest(config.apiBaseUrl + '/api/category/all').then(resp => {
      if (resp) {
        console.log('categories', resp)
        this.categories = resp.data
      }
    })
    this.getRequest(config.apiBaseUrl + '/api/tag/all').then(resp => {
      if (resp) {
        this.tags = resp.data
      }
    })
    this.getRequest(config.apiBaseUrl + '/api/post/details', {postId: this.editPostId}).then(resp => {
      if (resp) {
        this.postToStage = resp.data
      }
    })
  }
}
</script>

<style scoped>
  #editor {
    min-height: 580px;
  }
</style>

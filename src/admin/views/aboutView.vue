<template>
  <div style="margin: 30px 60px 80px 80px">
    <div class="mb-4" style="margin-bottom: 20px">
      <a-input
        v-model="about.title"
        placeholder="请输入标题"
        size="large"
      />
    </div>
    <div class="mb-4" style="margin-bottom: 20px">
      <a-textarea style="height: 200px"
                  v-model="about.content"
                  placeholder="输入关于我的内容"
                  size="large"
      />
      <footer-tool-bar style="margin: 30px;">
        <a-space style="float: right;margin-bottom: 50px;">
          <a-button
            type="primary"
            @click="handle(false)"
          >更新</a-button>
        </a-space>
      </footer-tool-bar>
    </div>
  </div>
</template>

<script>
import FooterToolBar from '@/admin/components/FooterToolbar'
import config from 'config'
import {Message} from 'element-ui'

export default {
  name: 'aboutView',
  components: {
    FooterToolBar
  },
  data () {
    return {
      about: {
        title: '',
        content: ''
      },
      headers: {
        Authorization: sessionStorage.getItem('token')
      }
    }
  },
  methods: {
    handle: function (draftOnly = false) {
      this.putRequest(config.apiBaseUrl + '/about', this.about, this.headers).then(resp => {
        if (resp.code === 200) {
          Message.success({message: resp.msg})
          this.$router.push('/previewAbout')
        }
      })
    },
    getAboutMe () {
      this.getRequest(config.apiBaseUrl + '/about').then(resp => {
        if (resp) {
          console.log('categories', resp)
          this.about = resp.data
        }
      })
    }
  },
  created () {
    this.getAboutMe()
  }
}
</script>

<style scoped>

</style>

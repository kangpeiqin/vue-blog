<template>
  <div style="margin: 30px 60px 80px 80px">
    <div class="mb-4" style="margin-bottom: 20px">
      <h1> {{about.title}} </h1>
    </div>
    <div class="mb-4" style="margin-bottom: 20px">
      <div>{{about.content}}</div>
      <footer-tool-bar style="margin: 30px;">
        <a-space style="float: right;margin-bottom: 50px;">
          <a-button
            type="primary"
            @click="handle(false)"
          >编辑</a-button>
        </a-space>
      </footer-tool-bar>
    </div>
  </div>
</template>

<script>
import FooterToolBar from '@/admin/components/FooterToolbar'
import config from 'config'

export default {
  name: 'aboutPreview',
  components: {
    FooterToolBar
  },
  data () {
    return {
      about: {
        title: '标题',
        content: '关于我'
      }
    }
  },
  methods: {
    getAboutMe () {
      this.getRequest(config.apiBaseUrl + '/about').then(resp => {
        if (resp) {
          console.log('categories', resp)
          this.about = resp.data
        }
      })
    },
    handle: function (draftOnly = false) {
      this.$router.push('/viewAbout')
    }
  },
  created () {
    this.getAboutMe()
  }
}
</script>

<style scoped>

</style>

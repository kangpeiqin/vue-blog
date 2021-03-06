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
                  v-model="about.description"
                  placeholder="输入关于我的内容"
                  size="large"
      />
      <footer-tool-bar style="margin: 30px;">
        <a-space style="float: right;margin-bottom: 50px;">
          <a-button
            type="primary"
            @click="handle(false)"
          >更新</a-button>
          <a-button
            type="primary"
            @click="handle(false)"
          >发布</a-button>
        </a-space>
      </footer-tool-bar>
    </div>
  </div>
</template>

<script>
import FooterToolBar from '@/admin/components/FooterToolbar'

export default {
  name: 'aboutView',
  components: {
    FooterToolBar
  },
  data () {
    return {
      about: {
        title: '',
        description: ''
      }
    }
  },
  methods: {
    handle: function (draftOnly = false) {

    }
  }
}
</script>

<style scoped>

</style>

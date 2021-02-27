<template>
  <div>
    <halo-editor style="min-height: 600px;margin-bottom: 30px;border-color: #9991e6;"
      ref="md"
      v-model="originalContentData"
      :boxShadow="false"
      :toolbars="toolbars"
      :ishljs="true"
      autofocus
      @imgAdd="handleAttachmentUpload"
      @save="handleSaveDraft"
    />
  </div>
</template>

<script>
import { toolbars } from '@/assets/js/const'
import { haloEditor } from 'halo-editor'
import 'halo-editor/dist/css/index.css'

export default {
  name: 'MarkdownEditor',
  components: {
    haloEditor
  },
  props: {
    originalContent: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      toolbars,
      originalContentData: ''
    }
  },
  watch: {
    originalContent (val) {
      this.originalContentData = val
    },
    originalContentData (val) {
      this.$emit('onContentChange', val)
    }
  },
  methods: {
    handleAttachmentUpload (pos, $file) {
      var formdata = new FormData()
      formdata.append('file', $file)
      // attachmentApi.upload(formdata).then((response) => {
      //   var responseObject = response.data
      //   var HaloEditor = this.$refs.md
      //   HaloEditor.$img2Url(pos, encodeURI(responseObject.data.path))
      // })
    },
    handleSaveDraft () {
      this.$emit('onSaveDraft')
    }
  }
}
</script>

<style scoped>

</style>

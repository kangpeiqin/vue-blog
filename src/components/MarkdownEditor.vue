<template>
  <div>
    <halo-editor
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
export default {
  name: 'MarkdownEditor',
  components: {
    haloEditor
  },
  data () {
    return {
      toolbars,
      originalContentData: ''
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

<template>
  <div>
    <div class="mb-4">
      <a-input
        placeholder="请输入文章标题"
      />
    </div>
    <div id="editor">
      <MarkdownEditor
        :originalContent="postToStage.originalContent"
      />
    </div>
  </div>
</template>

<script>
import MarkdownEditor from '../components/MarkdownEditor'

export default {
  components: {
    MarkdownEditor
  },
  name: 'postEditorPage',
  data () {
    return {
      attachmentDrawerVisible: false,
      postSettingVisible: false,
      postToStage: {
        originalContent: ''
      },
      selectedTagIds: [],
      selectedCategoryIds: [],
      selectedMetas: [],
      contentChanges: 0,
      draftSaving: false,
      previewSaving: false,
      draftSavederrored: false
    }
  }
}
</script>

<style scoped>

</style>

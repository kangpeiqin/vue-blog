<template>
  <div>
    <common-header></common-header>
    <div>
      <post-detail></post-detail>
    </div>
  </div>
</template>

<script>
import CommonHeader from '../components/CommonHeader'
import PostDetail from '../components/PostDetail'
export default {
  data () {
    return {
    }
  },
  components: {
    CommonHeader,
    PostDetail
  },
  created () {

  }
}
</script>

<style scoped>

</style>

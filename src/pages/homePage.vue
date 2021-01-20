<template>
  <div>
    <post-overview :keyWord="searchContent"></post-overview>
  </div>
</template>

<script>
import PostOverview from '../components/PostOverview'

export default {
  data () {
    return {}
  },
  components: {
    PostOverview
  },
  created () {},
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

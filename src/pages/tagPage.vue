<template>
    <div class="block">
      <archive></archive>
    </div>
</template>

<script>
import Archive from '../components/Archive'
export default {
  name: 'labelPage',
  components: {
    Archive
  },
  created () {

  }
}
</script>

<style scoped>
  .block{
    margin-top: 110px;
  }
</style>

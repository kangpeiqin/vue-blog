<template>
  <div class="container">
    <exception-page type="404" />
  </div>
</template>

<script>
import ExceptionPage from './ExceptionPage'

export default {
  components: {
    ExceptionPage
  }
}
</script>
<style scoped>
  .container{
    background: url("../assets/images/notFound.png") fixed no-repeat center;
  }
</style>

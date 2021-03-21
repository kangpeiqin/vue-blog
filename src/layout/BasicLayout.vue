<template>
    <div>
      <common-header></common-header>
      <route-view />
<!--      <common-footer></common-footer>-->
    </div>
</template>

<script>
import CommonHeader from '../components/CommonHeader'
import CommonFooter from '../components/CommonFooter'
import RouteView from './RouteView'
export default {
  name: 'BasicLayout',
  components: {
    RouteView,
    CommonFooter,
    CommonHeader
  }
}
</script>

<style scoped>

</style>

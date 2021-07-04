<template>
    <div>
      <common-header></common-header>
      <div id="p-content" v-bind:style="{minHeight:height+'px'}">
        <route-view/>
      </div>
      <common-footer></common-footer>
    </div>
</template>

<script>
import CommonHeader from '../components/CommonHeader'
import CommonFooter from '../components/CommonFooter'
import RouteView from './RouteView'
export default {
  name: 'BasicLayout',
  data () {
    return {
      height: 0
    }
  },
  components: {
    RouteView,
    CommonFooter,
    CommonHeader
  },
  mounted () {
    this.height = document.documentElement.clientHeight - 100
    window.onresize = () => { this.height = document.documentElement.clientHeight - 100 }
  }
}
</script>

<style scoped>

</style>

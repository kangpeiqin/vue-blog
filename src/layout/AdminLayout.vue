<template>
    <div>
      <global-header></global-header>
      <route-view />
    </div>
</template>

<script>
import GlobalHeader from '../admin/components/GlobalHeader'
import RouteView from './RouteView'
export default {
  name: 'AdminLayout',
  components: {RouteView, GlobalHeader}
}
</script>

<style scoped>

</style>

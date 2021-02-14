<template>
  <div class="exception">
    <div v-bind:style="{minHeight:calHeight}"></div>
    <el-button type="primary" @click="handleToHome">返回首页</el-button>
  </div>
</template>

<script>
import types from './type'

export default {
  name: 'Exception',
  props: {
    type: {
      type: String,
      default: '404'
    }
  },
  data () {
    return {
      config: types
    }
  },
  computed: {
    calHeight: function () {
      return (window.screen.height - 220) + 'px'
    }
  },
  methods: {
    handleToHome () {
      this.$router.push({ name: 'homePage' })
    }
  }
}
</script>

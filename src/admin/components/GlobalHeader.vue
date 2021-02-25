<template>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="1" @click="dashBoard()">仪表盘</el-menu-item>
    <el-submenu index="2">
      <template slot="title">文章</template>
      <el-menu-item index="2-1" @click="postView()">文章列表</el-menu-item>
      <el-menu-item index="2-2" @click="postEditor()">写文章</el-menu-item>
    </el-submenu>
    <el-menu-item index="3">分类目录</el-menu-item>
    <el-menu-item index="4">标签管理</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'GlobalHeader',
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    postView () {
      this.$router.push('/postView')
    },
    dashBoard () {
      this.$router.push('/dashBoard')
    },
    postEditor () {
      this.$router.push('/editor')
    }
  },
  created () {
    this.dashBoard()
  }
}
</script>

<style scoped>

</style>

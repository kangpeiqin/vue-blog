<template>
  <li style="display: flex;margin-top: -8px" v-show="searchShow">
    <el-input style="margin-right: 10px"
              placeholder="搜索文章"
              clearable v-model="searchContent"
    >
    </el-input>
    <el-button style="padding: 10px" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
  </li>
</template>

<script>
export default {
  name: 'qryInput'
}
</script>

<style scoped>

</style>

<template>
  <div id="app">
<!--    <common-header></common-header>-->
    <router-view/>
<!--    <common-footer></common-footer>-->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  html,
  body {
    margin: 0;
    font-family: "PingFang SC", "Microsoft Yahei",
    sans-serif;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    overflow: hidden;
  }
  /*.el-dialog{*/
  /*  !*background: pink;*!*/
  /*  background: url("./assets/images/chatbg.jpg")  fixed no-repeat center;*/
  /*  background-size: cover;*/
  /*}*/
</style>

<template>
  <footer>
    <!-- 底部菜单 -->
    <div class="footer-menus">
      <!-- 版权信息 -->
      <p class="rights">
        &copy; 2019 - 2021 PEIQIN BLOG -  <a href="http://www.miibeian.gov.cn/" target="_blank">闽ICP备2021005609号-1</a>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'CommonFooter',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
  footer {
    /*position: fixed;*/
    bottom: 0;
    width: 100%;
    /*margin-top: 50px;*/
    background-color: #181818;
    display: grid;
    justify-items: center;
    /*padding-top: 5px;*/
    /*padding-bottom: 5px;*/
  }

  /* 底部菜单 */
  .footer-menus {
    width: 100%;
    max-width: 1180px;
    display: grid;
    /* 5列布局 */
    grid-template-columns: 2fr repeat(4, 1fr);
    padding: 0 80px;
    position: relative;
  }

  /* 导航菜单，靠右对齐 */
  .footer-menu {
    justify-self: end;
  }

  .rights {
    /* 占满整行，-1代表最后一个编号 */
    grid-column: 1 / -1;
    /* 居中对齐 */
    justify-self: center;
    color: white;
  }

</style>

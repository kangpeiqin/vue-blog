<template>
  <nav class="sticky">
    <div class="logo">KANG'S BLOG</div>
    <ul class="nav-menu">
      <li style="display: flex;margin-top: -8px" v-show="searchShow">
          <el-input style="margin-right: 10px"
            placeholder="搜索文章"
            clearable v-model="searchContent"
          >
          </el-input>
          <el-button style="padding: 10px" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </li>
      <li v-on:click=goToIndex()>首页</li>
      <li v-on:click=goToAbout()>关于我</li>
      <li v-on:click="goToType()">分类</li>
      <li v-on:click="goToLabel()">标签</li>
      <li>登陆</li>
    </ul>
    <div class="burger" v-on:click=showIndex()>
      <div class="top-line"></div>
      <div class="middle-line"></div>
      <div class="bottom-line"></div>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      searchShow: true,
      searchContent: ''
    }
  },
  methods: {
    search: function () {
      alert(this.searchContent)
    },
    goToIndex: function () {
      this.searchShow = true
      this.$router.push({path: '/'})
    },
    goToAbout: function () {
      this.searchShow = false
      this.$router.push({path: '/about'})
    },
    goToType: function () {
      this.searchShow = false
      this.$router.push({path: '/type'})
    },
    goToLabel: function () {
      this.searchShow = false
      this.$router.push({path: '/tag'})
    },
    showIndex: function () {
      const burger = document.querySelector('.burger')
      const navMenu = document.querySelector('.nav-menu')
      const navMenuItems = document.querySelectorAll('.nav-menu li')
      burger.classList.toggle('active')
      navMenu.classList.toggle('open')
      navMenuItems.forEach((item, index) => {
        // 如果已添加animation,先取消
        if (item.style.animation) {
          item.style.animation = ''
        } else {
          item.style.animation = `0.3s ease-in slideIn forwards ${index * 0.1 +
            0.3}s`
        }
      })
    }
  },
  created () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "PingFang SC", "Microsoft Yahei", sans-serif;
  }

  nav {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* 左右padding */
    padding: 0 5vw;
    height: 80px;
    background-color: white;
    box-shadow: 0 0 18px rgba(0, 0, 0, 0.2);
    z-index: 200;
  }

  .sticky {
    position: fixed;
    background-color: white;
    box-shadow: 0 0 18px rgba(0, 0, 0, 0.2);
  }

  .logo {
    font-size: 24px;
    font-weight: 600;
    color: black;
  }

  .nav-menu {
    /* 占令一半宽度 */
    /*flex: 1;*/
    display: flex;
    /*justify-content: space-between;*/
    /*max-width: 550px;*/
  }

  .nav-menu li {
    float: left;
    margin-right: 50px;
    list-style: none;
    color: #313335;
    font-weight: 600;
    cursor: pointer;
  }

  .nav-menu li:hover,.login:hover{
    color: #8bb5f5;
  }

  .burger div {
    /* 设置汉堡按钮三层条 */
    width: 25px;
    height: 3px;
    background-color: #dadbdd;
    margin: 4px;
  }

  .burger {
    display: none;
  }

  .burger:hover {
    cursor: pointer;
  }

  /* 屏幕适配 */
  @media screen and (max-width: 768px) {
    .burger {
      display: block;
    }

    /* 小屏幕菜单显示位置为右侧抽屉形式 */
    .nav-menu {
      position: absolute;
      top: 80px;
      right: 0;
      bottom: 0;
      width: 50vw;
      height: calc(100vh - 80px);

      background-color: white;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      /* 动画 */
      transform: translateX(100%);
    }

    /* 菜单打开时，滑到初始位置 */
    .nav-menu.open {
      transform: translateX(0);
      transition: 0.4s ease-in-out;
    }

    /* 每个菜单项默认看不到，向右移动20象素 */
    .nav-menu li {
      /* 上下间距 */
      margin: 3vh;
      transform: translateX(20px);
    }

    /* 汉堡按钮被点开时，设置按钮过渡 */
    .burger.active div {
      transition: 0.3s ease-in-out 0.3s;
    }

    /* 第一条线旋转45度 */
    .burger.active .top-line {
      transform: rotate(45deg) translate(4px, 6px);
    }

    /* 第三条线旋转-45度 */
    .burger.active .bottom-line {
      transform: rotate(-45deg) translate(4px, -6px);
    }

    /* 中间线向右移动并变为透明 */
    .burger.active .middle-line {
      opacity: 0;
      transform: translateX(10px);
      transition: 0.3s ease-in-out;
    }

    /* 菜单项滑入动画 */
    @keyframes slideIn {
      from {
        transform: translateX(20px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  }
</style>

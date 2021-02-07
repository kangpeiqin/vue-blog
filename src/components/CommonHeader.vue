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
      <li v-on:click="goToType()">分类</li>
      <li v-on:click="goToLabel()">归档</li>
      <li v-on:click=goToAbout()>关于我</li>
      <li v-on:click="login()">登陆</li>
      <a href="https://github.com/winRh" class="github-corner" aria-label="View source on GitHub">
        <svg width="80" height="80" viewBox="0 0 250 250" style="fill:#151513; color:#fff; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true">
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm">
        </path>
          <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body">
          </path>
        </svg>
      </a>
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
      searchShow: false,
      searchContent: ''
    }
  },
  methods: {
    search: function () {
      this.$router.push({
        path: '/',
        query: {
          content: this.searchContent
        }
      })
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
    login: function () {
      this.searchShow = false
      this.$router.push({path: '/loginPage'})
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
    this.goToIndex()
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

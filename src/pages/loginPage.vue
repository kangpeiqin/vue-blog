<template>
  <div class="container">
    <form action="#" class="login-form customize-panel">
      <h2 class="customize-font">登陆</h2>
      <input class="customize-input" type="text" v-model="username"  placeholder="用户名"/>
      <input class="customize-input"  type="password" v-model="password" placeholder="密码"/>
      <button class="customize-btn" type="submmit" v-on:click=userLogin()>登陆</button>
      <div style="display: inline-block">
        <a href="javascript:void(0)" style="margin-right: 6px;font-size: 8px" v-on:click=userRegister()>注册</a>
        <a href="javascript:void(0)" style="font-size: 8px" v-on:click=findBackPassword()>忘记密码</a>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'loginPage',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    userLogin: function (event) {
      this.$router.push({path: 'register'})
    },
    userRegister: function (event) {
      this.$router.push({path: 'register'})
    },
    findBackPassword: function (event) {
      this.$router.push({path: 'findPassword'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

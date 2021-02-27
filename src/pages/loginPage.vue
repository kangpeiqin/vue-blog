<template>
  <div class="container">
    <form action="#" class="login-form customize-panel">
      <h2 class="customize-font">登陆</h2>
      <a-input class="customize-input" type="text" v-model="username"  placeholder="用户名"/>
      <a-input class="customize-input"  type="password" v-model="password" placeholder="密码"/>
      <a-button class="customize-btn"  @click.prevent="userLogin()">登陆</a-button>
<!--      <div style="display: inline-block">-->
<!--        <a href="javascript:void(0)" style="margin-right: 6px;font-size: 8px" v-on:click=userRegister()>注册</a>-->
<!--        <a href="javascript:void(0)" style="font-size: 8px" v-on:click=findBackPassword()>忘记密码</a>-->
<!--      </div>-->
    </form>
  </div>
</template>

<script>
import config from 'config'
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
      console.log(this.username, this.password)
      this.postRequest(config.apiBaseUrl + '/auth/login' + '?username=' + this.username + '&password=' + this.password, null).then(resp => {
        if (resp) {
          if (resp.data != null) {
            console.log('login:', resp)
            sessionStorage.setItem('token', resp.data)
            console.log(sessionStorage.getItem('token'))
            this.$router.push('/admin')
          }
        }
      })
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

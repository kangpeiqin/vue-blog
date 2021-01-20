<template lang="html">
  <div class="container">
    <div class="customize-panel">
        <h2 class="customize-font">注册</h2>
        <input class="customize-input" v-model="username" placeholder="用户名"/>
        <input class="customize-input" v-model="password" placeholder="密码"/>
        <input class="customize-input" v-model="rePassword" placeholder="确认密码"/>
        <input class="customize-input" v-model="userMail" placeholder="邮箱"/>
        <input class="customize-input" v-model="userPhone" placeholder="手机"/>
        <button class="customize-btn" v-on:click=userRegister()>注册</button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      userMail: '',
      userPhone: '',
      rePassword: ''
    }
  },
  methods: {
    //      注册方法
    userRegister: function (event) {
      if (this.password !== this.rePassword) {
        alert('两次密码不一致')
      } else {
        // let sendDate = {
        //   username: this.username,
        //   password: this.password,
        //   userMail: this.userMail,
        //   userPhone: this.userPhone
        // }
        // this.$http.post('http://localhost:3000/users/register', sendDate).then((data) => {
        //   if (data.body.status === 1) {
        //     alert(data.body.message)
        //   } else {
        //     alert(data.body.message)
        //     this.$router.go(-1)
        //   }
        // })
      }
    }
  }

}
</script>
<style scoped>
  .customize-panel {
    width: 280px;
    height: 360px;
  }

</style>

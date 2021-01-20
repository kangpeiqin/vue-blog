<template lang="html">
  <div class="container">
    <div class="customize-panel">
      <div  v-show="showUserInfo">
        <h2 class="customize-font">找回密码</h2>
          <input class="customize-input" v-model="username" placeholder="用户名"/>
          <input class="customize-input" v-model="userMail" placeholder="邮箱"/>
          <input class="customize-input" v-model="userPhone" placeholder="手机号"/>
          <button class="customize-btn" v-on:click=checkUser()>找回密码</button>
      </div>
      <div  v-show="showRePassword" >
          <h2 class="customize-font">修改密码</h2>
          <input class="customize-input" v-model="repassword" placeholder="输入新密码">
          <button class="customize-btn" v-on:click=changeUserPassword()>修改密码</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userMail: '',
      userPhone: '',
      username: '',
      repassword: '',
      showRePassword: false,
      showUserInfo: true
    }
  },
  methods: {
    checkUser: function (event) {

    },
    changeUserPassword: function (event) {

    }
  }

}
</script>
<style scoped>
 .customize-panel{
   width: 260px;
   height: 280px;
 }
</style>

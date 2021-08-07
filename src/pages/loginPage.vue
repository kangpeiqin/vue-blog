<template>
  <div class="login-container">
    <div class="clock-container">
      <div class="time"></div>
      <div class="date"></div>
    </div>
    <el-form :model="ruleForm2" :rules="rules2"
             status-icon
             ref="ruleForm2"
             label-position="left"
             label-width="0px"
             class="demo-ruleForm login-page">
      <h3 class="title">用户登录</h3>
      <el-form-item prop="username">
        <el-input type="text"
                  v-model="ruleForm2.username"
                  auto-complete="true"
                  placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password"
                  v-model="ruleForm2.password"
                  auto-complete="off"
                  placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.prevent="handleSubmit" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import config from 'config'
export default {
  name: 'loginPage',
  data () {
    return {
      username: '',
      password: '',
      logining: false,
      ruleForm2: {
        username: '',
        password: ''
      },
      rules2: {
        username: [{type: 'email', required: true, message: '请输入正确的邮箱地址', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}]
      },
      checked: false
    }
  },
  mounted () {
    this.clock()
  },
  methods: {
    clock () {
      const timeEl = document.querySelector('.time')
      const dateEl = document.querySelector('.date')
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      function setTime () {
        const time = new Date()
        const month = time.getMonth()
        const day = time.getDay()
        const date = time.getDate()
        const hours = time.getHours()
        const hoursForClock = hours >= 13 ? hours % 12 : hours
        const minutes = time.getMinutes()
        const ampm = hours >= 12 ? 'PM' : 'AM'
        timeEl.innerHTML = `${hoursForClock}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`
        dateEl.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span>`
      }
      setTime()
      setInterval(setTime, 1000)
    },
    handleSubmit (event) {
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          this.postRequest(config.apiBaseUrl + '/auth/login' + '?username=' + this.ruleForm2.username + '&password=' + this.ruleForm2.password, null).then(resp => {
            if (resp) {
              if (resp.data != null) {
                console.log('login:', resp)
                this.logining = true
                sessionStorage.setItem('token', resp.data)
                console.log(sessionStorage.getItem('token'))
                this.$router.push('/admin')
              } else {
                this.logining = false
                this.$alert('账号或者密码错误', 'info', {
                  confirmButtonText: 'ok'
                })
              }
            }
          })
        } else {
          console.log('error submit!')
          return false
        }
      })
    },
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .login-container {
    width: 100%;
    height: 100%;
  }
  .login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 20px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  @import url('https://fonts.googleapis.com/css?family=Heebo:300&display=swap');

  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Heebo', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow: hidden;
    margin: 0;
  }

  .clock-container {
    margin-top: 115px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .time {
    font-size: 60px;
  }

  .date {
    color: #aaa;
    font-size: 14px;
    letter-spacing: 0.3px;
    text-transform: uppercase;
  }
</style>

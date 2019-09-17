<template>
  <body id="paper">
    <el-form :rules="rules" class="login-container" label-position="left"
      label-width="0px" v-loading="loading">
      <h3 class="login-title">系统登录</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号">
        </el-input>
      </el-form-item>
      <el-form-item prop="account">
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码">
        </el-input>
      </el-form-item>
      <el-checkbox class="login_remember" v-model="checked" label-position="left">
        <span style="color: #505458">记住密码</span>
      </el-checkbox>
      <el-form-item>
        <el-button type="primary" @click="login" style="width: 100%;background: #505458;border: none">登录</el-button>
      </el-form-item>
    </el-form>
  </body>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loading: false,
      rules: {
        accout: [{required: true, message: '请输入正确的用户名', trigger: 'blur'}],
        checkPass: [{required: true, message: '请输入正确的密码', trigger: 'blur'}]
      },
      loginForm: {
        username: 'admin',
        password: '123'
      },
      checked: true
    }
  },
  methods: {
    login: function () {
      var _this = this
      this.$axios.post('/login', {
        username: this.loginForm.username,
        password: this.loginForm.password
      }).then(resp => {
        if (resp.data.code === 200) {
          var data = resp.data
          _this.$store.commit('login', data.data)
          var path = _this.$route.query.redirect
          _this.$router.replace({path: path === '/' || path === undefined ? '/home' : path})
        }
      }).catch(failResponse => {})
    }
  }
}
</script>

<style>
  body{
    margin: 0px;
  }
  #paper{
    background: url("../assets/img/bg/eva1.jpg") no-repeat;
    background-position: center;
    width: 100%;
    height: 100%;
    background-size: cover;
    position: fixed;
  }
  .login-container{
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login-title{
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .login_remember{
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
</style>

<template>
  <div class="login">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
    >
      <h3 class="title">健康社区登录</h3>
      <el-form-item prop="userName">
        <el-input
          v-model="loginForm.userName"
          type="text"
          auto-complete="off"
          placeholder="账号"
        >
          <svg-icon
            slot="prefix"
            icon-class="user"
            class="el-input__icon input-icon"
          />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon
            slot="prefix"
            icon-class="password"
            class="el-input__icon input-icon"
          />
        </el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input
          v-model="loginForm.captcha"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon
            slot="prefix"
            icon-class="validCode"
            class="el-input__icon input-icon"
          />
        </el-input>
        <div
          class="login-captcha"
          @click="getCode"
          v-html="codeHtml"
        />
      </el-form-item>
      <el-checkbox
        v-model="loginForm.rememberMe"
        style="margin: 0 0 25px 0"
      >记住密码</el-checkbox>
      <span
        class="text"
        @click="toRegiter"
      >立即注册</span>
      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width: 100%"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import { getCodeImg } from '@/api/user'
import { encrypt, decrypt } from '@/utils/jsencrypt'
export default {
  name: 'Login',
  data() {
    return {
      codeHtml: '',
      cookiePassword: '',
      loginForm: {
        userName: '',
        password: '',
        rememberMe: false,
        captcha: '',
        uuid: ''
      },
      loginRules: {
        userName: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
        captcha: [{ required: true, trigger: 'change', message: '验证码不能为空' }]
      },
      loading: false,
      redirect: undefined
    }
  },
  created() {
    this.getCode()
    this.getCookie()
  },
  methods: {
    getCode() {
      getCodeImg().then(res => {
        this.codeHtml = res.data
      })
    },
    getCookie() {
      const userName = Cookies.get('kuserName')
      const password = Cookies.get('kpassword')
      const rememberMe = Cookies.get('krememberMe')
      this.loginForm = {
        userName: userName === undefined ? this.loginForm.userName : userName,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      }
    },
    toRegiter() {
      this.$router.push({ path: '/register' })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          if (this.loginForm.rememberMe) {
            Cookies.set('kuserName', this.loginForm.userName, { expires: 30 })
            Cookies.set('kpassword', encrypt(this.loginForm.password), {
              expires: 30
            })
            Cookies.set('krememberMe', this.loginForm.rememberMe, {
              expires: 30
            })
          } else {
            Cookies.remove('kuserName')
            Cookies.remove('kpassword')
            Cookies.remove('krememberMe')
          }
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$store.dispatch('user/getInfo').then(() => {
                window.location.reload()
                this.$router.push({ path: this.redirect || '/' })
                this.loading = false
              })
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  align-items: center;
  height: 100%;
  background-size: cover;
  box-sizing: border-box;
  justify-content: flex-end;
  background-image: url('../../../public/loginbackgroud.jpg');
  background-size: 100% 100%;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}
.text {
  margin-left: 50px;
  cursor: pointer;
  color: #1890ff;
}
.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  margin-right: 150px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-captcha {
  width: 33%;
  height: 38px;
  float: right;
  box-sizing: border-box;
  border: 1px solid #dcdfe6;
  svg {
    cursor: pointer;
    height: 100%;
    width: 100%;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 12px;
  letter-spacing: 1px;
}
</style>

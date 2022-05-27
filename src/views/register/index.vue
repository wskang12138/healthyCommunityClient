<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">加入健康社区平台</div>
      <el-form
        ref="registerForm"
        :model="registerParam"
        :rules="rules"
        label-width="0px"
        class="ms-content"
      >
        <el-form-item prop="name">
          <el-input
            v-model="registerParam.name"
            placeholder="真实姓名"
            prefix-icon="el-icon-user"
          />
        </el-form-item>
        <el-form-item prop="userName">
          <el-input
            v-model="registerParam.userName"
            placeholder="账号"
            prefix-icon="el-icon-user"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="registerParam.password"
            type="password"
            placeholder="密码"
            prefix-icon="el-icon-lock"
          />
        </el-form-item>
        <el-form-item prop="r_password">
          <el-input
            v-model="registerParam.r_password"
            type="password"
            placeholder="确认密码"
            prefix-icon="el-icon-lock"
          />
        </el-form-item>
        <el-form-item prop="phone">
          <el-input
            v-model="registerParam.phone"
            placeholder="电话"
            prefix-icon="el-icon-phone-outline"
          />
        </el-form-item>
        <div class="login-btn">
          <el-button
            type="primary"
            @click="submitRegisterForm('registerForm')"
          >注册</el-button>
        </div>
        <el-link
          type="primary"
          style="text-align: center"
          @click="toLogin"
        >去登陆 ></el-link>
      </el-form>
    </div>
    <el-dialog
      title="注册"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>注册成功</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="toLogin"
        >去 登 录</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { register } from '@/api/user'

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerParam.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validateMobilePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('负责人手机号不可为空'))
      } else {
        if (value !== '') {
          var reg = /^1[3456789]\d{9}$/
          if (!reg.test(value)) {
            callback(new Error('请输入有效的手机号码'))
          }
        }
        callback()
      }
    }

    return {
      registerParam: {},
      dialogVisible: false,
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 32, message: '请输入2-20位字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 32, message: '请输入6-32位字符', trigger: 'blur' }
        ],
        r_password: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            validator: validateMobilePhone,
            message: '请输入正确手机号',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submitRegisterForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          register(this.registerParam)
            .then(response => {
              this.dialogVisible = true
              this.registerParam = {}
            })
            .catch(error => {
              this.$message.error('注册失败')
            })
        } else {
          this.$message.error('请根据提示输入必填项')
          return false
        }
      })
    },
    toLogin() {
      this.$router.push({ path: '/login' })
      dialogVisible = false
    }
  }
}
</script>

<style scoped lang="scss">
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url('../../../public/loginbackgroud.jpg');
  background-size: 100% 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #2d333f;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.897);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
</style>

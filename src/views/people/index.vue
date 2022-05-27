<template>
  <div class="user_details">
    <!-- 头像 -->
    <div class="userface">
      <div class="photo">
        <div class="box">
          <img
            :src="imageUrl"
            alt
          >
        </div>
      </div>

      <div style="padding-top: 50px; text-align: right">
        <el-button
          size="small"
          type="text"
          @click="toAlterUserface"
        >修改头像</el-button>
      </div>
    </div>

    <div class="info">
      <el-form
        label-width="100"
        size="small"
      >
        <el-form-item label="用户姓名">{{ people.username }}</el-form-item>
        <el-form-item label="用户手机">{{ people.phone }}</el-form-item>
        <el-form-item label="用户性别">
          {{ people.sex }}
        </el-form-item>
        <el-form-item label="用户角色">{{ people.rolesName }}</el-form-item>
        <el-form-item label="注册时间">{{ people.registerTime | fmtDateTime }}</el-form-item>
        <el-form-item label="登录用户">{{ people.account }}</el-form-item>
        <el-form-item label="用户状态">
          <el-tag size="small">{{ people.status }}</el-tag>
        </el-form-item>
      </el-form>
    </div>
    <div style="text-align: right; padding-right: 220px; border-top: 1px solid seashell">
      <el-button
        size="small"
        type="text"
        @click="toAlterInfo"
      >修改个人信息</el-button>
      <el-button
        size="small"
        type="text"
        @click="handleResetPwd"
      >重置密码</el-button>
    </div>

    <!-- 个人信息模态框 -->
    <el-dialog
      title="个人信息修改"
      :visible.sync="visible"
      width="50%"
      class="customer_modal"
    >
      <el-form
        ref="form"
        size="small"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="账号">
          <el-input
            disabled
            :placeholder="form.account"
          />
        </el-form-item>
        <el-form-item
          label="真实姓名"
          prop="username"
        >
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item
          label="用户手机"
          prop="phone"
        >
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item
          label="性别"
          prop="sex"
        >
          <el-radio-group v-model="form.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="small"
          @click="visible = false"
        >取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="alterUserfaceHandler('form')"
        >确 定
        </el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="更改头像"
      :visible.sync="visible_userface"
      width="50%"
      class="customer_modal"
    >
      <div style="display: flex">
        <div
          class="photo"
          style="width: 120px; margin: 0 auto; flex: 1"
        >
          <img
            :src="userface"
            alt
            style="width: 100%"
          >
        </div>
        <div style="flex: 1">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:7001/images/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="imageUrl"
              :src="imageUrl"
              class="avatar"
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            />
          </el-upload>
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="small"
          @click="visible_userface = false"
        >取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="alterfaceHandle"
        >确 定 修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import _ from 'lodash'
import Cookies from 'js-cookie'
import { peopleFind, passwordChange, changeImg, updatePeople } from '@/api/user'
import { validateMobilePhone } from '@/utils/validate'
export default {
  data() {
    return {
      form: {},
      userface: '',
      imageUrl: '',
      people: '',
      url: '',
      visible: false,
      visible_userface: false,
      rules: {
        username: [{ required: true, message: '请输入', trigger: 'blur' }],
        sex: [{ required: true, message: '请输入', trigger: 'change' }],
        phone: [
          { required: true, message: '请输入', trigger: 'blur' },
          {
            validator: validateMobilePhone,
            message: '请输入正确手机号',
            trigger: 'blur'
          }
        ]
      },
      fileList: []
    }
  },
  methods: {
    toAlterUserface() {
      this.visible_userface = true
    },
    handleAvatarSuccess(res) {
      this.imageUrl = process.env.VUE_APP_BASE_API + `/public/upload/` + res.avater
      this.url = res.avater
    },
    handleResetPwd() {
      this.$prompt('请输入"' + '你' + '"的新密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          const query = {
            password: value,
            user_id: this.people.user_id
          }
          passwordChange(query).then(res => {
            Cookies.remove('user-wsk-token')
            window.location.reload()
            this.$message({
              type: 'success',
              message: '新密码是' + value
            })
          })
        })
        .catch(() => {})
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 修改个人信息
    toAlterInfo() {
      this.form = _.clone(this.people)
      this.visible = true
    },
    // 修改个人头像
    alterfaceHandle() {
      this.obj = {
        avater: this.url,
        user_id: this.people.user_id
      }
      changeImg(this.obj).then(res => {
        peopleFind({ token: Cookies.get('user-wsk-token') }).then(res => {
          this.people = res.data[0]
          this.imageUrl = process.env.VUE_APP_BASE_API + `/public/upload/` + this.people.avatar
          window.localStorage.setItem('useravatar', this.people.avatar)
          window.location.reload()
        })
        this.$message({
          type: 'success',
          message: res.message
        })
      })
      this.visible_userface = false
    },

    alterUserfaceHandler(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          updatePeople(this.form).then(res => {
            peopleFind({ token: Cookies.get('user-wsk-token') }).then(res => {
              this.people = res.data[0]
              this.imageUrl = process.env.VUE_APP_BASE_API + `/public/upload/` + this.people.avatar
            })
            this.visible = false
            // 提示成功操作信息
            this.$message({
              type: 'success',
              message: res.message
            })
          })
        } else {
          alert('error submit!!')
          return false
        }
      })
    }
  },
  created() {
    peopleFind({ token: Cookies.get('user-wsk-token') }).then(res => {
      this.people = res.data[0]
      this.imageUrl = process.env.VUE_APP_BASE_API + `/public/upload/` + this.people.avatar
    })
  }
}
</script>
<style lang="scss" scoped>
.userface {
  display: flex;
  padding: 1em 200px;
  & > div {
    flex: 1;
  }
  .photo {
    .box {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      overflow: hidden;
    }
    img {
      width: 100%;
    }
  }
  border-bottom: 2px solid seashell;
  margin-bottom: 1em;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

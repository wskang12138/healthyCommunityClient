<template>
  <!-- 发布资讯页面 -->
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
      align="left"
    >
      <div style="float: left">
        <el-form-item
          label="标题"
          prop="title"
        >
          <el-input
            v-model="form.title"
            style="width: 300px"
          />
        </el-form-item>
        <el-form-item
          label="发布时间"
          prop="publish_time"
        >
          <el-date-picker
            v-model="form.publish_time"
            type="datetime"
            format="yyyy-MM-dd hh:mm"
            value-format="yyyy-MM-dd hh:mm"
            placeholder="选择日期时间"
          />
        </el-form-item>
      </div>
      <el-form-item
        label="封面"
        style="float: right; margin-right: 100px"
        prop="url"
      >
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:7001/images/upload"
          :on-success="handleAvatarSuccess"
        >
          <img
            v-if="imageUrl"
            :src="imageUrl"
            class="avatar"
            style="width: 178px"
          >
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon"
            style="width: 178px"
          />
        </el-upload>
      </el-form-item>

      <el-form-item
        label="正文"
        prop="description"
        style="clear: both"
      >
        <mavon-editor
          ref="md"
          v-model="form.description"
          :toolbars="markdownOption"
          style="height: 350px"
        />
      </el-form-item>
      <!-- 一个返回按钮，一个提交按钮 -->
      <el-form-item>
        <div style="text-align: right">
          <el-button
            type="primary"
            @click="comeBack"
          >返回</el-button>
          <el-button
            type="success"
            @click="submit('form')"
          >发布</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from '@/utils/request'
import qs from 'qs'

import { mapState, mapActions } from 'vuex'
import _ from 'lodash'
export default {
  data() {
    return {
      form: {
        title: '',
        publish_time: '',
        description: ''
      },
      imageUrl: '',
      // 表单验证
      rules: {
        title: [{ required: true, message: '请输入文章名称', trigger: 'blur' }],
        publish_time: [{ required: true, message: '请输入文章名称', trigger: 'blur' }],
        description: [{ required: true, message: '请文章内容名称', trigger: 'blur' }]
      },
      // 表单校验
      markdownOption: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    }
  },
  computed: {
    ...mapState('articles', ['details'])
  },
  methods: {
    ...mapActions('articles', ['detailsArticle']),
    // 图片上传成功的回调函数
    handleAvatarSuccess(response) {
      try {
        this.imageUrl = process.env.VUE_APP_BASE_API + `/public/upload/` + response.avater
        this.url = response.avater
      } catch (error) {
        console.error(error)
      }
    },
    // comeBack
    comeBack() {
      this.$router.go(-1)
    },
    // 提交
    submit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          // 临时加上
          this.form.author = window.localStorage.getItem('username')
          this.form.url = this.url
          this.form.type = '文章'
          request.post('/artilcle/saveOrUpdateArticle', qs.stringify(this.form)).then(res => {
            // 提示成功操作信息
            this.$message({
              type: 'success',
              message: res.message
            })
            this.$router.go(-1)
          })
        } else {
          alert('error submit!!')
          return false
        }
      })
    }
  },
  created() {}
}
</script>
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

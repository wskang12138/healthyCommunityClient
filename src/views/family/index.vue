<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >录入</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          size="mini"
          @click="downloadcanvas"
        >下载</el-button>
      </el-col>
    </el-row>
    <div
      v-if="family.length > 0 ? true : false"
      ref="dowloadimg"
      class="box-content"
    >
      <el-descriptions title="家族病史" />
      <el-table
        :data="family"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="diease_name"
          label="疾病名称"
        />
        <el-table-column
          prop="beifen"
          label="辈分"
        />
      </el-table>
    </div>
    <div
      v-else
      class="box-content"
    >
      <img src="../../../public/no_data.png">
      暂无数据
    </div>

    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="proFrom"
        :model="adddisease"
        :rules="rules"
      >
        <el-form-item
          :label-width="formLabelWidth"
          label="辈分"
          prop="beifen"
        >
          <el-select
            v-model="adddisease.beifen"
            placeholder="请选择"
          >
            <el-option
              v-for="item in beifen"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          label="疾病名称"
          prop="diease_name"
        >
          <el-select
            v-model="adddisease.diease_name"
            placeholder="请选择"
            @change="handleOther"
          >
            <el-option
              v-for="item in diseases"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="con"
          :label-width="formLabelWidth"
          label="疾病名称"
          prop="other"
        >
          <el-input
            v-model="adddisease.other"
            placeholder="请输入疾病名称"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="toSave('proFrom')"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { familyDiease, saveFamily } from '@/api/user'
import html2canvas from 'html2canvas'

import _ from 'lodash'
export default {
  data() {
    return {
      dialogFormVisible: false,

      adddisease: {},
      diseases: [
        '高血压',
        '糖尿病',
        '结核',
        '肝炎',
        '肺癌',
        '先天畸形',
        '血友病',
        '高血脂',
        '哮喘',
        '其它'
      ],
      beifen: ['祖父辈', '父辈', '同辈', '其它'],
      user_id: window.localStorage.getItem('useruser_id'),
      family: [],
      formLabelWidth: '180px',
      con: false,
      title: '录入家族病史',
      // 验证规则
      rules: {
        diease_name: [{ required: true, message: '请输入疾病名称', trigger: 'blur' }],
        beifen: [{ required: true, message: '请选择时间', trigger: 'blur' }],
        other: [{ required: true, message: '请选择时间', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleAdd() {
      this.adddisease = {}
      this.dialogFormVisible = true
    },
    downloadcanvas() {
      const content = this.$refs.dowloadimg
      html2canvas(content, {
        useCORS: true
      }).then(canvas => {
        // 处理你生成的canvas
        const a = document.createElement('a')
        a.setAttribute('href', canvas.toDataURL()) // toDataUrl：将canvas画布信息转化为base64格式图片
        a.setAttribute('download', '生活习惯') // 这个是必须的，否则会报错
        a.setAttribute('target', '_self')
        a.click()
        this.open = false
      })
    },
    handleOther() {
      if (this.adddisease.diease_name == '其它') {
        this.con = true
      } else {
        this.con = false
      }
    },
    //   点击模态框确定按钮
    toSave(proFrom) {
      this.$refs[proFrom].validate(valid => {
        if (valid) {
          if (this.adddisease.diease_name == '其它') {
            this.adddisease.diease_name = this.adddisease.other
          }
          this.adddisease.f_user_id = this.user_id
          saveFamily(this.adddisease).then(res => {
            familyDiease({ user_id: this.user_id }).then(res => {
              this.family = res.data
              // 提示成功操作信息
              this.$message({
                type: 'success',
                message: res.message
              })
              this.dialogFormVisible = false
            })
          })
        } else {
          alert('error submit!!')
        }
      })
    }
  },
  created() {
    familyDiease({ user_id: this.user_id }).then(res => {
      this.family = res.data
    })
  }
}
</script>
<style scoped lang="scss">
.box-content {
  width: 50%;
  border: 1px solid #dcdfe6;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
}
</style>

<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >{{
          text
        }}</el-button>
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
      v-if="Life"
      ref="dowloadimg"
      class="box-content"
    >
      <el-descriptions
        title="生活习惯"
        :column="3"
        border
      >
        <el-descriptions-item label="体育锻炼">{{ Life.physical }}</el-descriptions-item>
        <el-descriptions-item label="锻炼时间">{{ Life.exercise }}</el-descriptions-item>
        <el-descriptions-item label="饮食爱好">{{ Life.dietary }}</el-descriptions-item>
        <el-descriptions-item label="睡眠情况">
          <el-tag size="small">{{ Life.sleep }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="吸烟情况">{{ Life.smoking }}</el-descriptions-item>
        <el-descriptions-item label="喝酒情况">{{ Life.drinking }}</el-descriptions-item>
        <el-descriptions-item label="记录时间">
          <el-tag size="small"> {{ Life.time | fmtDateTime }}</el-tag></el-descriptions-item>
      </el-descriptions>
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
        :model="addLife"
        :rules="rules"
      >
        <el-form-item
          label="体育锻炼"
          :label-width="formLabelWidth"
          prop="physical"
        >
          <el-select
            v-model.trim="addLife.physical"
            placeholder="请选择体育锻炼"
            clearable
          >
            <el-option
              v-for="(item, index) in physical"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="锻炼时间"
          :label-width="formLabelWidth"
          prop="exercise"
        >
          <el-select
            v-model.trim="addLife.exercise"
            placeholder="请选择时间"
            clearable
          >
            <el-option
              v-for="(item, index) in exercise"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="饮食爱好"
          :label-width="formLabelWidth"
          prop="dietary"
        >
          <el-input
            v-model="addLife.dietary"
            placeholder="请输入饮食爱好"
          />
        </el-form-item>
        <el-form-item
          label="睡眠情况"
          :label-width="formLabelWidth"
          prop="sleep"
        >
          <el-select
            v-model="addLife.sleep"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="(item, index) in sleep"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="是否吸烟"
          :label-width="formLabelWidth"
          prop="smoking"
        >
          <el-select
            v-model.trim="addLife.smoking"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="(item, index) in pan"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="喝酒情况"
          :label-width="formLabelWidth"
          prop="drinking"
        >
          <el-select
            v-model.trim="addLife.drinking"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="(item, index) in pan"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="记录时间"
          :label-width="formLabelWidth"
          prop="time"
        >
          <el-date-picker
            v-model="addLife.time"
            type="datetime"
            format="yyyy-MM-dd hh:mm"
            value-format="yyyy-MM-dd hh:mm"
            placeholder="选择日期时间"
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
import { findLife, saveOrUpdateLife } from '@/api/user'
import html2canvas from 'html2canvas'

import _ from 'lodash'
export default {
  data() {
    return {
      addLife: {},
      dialogFormVisible: false,
      title: '',
      text: '',
      mode: {},
      user_id: window.localStorage.getItem('useruser_id'),
      flageData: ['是', '否'],
      flage: true,
      sleep: ['6小时以下', '6-7小时', '八小时', '八小时以上'],
      physical: ['每周<3次', '每周3-5次', '每周6-8次', '每周8-10次', '每周>10次'],
      exercise: ['10以下', '10-20分钟', '20-40分钟', '40-60分钟', '60分钟以上'],
      pan: ['是', '否'],
      Life: {},
      formLabelWidth: '180px',
      cno: true,

      // 验证规则
      rules: {
        username: [{ required: true, message: '请选择' }],
        exercise: [{ required: true, message: '请选择', trigger: 'change' }],
        dietary: [{ required: true, message: '请输入饮食爱好', trigger: 'blur' }],

        physical: [{ required: true, message: '请选择', trigger: 'change' }],

        smoking: [{ required: true, message: '请选择', trigger: 'change' }],
        drinking: [{ required: true, message: '请选择', trigger: 'change' }],
        time: [{ required: true, message: '请选择', trigger: 'change' }],
        sleep: [{ required: true, message: '请选择', trigger: 'change' }]
      }
    }
  },
  methods: {
    handleAdd() {
      if (this.text == '录入') this.title = '添加生活爱好数据'
      this.addLife = {}
      if (this.text == '更新') {
        this.addLife = _.clone(this.Life)
        this.title = '修改生活爱好'
      }
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
    //   点击模态框确定按钮
    toSave(proFrom) {
      this.$refs[proFrom].validate(valid => {
        if (valid) {
          this.addLife.l_user_id = this.user_id
          saveOrUpdateLife(this.addLife).then(res => {
            findLife({ user_id: this.user_id }).then(res => {
              this.Life = res.data[0]
              if (res.data.length == 0) {
                this.text = '录入'
              } else {
                this.text = '更新'
              }
            })
            this.dialogFormVisible = false
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
    findLife({ user_id: this.user_id }).then(res => {
      this.Life = res.data[0]
      if (res.data.length == 0) {
        this.text = '录入'
      } else {
        this.text = '更新'
      }
    })
  }
}
</script>
<style scoped lang="scss">
.box-content {
  width: 60%;
  border: 1px solid #dcdfe6;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
}
</style>

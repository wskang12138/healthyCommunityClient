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
          size="mini"
          type="primary"
          icon="el-icon-share"
          @click="look"
        >查看</el-button>
      </el-col>
    </el-row>

    <el-table
      v-loading="$store.state.app.loading"
      :data="Diease.data"
    >
      <el-table-column
        label="序号"
        align="center"
        type="index"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="疾病名称"
        align="center"
        prop="diease_name"
      />
      <el-table-column
        label="是否治愈"
        align="center"
        prop="flage"
      />
      <el-table-column
        label="过敏物质"
        align="center"
        prop="allergen"
      />
      <el-table-column
        label="有无残疾"
        align="center"
        prop="disabled_orno"
      />
      <el-table-column
        label="残疾证号"
        align="center"
        prop="disabled_con"
      />
      <el-table-column
        label="确诊时间"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.q_time | fmtDateTime }}
        </template>
      </el-table-column>
      <el-table-column
        label="治愈时间"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.z_time | fmtDateTime }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加按钮模态框 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="proFrom"
        :model="addhistorydisease"
        :rules="rules"
      >
        <el-form-item
          label="疾病名称"
          :label-width="formLabelWidth"
          prop="diease_name"
        >
          <el-input
            v-model="addhistorydisease.diease_name"
            placeholder="请输入疾病名称"
          />
        </el-form-item>
        <el-form-item
          label="过敏物质"
          :label-width="formLabelWidth"
          prop="allergen"
        >
          <el-input
            v-model="addhistorydisease.allergen"
            placeholder="请输入疾病名称"
          />
        </el-form-item>
        <el-form-item
          label="确诊时间"
          :label-width="formLabelWidth"
          prop="q_time"
        >
          <el-date-picker
            v-model="addhistorydisease.q_time"
            type="datetime"
            format="yyyy-MM-dd hh:mm"
            value-format="yyyy-MM-dd hh:mm"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item
          label="是否治愈"
          :label-width="formLabelWidth"
          prop="flage"
        >
          <el-switch
            v-model="flage"
            active-text="是"
            inactive-text="否"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
        <el-form-item
          v-if="flage"
          key="z_time"
          label="治愈时间"
          :label-width="formLabelWidth"
          prop="z_time"
        >
          <el-date-picker
            v-model="addhistorydisease.z_time"
            type="datetime"
            format="yyyy-MM-dd hh:mm"
            value-format="yyyy-MM-dd hh:mm"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item
          key="cno"
          label="有无残疾"
          :label-width="formLabelWidth"
          prop="cno"
        >
          <el-switch
            v-model="cno"
            active-text="有"
            inactive-text="无"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
        <el-form-item
          v-if="cno"
          label="残疾编号"
          :label-width="formLabelWidth"
          prop="disabled_con"
        >
          <el-input
            v-model="addhistorydisease.disabled_con"
            placeholder="请输入残疾编号"
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
    <el-dialog
      title="查看详情"
      :visible.sync="open"
    >
      <div
        ref="dowloadimg"
        class="classboder"
      >
        <el-descriptions title="用户历史疾病信息" />
        <el-descriptions
          v-for="(item, index) in Diease.data"
          :key="index"
          class="magrinBottom"
        >
          <el-descriptions-item label="疾病名称">{{ item.diease_name }}</el-descriptions-item>
          <el-descriptions-item
            label="是否治愈"
          ><el-tag size="small">{{ item.flage }}</el-tag></el-descriptions-item>
          <el-descriptions-item label="过敏物质">{{ item.allergen }}</el-descriptions-item>
          <el-descriptions-item label="有无残疾">{{ item.disabled_orno }}</el-descriptions-item>
          <el-descriptions-item label="残疾证号">{{ item.disabled_con }}</el-descriptions-item>
          <el-descriptions-item label="确诊时间">{{
            item.q_time | fmtDateTime
          }}</el-descriptions-item>
          <el-descriptions-item label="治愈时间">{{
            item.z_time | fmtDateTime
          }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="open = false">关闭</el-button>
        <el-button
          type="primary"
          @click="downloadcanvas"
        >下载</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import _ from 'lodash'
import html2canvas from 'html2canvas'
import { findDiease, saveOrUpdateDiease } from '@/api/user'
export default {
  data() {
    return {
      addhistorydisease: {},
      dialogFormVisible: false,
      title: '',
      // 选中数组
      user_id: window.localStorage.getItem('useruser_id'),
      open: false,
      item: {},
      flageData: ['是', '否'],
      flage: false,
      Diease: '',
      value2: '',
      formLabelWidth: '80px',
      cno: false,
      // 验证规则
      rules: {
        diease_name: [{ required: true, message: '请输入疾病名称', trigger: 'blur' }],
        q_time: [{ required: true, message: '请选择时间', trigger: 'blur' }],
        disabled_con: [{ required: true, message: '请输入编号', trigger: 'blur' }],
        z_time: [{ required: true, message: '请输入治愈时间', trigger: 'blur' }]
      }
    }
  },
  methods: {
    look() {
      this.open = true
    },
    downloadcanvas() {
      const content = this.$refs.dowloadimg
      html2canvas(content, {
        useCORS: true
      }).then(canvas => {
        // 处理你生成的canvas
        const a = document.createElement('a')
        a.setAttribute('href', canvas.toDataURL()) // toDataUrl：将canvas画布信息转化为base64格式图片
        a.setAttribute('download', '用户历史疾病') // 这个是必须的，否则会报错
        a.setAttribute('target', '_self')
        a.click()
        this.open = false
      })
    },

    handleAdd() {
      this.title = '添加历史疾病'
      this.addhistorydisease = {}
      this.dialogFormVisible = true
    },
    //   点击模态框确定按钮
    toSave(proFrom) {
      this.$refs[proFrom].validate(valid => {
        if (valid) {
          this.addhistorydisease.x_user_id = this.user_id
          this.cno
            ? (this.addhistorydisease.disabled_orno = '有')
            : (this.addhistorydisease.disabled_orno = '无')
          this.flage ? (this.addhistorydisease.flage = '是') : (this.addhistorydisease.flage = '否')
          saveOrUpdateDiease(this.addhistorydisease).then(res => {
            findDiease({ user_id: this.user_id }).then(res => {
              this.Diease = res
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
    },

    handleUpdate(row) {
      this.title = '修改历史疾病'
      this.addhistorydisease = _.clone(row)
      this.addhistorydisease.flage == '是' ? (this.flage = true) : (this.flage = false)
      this.addhistorydisease.disabled_orno == '有' ? (this.cno = true) : (this.cno = false)
      this.dialogFormVisible = true
    }
    //
  },
  created() {
    findDiease({ user_id: this.user_id }).then(res => {
      this.Diease = res
    })
  }
}
</script>
<style scoped lang="scss">
.drawerOps {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.magrinBottom {
  margin-bottom: 20px;
}
.classboder {
  border: 1px solid #dcdfe6;
  padding: 10px;
  border-radius: 5px;
}
</style>

<template>
  <div class="content">
    <div
      v-if="show"
      class="top"
    >
      <div class="inline">
        <div class="text">我的数据</div>
        <div class="data">{{ heathyData.time | borthdate }}更新</div>
      </div>
      <div class="chart">
        <div class="box">
          <div class="img">
            <el-avatar
              :size="50"
              :src="src2"
            />
          </div>
          <div class="right">
            <div class="title">体温</div>
            <span>{{ heathyData.temperature }} </span>°C
          </div>
        </div>
        <div class="box">
          <div class="img">
            <el-avatar
              :size="50"
              :src="src3"
            />
          </div>
          <div class="right">
            <div class="title">心率</div>
            <span>{{ heathyData.spygmus }} </span>bpm
          </div>
        </div>
        <div class="box">
          <div class="img">
            <el-avatar
              :size="50"
              :src="src1"
            />
          </div>
          <div class="right">
            <div class="title">血压</div>
            <span>{{ heathyData.blodpres_shrink }} /{{ heathyData.blodpres_relax }} </span>mmHg
          </div>
        </div>
        <div class="box">
          <div class="img">
            <el-avatar
              :size="50"
              :src="src4"
            />
          </div>
          <div class="right">
            <div class="title">指数</div>
            <span>{{ heathyData.BMI }}</span>
          </div>
        </div>
        <div class="box">
          <div class="img">
            <el-avatar
              :size="50"
              :src="src5"
            />
          </div>
          <div class="right">
            <div class="title">身体状态</div>
            <span>{{ heathyData.status }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="button">
        <el-button
          type="primary"
          size="mini"
          @click="handleUpdate"
        >更新</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="downloadcanvas"
        >下载</el-button>
      </div>
      <div ref="dowloadimg">
        <el-descriptions
          class="margin-top"
          title="基本信息"
          :column="3"
          border
        >
          <el-descriptions-item label="用户名">{{ form.username }}</el-descriptions-item>
          <el-descriptions-item label="年龄">{{ form.age }}</el-descriptions-item>
          <el-descriptions-item label="性别">{{ form.sex }}</el-descriptions-item>
          <el-descriptions-item label="电话">{{ form.phone }}</el-descriptions-item>
          <el-descriptions-item label="地址">{{ form.address }}</el-descriptions-item>
          <el-descriptions-item label="电子邮件">{{ form.sendEmail }}</el-descriptions-item>
          <el-descriptions-item label="出生日期">{{
            form.borth == '' || form.borth == null ? '' : form.borth | borthdate
          }}</el-descriptions-item>
          <el-descriptions-item label="qq号">{{
            form.qq == null || form.qq == undefined ? '' : form.qq
          }}</el-descriptions-item>
          <el-descriptions-item label="文化水平">{{ form.level }}</el-descriptions-item>
          <el-descriptions-item label="是否已婚">
            <el-tag size="small">{{ form.marriage }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="政治面貌">{{ form.political }}</el-descriptions-item>
          <el-descriptions-item label="门牌号">{{ form.number }}</el-descriptions-item>
          <el-descriptions-item label="所属社区">{{ form.community }}</el-descriptions-item>
          <el-descriptions-item label="身份证号">{{ form.identity }}</el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
    <!-- 添加按钮模态框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
    >
      <el-form
        ref="proFrom"
        :model="addResident"
        :rules="rules"
      >
        <el-form-item
          label="姓名"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input
            v-model="addResident.username"
            placeholder="输入姓名"
          />
        </el-form-item>
        <el-form-item
          label="身份证号"
          :label-width="formLabelWidth"
          prop="identity"
        >
          <el-input
            v-model="addResident.identity"
            placeholder="输入"
            @change="getInfo"
          />
        </el-form-item>
        <el-form-item
          label="性别"
          :label-width="formLabelWidth"
          prop="sex"
        >
          <el-select
            v-model.trim="addResident.sex"
            placeholder="请选择性别"
            clearable
            filterable
            size="small"
            :disabled="true"
          >
            <el-option
              v-for="(item, index) in sex"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="手机号"
          :label-width="formLabelWidth"
          prop="phone"
        >
          <el-input
            v-model="addResident.phone"
            placeholder="输入手机"
          />
        </el-form-item>
        <el-form-item
          label="地址"
          :label-width="formLabelWidth"
          prop="address"
        >
          <el-input
            v-model="addResident.address"
            placeholder="输入地址"
          />
        </el-form-item>
        <el-form-item
          label="是否输入邮箱"
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
          label="电子邮件"
          :label-width="formLabelWidth"
          prop="sendEmail"
        >
          <el-input
            v-model="addResident.sendEmail"
            placeholder="输入电子邮件"
          />
        </el-form-item>
        <el-form-item
          label="qq号"
          :label-width="formLabelWidth"
          prop="qq"
        >
          <el-input
            v-model="addResident.qq"
            placeholder="输入"
          />
        </el-form-item>
        <el-form-item
          label="门牌号"
          :label-width="formLabelWidth"
          prop="number"
        >
          <el-input
            v-model="addResident.number"
            placeholder="输入"
          />
        </el-form-item>
        <el-form-item
          label="文化程度"
          :label-width="formLabelWidth"
          prop="level"
        >
          <el-select
            v-model.trim="addResident.level"
            placeholder="请选择文化程度"
            clearable
            filterable
            size="small"
          >
            <el-option
              v-for="(item, index) in level"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="政治面貌"
          :label-width="formLabelWidth"
          prop="political"
        >
          <el-select
            v-model.trim="addResident.political"
            placeholder="请选择政治面貌"
            clearable
            filterable
            size="small"
          >
            <el-option
              v-for="(item, index) in political"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="是否已婚"
          :label-width="formLabelWidth"
          prop="marriage"
        >
          <el-select
            v-model.trim="addResident.marriage"
            placeholder="请选择"
            clearable
            filterable
            size="small"
          >
            <el-option
              v-for="(item, index) in marriage"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="出生日期"
          :label-width="formLabelWidth"
          prop="borth"
        >
          <el-date-picker
            v-model="addResident.borth"
            :disabled="true"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="open = false">取 消</el-button>
        <el-button
          type="primary"
          @click="toSave('proFrom')"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getData, userUpdate } from '@/api/user'
import _ from 'lodash'
import {
  validateMobilePhone,
  IdentityCodeValid,
  isIdCard,
  address,
  checkMail
} from '@/utils/validate'
import html2canvas from 'html2canvas'

export default {
  mounted() {},
  data() {
    return {
      open: false,
      title: '',
      flage: false,
      src1: process.env.VUE_APP_BASE_API + `/public/images/bloodpressure.svg`,
      src2: process.env.VUE_APP_BASE_API + `/public/images/temperature.svg`,
      src3: process.env.VUE_APP_BASE_API + `/public/images/heartrate.svg`,
      src4: process.env.VUE_APP_BASE_API + `/public/images/BIM.svg`,
      src5: process.env.VUE_APP_BASE_API + `/public/images/heathy.svg`,
      formLabelWidth: '180px',
      sex: ['男', '女'],
      level: ['初中', '高中', '本科', '专科', '硕士', '博士', '其它'],
      // 非多个禁用
      political: ['中共党员', '中共预备党员', '共青团员', '群众', '其它'],
      marriage: ['是', '否'],
      heathyData: {},
      show: false,
      user_id: window.localStorage.getItem('useruser_id'),
      form: {},
      addResident: {},
      // 验证规则
      rules: {
        username: [{ required: true, message: '请选择', trigger: ['blur'] }],
        sex: [{ required: true, message: '请选择', trigger: ['blur'] }],
        borth: [{ required: true, message: '请选择', trigger: ['change'] }],
        phone: [
          { required: true, message: '请选择', trigger: ['blur'] },
          {
            validator: validateMobilePhone,
            message: '请输入正确手机号',
            trigger: 'blur'
          }
        ],
        identity: [
          { required: true, message: '请选择', trigger: ['blur'] },
          {
            validator: IdentityCodeValid,
            message: '请输入正确的身份证号',
            trigger: 'blur'
          }
        ],
        level: [{ required: true, message: '请选择', trigger: ['change'] }],
        address: [{ required: true, message: '请选择', trigger: ['blur'] }],
        marriage: [{ required: true, message: '请选择', trigger: ['change'] }],
        political: [{ required: true, message: '请选择', trigger: ['change'] }],
        sendEmail: [
          { required: true, message: '请选择', trigger: ['blur'] },
          {
            validator: checkMail,
            message: '请输入正确的邮箱号',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    handleUpdate() {
      this.title = '更新信息'
      this.addResident = _.clone(this.form)
      if (this.addResident.sendEmail !== '') {
        this.flage = true
      }
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
        a.setAttribute('download', `${this.form.username}基本数据`) // 这个是必须的，否则会报错
        a.setAttribute('target', '_self')
        a.click()
        this.open = false
      })
    },
    getInfo() {
      if (isIdCard(this.addResident.identity)) {
        console.log(1111)
        const idCard = this.addResident.identity
        let sex = null
        let birth = null
        const myDate = new Date()
        const month = myDate.getMonth() + 1
        const day = myDate.getDate()
        let age = 0

        if (idCard.length === 18) {
          age = myDate.getFullYear() - idCard.substring(6, 10) - 1
          sex = idCard.substring(16, 17)
          birth =
            idCard.substring(6, 10) +
            '-' +
            idCard.substring(10, 12) +
            '-' +
            idCard.substring(12, 14)
          if (
            idCard.substring(10, 12) < month ||
            (idCard.substring(10, 12) === month && idCard.substring(12, 14) <= day)
          )
            age++
        }
        if (idCard.length === 15) {
          age = myDate.getFullYear() - idCard.substring(6, 8) - 1901
          sex = idCard.substring(13, 14)
          birth =
            '19' +
            idCard.substring(6, 8) +
            '-' +
            idCard.substring(8, 10) +
            '-' +
            idCard.substring(10, 12)
          if (
            idCard.substring(8, 10) < month ||
            (idCard.substring(8, 10) === month && idCard.substring(10, 12) <= day)
          )
            age++
        }

        if (sex % 2 === 0) this.addResident.sex = '女'
        // 性别代码 1代表男，0代表女，暂时不涉及其他类型性别
        else this.addResident.sex = '男'
        this.addResident.borth = birth
        this.addResident.address = address(this.addResident.identity)
      }
    },
    //   点击模态框确定按钮
    toSave(proFrom) {
      this.$refs[proFrom].validate(valid => {
        if (valid) {
          userUpdate(this.addResident).then(res => {
            getData({ user_id: this.user_id }).then(res => {
              this.form = res.data
            })
            this.open = false
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
    getData({ user_id: this.user_id }).then(res => {
      this.form = res.data
      if (res.heathy.length == 1) {
        this.heathyData = res.heathy[0]
        this.show = true
      }
    })
  }
}
</script>
<style scoped lang="scss">
.content {
  width: 100%;
  padding: 20px;
  .top {
    .inline {
      width: 100%;
      display: flex;
      height: 34px;
      .text {
        color: #555;
        line-height: 34px;
        font-weight: 550;
      }
      .data {
        margin-left: 20px;
        line-height: 34px;
      }
    }
    .chart {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
      margin-bottom: 110px;
      .box {
        width: 220px;
        border: 1px solid #dcdfe6;
        border-radius: 2px;
        height: 100px;
        padding: 20px 30px;
        display: flex;
        .right {
          margin-left: 20px;
          .title {
            font-size: 17px;
            color: #777777;
            margin-top: 0;
            margin-bottom: 0.5em;
          }
          span {
            font-size: 17px;
            font-weight: 650;
          }
        }
      }
    }
  }
  .bottom {
    .margin-top {
      margin-top: 20px;
      width: 70%;
    }
    .button {
      position: absolute;
      right: 401px;
    }
  }
}
</style>

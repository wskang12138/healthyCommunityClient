<template>
  <div class="app-container">
    <el-button
      class="pull-right right-10"
      icon="el-icon-download"
      type="primary"
      size="mini"
      @click="downloadFile"
    >下载</el-button>
    <div
      ref="box"
      class="content"
    >
      <el-form
        ref="queryForm"
        :inline="true"
        label-width="68px"
      >
        <div class="resident">
          <el-descriptions
            v-if="users.data"
            title="基本信息"
            :column="4"
            border
          >
            <el-descriptions-item label="用户名">{{ users.data.username }}</el-descriptions-item>
            <el-descriptions-item label="年龄">{{ users.data.age }}</el-descriptions-item>
            <el-descriptions-item label="性别">{{ users.data.sex }}</el-descriptions-item>
            <el-descriptions-item label="电话">{{ users.data.phone }}</el-descriptions-item>
            <el-descriptions-item label="地址">{{ users.data.address }}</el-descriptions-item>
            <el-descriptions-item label="电子邮件">{{ users.data.sendEmail }}</el-descriptions-item>
            <el-descriptions-item label="出生日期">{{
              users.data.borth | fmtDateTime
            }}</el-descriptions-item>
            <el-descriptions-item label="qq号">{{ users.data.qq }}</el-descriptions-item>
            <el-descriptions-item label="文化水平">{{ users.data.level }}</el-descriptions-item>
            <el-descriptions-item label="是否已婚">
              <el-tag size="small">{{ users.data.marriage }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="政治面貌">{{ users.data.political }}</el-descriptions-item>
            <el-descriptions-item label="门牌号">{{ users.data.number }}</el-descriptions-item>
            <el-descriptions-item label="身份证号">{{ users.data.identity }}</el-descriptions-item>
          </el-descriptions>
          <el-descriptions
            v-if="users.heathy"
            :column="4"
            border
          >
            <el-descriptions-item label="身高(cm)">{{ users.heathy.height }}</el-descriptions-item>
            <el-descriptions-item label="体重(kg)">{{ users.heathy.weight }}</el-descriptions-item>
            <el-descriptions-item label="舒张压(mmHg)">{{
              users.heathy.blodpres_relax
            }}</el-descriptions-item>
            <el-descriptions-item label="收缩压(mmHg)">{{
              users.heathy.blodpres_shrink
            }}</el-descriptions-item>
            <el-descriptions-item label="温度(C)">{{
              users.heathy.temperature
            }}</el-descriptions-item>
            <el-descriptions-item label="血氧(%)">{{ users.heathy.oxygen }}</el-descriptions-item>
            <el-descriptions-item label="血型">
              <el-tag size="small">{{ users.heathy.blood }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="BMI">{{ users.heathy.BMI }}</el-descriptions-item>
            <el-descriptions-item label="健康状态">{{ users.heathy.status }}</el-descriptions-item>
            <el-descriptions-item label="记录时间">{{
              users.heathy.time | fmtDateTime
            }}</el-descriptions-item>
          </el-descriptions>
          <el-descriptions
            v-if="users.life"
            :column="4"
            border
          >
            <el-descriptions-item label="体育锻炼">{{ users.life.physical }}</el-descriptions-item>
            <el-descriptions-item label="锻炼时间">{{ users.life.exercise }}</el-descriptions-item>
            <el-descriptions-item label="饮食喜好">{{ users.life.dietary }}</el-descriptions-item>
            <el-descriptions-item label="睡眠情况">{{ users.life.sleep }}</el-descriptions-item>
            <el-descriptions-item label="吸烟情况">{{ users.life.smoking }}</el-descriptions-item>
            <el-descriptions-item label="饮酒情况">{{ users.life.drinking }}</el-descriptions-item>
            <el-descriptions-item label="记录时间">{{
              users.life.time | fmtDateTime
            }}</el-descriptions-item>
          </el-descriptions>
        </div>
        <div class="table">
          <h4>历史疾病</h4>
          <el-table
            v-if="users.diease"
            v-loading="$store.state.app.loading"
            :data="users.diease"
          >
            <el-table-column
              label="序号"
              align="center"
              type="index"
              fixed
              width="150"
              :show-overflow-tooltip="true"
            />

            <el-table-column
              label="疾病名称"
              align="center"
              prop="diease_name"
              width="150"
            />
            <el-table-column
              label="是否治愈"
              align="center"
              prop="flage"
              width="150"
            />
            <el-table-column
              label="过敏物质"
              align="center"
              prop="allergen"
              width="150"
            />
            <el-table-column
              label="有无残疾"
              align="center"
              prop="disabled_orno"
              width="150"
            />
            <el-table-column
              label="残疾证号"
              align="center"
              prop="disabled_con"
              width="150"
            />
            <el-table-column
              label="确诊时间"
              align="center"
              width="150"
            >
              <template slot-scope="scope">
                {{ scope.row.q_time | fmtDateTime }}
              </template>
            </el-table-column>
            <el-table-column
              label="治愈时间"
              align="center"
              width="150"
            >
              <template slot-scope="scope">
                {{ scope.row.z_time | fmtDateTime }}
              </template>
            </el-table-column>
          </el-table>
          <h4>家族病史</h4>
          <el-table
            v-if="users.familyDiease"
            v-loading="$store.state.app.loading"
            :data="users.familyDiease"
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
              label="辈分"
              align="center"
              prop="beifen"
            />
          </el-table>
          <h4>用药记录</h4>
          <el-table
            v-if="users.electron"
            v-loading="$store.state.app.loading"
            :data="users.electron"
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
              label="病情描述"
              align="center"
              prop="description"
            />
            <el-table-column
              label="用药"
              align="center"
              prop="content_count"
            />
            <el-table-column
              label="补充说明"
              align="center"
              prop="suggestion"
            />
            <el-table-column
              label="建议运动"
              align="center"
              prop="sport"
              width="150"
            />
            <el-table-column
              label="建议膳食"
              align="center"
              prop="food"
              width="150"
            />
            <el-table-column
              label="记录时间"
              align="center"
              width="150"
            >
              <template slot-scope="scope">
                {{ scope.row.count_time | fmtDateTime }}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import { findPeple } from '@/api/user'
import html2canvas from 'html2canvas'
export default {
  data() {
    return {
      open: false,
      title: '',
      users: '',
      user_id: window.localStorage.getItem('useruser_id'),
      formLabelWidth: '180px'
    }
  },

  methods: {
    //   点击添加按钮.dialogFormVisible = true;
    downloadFile() {
      const content1 = this.$refs.box
      html2canvas(content1, {
        useCORS: true
      }).then(canvas => {
        // 处理你生成的canvas
        const a = document.createElement('a')
        a.setAttribute('href', canvas.toDataURL()) // toDataUrl：将canvas画布信息转化为base64格式图片
        a.setAttribute('download', `${this.users.data.username}电子病历`) // 这个是必须的，否则会报错
        a.setAttribute('target', '_self')
        a.click()
      })
    }
  },
  created() {
    findPeple({ user_id: this.user_id })
      .then(res => {
        this.users = res
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style scoped lang="scss">
.content {
  width: 100%;
  border: 1px solid #dcdfe6;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  .table {
    margin-top: 20px;
  }
}
</style>

<template>
  <div class="order">
    <el-tabs
      v-model="activeName"
      type="border-card"
      @tab-click="tabClickHandler"
    >
      <el-tab-pane
        label="预约记录"
        name="预约记录"
      >
        <apppoint-acount :key="active1" />
      </el-tab-pane>
      <el-tab-pane
        label="预约"
        name="预约"
      >
        <div
          :key="active2"
          class="box"
        >
          <div class="top">
            <div class="content">
              <div
                v-for="(item, index) in data"
                :key="index"
                class="week"
              >
                {{ item.weeK }}
              </div>
            </div>
          </div>
          <div class="bottom">
            <el-tabs
              v-if="data.length > 0"
              v-model="now"
              @tab-click="handleClick"
            >
              <el-tab-pane
                :label="data[0].date"
                :name="data[0].date"
              ><apppoint-doctor
                :key="actives1"
                status="0"
              /></el-tab-pane>
              <el-tab-pane
                :label="data[1].date"
                :name="data[1].date"
              ><apppoint-doctor
                :key="actives2"
                status="1"
              /></el-tab-pane>
              <el-tab-pane
                :label="data[2].date"
                :name="data[2].date"
              ><apppoint-doctor
                :key="actives3"
                status="2"
              /></el-tab-pane>
              <el-tab-pane
                :label="data[3].date"
                :name="data[3].date"
              ><apppoint-doctor
                :key="actives4"
                status="3"
              /></el-tab-pane>
              <el-tab-pane
                :label="data[4].date"
                :name="data[4].date"
              ><apppoint-doctor
                :key="actives5"
                status="4"
              /></el-tab-pane>
              <el-tab-pane
                :label="data[5].date"
                :name="data[5].date"
              ><apppoint-doctor
                :key="actives6"
                status="5"
              /></el-tab-pane>
              <el-tab-pane
                :label="data[6].date"
                :name="data[6].date"
              ><apppoint-doctor
                :key="actives7"
                status="6"
              /></el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import apppointAcount from '@/components/Acount/index.vue'
import apppointDoctor from '@/components/Appoint/index.vue'
import moment from 'moment'

export default {
  data() {
    return {
      activeName: '预约记录',
      now: moment().format('YYYY-MM-DD'),
      active1: null,
      active2: null,
      actives1: null,
      actives2: null,
      actives3: null,
      actives4: null,
      actives5: null,
      actives6: null,
      actives7: null,
      data: []
    }
  },
  components: {
    apppointAcount,
    apppointDoctor
  },
  methods: {
    toHanlderDate() {
      for (let i = 0; i < 7; i++) {
        const date = moment()
          .day(moment().day() + i)
          .format('YYYY-MM-DD')
        const week = this.getWeek(date)
        this.data.push({
          date: date,
          weeK: week
        })
      }
      console.log(this.date)
    },
    getWeek(date) {
      // 参数时间戳
      const week = moment(date).day()
      switch (week) {
        case 1:
          return '周一'
        case 2:
          return '周二'
        case 3:
          return '周三'
        case 4:
          return '周四'
        case 5:
          return '周五'
        case 6:
          return '周六'
        case 0:
          return '周日'
      }
    },
    handleClick(tab) {
      switch (Number(tab.index)) {
        case 0:
          this.actives1 = new Date().getTime()
          break
        case 1:
          this.actives2 = new Date().getTime()
          break
        case 2:
          this.actives3 = new Date().getTime()
          break
        case 3:
          this.actives4 = new Date().getTime()
          break
        case 4:
          this.actives5 = new Date().getTime()
          break
        case 5:
          this.actives6 = new Date().getTime()
          break
        case 6:
          this.actives7 = new Date().getTime()
          break
        default:
          break
      }
    },
    tabClickHandler(tab) {
      switch (Number(tab.index)) {
        case 0:
          this.active1 = new Date().getTime()
          break
        case 1:
          this.active2 = new Date().getTime()
          break
        default:
          break
      }
    }
  },
  created() {
    this.toHanlderDate()
  }
}
</script>
<style scoped lang="scss">
.order {
  .box {
    width: 100%;
    .top {
      width: 100%;
      .content {
        width: 57%;
        display: flex;
        justify-content: space-between;
        .week {
          text-align: center;
        }
      }
    }
  }
}
</style>

<template>
  <div class="message-pabel-box">
    <el-button
      v-if="concats[nowSwitch].isShowMore && id != nowSwitchId ? true : false"
      class="eye-more"
      type="text"
      @click="eyeMore"
    >加载更多消息</el-button>
    <ul
      v-if="nowSwitchId == this.id ? false : true"
      class="message-styles-box"
    >
      <li
        v-for="(item, index) in messageTemplate()"
        :key="index"
        :class="judgeClass(item)"
      >
        <img
          class="message-avatar"
          :src="urlHandle(item.avatar)"
        >
        <p
          v-if="item.type == 'server'"
          class="message-nickname"
        >
          {{ item.nickName }} {{ formatTime(item.message.time) }}
        </p>
        <p
          v-else
          class="message-nickname"
        >
          {{ formatTime(item.message.time) }} {{ item.nickName }}
        </p>
        <p
          class="message-classic"
          v-html="item.message.content"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import Bus from '@/assets/eventBus'
import { gotoBottom } from '@/assets/tools'

export default {
  name: 'MessagePabel',
  // 自动触发点击事件

  props: {
    // 选择的联系人ID
    nowSwitchId: {
      type: String
    },
    nowSwitch: {
      type: Number
    },
    // 当前用户
    localInfo: {
      type: Object
    },
    concats: {
      type: Array
    }
  },
  data() {
    return {
      message: {},
      page: 0,
      gotoBottom: gotoBottom,
      id: window.localStorage.getItem('useruser_id')
    }
  },
  mounted() {
    /**
     * 接收消息
     */
    this.initMessageArray(this.nowSwitchId)
    this.sockets.subscribe('MESSAGE', message => {
      const id = message.id
      const gotoId = message.body.gotoId
      const fromId = message.body.fromId
      const content = message.body.message.content

      message.body.message.content = content.replace(/[{]/g, '<').replace(/[}]/g, '>')

      this.initMessageArray(gotoId, fromId)

      // 用户在群聊发消息
      if (gotoId === 'group' && fromId === this.localInfo.id) {
        message.body.type = 'user-message'
      }

      if (gotoId === 'group') {
        this.message['group'].push(message.body)
      } else {
        this.message[id].push(message.body)
      }
      this.$forceUpdate()
      this.gotoBottom()
      // 把消息传给父级
      this.$emit('message', message)
    })
    /**
     * 当前用户发的消息
     */
    Bus.$on('MESSAGE', response => {
      const body = response.body
      const gotoId = body.gotoId
      const fromId = body.fromId

      this.initMessageArray(gotoId, fromId)

      // 自己给自己发消息
      if (gotoId === fromId) {
        this.message[fromId].push(body)
      } else if (response.type === 'robots-message' || response.type === 'user-message') {
        this.message[gotoId].push(body)
      }
      this.$forceUpdate()
      // 把消息传给父级
      this.$emit('message', response)
    })

    /**
     * 接收更多消息
     */
    this.sockets.subscribe('GROUP_MESSAGE', result => {
      const box = document.getElementsByClassName('message-pabel-box')[0]
      this.initMessageArray('group')
      // 是否有更多数据
      if (result.length) {
        this.message['group'] = []
        result.map((item, index) => {
          this.message['group'].unshift(JSON.parse(item.body))
        })
      } else {
        this.concats[this.nowSwitch].isShowMore = false
      }

      if (result.length < 9) this.concats[this.nowSwitch].isShowMore = false

      box.scrollTop = box.scrollHeight
      this.$forceUpdate()
    })
    this.sockets.subscribe('USER_MESSAGE', result => {
      const box = document.getElementsByClassName('message-pabel-box')[0]
      const arr = []
      for (let i = 0; i < result.length; i++) {
        const temp = JSON.parse(result[i].body)
        if (
          (this.id == temp.fromId || this.id == temp.gotoId) &&
          (this.nowSwitchId == temp.fromId || this.nowSwitchId == temp.gotoId)
        ) {
          arr.push(result[i])
        }
      }
      this.initMessageArray(this.id, this.nowSwitchId)
      // 是否有更多数据
      if (arr.length) {
        this.message[this.nowSwitchId] = []
        arr.map((item, index) => {
          this.message[this.nowSwitchId].unshift(JSON.parse(item.body))
        })
      } else {
        this.concats[this.nowSwitch].isShowMore = false
      }
      if (arr.length < 9) this.concats[this.nowSwitch].isShowMore = false

      box.scrollTop = box.scrollHeight
      setTimeout(() => {
        box.scrollTop = box.scrollHeight
      }, 0)
      this.$forceUpdate()
    })
  },
  created() {},
  methods: {
    /**
     * 数组初始化
     */
    urlHandle(url) {
      if (url.includes('http')) {
        return url
      } else {
        return url ? process.env.VUE_APP_BASE_API + `/public/upload/` + url : ''
      }
    },
    initMessageArray(gotoId, fromId) {
      const array = this.message

      if (!gotoId) return
      if (!array[gotoId]) {
        this.message[gotoId] = []
      }

      if (!fromId) return
      if (!array[fromId]) {
        this.message[fromId] = []
      }
    },

    /**
     * 判断Class
     */
    judgeClass(item) {
      if (item.type === 'server' && this.nowSwitchId == 'group') {
        if (this.id == item.fromId) {
          return 'message-layout-right'
        } else {
          return 'message-layout-left'
        }
      }

      if (item.type === 'server' && this.nowSwitchId !== 'group') {
        if (this.id == item.gotoId) {
          return 'message-layout-right'
        } else {
          return 'message-layout-left'
        }
      }
      if (item.type === 'server') {
        return 'message-layout-left'
      } else {
        return 'message-layout-right'
      }
    },

    /**
     * 返回聊天记录集合
     */
    messageTemplate() {
      return this.message[this.nowSwitchId]
    },

    /**
     * 查看更多
     */
    eyeMore() {
      if (this.nowSwitchId == 'group') {
        const obj = {
          id: this.localInfo.id,
          page: (this.concats[this.nowSwitch].page += 1)
        }
        if (this.message['group'] !== undefined && this.concats[this.nowSwitch].page === 1) {
          obj.length = this.message['group'].length
        }
        obj.type = 'group-message'
        this.$socket.emit('QUERY_PAGE', obj)
      } else {
        const obj = {
          id: this.localInfo.id,
          page: (this.concats[this.nowSwitch].page += 1)
        }
        if (
          this.message[this.nowSwitchId] !== undefined &&
          this.concats[this.nowSwitch].page === 1
        ) {
          obj.length = this.message[this.nowSwitchId].length
        }
        obj.type = 'user-message'
        this.$socket.emit('QUERY_PAGE', obj)
      }

      // 发送查询消息
    },
    /**
     * 获取年月日
     */
    formatFullYearMonthDay(date, isShowHourMinute, type) {
      date = new Date(date)
      const fullYear = date.getFullYear()
      const month = date.getMonth() + 1
      const dayDate = date.getDate()
      const hours = date.getHours()
      const minutes = date.getMinutes()

      if (isShowHourMinute) {
        return `${fullYear}${month}${dayDate}${hours}${minutes}`
      } else {
        if (type) {
          return `${fullYear}${type}${month}${type}${dayDate}`
        } else {
          return `${fullYear}${month}${dayDate}`
        }
      }
    },
    /**
     * 时间格式化
     */
    formatTime(time) {
      const date = new Date(time)
      const nowDate = new Date()
      let hours = date.getHours()
      let minutes = date.getMinutes()

      hours = hours < 10 ? `0${hours}` : hours
      minutes = minutes < 10 ? `0${minutes}` : minutes

      if (this.formatFullYearMonthDay(date) === this.formatFullYearMonthDay(nowDate)) {
        return `${hours}:${minutes}`
      } else {
        return `${this.formatFullYearMonthDay(date, false, '/')} ${hours}:${minutes}`
      }
    }
  }
}
</script>

<style lang="scss">
.message-pabel-box {
  padding: 0 20px;
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: rgba(255, 255, 255, 0.8);

  .eye-more {
    width: 100%;
    padding: 10px 0;
    font-size: 12px;
    text-align: center;
  }

  .message-styles-box {
    margin-bottom: 20px;
    .message-layout-left,
    .message-layout-right {
      margin-top: 20px;
      width: 100%;
      .message-classic::before {
        content: '';
        position: absolute;
        border-width: 8px;
        border-style: solid;
      }
    }

    .message-layout-left {
      .message-avatar {
        float: left;
        margin-right: 10px;
      }
      .message-classic {
        background-color: rgba(255, 255, 255, 0.8);
        &::before {
          left: -16px;
          border-color: transparent rgba(255, 255, 255, 0.8) transparent transparent;
        }
      }
    }

    .message-layout-right {
      text-align: right;
      .message-avatar {
        float: right;
        margin-left: 10px;
      }
      .message-classic {
        text-align: left;
        color: #ffffff;
        background-color: rgba(55, 126, 200, 0.8);
        &::before {
          right: -16px;
          border-color: transparent transparent transparent rgba(55, 126, 200, 0.8);
        }
      }
    }

    .message-avatar {
      width: 40px;
      height: 40px;
      border-radius: 2px;
      border: 1px solid #eeeeee;
    }
    .message-nickname {
      color: #777777;
      font-size: 12px;
    }

    .message-classic {
      position: relative;
      max-width: 45%;
      margin-top: 5px;
      display: inline-block;
      padding: 9px 12px;
      font-size: 14px;
      color: #333333;
      border-radius: 5px;
      white-space: pre-line;
      word-break: break-all;
    }
  }
}
</style>

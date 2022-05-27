<template>
  <div class="wrapper">
    <el-container>
      <el-aside width="250px">
        <el-header height="40px">
          <i class="el-icon-user-solid icon-message" />
          <span class="title">联系人</span>
        </el-header>

        <message-group
          :concats="concats"
          @switchGroup="switchGroup"
        />
      </el-aside>

      <el-main>
        <el-header height="40px">
          <span
            v-if="concats[nowSwitch].id == 'group'"
            class="title"
          >聊天室({{ lineCount }})人</span>
          <span
            v-else
            class="title"
          >{{ concats[nowSwitch].nickName }}</span>
        </el-header>

        <message-pabel
          :concats="concats"
          :now-switch="nowSwitch"
          :now-switch-id="nowSwitchId"
          :local-info="localInfo"
          @message="message"
        />

        <message-input
          :concats="concats"
          :local-info="localInfo"
          :now-switch-id="nowSwitchId"
        />
      </el-main>
      <footer class="footer" />
    </el-container>
  </div>
</template>

<script>
import MessageGroup from './message-group'
import MessagePabel from './message-pabel'
import MessageInput from './message-input'
export default {
  name: 'Chat',
  data() {
    return {
      lineCount: 0,
      concats: [
        {
          id: 'robots',
          active: false,
          nickName: '沉默憨憨',
          avatar: 'robots.png',
          isShowMore: true,
          page: 0,
          message: {
            time: 1580572800000,
            content: 'Welcome'
          }
        }
      ],
      nowSwitch: 0,
      nowSwitchId: 'robots',
      id: window.localStorage.getItem('useruser_id'),
      localInfo: {
        id: window.localStorage.getItem('useruser_id'),
        avatar: window.localStorage.getItem('useravatar'),
        nickName: window.localStorage.getItem('username')
      }
    }
  },
  mounted() {
    /**
     * 获取联系人信息
     */
    if (this.nowSwitchId) {
      const obj = {
        id: this.localInfo.id,
        page: (this.concats[this.nowSwitch].page += 1)
      }
      obj.type = 'group-message'
      this.$socket.emit('QUERY_PAGE', obj)
    }
    if (this.nowSwitchId) {
      const obj = {
        id: this.localInfo.id,
        page: (this.concats[this.nowSwitch].page += 1)
      }
      obj.type = 'user-message'
      this.$socket.emit('QUERY_PAGE', obj)
    }
    this.$socket.emit('LOGIN', {
      type: 'onLine',
      body: {
        id: window.localStorage.getItem('useruser_id'),
        avatar: window.localStorage.getItem('useravatar'),
        nickName: window.localStorage.getItem('username'),
        message: {
          content: '',
          time: new Date()
        }
      }
    })
    this.sockets.subscribe('GROUP_MESSAGE', result => {
      if (result.length > 0) {
        for (let i = 0; i < this.concats.length; i++) {
          if (this.concats[i].id == 'group') {
            const temp = JSON.parse(result[0].body)
            this.concats[i].message = temp.message
          }
        }
      }
    })
    this.sockets.subscribe('USER_MESSAGE', result => {
      if (result.length > 0) {
        for (let i = 0; i < this.concats.length; i++) {
          for (let j = 0; j < result.length; j++) {
            if (
              (this.concats[i].id == result[j].fromId || this.concats[i].id == result[j].gotoId) &&
              (result[j].fromId == this.id || result[j].gotoId == this.id)
            ) {
              const temp = JSON.parse(result[j].body)
              this.concats[i].message = temp.message
              break
            }
          }
        }
        for (let i = 0; i < this.concats.length; i++) {
          if (this.concats[i].id == this.id) {
            this.concats[i].message.content = ''
          }
        }
      }
    })
    this.sockets.subscribe('conCats', res => {
      const body = res.body

      // 默认选中第一个
      body.map(item => {
        item.active = false
      })
      body[0].active = true
      this.concats = body
      for (let i = 0; i < this.concats.length; i++) {
        (this.concats[i].isShowMore = true), (this.concats[i].page = 0)
      }
      this.nowSwitchId = 'robots'
    })
    /**
     * 获取在线人数及通知
     */
    this.sockets.subscribe('onLine', res => {
      const code = res.code
      const body = res.body
      // 在线人数
      this.lineCount = res.lineCount
      // 添加联系人
      if (code === 2) {
        this.concats = body
        for (let i = 0; i < this.concats.length; i++) {
          (this.concats[i].isShowMore = true), (this.concats[i].page = 0)
        }
        this.nowSwitchId = 'robots'
      }
      if (code === 1) {
        this.concats = body
        for (let i = 0; i < this.concats.length; i++) {
          (this.concats[i].isShowMore = true), (this.concats[i].page = 0)
        }
        this.nowSwitchId = 'robots'
      }
    })
  },
  methods: {
    /**
     * 切换聊天对象
     */
    switchGroup(index, id) {
      this.nowSwitchId = id
      this.nowSwitch = index

      // 隐藏小红点
      if (this.concats[index].message.isNewMessage !== undefined) {
        this.concats[index].message.isNewMessage = false
        this.concats[index].message.newMessageCount = 0
      }
    },
    /**
     * 接收消息
     */
    message(respone) {
      const type = respone.type
      const body = respone.body
      const concats = this.concats
      const length = concats.length
      let id = body.gotoId
      // 服务器返回的消息
      if (type === 'server-message') {
        if (respone.id === 'robots') {
          id = 'robots'
        }
      }

      // 更新小红点
      if (this.nowSwitchId !== id) {
        body.message.isNewMessage = true
        body.message.newMessageCount = (() => {
          for (var i = 0; i < length; i++) {
            if (id === this.concats[i].id) {
              if (this.concats[i].message.newMessageCount !== undefined) {
                const count = (this.concats[i].message.newMessageCount += 1)
                return count
              } else {
                return 1
              }
            }
          }
        })()
      }

      // 更新联系人消息
      for (let i = 0; i < length; i++) {
        if (concats[i].id === id) {
          Object.assign(this.concats[i].message, body.message)
        }
      }
    },

    /**
     * 关闭
     */
    goBack() {
      const href = window.location.href
      window.location.href = href.split('#')[0]
    }
  },
  watch: {
    // 监听下拉框变化
    nowSwitch(name, oldVal) {
      if (this.nowSwitchId) {
        const obj = {
          id: this.localInfo.id,
          page: (this.concats[this.nowSwitch].page += 1)
        }

        obj.type = 'group-message'
        this.$socket.emit('QUERY_PAGE', obj)
      }
      if (this.nowSwitchId) {
        const obj = {
          id: this.localInfo.id,
          page: (this.concats[this.nowSwitch].page += 1)
        }
        obj.type = 'user-message'
        this.$socket.emit('QUERY_PAGE', obj)
      }
    }
  },
  components: {
    MessageGroup,
    MessagePabel,
    MessageInput
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 600px;
  background-size: cover;
  background-image: url(./img/message.jpg);
  background-repeat: no-repeat;
  .el-container {
    height: 600px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 88%;
    margin: 30px auto;
    .el-aside,
    .el-main {
      display: flex;
      flex-direction: column;
      border-radius: 6px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
    .el-aside {
      background: rgba(235, 233, 232, 0.8);
    }
    .el-main {
      padding: 0;
      margin-left: 20px;
    }
    .el-header {
      position: relative;
      line-height: 40px;
      background: rgb(55, 126, 200);
      overflow: hidden;
      .title,
      .icon-message {
        color: #ffffff;
      }
      .icon-message {
        font-size: 20px;
        vertical-align: middle;
      }
      .title {
        display: inline-block;
        margin-left: 5px;
        font-size: 16px;
        letter-spacing: 1px;
      }
    }
  }
  .footer {
    position: absolute;
    bottom: -23px;
    right: 0;
    left: 0;
    margin: auto;
    font-size: 13px;
    width: 150px;
    color: #ffffff;
    text-align: center;
    a {
      color: #ffffff;
      &:hover {
        color: #377ec8;
      }
    }
  }
}
</style>

<template>
  <div
    v-if="boolean && sportlist.length > 0 ? true : false"
    class="container"
  >
    <div
      v-for="(item, index) in sportlist"
      :key="index"
      class="box"
    >
      <h2>
        {{ item.name }}<span><a
          :href="item.video"
          target="_blank"
        >去看视频</a></span>
      </h2>
      <h3>预计时长：{{ item.time }}分钟</h3>
      <h3>训练次数：{{ item.per }}×{{ item.groupes }}组</h3>
      <h3>特征：{{ item.effect }}</h3>
      <h3>要点：</h3>
      <p v-html="handlerText(item.description)" />
    </div>
  </div>
  <div
    v-else
    class="Text"
  >
    {{ text }}
  </div>
</template>

<script>
import { findSport, foryouSport } from '@/api/user'

export default {
  props: {
    type: {
      type: String,
      default: null
    },
    suit: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      sportlist: [],
      user_id: window.localStorage.getItem('useruser_id'),
      boolean: true,
      text: '',
      hsuit: this.suit
    }
  },
  methods: {
    handlerText(text) {
      text = '●' + text
      const reg = /\|/g
      return typeof text == 'string' ? text.replace(reg, '<br/><br/>●') : ''
    },
    handlePrams() {
      const prams = {}
      switch (this.suit) {
        case '-1':
          foryouSport({ user_id: this.user_id }).then(res => {
            const age = res.age
            if (age > 0 && age <= 17) {
              this.hsuit = '未成年人'
              prams.type = '有氧运动'
            } else if (age >= 18 && age <= 44) {
              this.hsuit = '青年人'
              prams.type = '无氧运动'
            } else if (age >= 45 && age <= 59) {
              this.hsuit = '中年人'
              prams.type = '有氧运动'
            } else if (age >= 60) {
              this.hsuit = '老年人'
              prams.type = '屈曲和伸展运动'
            } else {
              console.log('error')
            }

            if (res.data == '有氧运动' || res.data == '无氧运动' || res.data == '屈曲和伸展运动') {
              prams.type = res.data
              prams.suit = this.hsuit
              findSport(prams).then(res => {
                this.sportlist = res.data
              })
            }
            if (res.data == '需静养') {
              this.boolean = false
              this.text = '你现在的身体不适宜做运动，需要静养！'
            }
            if (res.data == '暂无历史病历') {
              prams.suit = this.hsuit
              findSport(prams).then(res => {
                this.sportlist = res.data
              })
            }
          })
          break
        case '所有':
          prams.type = this.type
          findSport(prams).then(res => {
            this.sportlist = res.data
          })
          break
        case '未成年人':
        case '青年人':
        case '中年人':
        case '老年人':
          prams.suit = this.hsuit
          prams.type = this.type
          findSport(prams).then(res => {
            this.sportlist = res.data
          })
          break
        default:
          break
      }
    }
  },
  created() {
    this.handlePrams()
  }
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-wrap: wrap;
  .box {
    width: 250px;
    margin-left: 50px;
    margin-bottom: 20px;
    border: 1px solid #dcdfe6;
    transition: all 0.3s linear;
    border-radius: 2px;
    padding: 5px;
    padding: 20px;
    font-size: 13px;
    h3 {
      color: rgba(0, 0, 0, 0.85);
      font-weight: 500;
    }
    span {
      margin-left: 35px;
      a {
        color: blueviolet;
        font-size: 14px;
      }
    }
    p {
      color: rgba(0, 0, 0, 0.85);
      font-size: 14px;
    }
    &:hover {
      transition: opacity 2s cubic-bezier(0.165, 0.84, 0.44, 1);
      box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.15);
    }
  }
}
.Text {
  font-size: 15px;
  color: red;
}
</style>

<template>
  <div class="container">
    <div
      v-if="foodlist.length > 0"
      class="foods-content"
    >
      <div
        v-for="(item, index) in foodlist"
        :key="index"
        class="foods-box"
      >
        <div class="img">
          <img
            :src="urlHandle(item.url)"
            width="200px"
          >
        </div>
        <div class="bottom">
          <div class="name">
            <div>{{ item.name }} 1{{ item.unit }}</div>
            <div>热量:{{ item.calorie }}kcal</div>
          </div>
          <div
            class="introduce"
            :title="item.description"
          >
            <div>{{ item.description }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { findFood, foryouFood } from '@/api/user'

export default {
  props: {
    type: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      foodlist: [],
      user_id: window.localStorage.getItem('useruser_id')
    }
  },
  methods: {
    urlHandle(url) {
      if (url.includes('http')) {
        return url
      } else {
        return url ? process.env.VUE_APP_BASE_API + `/public/upload/` + url : ''
      }
    },
    handlePrams() {
      const prams = {
        bloean: 0
      }
      if (this.type == -1) {
        foryouFood({ user_id: this.user_id }).then(res => {
          if (res.data == '除主食外') {
            prams.type = 0
            prams.bloean = 1
          }
          if (res.data == 1 || res.data == 2) {
            prams.type = res.data
          }
          if (res.data == '所有') {
          }
          findFood(prams).then(res => {
            this.foodlist = res.data
          })
        })
      }
      if (this.type == 0 || this.type == 1 || this.type == 2) {
        prams.type = this.type
        findFood(prams).then(res => {
          this.foodlist = res.data
        })
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
  .foods-content {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    .foods-box {
      width: 220px;
      margin-top: 50px;
      margin-left: 20px;
      box-shadow: 2px 5px 4px 1px rgba(128, 110, 110, 0.5);
      transition: all 0.3s linear;
      &:hover {
        box-shadow: 4px 10px 5px 0px rgba(87, 78, 78, 0.5);
      }
      .img {
        width: 100%;
        overflow: hidden;
        img {
          width: 220px;
          height: 150px;
          transition: all 0.3s linear;
          vertical-align: middle;
          border-style: none;
          &:hover {
            opacity: 0.8;
            -moz-transform: scale(1.35);
            -webkit-transform: scale(1.35);
          }
        }
        &:hover {
          background: rgba(83, 79, 79, 0.8);
        }
      }
      .bottom {
        font-size: 13px;
        color: #636363;
        padding: 10px;
        padding-top: 2px;
        .name {
          display: flex;
          justify-content: space-around;
          height: 20px;
          div {
            position: relative;
            display: inline;
            top: 5px;
          }
        }
        .introduce {
          box-sizing: border-box;
          word-wrap: break-word;
          margin-top: 15px;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          overflow: hidden;
          margin-bottom: 10px;
        }
        .caozuo {
          width: 100%;
          display: flex;
          margin-top: 20px;
          position: relative;
          margin-left: 90px;
          .updata {
            background-color: green;
            color: white;
            height: 40px;
            width: 40px;
            line-height: 40px;
            text-align: center;
            border-radius: 15%;
            &:hover {
              cursor: pointer;
            }
          }
          .delete {
            background-color: rgb(119, 28, 28);
            color: white;
            margin-left: 10px;
            height: 40px;
            width: 40px;
            line-height: 40px;
            text-align: center;
            border-radius: 15%;
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>

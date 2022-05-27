<template>
  <div class="app-container">
    <div class="content">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="box"
      >
        <div class="top">
          <span>{{ item.title }}</span><span>发布日期:{{ item.publish_time | borthdate }}</span>
        </div>
        <div class="bottom">
          <span> <p v-html="item.description" /></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { queryArticle } from '@/api/user'

export default {
  props: {
    type: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      list: []
    }
  },
  methods: {},
  created() {
    queryArticle({ type: this.type }).then(res => {
      this.list = res.data
    })
  }
}
</script>

<style scoped lang="scss">
.content {
  width: 100%;
  .box {
    width: 100%;
    border-left: 7px solid #000000;
    background-color: #cccaca;
    border-radius: 3px;
    margin-bottom: 20px;
    .top {
      width: 100%;
      height: 40%;
      padding: 30px;
      border-bottom: 2px solid #ffffff;
      display: flex;
      justify-content: space-between;
      span:first-child {
        color: #fd3734;
        font-size: 18px;
        font-weight: 800;
      }
      span:last-child {
        color: #6d6363;
        display: inline-block;
      }
    }
    .bottom {
      width: 100%;
      height: 50%;
      padding: 30px;
    }
  }
}
</style>

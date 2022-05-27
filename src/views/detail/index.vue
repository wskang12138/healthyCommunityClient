<template>
  <div class="app-container">
    <div class="g-detail">
      <div class="m-showArticle">
        <div
          v-if="list.url == '' || list.url == null ? false : true"
          class="images"
        >
          <img
            :src="urlHandle(list.url)"
            alt=""
          >
        </div>
        <div class="bolder">
          <h4 class="m-aTitle">{{ list.title }}</h4>
        </div>
        <el-divider
          content-position="right"
        ><span class="m-time">{{ list.publish_time | borthdate }}</span></el-divider>
        <div>
          <div class="m-aContent">
            <p v-html="list.description" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { queryDetail } from '@/api/user'

export default {
  data() {
    return {
      list: {}
    }
  },
  methods: {
    urlHandle(url) {
      return url ? process.env.VUE_APP_BASE_API + `/public/upload/` + url : ''
    }
  },

  created() {
    queryDetail({ id: this.$route.params.id }).then(res => {
      this.list = res.data[0]
    })
  }
}
</script>

<style scoped lang="scss">
.app-container {
  background-color: #e9ebec;
  .g-detail {
    width: 100%;
    background-color: #fff;
    padding: 20px 30px;
    min-height: 100px;
    .images {
      margin-bottom: 50px;
      img {
        width: 100%;
        height: 300px;
      }
    }
    .interval {
      margin-top: 10px;
    }

    .m-aTitle {
      letter-spacing: 1px;
      text-align: center;
      font-size: large;
    }

    .m-time {
      font-size: medium;
      font-weight: normal;
      letter-spacing: 1px;
    }

    .m-aContent {
      padding-left: 10px;
      padding-right: 10px;
      text-align: justify;
      text-indent: 2em;
      line-height: 2em;
      margin-bottom: 20px;
    }

    @media screen and (max-width: 793px) {
    }

    @media screen and (max-width: 375px) {
    }
  }
}
</style>

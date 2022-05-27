<template>
  <div class="order">
    <el-tabs
      v-model="activeName"
      type="border-card"
      @tab-click="tabClickHandler"
    >
      <el-tab-pane
        label="公告"
        name="公告"
      >
        <community-notice
          :key="active1"
          type="公告"
        />
      </el-tab-pane>
      <el-tab-pane
        label="新闻"
        name="新闻"
      >
        <community-news
          :key="active2"
          type="新闻"
        />
      </el-tab-pane>
      <el-tab-pane
        label="文章"
        type="文章"
      >
        <community-article
          :key="active3"
          type="文章"
        />
      </el-tab-pane>
      <el-tab-pane
        label="社区群聊"
        type="社区群聊"
      >
        <community-chart type="社区群聊" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import communityNotice from '@/components/Notice/index.vue'
import communityNews from '@/components/News/index.vue'
import communityArticle from '@/components/Article/index.vue'
import communityChart from '@/components/Chart/chat.vue'
export default {
  data() {
    return {
      activeName: '公告',
      active1: null,
      active2: null,
      active3: null,
      active4: null
    }
  },

  components: {
    communityNotice,
    communityNews,
    communityArticle,
    communityChart
  },
  methods: {
    tabClickHandler(tab) {
      switch (Number(tab.index)) {
        case 0:
          this.active1 = new Date().getTime()
          break
        case 1:
          this.active2 = new Date().getTime()
          break
        case 2:
          this.active3 = new Date().getTime()
          break
        case 3:
          this.active4 = new Date().getTime()
          break
        default:
          break
      }
    }
  },
  created() {}
}
</script>
<style scoped lang="scss"></style>

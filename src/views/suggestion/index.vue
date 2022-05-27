<template>
  <div class="order">
    <el-tabs
      v-model="activeName"
      type="border-card"
    >
      <el-tab-pane
        label="膳食推荐"
        name="膳食推荐"
      >
        <div class="content">
          <el-tabs v-model="food">
            <el-tab-pane
              label="为你推荐"
              name="为你推荐"
            >
              <suggestion-food type="-1" />
            </el-tab-pane>
            <el-tab-pane label="主食">
              <suggestion-food type="0" />
            </el-tab-pane>
            <el-tab-pane label="肉蛋奶">
              <suggestion-food type="1" />
            </el-tab-pane>
            <el-tab-pane label="蔬菜水果">
              <suggestion-food type="2" />
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-tab-pane>
      <el-tab-pane
        label="运动推荐"
        name="运动推荐"
      >
        <div class="content">
          <el-tabs v-model="sport1">
            <el-tab-pane
              label="为你推荐"
              name="为你推荐"
            >
              <suggestion-sport
                type="-1"
                suit="-1"
              />
            </el-tab-pane>
            <el-tab-pane
              label="有氧运动"
              name="有氧运动"
            >
              <el-tabs
                v-model="sport2"
                tab-position="right"
              >
                <el-tab-pane
                  label="所有"
                  name="所有"
                ><suggestion-sport
                  type="有氧运动"
                  suit="所有"
                /></el-tab-pane>
                <el-tab-pane
                  label="未成年人"
                ><suggestion-sport
                  type="有氧运动"
                  suit="未成年人"
                /></el-tab-pane>
                <el-tab-pane
                  label="青年人"
                ><suggestion-sport
                  type="有氧运动"
                  suit="青年人"
                /></el-tab-pane>
                <el-tab-pane
                  label="中年人"
                ><suggestion-sport
                  type="有氧运动"
                  suit="中年人"
                /></el-tab-pane>
                <el-tab-pane
                  label="老年人"
                ><suggestion-sport
                  type="有氧运动"
                  suit="老年人"
                /></el-tab-pane>
              </el-tabs>
            </el-tab-pane>
            <el-tab-pane label="无氧运动">
              <el-tabs
                v-model="sport2"
                tab-position="right"
              >
                <el-tab-pane
                  label="所有"
                  name="所有"
                ><suggestion-sport
                  type="无氧运动"
                  suit="所有"
                /></el-tab-pane>
                <el-tab-pane
                  label="未成年人"
                ><suggestion-sport
                  type="无氧运动"
                  suit="未成年人"
                /></el-tab-pane>
                <el-tab-pane
                  label="青年人"
                ><suggestion-sport
                  type="无氧运动"
                  suit="青年人"
                /></el-tab-pane>
                <el-tab-pane
                  label="中年人"
                ><suggestion-sport
                  type="无氧运动"
                  suit="中年人"
                /></el-tab-pane>
                <el-tab-pane
                  label="老年人"
                ><suggestion-sport
                  type="无氧运动"
                  suit="老年人"
                /></el-tab-pane>
              </el-tabs>
            </el-tab-pane>
            <el-tab-pane label="屈曲和伸展运动">
              <el-tabs
                v-model="sport2"
                tab-position="right"
              >
                <el-tab-pane
                  label="所有"
                  name="所有"
                ><suggestion-sport
                  type="屈曲和伸展运动"
                  suit="所有"
                /></el-tab-pane>
                <el-tab-pane
                  label="未成年人"
                ><suggestion-sport
                  type="屈曲和伸展运动"
                  suit="未成年人"
                /></el-tab-pane>
                <el-tab-pane
                  label="青年人"
                ><suggestion-sport
                  type="屈曲和伸展运动"
                  suit="青年人"
                /></el-tab-pane>
                <el-tab-pane
                  label="中年人"
                ><suggestion-sport
                  type="屈曲和伸展运动"
                  suit="中年人"
                /></el-tab-pane>
                <el-tab-pane
                  label="老年人"
                ><suggestion-sport
                  type="屈曲和伸展运动"
                  suit="老年人"
                /></el-tab-pane>
              </el-tabs>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import moment from 'moment'
import suggestionSport from '@/components/Sport/index.vue'
import suggestionFood from '@/components/Food/index.vue'

export default {
  data() {
    return {
      activeName: '膳食推荐',
      sport1: '为你推荐',
      food: '为你推荐',
      sport2: '所有',
      now: moment().format('YYYY-MM-DD'),
      active1: null,
      active2: null,
      data: []
    }
  },
  components: {
    suggestionSport,
    suggestionFood
  },
  methods: {},
  created() {}
}
</script>
<style scoped lang="scss"></style>

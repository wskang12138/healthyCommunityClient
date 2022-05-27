<template>
  <div class="app-container">
    <div class="g-notice">
      <div class="m-table interval">
        <div class="m-line interval">
          <el-form
            ref="queryForm"
            :model="params"
            :inline="true"
            @submit.native.prevent
          >
            <el-form-item prop="title">
              <el-input
                v-model="params.title"
                placeholder="请输入标题"
                clearable
                size="small"
                @keyup.enter.native="handlerquery"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                icon="el-icon-search"
                size="mini"
                @click="handlerquery"
              >搜索</el-button>
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="mini"
                @click="handleAdd"
              >分享</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="content">
          <div
            v-for="(item, index) in list"
            :key="index"
            class="box"
          >
            <div class="meta-container">
              <div
                class="name"
                @click="handlertoRouter(item)"
              >
                {{ item.author }}
              </div>
              <div class="dividing" />
              <div class="date">{{ item.publish_time | borthdate }}</div>
            </div>
            <div
              class="bottom"
              @click="handlertoRouter(item)"
            >
              <div class="left">
                <div class="title">
                  {{ item.title }}
                </div>
                <div class="text">
                  <p v-html="handlerText(item.description)" />
                </div>
                <div class="incon">
                  <div class="view">
                    <i />
                    <span>{{ handlerCount(item.count) }}</span>
                  </div>
                </div>
              </div>
              <div class="right">
                <img
                  :src="urlHandle(item.url)"
                  alt=""
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { queryArticle, updateCount } from '@/api/user'

export default {
  props: {
    type: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      list: [],
      params: {
        type: this.type
      }
    }
  },
  methods: {
    handlerText(item) {
      if (item) {
        if (Array.from(item).length > 40) {
          return item.substr(0, 40) + '...'
        } else {
          return item
        }
      } else {
        return ''
      }
    },
    urlHandle(url) {
      return url ? process.env.VUE_APP_BASE_API + `/public/upload/` + url : ''
    },
    handlerCount(count) {
      if (count == null || count == '') {
        return 0
      } else {
        return count
      }
    },
    handleAdd() {
      this.$router.push({
        path: `/fabu/fabu`
      })
    },
    handlertoRouter(item) {
      const obj = {
        id: item.id,
        count: this.handlerCount(item.count) + 1
      }
      updateCount(obj).then(() => {
        this.$router.push({
          path: `/detail/${item.id}`
        })
      })
    },
    handlerquery() {
      // 过滤查询参数，将空字符串的键值对删除掉
      for (const key in this.params) {
        if (this.params[key] == '') {
          delete this.params[key]
        }
      }
      queryArticle(this.params).then(res => {
        this.list = res.data
      })
    }
  },
  created() {
    this.handlerquery()
  }
}
</script>

<style scoped lang="scss">
.app-container {
  background-color: #e9ebec;
  .g-notice {
    width: 90%;
    padding: 20px 30px;
    margin: 0 auto;
    .text {
      color: #1890ff;
      &:hover {
        cursor: pointer;
      }
    }
    .interval {
      margin-top: 10px;
    }
    .m-line {
      display: flex;
      width: 80%;
      margin: 0 auto;
    }
    .z-title {
      font-size: 16px;
    }
    .content {
      width: 80%;
      margin: 0 auto;
      background-color: #fff;
      cursor: pointer;
      position: relative;
      padding: 12px 20px 12px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .box {
        width: 100%;
        height: 132px;
        padding: 12px 20px 0;
        border-bottom: 1px solid #e5e6eb;
        .meta-container {
          width: 100%;
          display: flex;
          font-size: 12px;
          color: #333;
          .name {
            color: #909090;
            &:hover {
              cursor: pointer;
              color: #1890ff;
            }
          }
          .dividing {
            width: 1px;
            height: 14px;
            background: #e5e6eb;
            margin: 0 8px;
          }
        }
        .bottom {
          width: 100%;
          display: flex;
          padding-top: 10px;
          .left {
            width: 80%;
            height: 90px;
            padding-right: 20px;
            .title {
              font-weight: 700;
              font-size: 16px;
              line-height: 24px;
              color: #1d2129;
              width: 100%;
            }
            .text {
              color: #86909c;
              font-size: 13px;
              line-height: 22px;
              margin-top: 10px;
            }
            .incon {
              display: flex;
              margin-top: 10px;
              .view {
                i {
                  display: inline-block;
                  width: 16px;
                  height: 16px;
                  background-image: url('../../../public/view.png');
                  background-size: 100% 100%;
                  margin-right: 8px;
                }
                span {
                  color: #86909c;
                  font-size: 13px;
                  display: inline-block;
                  position: relative;
                  top: -4px;
                }
              }
            }
          }
          .right {
            width: 20%;
            height: 90px;
            img {
              width: 100%;
              height: 90px;
            }
          }
        }
      }
    }
  }
}
</style>

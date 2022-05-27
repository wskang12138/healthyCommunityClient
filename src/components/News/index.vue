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
            </el-form-item>
          </el-form>
        </div>
        <template>
          <el-table
            :data="list"
            style="width: 100%"
            :row-style="{ height: '80px' }"
          >
            <el-table-column
              label="标题"
              align="center"
              width="300"
            >
              <template slot-scope="scope">
                <div
                  class="text"
                  @click="handlertoRouter(scope.row.id)"
                >
                  {{ scope.row.title }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="摘要"
              align="center"
            >
              <template slot-scope="scope">
                <p v-html="handlerText(scope.row.description)" />
              </template>
            </el-table-column>
            <el-table-column
              label="发布时间"
              width="200"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.publish_time | borthdate }}
              </template>
            </el-table-column>
          </el-table>
        </template>
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
      list: [],
      params: {
        type: this.type
      }
    }
  },
  methods: {
    handlerText(item) {
      if (item) {
        if (Array.from(item).length > 20) {
          return item.substr(0, 20) + '...'
        } else {
          return item
        }
      } else {
        return ''
      }
    },
    handlertoRouter(id) {
      this.$router.push({
        path: `/detail/${id}`
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
    }
    .z-title {
      font-size: 16px;
    }
  }
}
</style>

<template>
  <div class="app-container">
    <label>预约状态为待处理可以取消</label>
    <el-table
      v-if="Appoint.data"
      v-loading="$store.state.app.loading"
      :data="Appoint.data"
      class="table"
      :row-style="{ height: '90px' }"
      border
    >
      <el-table-column
        label="序号"
        align="center"
        type="index"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="预约医生"
        align="center"
        width="150"
      >
        <template slot-scope="scope">
          {{ handleDoctor(scope.row.doctor) }}
        </template>
      </el-table-column>
      <el-table-column
        label="排号"
        align="center"
        prop="cno"
        width="100"
      />
      <el-table-column
        label="状态"
        align="center"
        prop="a_status"
        width="100"
      >
        <template slot-scope="scope">
          <el-tag :type="handleColor(scope.row.a_status)">{{ scope.row.a_status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="预约时间"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.a_time | fmtDateTime }}
        </template>
      </el-table-column>
      <el-table-column
        label="预约开始时间"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.b_time | fmtDateTime }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            v-if="handlerTime(scope.row)"
            class="delete"
            size="mini"
            type="primary"
            icon="el-icon-delete"
            @click="handleUpdate(scope.row)"
          >取消</el-button>
          <el-button
            v-else
            class="delete"
            size="mini"
            type="primary"
            :disabled="true"
            icon="el-icon-delete"
            @click="handleUpdate(scope.row)"
          >取消</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { findAppoint, queryDoctor, updateStatusAppoint } from '@/api/user'
import _ from 'lodash'

export default {
  data() {
    return {
      Appoint: [],
      user_id: window.localStorage.getItem('useruser_id'),
      doctor: []
    }
  },

  methods: {
    handleColor(row) {
      switch (row) {
        case '待处理':
          return 'danger'
        case '完成':
          return 'success'
        case '取消':
          return 'info'
        default:
          return ''
      }
    },
    /** 删除按钮操作 */
    handleUpdate(row) {
      const id = row.a_id // 数据类型得转化不然无法实现批量删除
      const obj = {
        a_id: id,
        a_status: '取消'
      }
      this.$confirm('是否确认取消预约?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateStatusAppoint(obj).then(() => {
          findAppoint({ user_id: this.user_id }).then(res => {
            this.Appoint = res
            this.$message({
              type: 'success',
              message: res.message
            })
            window.location.reload()
          })
        })
      })
    },
    handlerTime(row) {
      if (row.a_status == '待处理') {
        return true
      } else {
        return false
      }
    },
    handleDoctor(id) {
      for (const key in this.doctor) {
        if (this.doctor[key].user_id == id) {
          return this.doctor[key].rolesName
        }
      }
      return ''
    }
  },
  created() {
    findAppoint({ user_id: this.user_id }).then(res => {
      this.Appoint = res
    })
    queryDoctor().then(res => {
      this.doctor = res.data
    })
  }
}
</script>
<style scoped lang="scss">
.table {
  margin-top: 20px;
}
.anniu {
  margin-bottom: 20px;
}
.page {
  margin-top: 30px;
}
.classboder {
  border: 1px solid #dcdfe6;
  padding: 10px;
  border-radius: 5px;
}
</style>

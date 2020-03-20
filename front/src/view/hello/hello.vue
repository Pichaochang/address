<template>
  <!-- http://10.0.10.236:6080/ -->

  <div>
    <el-form ref="form" :model="form" inline size="small" label-width="auto"   label-position="left">
      <div class="my-br">以下是打开条件</div>
      <el-form-item label="ip">
        <el-input v-model="form.ip"></el-input>
      </el-form-item>
      <el-form-item label="端口">
        <el-input v-model="form.port"></el-input>
      </el-form-item>
      <el-form-item label="路由">
        <el-input v-model="form.route"></el-input>
      </el-form-item>
      <el-form-item label="CASTGC">
        <el-input v-model="form.CASTGC"></el-input>
      </el-form-item>
      <div class="my-br">以下是增加条件</div>
      <el-form-item label="URL">
        <el-input v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item label="目录">
        <el-input v-model="form.catalogue"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="addData">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 50%">
      <el-table-column prop="url" label="URL"></el-table-column>
      <el-table-column prop="catalogue" label="网站" width="150px"></el-table-column>
      <el-table-column label="操作" width="150px">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="openUrl(scope.row, 'normal')">打开</el-button>
          <!-- <el-button type="text" size="small" @click="editUrl(scope.row, 'normal')">打开</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        ip: '10.0.33.130',
        url: '10.0.33.131',
        port: '6081',
        route: '',
        catalogue: '',
        CASTGC: ``,
      },
      tableData: []
    };
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.post(this.$apis.homeAddress.findData, {}).then(res => {
        console.log(res)
        this.tableData = res.result
      })
    },
    addData () {
      const { url, catalogue } = this.form
      this.$axios.post(this.$apis.homeAddress.adminDoAdd, { url, catalogue }).then(res => {
      })
    },
    openUrl(i, type) {
      if (type === 'normal') {
        const { url, port, route, CASTGC } = this.form
        let address = ''
        if (CASTGC) {
          address = `http://${url}:${port}/${i.url}/${route}?CASTGC=${CASTGC}&baseUrl=http://${url}:${port}/ccweb&uuid=f58722c5-2187-41c7-9313-f1958febd4f8&sys=http://${url}:${port}/sys`
          console.log(address)
        } else {
          address = `http://${url}:${port}/${i.url}`
        }
        window.open(address);
      }
    },
    editUrl () {

    }
  }
};
</script>
<style lang="stylus" scoped>
.my-br {
  margin 20px
}
</style>

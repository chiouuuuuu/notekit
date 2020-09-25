<template>
  <div class="table">
    <com-dialog
      :isShowDialog="isShowDelDialog"
      @closeDialog="closeDialog"
      title="删除"
      :isShowConfBtn="true"
      @confEvent="confDel"
    >
      <p>确定要删除该条记录</p>
    </com-dialog>
    <div class="select-box">
      <div class="select-content">
        <div class="select-value" @click="active = !active">{{ selectText }}</div>
        <div class="select-body" :class="[active ? 'active' : 'hidden']">
          <div class="option" @click="setType(0)">全部</div>
          <div class="option" @click="setType(1)">未完成</div>
          <div class="option" @click="setType(2)">已完成</div>
          <div class="option" @click="setType(3)">已取消</div>
        </div>
      </div>
      <input type="text" class="search-input" v-model="searchContent" placeholder="筛选关键词" />
    </div>
    <table class="table-content">
      <thead>
        <tr>
          <th align="center" :style="{ width: '3%', minWidth: '70px' }">#</th>
          <th align="center" :style="{ width: '20%', minWidth: '70px' }">事项</th>
          <th align="center" :style="{ width: '5%', minWidth: '70px' }">类型</th>
          <th align="center" :style="{ width: '1%', minWidth: '90px' }">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in nodes" :key="item.id">
          <td align="center">{{ index + 1 }}</td>
          <td v-if="item.edit">
            <input class="edit-input" type="text" v-model="editContent" @keyup.enter="conf(item)" />
          </td>
          <td v-else :style="{ paddingLeft: '10px' }" @dblclick="edit(item)">{{ item.content }}</td>
          <td align="center">{{ getType(item.type) }}</td>
          <td align="center">
            <base-button size="small" @click="conf(item)" v-if="item.edit" class="btn conf">确定</base-button>
            <base-button size="small" @click="edit(item)" v-else class="btn edit btn-theme">编辑</base-button>
            <base-button size="small" class="btn del" @click="del(item)">删除</base-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import baseButton from './base-button.vue'
import ComDialog from './com-dialog.vue'
export default {
  name: 'ctable',
  components: {
    'com-dialog': ComDialog,
    'base-button': baseButton,
  },
  data() {
    return {
      active: false,
      type: 0,
      editContent: '',
      searchContent: '',
      isShowDelDialog: false,
      item: null,
      selectText: '筛选类型',
    }
  },
  methods: {
    edit(item) {
      for (let i = 0; i < this.nodes.length; i++) this.nodes[i].edit = false
      // console.log(item);
      item.edit = true
      console.log(item)
      this.editContent = item.content
    },
    conf(item) {
      item.edit = false
      this.$store.dispatch('editEvent', {
        id: item.id,
        content: this.editContent,
      })
    },
    getType(type) {
      let res = ''
      if (type == 1) {
        res = '未完成'
      } else if (type == 2) {
        res = '已完成'
      } else if (type == 3) {
        res = '已取消'
      } else {
        res = '全部'
      }
      return res
    },
    setType(type) {
      this.active = false
      this.type = type
      this.selectText = this.getType(type)
    },
    del(item) {
      console.log(item)
      this.item = item
      this.isShowDelDialog = !this.isShowDelDialog
    },
    closeDialog() {
      this.isShowDelDialog = false
    },
    confDel() {
      this.$store.dispatch('delEvent', this.item)
      this.item = null
      this.$toast('删除成功')
    },
  },
  computed: {
    nodes() {
      let list = []
      for (let i = 1; i <= 3; i++) {
        let l = this.$store.getters.getListByType(i)
        list.push(...l)
      }
      let type = this.type
      let res = null
      let searchContent = this.searchContent.trim()

      res = list.filter((item) => {
        if (
          (type == 0 || type == item.type) &&
          item.content.indexOf(searchContent) != -1
        ) {
          return item
        }
      })
      return res
    },
  },
}
</script>
<style lang="scss" ref="stylesheet/scsss">
.table {
  padding-top: 30px;
}

.select-box {
  display: flex;
  margin-bottom: 1%;
  .select-content {
    height: 30px;
    width: 14%;
    min-width: 80px;
    border: 1px solid #eee;
    user-select: none;
    position: relative;
    .select-value {
      color: #999;
      padding: 3px;
      padding-left: 10px;
      cursor: pointer;
      &::after {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        border-bottom: 1px solid #999;
        border-right: 1px solid #999;
        top: 5px;
        right: 12px;
        transform: rotate(45deg);
      }
    }
    .select-body {
      width: 100%;
      background: #fff;
      margin-top: 10px;
      border: 1px solid #eee;
      position: absolute;
      transition: height 0.3s ease-out;
      .option {
        color: #999;
        font-size: 16px;
        padding: 5px 0;
        padding-left: 10px;
        cursor: pointer;
      }
    }

    .active {
      height: 130px;
      overflow: auto;
    }
    .hidden {
      height: 0px;
      border-width: 0px;
      overflow: hidden;
    }
  }
  .search-input {
    margin-left: 1%;
    width: 85%;
    border: 1px solid #eee;
    font-size: 16px;
    padding-left: 10px;
  }
}
.table {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  .table-content {
    width: 100%;
    border-spacing: 0px;
    border-left: 1px solid #eee;
    border-top: 1px solid #eee;
    th,
    td {
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
      height: 40px;
      vertical-align: middle;
      text-overflow: ellipsis;
      box-sizing: border-box;
      .btn {
        color: #fff;
      }
      .del {
        background: #f57067;
      }
      .conf {
        background: #398fff;
      }
    }
    .edit-input {
      height: 100%;
      width: 100%;
      padding: 0;
      border: 1px solid #000;
      font-size: 16px;
      padding-left: 10px;
      // border-radius: 5px;
    }
    .edit-input:focus {
      outline: none;
    }
  }
}
</style>

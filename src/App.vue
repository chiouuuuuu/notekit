<template>
  <div id="app" :class="[getTheme]">
    <transition name="dialog">
      <com-dialog
        v-if="dialog.show"
        :title="dialog.title"
        :content="arrayString(dialog.content)"
        :isShowConfBtn="fileTip.list.isShowList"
        @closeDialog="closeDialog"
        @confEvent="conf('updataConf')"
      >
        <button class="file-btn" @click="uploadFile">
          <input type="file" accept="application/json" @change="upload" />
          <span>点击上传</span>
        </button>
        <p class="file-name">{{ fileName }}</p>
        <p v-if="fileTip.isShow">{{ fileTip.content }}</p>
        <div v-if="fileTip.list.isShowList">
          <p class="p-title">
            <span class="s-title">主题:</span>
            {{ fileTip.list.theme }}
          </p>
          <p class="p-title">
            <span class="s-title">列表:</span>
            共{{ fileTip.list.counter }}个事件
          </p>
          <p
            class="content-list"
            v-for="item in fileTip.list.contentList"
            :key="item.id"
          >
            {{ item.content }}
          </p>
          <p class="confirm-tip">确定要替换吗？</p>
        </div>
      </com-dialog>
    </transition>
    <com-header
      @showSidebar="sidebarSwitch"
      @showEditTable="editTableSwitch"
      @updataDialog="updataDialog"
    ></com-header>
    <section class="table" v-if="isShowEditTable">
      <com-table></com-table>
    </section>
    <section class="container" v-else>
      <com-add></com-add>
      <com-list></com-list>
    </section>
    <section>
      <com-sidebar
        :isShowSidebarProp="isShowSidebar"
        @showTheme="themeSwitch"
        @closeTheme="closeTheme"
        @table="editTableSwitch"
        @clear="clearEvent"
        @updataDialog="updataDialog"
      ></com-sidebar>
      <com-theme :isShowThemeProp="isShowTheme"></com-theme>
    </section>
  </div>
</template>
<script>
import comHeader from './component/header.vue';
import comAdd from './component/add.vue';
import comList from './component/list.vue';
import comTheme from './component/theme.vue';
import comSidebar from './component/sidebar.vue';
import comTable from './component/table.vue';
import comDialog from './component/dialog.vue';

export default {
  components: {
    'com-header': comHeader,
    'com-add': comAdd,
    'com-list': comList,
    'com-theme': comTheme,
    'com-sidebar': comSidebar,
    'com-table': comTable,
    'com-dialog': comDialog,
  },
  data() {
    return {
      // true 为关闭
      isShowSidebar: false,
      isShowTheme: false,
      isShowEditTable: false,
      dialog: {
        show: false,
        title: '',
        event: 'test',
        content: [
          {
            tag: 'p',
            value: 'this is a test',
          },
          {
            tag: 'h1',
            value: 'this is a test',
          },
        ],
      },
      json: '',
      fileName: '未选择任何文件',
      fileTip: {
        isShow: false,
        content: '',
        list: {
          counter: 0,
          isShowList: false,
          theme: '',
          contentList: [],
        },
      },
    };
  },
  methods: {
    // uploadFile() {},
    upload(e) {
      let files = e.srcElement.files;
      // console.log(files)
      let file = files[0];
      this.fileName = '选择了文件：' + file.name;
      this.fileTip.isShow = true;
      this.fileTip.content = '';
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (ee) => {
        // console.log(ee.target.result)
        let json = ee.target.result;
        this.json = json;
        console.log(json);
        if (
          json.indexOf('eventStorage' != -1) &&
          json.indexOf('themeStorage') != -1
        ) {
          this.fileTip.content = '该文件保存的主题和列表：';
          let jsonObj = JSON.parse(json);
          this.fileTip.list.isShowList = true;
          this.fileTip.list.counter = jsonObj.eventStorage.event.length;
          this.fileTip.list.theme = jsonObj.themeStorage.theme;
          if (this.fileTip.list.counter > 5) {
            this.fileTip.list.contentList = jsonObj.eventStorage.event.slice(
              0,
              5
            );
            this.fileTip.list.contentList.push({ id: -1, content: '...' });
          } else {
            this.fileTip.list.contentList = jsonObj.eventStorage.event;
          }
        } else {
          this.fileTip.list.isShowList = false;
          this.fileTip.content = '该文件不能用来解析为notepad记录';
        }
      };
    },
    arrayString(arr) {
      if (arr.length == 0) return '';
      let str = '';
      for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        // console.log(item);
        let s;
        if (item.tag != 'input') s = `<${item.tag}>${item.value}</${item.tag}>`;
        else {
          s = '<input type="file" accept="application/json" @change="upload">';
        }
        str += s;
      }
      return str;
    },
    //=============sidebar event==============
    sidebarSwitch() {
      // console.log('s');
      this.isShowSidebar = !this.isShowSidebar;
    },
    themeSwitch() {
      this.isShowTheme = !this.isShowTheme;
    },
    closeTheme() {
      console.log('get colse');
      this.isShowTheme = false;
      this.isShowSidebar = true;
    },
    updataDialog() {
      let dialog = this.dialog;
      let file = {
        isShow: false,
        content: '',
        list: {
          counter: 0,
          isShowList: false,
          theme: '',
          contentList: [],
        },
      };
      dialog.show = true;
      dialog.title = '导入数据';
      dialog.content = [
        {
          tag: 'input',
        },
      ];
      dialog.event = 'updataConf';
      this.dialog = dialog;
      this.fileTip = file;
      this.fileName = '未选择任何文件';
    },
    editTableSwitch() {
      this.isShowEditTable = !this.isShowEditTable;
    },
    clearEvent() {
      console.log('clear2');
      this.$store.dispatch('clearEvent');
    },
    // ============dialog event===============
    showDialog() {
      this.dialog.show = true;
    },
    closeDialog() {
      this.dialog.show = false;
    },
    conf(methodName, param) {
      console.log(methodName);
      console.log(param);
      this[methodName](param);
    },
    updataConf() {
      // console.log(param)
      this.$store.dispatch('uploadEvent', this.json);
      this.$store.dispatch('uploadTheme', this.json);
    },
  },
  computed: {
    getTheme() {
      let theme = this.$store.getters.getTheme;
      return theme;
    },
  },
  mounted() {
    // document.addEventListener('click', (e) => {
    //   let target = e.target.className;
    //   if (
    //     target == 'desc' ||
    //     target == 't-btn' ||
    //     target == 'btn' ||
    //     target == 'color-rect' ||
    //     target == 'text' ||
    //     target == 'close-btn'
    //   ) {
    //     return;
    //   }
    //   this.isShowSidebar = false;
    //   this.isShowTheme = false;
    // });
    // console.log(this.$store);
  },
};
</script>
<style lang="scss" ref="stylesheet/scss" src="../static/theme.scss"></style>
<style lang="scss" ref="stylesheet/scss">
* {
  margin: 0;
}
button {
  padding: 7px 0;
  outline: none;
  border-radius: 3px;
  box-sizing: border-box;
  cursor: pointer;
}
.container {
  margin: 32px auto;
  max-width: 800px;
}
::-webkit-scrollbar {
  width: 0;
}
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.3s;
}
.dialog-enter,
.dialog-leave-to {
  opacity: 0;
}
.file-btn {
  width: 80px;
  height: 40px;
  line-height: 26px;
  border: 1px solid #c0ccda;
  background: #fff;
  position: relative;
  input {
    width: 100%;
    height: 100%;
    overflow: hidden;
    opacity: 0;
    position: absolute;
  }
}
.file-name {
  color: #414141;
  font-size: 12px;
  margin-top: 3px;
  margin-bottom: 10px;
}
.content-list {
  margin-left: 20px;
  padding: 2px;
  color: #7d7d7d;
}
.confirm-tip {
  margin-top: 20px;
  font-size: 15px;
}
.p-title {
  margin: 15px 15px 15px 0;
}
.s-title {
  border-width: 1px;
  border-style: dashed;
  border-radius: 10px;
  /* border: 1px; */
  margin-right: 10px;
  padding: 2px;
}
</style>

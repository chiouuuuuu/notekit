<template>
  <div>
    <button @click="isShowDialog = !isShowDialog">btn</button>
    <com-dialog
      :isShowDialog="isShowDialog"
      @closeDialog="isShowDialog = false"
    ></com-dialog>
  </div>
</template>
<script>
import comDialog from './component/dialog.vue';

export default {
  components: { 'com-dialog': comDialog },
  data() {
    return {
      isShowDialog: false,
    };
  },
};
</script>
<style scoped></style>

<template>
  <div class="toast" :class="{ isShowBlack: !isShow }">
    <div>{{ msg }}</div>
  </div>
</template>

<script>
/*
 * 描述：在中间出现一个小黑框提示，调用show 方法设置内容和延时时间
 */
export default {
  name: 'Toast',
  data() {
    return {
      msg: '',
      isShow: false
    }
  },
  methods: {
    show(message = '默认内容', duration) {
      this.msg = message
      this.isShow = true

      setTimeout(() => {
        this.msg = ''
        this.isShow = false
      }, duration)
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 999;
  padding: 9px;
  background-color: black;
  color: white;
  /* 居中显示 */
  transform: translate(-50%, -50%);
}

.isShowBlack {
  display: none;
}
</style>

<template>
  <transition name="lzw-fade">
    <!-- 点击遮罩层关闭.self表示只有点击自身元素才触发，点击子元素不触发 -->
    <div class="it-dialog__wrapper" v-show="visible" @click.self="handleClose">
      <div class="it-dialog" :style="{ width, marginTop: top }">
        <div class="it-dialog__header">
          <!-- 具名插槽：如果通过template传了插槽则不显示span -->
          <slot name="title">
            <span class="it-dialog__title">{{ title }}</span>
          </slot>

          <button class="it-dialog__headerbtn" @click="handleClose">
            <i class="icon-close"></i>
          </button>
        </div>
        <div class="it-dialog__body">
          <slot><span>这是一段信息</span></slot>
        </div>
        <div class="it-dialog__footer" v-if="$slots.footer">
          <slot name="footer">
            <!-- <it-button>取消</it-button>
          <it-button type="primary">确定</it-button> -->
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ItDialog',
  props: {
    title: {
      type: String,
      default: '提示'
    },
    width: {
      type: String,
      default: '50%'
    },
    top: {
      type: String,
      default: '15vh'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {}
  },
  mounted() {},
  methods: {
    handleClose(e) {
      console.log('关闭对话框')
      // 不可以直接改父组件传过来的变量
      //   this.visible = false
      // 通过update:visible这种形式注册的事件，父组件可以直接通过.sync修饰符调用，不用再专门注册事件进行接收了
      // 注意格式update:propsName,要保持父组件修改的参数一致
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入公共css类 */
.it-dialog__wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: 2001;
  background-color: rgba(0, 0, 0, 0.5);
  .it-dialog {
    position: relative;
    margin: 15vh auto 50px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    width: 30%;
    &__header {
      padding: 20px 20px 10px;
      .it-dialog__title {
        line-height: 24px;
        font-size: 18px;
        color: #303133;
      }
      /* X按钮 */
      .it-dialog__headerbtn {
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 0;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 16px;
        .icon-close {
          color: #909399;
        }
      }
    }
    &__body {
      padding: 30px 20px;
      color: #606266;
      font-size: 14px;
      word-break: break-all; // 单词可断句
    }
    &__footer {
      padding: 10px 20px 20px;
      text-align: right;
      box-sizing: border-box;
      .it-button:first-child {
        margin-right: 20px;
      }
    }
  }
}

.lzw-fade-enter-active {
  //   animation: runAnim 0.5s;
  animation: dialog-fade-in 0.5s;
}
.lzw-fade-leave-active {
  //   animation: runAnim 0.5s reverse;
  animation: dialog-fade-out 0.5s reverse;
}
// 自定义动画runAnim
@keyframes runAnim {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

@keyframes dialog-fade-in {
  0% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes dialog-fade-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
}
</style>

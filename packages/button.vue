<template>
  <!-- 对于多个class类，可以通过数组放置，比较方便，数组中可以放置对象，根据对象的键值对 -->
  <button
    class="it-button"
    :class="[`it-button--${type}`, { 'is-plain': plain, 'is-round': round, 'is-circle': circle, 'is-disabled': disabled }]"
    :disabled="disabled"
    @click="handleClick"
  >
    <i v-if="icon" :class="icon"></i>
    <!-- v-if="$slots.default"意思是只有当span插槽传了内容才显示span，否则不显示 -->
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script>
export default {
  name: 'ItButton',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    // 是否是朴素按钮
    plain: {
      type: Boolean,
      default: false
    },
    // 是否圆角
    round: {
      type: Boolean,
      default: false
    },
    // 是否圆形
    circle: {
      type: Boolean,
      default: false
    },
    // 是否禁用,注意样式的定义is-disabled
    disabled: {
      type: Boolean,
      default: false
    },
    // icon图标
    icon: {
      type: String,
      default: ''
    }
  },
  components: {},
  data() {
    return {}
  },
  created() {
    // console.log(this.type)
    // $slots只要slot被使用了，则$slots可以获取被使用的插槽内容
    // console.log(this.$slots)
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>
<style lang="scss" scoped>
.it-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  // 禁止元素的文字选中
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  &:hover,
  &:focus {
    color: #409eff;
    border-color: #c6e2ff;
    background: #ecf5ff;
  }

  //   &.is-disabled {
  //     color: #c0c4cc;
  //     cursor: not-allowed;
  //     background-image: none;
  //     background-color: #fff;
  //     border-color: #ebeef5;
  //     &:focus,
  //     &:hover {
  //       color: #c0c4cc;
  //       cursor: not-allowed;
  //       background-image: none;
  //       background-color: #fff;
  //       border-color: #ebeef5;
  //     }
  //   }
}
.it-button--primary {
  color: #fff;
  border-color: #409eff;
  background: #409eff;
  &:hover,
  &:focus {
    border-color: #66b1ff;
    background: #66b1ff;
    color: #fff;
  }
}
.it-button--success {
  color: #fff;
  border-color: #67c23a;
  background: #67c23a;
  &:hover,
  &:focus {
    border-color: #85ce61;
    background: #85ce61;
    color: #fff;
  }
}
.it-button--info {
  color: #fff;
  border-color: #909399;
  background: #909399;
  &:hover,
  &:focus {
    border-color: #a6a9ad;
    background: #a6a9ad;
    color: #fff;
  }
}
.it-button--warning {
  color: #fff;
  border-color: #e6a23c;
  background: #e6a23c;
  &:hover,
  &:focus {
    border-color: #ebb563;
    background: #ebb563;
    color: #fff;
  }
}
.it-button--danger {
  color: #fff;
  border-color: #f56c6c;
  background: #f56c6c;
  &:hover,
  &:focus {
    border-color: #f78989;
    background: #f78989;
    color: #fff;
  }
}
.it-button.is-plain {
  &:hover,
  &:focus {
    background: #fff;
    border-color: #409eff;
    color: #409eff;
  }
}
.it-button--primary.is-plain {
  color: #409eff;
  background: #ecf5ff;
  border-color: #b3d8ff;
  &:hover,
  &:focus {
    background: #409eff;
    border-color: #409eff;
    color: #fff;
  }
}
.it-button--success.is-plain {
  color: #67c23a;
  background: #f0f9eb;
  border-color: #c2e7b0;
  &:hover,
  &:focus {
    background: #67c23a;
    border-color: #67c23a;
    color: #fff;
  }
}
.it-button--info.is-plain {
  color: #909399;
  background: #f4f4f5;
  border-color: #d3d4d6;
  &:hover,
  &:focus {
    background: #909399;
    border-color: #909399;
    color: #fff;
  }
}
.it-button--warning.is-plain {
  color: #e6a23c;
  background: #fdf6ec;
  border-color: #f5dab1;
  &:hover,
  &:focus {
    background: #e6a23c;
    border-color: #e6a23c;
    color: #fff;
  }
}
.it-button--danger.is-plain {
  color: #f56c6c;
  background: #fef0f0;
  border-color: #fbc4c4;
  &:hover,
  &:focus {
    background: #f56c6c;
    border-color: #f56c6c;
    color: #fff;
  }
}
.it-button.is-round {
  border-radius: 20px;
  padding: 12px 23px;
}
.it-button.is-circle {
  border-radius: 50%;
  padding: 12px;
}
.it-button.is-disabled {
  color: #c0c4cc;
  cursor: not-allowed;
  background-image: none;
  //   background-color: #fff;
  //   border-color: #ebeef5;
  &:focus,
  &:hover {
    color: #c0c4cc;
    cursor: not-allowed;
    background-image: none;
    background-color: #fff;
    border-color: #ebeef5;
  }
}
// 找到有icon-类名的标签后的span标签加一个左边距
.it-button [class*='icon-'] + span {
  margin-left: 5px;
}
</style>

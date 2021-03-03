<template>
  <div class="it-input" :class="{ 'it-input--suffix': showSuffix }">
    <!-- 如果传了showPassword属性表示需要控制密码的显示与隐藏，不传则不判断
    通过自定的passwordVisible进一步控制密码的显示与隐藏
     -->
    <input
      :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
      class="it-input__inner "
      :class="{ 'is-disabled': disabled }"
      :placeholder="placeholder"
      :name="name"
      :disabled="disabled"
      :value="value"
      @input="handleInput"
      :clearable="clearable"
    />
    <span class="it-input__suffix" v-if="showSuffix">
      <i class="it-input__icon icon-reeor" v-if="clearable && value" @click="clear"></i>
      <i class="it-input__icon icon-browse" :class="{ 'it-icon-view-active': passwordVisible }" v-if="showPassword && value" @click="handlePassword"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'ItInput',
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showSuffix() {
      return this.clearable || this.showPassword
    }
  },
  data() {
    return {
      // 控制是否显示密码，默认不显示
      passwordVisible: false
    }
  },
  methods: {
    handleInput(e) {
      //   console.log(e)
      this.$emit('input', e.target.value)
    },
    clear() {
      this.$emit('input', '')
    },
    handlePassword() {
      // 由于不能直接对父组件传来的type值进行修改
      // 采用间接判断的方式更改
      // 更改子组件自定义属性passwordVisible进行判断
      this.passwordVisible = !this.passwordVisible
    }
  }
}
</script>

<style lang="scss" scoped>
.it-input {
  width: 100%;
  position: relative;
  font-size: 14px;
  display: inline-block;
  .it-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;

    &:focus {
      outline: none;
      border-color: #409eff;
    }
    &.is-disabled {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
}
.it-input--suffix {
  .it-input__inner {
    padding-right: 30px;
  }
  .it-input__suffix {
    //   对图标进行绝对定位
    position: absolute;
    height: 100%;
    right: 10px;
    top: 0;
    line-height: 40px;
    text-align: center;
    color: #c0c4cc;
    // 对于过渡需要深入了解
    transition: all 0.3s;
    z-index: 900;
    i {
      color: #c0c4cc;
      font-size: 14px;
      cursor: pointer;
      transition: color 0.2s cubic-bezier(cubic-bezier(0.645, 0.045, 0.355, 1));
    }
    .it-icon-view-active {
      color: #409eff;
    }
  }
}
</style>

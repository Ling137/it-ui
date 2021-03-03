<template>
  <label class="it-checkbox" :class="{ 'is-checked': isChecked }">
    <span class="it-checkbox__input">
      <span class="it-checkbox__inner"></span>
      <input type="checkbox" class="it-checkbox__original" :name="name" v-model="model" :value="label" />
    </span>
    <span class="it-checkbox__label">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script>
export default {
  name: 'ItCheckbox',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  inject: {
    CheckboxGroup: {
      default: ''
    }
  },
  computed: {
    model: {
      get() {
        return this.isGroup ? this.CheckboxGroup.value : this.value
      },
      set(value) {
        // this.$emit('input', value)
        this.isGroup ? this.CheckboxGroup.$emit('input', value) : this.$emit('input', value)
      }
    },
    isGroup() {
      // 转换为Boolean值进行判断是否被包裹
      return !!this.CheckboxGroup
    },
    isChecked() {
      // 如果checkbox被group包裹，则model是一个数组，此时判断是否选中，应该根据label是否在model数组中进行判断
      // 如果没有被包裹则直接使用model，此时model是Boolean值
      return this.isGroup ? this.model.includes(this.label) : this.model
    }
  }
}
</script>

<style lang="scss" scoped>
.it-checkbox {
  color: #606266;
  font-weight: 500;
  font-size: 14px;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  user-select: none;
  margin-right: 30px;
  .it-checkbox__input {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle;
    .it-checkbox__inner {
      display: inline-block;
      position: relative;
      border: 1px solid #dcdfe6;
      border-radius: 2px;
      box-sizing: border-box;
      width: 14px;
      height: 14px;
      background-color: #fff;
      z-index: 1;
      transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46), background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
      &:after {
        box-sizing: content-box;
        content: '';
        border: 1px solid #fff;
        border-left: 0;
        border-top: 0;
        height: 7px;
        left: 4px;
        position: absolute;
        top: 1px;
        transform: rotate(45deg) scaleY(0);
        width: 3px;
        transition: transform 0.15s ease-in 0.05s;
        transform-origin: center;
      }
    }
    .it-checkbox__original {
      opacity: 0;
      outline: none;
      position: absolute;
      left: 10px;
      margin: 0;
      width: 0;
      height: 0;
      z-index: -1;
    }
  }
  .it-checkbox__label {
    display: inline-block;
    padding-left: 10px;
    line-height: 19px;
    font-size: 14px;
  }
}

// 选中的样式
.it-checkbox.is-checked {
  .it-checkbox__input {
    .it-checkbox__inner {
      background-color: #409eff;
      border-color: #409eff;
      &:after {
        transform: rotate(45deg) scaleY(1);
      }
    }
  }
  .it-checkbox__label {
    color: #409eff;
  }
}
</style>

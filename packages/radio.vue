<template>
  <label class="it-radio" :class="{ 'is-checked': label === model }">
    <!-- radio_input -->
    <span class="it-radio__input">
      <!-- 这个span画成radio的样子 -->
      <span class="it-radio__inner"></span>
      <!-- 真正的radio隐藏，主要是用来传值 -->
      <input type="radio" class="it-radio__original" :value="label" :name="name" v-model="model" />
    </span>
    <span class="it-radio__label">
      <slot></slot>
      <!-- 如果不传slot则将label当成内容显示 -->
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script>
export default {
  name: 'ItRadio',
  //   inject接受radioGroup传来的值
  // 如果radio是被radio-group包裹则使用RadioGroup的值，否则RadioGroup值为空字符串
  inject: {
    RadioGroup: {
      default: ''
    }
  },
  props: {
    label: {
      type: [String, Boolean, Number],
      default: ''
    },
    // v-model绑定的值
    value: null,
    name: {
      type: String,
      default: ''
    }
  },
  computed: {
    //   通过计算属性model，间接修改父组件的value值
    model: {
      get() {
        //   判断是否被group包裹，包裹则使用group传来的value,否则使用直接传进来的value
        return this.isGroup ? this.RadioGroup.value : this.value
      },
      set(value) {
        //   触发父组件给当前组件注册的input事件
        this.$emit('input', value)
        this.isGroup ? this.RadioGroup.$emit('input', value) : this.$emit('input', value)
      }
    },
    isGroup() {
      // 判断radio-group有没有值
      // 通过将其转换为Boolean值进行判断
      // 如果为false说明没有值为空字符串
      return !!this.RadioGroup
    }
  }
}
</script>

<style lang="scss" scoped>
.it-radio {
  .it-radio__input {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle;
    // 自己画一个radio模样的
    .it-radio__inner {
      border: 1px solid #dcdfe6;
      border-radius: 100%;
      width: 14px;
      height: 14px;
      background-color: #fff;
      position: relative;
      cursor: pointer;
      display: inline-block;
      box-sizing: border-box;
      // 通过伪类元素画出中间的小白点，

      &:after {
        //   小白点样式
        width: 4px;
        height: 4px;
        border-radius: 100%;
        background-color: #fff;
        //   运用子绝父相+tranform转换进行位置调整
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(0);
        transition: transform 0.15s ease-in;
      }
    }
    // 隐藏原始的radio
    .it-radio__original {
      position: absolute;
      width: 0;
      height: 0;
      opacity: 0;
      outline: none;
      z-index: -1;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0;
    }
  }
  .it-radio__label {
    font-size: 14px;
    padding-left: 10px;
  }
  &.is-checked {
    .it-radio__input {
      .it-radio__inner {
        border-color: #409eff;
        background: #409eff;
        &:after {
          transform: translate(-50%, -50%) scale(1);
        }
      }
    }
    .it-radio__label {
      color: #409eff;
    }
  }
}
</style>

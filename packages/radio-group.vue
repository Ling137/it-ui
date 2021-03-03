<template>
  <div class="it-radio-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ItRadioGroup',
  //   通过provide和inject的配合将RadioGroup接收到的value传给radio子组件（project和inject是可以跨越多层进行穿透传值，多用于组件库中，日常开发不推荐使用 ）
  provide() {
    return { RadioGroup: this }
  },
  props: {
    value: null
  }
}
</script>

<style lang="scss" scoped></style>

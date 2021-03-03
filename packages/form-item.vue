<template>
  <div class="it-form-item">
    <label class="it-form-item__label" :style="{ width: this.Form.labelWidth }">{{ label }}</label>
    <div class="it-form-item__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItFormItem',
  inject: ['Form'],
  props: {
    label: {
      type: String,
      default: ''
    },
    labelStyle: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入公共css类 */
.it-form-item {
  margin-bottom: 25px;
  .it-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
  }
  .it-form-item__content {
    line-height: 40px;
    position: relative;
    font-size: 14px;
    overflow: hidden;
  }
}
</style>

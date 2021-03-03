<template>
  <div class="it-form" :model="model" :labelWidth="labelWidth">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ItForm',
  props: {
    model: {
      type: Object,
      required: true
    },
    labelWidth: {
      type: String,
      default: '80px'
    }
  },
  provide() {
    return {
      Form: this
    }
  }
}
</script>
<style scoped>
/* @import url(); 引入公共css类 */
</style>

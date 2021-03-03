<template>
  <div class="it-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ItCheckboxGroup',
  props: {
    value: {
      type: Array
    }
  },
  provide() {
    return {
      CheckboxGroup: this
    }
  }
}
</script>

<style lang="scss" scoped></style>

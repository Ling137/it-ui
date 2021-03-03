<template>
  <!-- 由于label中套了checkbox，会默认点击checkbox,所以将label改为div以是的开关正常使用 -->
  <div class="it-switch" :class="{ 'is-checked': value }" @click="handleClick">
    <input class="it-switch__input" type="checkbox" :name="name" ref="input" />
    <span class="it-switch__core" ref="core">
      <span class="it-switch__button"></span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'ItSwitch',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    activeColor: {
      type: String,
      default: ''
    },

    inactiveColor: {
      type: String,
      default: ''
    },
    // 表单name属性
    name: {
      type: String,
      default: ''
    }
  },
  mounted() {
    // 修改开关的颜色
    this.setColor()
    // 控制checkbox的checkbox
    this.$refs.input.checked = this.value
  },
  methods: {
    async handleClick() {
      this.$emit('input', !this.value)
      // 需要等待DOM元素上的value值更改再设置颜色
      //   写法三：最佳写法
      await this.$nextTick
      this.setColor()
      this.$refs.input.checked = this.value
      // 写法一：
      //   this.$nextTick(function() {
      //     this.setColor()
      //   })
      //   写法二：
      //   this.$nextTick().then(() => {
      //     this.setColor()
      //   })
    },
    setColor() {
      if (this.activeColor || this.inactiveColor) {
        const color = this.value ? this.activeColor : this.inactiveColor
        console.log(color)
        this.$refs.core.style.borderColor = color
        this.$refs.core.style.backgroundColor = color
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.it-switch {
  // inline-flex属性不常用，有空多看看，和flex应该类似
  display: inline-flex;
  align-items: center;
  //   相对位置
  position: relative;
  font-size: 14px;
  line-height: 20px;
  height: 20px;
  vertical-align: middle;
  //   添加checkbox表单元素，绑定name,但是不显示
  .it-switch__input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    margin: 0;
  }
  .it-switch__core {
    margin: 0;
    display: inline-block;
    // 通过子绝父相进行圆点按钮定位
    position: relative;
    width: 40px;
    height: 20px;
    border: 1px solid #dcdfe6;
    outline: none;
    border-radius: 10px;
    box-sizing: border-box;
    background: #dcdfe6;
    cursor: pointer;
    transition: border-color 0.3s, background-color 0.3s;
    vertical-align: middle;
    .it-switch__button {
      position: absolute;
      top: 1px;
      left: 1px;
      border-radius: 100%;
      transition: all 0.3s;
      width: 16px;
      height: 16px;
      background-color: #fff;
    }
  }
}

.it-switch.is-checked {
  .it-switch__core {
    border-color: #409eff;
    background-color: #409eff;
    .it-switch__button {
      transform: translateX(20px);
    }
  }
}
</style>

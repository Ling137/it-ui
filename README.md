### 组件封装

教程来源：黑马组件封装基础
[链接](https://www.bilibili.com/video/BV1nJ411V75n?from=search&seid=12958360922659829796)

前置知识

```
组件通讯
组件插槽
props校验
```

#### 遇到的知识点说明

1. .sync 修饰符实际上就是一个语法糖

```html
<template>
  <div>
    sync修饰符示例
    <sync-demo :count="count" @update:count="change"></sync-demo>
    <sync-demo :count.sync="count"></sync-demo>
  </div>
</template>
```

.sync 原理：

在子组件中注册事件执行

```javascript
changeCount() {
    this.$emit('update:count', 100)
}
```

然后父组件加上.sync 修饰符就相当于使用了`@update:count`，并同时修改 count 的值

2. vue 的过渡动画 transition

```html
<template>
  <div class="transition">
    <button v-on:click="show = !show">Toggle</button>
    <!-- transition的name可以自定义,同时更改style中的对应类名前缀
        没有自定义name时,则默认类名为v-开头
     -->
    <transition name="lzw-fade">
      <p v-if="show">vue过渡动画示例</p>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
  .lzw-fade-enter-active,
  .lzw-fade-leave-active {
    transition: opacity 0.5s;
  }
  .lzw-fade-enter,
  .lzw-fade-leave-to {
    opacity: 0;
  }
</style>
```

过渡类名如下：
![](https://cn.vuejs.org/images/transition.png)

`v-enter-active` 和 `v-leave-active` 可以控制进入/离开过渡的不同的缓和曲线

3. scoped 原理
   scoped 会给当前组件的模板中的所有元素添加一个随机的属性
   scoped 会给当前组件中所有的样式页添加一个对应的属性选择器
   可以通过[深度选择器](https://vue-loader.vuejs.org/zh/guide/scoped-css.html#%E6%B7%B7%E7%94%A8%E6%9C%AC%E5%9C%B0%E5%92%8C%E5%85%A8%E5%B1%80%E6%A0%B7%E5%BC%8F)进行穿透
   深度选择器使用方式
   scss 中:`::v-deep`
   less 中:`/deep/`
   css 中:`>>>`

4. v-model 语法糖
   ```html
   <input type="text" v-model="username" />
   <!-- v-demo -->
   <input type="text" :value="username" @input="username = $event.target.value" />
   ```

v-model 等价于`:value`和`@input`

5. provide 和 inject 的使用
   > provide 和 inject 主要在开发高阶插件/组件库时使用。并不推荐用于普通应用程序代码中。

作用：project 注册的对象或函数对象，可以在其任意子孙后代组件中通过 inject 接收到

6. `Vue.use(plugins)`原理
   Vue 使用插件的原理就是会自动寻找插件中的**install**方法，然后去执行

#### 遇到的问题及解决方式

1. ESlint 校验问题

选择了 eslint-standard 模式校验，发现最后还是通过配置`.eslintrc.js`和`.prettierrc`文件后，然后根据 setting.json 原有的配置自动格式化格式，然后就没有 eslint 校验错误了
具体配置如下

.eslintrc.js

```javascript
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
```

.prettierrc

```json
{
  "semi": false, // 末尾不用分号
  "singleQuote": true, // 使用单引号，不用双引号
  "printWidth": 200 // 单行超过200个字符自动换行显示
}
```

2. 更改了值以后需要等待 DOM 上渲染之后再进行设置操作

通过使用`Vue.nextTick()`和`this.nextTick(callback())`

```javascript
async handleClick() {
    this.$emit('input', !this.value)
    // 需要等待DOM元素上的value值更改再设置颜色
    //   写法三：最佳写法
    await this.$nextTick
    this.setColor()
    // 写法一：
    //   this.$nextTick(function() {
    //     this.setColor()
    //   })
    //   写法二：
    //   this.$nextTick().then(() => {
    //     this.setColor()
    //   })
},
```

#### 打包成 UI 组件库发布

1. 新增 `packages` 文件夹,用于放置所有完成的组件`components`和字体图标`fonts`文件夹
2. 将 `src` 文件夹更名为 `examples` 文件夹，用于放置测试示例
3. 配置`vue.config.js`,重新定义入口文件为`examples/main.js`,
   具体配置如下

```javascript
const path = require('path')
module.exports = {
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: config => {
    config.module
      .rule('js')
      .include.add(path.resolve(__dirname, 'packages'))
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        // 修改它的选项...
        return options
      })
  }
}
```

4. 在`packages`文件夹中新建`index.js`

```javascript
// 整个包的入口文件

// 全局注册所有的组件
// 统一导出
// 导入颜色选择器组件
import Button from './button'
import Dialog from './dialog'
import Input from './input'
import Checkbox from './checkbox'
import Radio from './radio'
import RadioGroup from './radio-group'
import Switch from './switch'
import CheckboxGroup from './checkbox-group'
import Form from './form'
import FormItem from './form-item'
import './fonts/iconfont.scss'

// 存储组件列表
const components = [Button, Dialog, Input, Checkbox, Radio, RadioGroup, Switch, CheckboxGroup, Form, FormItem]

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function(Vue) {
  // 遍历注册全局组件
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

// 判断是否是直接引入文件，如果是则不用调用Vue.use()
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default { install }
```

5. 测试
在`examples`中的main.js中进行导入测试
```javascript
    import Vue from 'vue'
    import App from './App.vue'
    
    import ItUI from '../packages'
    
    Vue.use(ItUI)
    
    Vue.config.productionTip = false
    
    new Vue({
      render: h => h(App)
    }).$mount('#app')
```

6. 发布到npm与github
- 发布到github
- 发布到npm
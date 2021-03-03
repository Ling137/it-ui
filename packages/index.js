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

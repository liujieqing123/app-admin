import Vue from 'vue'
import App from './App'
import api from '@/common'  //引入封装的request请求文件


Vue.prototype.$api = api  //全局挂载封装的request
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

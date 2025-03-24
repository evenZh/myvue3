import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button,Cascader,Field,Popup,Loading,PullRefresh,Area,Col,Row,Icon,Lazyload} from 'vant';
import 'vant/lib/index.css';
import '@vant/touch-emulator';
// import axios from 'axios'
// 添加这一行
import '@fortawesome/fontawesome-free/css/all.css'

createApp(App)
.use(store)
.use(router)
.use(Button)
.use(Cascader)
.use(Field)
.use(Popup)
.use(Loading)
.use(PullRefresh)
.use(Area)
.use(Col)
.use(Row)
.use(Icon)
.use(Lazyload, {
  lazyComponent: true,
  loading: 'https://img01.yzcdn.cn/vant/loading-spin.svg', // 加载中显示的转圈动画
  error: 'https://img01.yzcdn.cn/vant/empty-image-default.png', // 加载失败显示的图片
  attempt: 3, // 尝试次数
  preLoad: 1.3, // 预加载高度比例
})
.mount('#app')

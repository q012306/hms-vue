import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = 'http://localhost:8443/api'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

axios.defaults.withCredentials = true

//使用beforeEach钩子函数判断是否拦截,在访问每一个路由前调用
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requireAuth)) {
    axios.get('/user').then(response => {
      if (response.data) {
        next()
      }else {
        router.replace({
          path: '/error'
        })
      }
    }).catch(function (error) {
      console.log(error);
      router.replace({
        path: '/error'
      })
    });
  } else{
    next()
  }
}
)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

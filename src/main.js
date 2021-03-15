import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import VueAwesomeSwiper from "vue-awesome-swiper";

Vue.config.productionTip = false
Vue.prototype.$bus=new Vue()

new Vue({
  router,
  // VueAwesomeSwiper,
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import fastclick from 'fastclick';
import VueLazyload from 'vue-lazyload'
import App from './App.vue'
import router from './router'
import store from './store'
import Loading from './plugins/loading'
import './components';
import './assets/css/base.scss';
 
Vue.use(Loading, {
  title: '正在加载...'
})
Vue.use(VueLazyload, {
  loading: './assets/images/loading.png'
})


fastclick.attach(document.body);
Vue.config.productionTip = false
Vue.prototype.$eventBus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const Recommend = resolve => {
  import('../views/recommend').then(module => resolve(module));
}
const Detail = resolve => {
  import('../views/detail').then(module => resolve(module));
}
const Singer = resolve => {
  import('../views/singer').then(module => resolve(module));
}
const Rank = resolve => {
  import('../views/rank').then(module => resolve(module));
}
const Search = resolve => {
  import('../views/search').then(module => resolve(module));
}
const Account = resolve => {
  import('../views/account').then(module => resolve(module));
}

const routes = [
  { path: '/', redirect: '/recommend' },
  {
    path: '/recommend',
    component: Recommend,
    children: [
      { path: 'detail/:id/:type', component: Detail }
    ]
  },
  { 
    path: '/singer',
    component: Singer,
    children: [
      { path: 'detail/:id/:type', component: Detail }
    ]
  },
  { path: '/rank', component: Rank },
  { path: '/search', component: Search },
  { path: '/account', component: Account, meta: { hideHeaderAndTabbar: true } }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

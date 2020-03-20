export const routes = [
  {
    path: '/',
    name: 'hello',
    component: () => import(/* webpackChunkName: "callListManager" */ './hello.vue'),
    meta: {
      title: 'hello',
    }
  }
]

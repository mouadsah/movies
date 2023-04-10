import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path      : '/',
    redirect  : '/movies',
    name      : 'Home',
    component : () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        path      : '/movies',
        name      : 'Movies',
        component : () => import('@/views/ListMovies.vue'),
        meta    : {
          title : 'Movies',
          auth  : false
        },
      },
      {
        path      : '/detail/:id',
        name      : 'MovieDetails',
        component : () => import('@/views/DetailMovie.vue'),
        meta    : {
          title : 'Movie Details',
          auth  : false
        },
      },
      {
        path      : '/edit/:id',
        name      : 'EditMovie',
        component : () => import('@/views/EditMovie.vue'),
        meta: {
          title : 'Edit Movie',
          auth  : false
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior() {
    return { left: 0, top: 0 }
  },
  routes
})

export default router

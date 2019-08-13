import Vue from 'vue'
import Router, {RouteConfig} from 'vue-router'

Vue.use(Router);
const Layout = () => import("@/components/Layout/Layout.vue");
const home = () => import("@/views/home.vue");
const level2 = () => import("@/views/app/level-2.vue");
const level21 = () => import("@/views/app/level-2-1.vue");
export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/app/home",
    },
    {
      path: "/app",
      component: Layout,
      meta: {
        title: "app",
        icon: "el-icon-s-tools"
      },
      children: [
        {
          path: "home",
          name: "home",
          meta: {
            title: "首页",
            icon: ""
          },
          component: home
        },
        {
          path: "level-2",
          name: "level-2",
          meta: {
            title: "二级目录-2",
            icon: ""
          },
          component: level2
        },
      ]
    },
    {
      path: "/app1",
      component: Layout,
      meta: {
        title: "app1",
        icon: "el-icon-eleme"
      },
      children: [
        {
          path: "level-2-1",
          name: "level-2-1",
          meta: {
            title: "二级目录-2-1",
            icon: "el-icon-eleme"
          },
          component: level21
        }
      ]
    }
  ] as RouteConfig[]
})

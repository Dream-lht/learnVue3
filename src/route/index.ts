import { ElMessageBox } from 'element-plus';
import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  NavigationGuardNext,
} from 'vue-router';
import routes from './route';
import cache from '@/utils/cache';
import { useLayout } from '@/store/module/layoutStore';
import store from '@/store';

const layout = useLayout(store);

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    if (to.fullPath !== '/login') {
      // 判断是否登录;
      if (cache.has('token', 'local')) {
        // 对菜单路由进行收集
        if (to.name != 'main' && to.name != 'notFount') {
        }
        next();
      } else {
        ElMessageBox.confirm('请先进行登录！', '系统提示：', {
          confirmButtonText: '登录',
          cancelButtonText: 'Cancel',
        })
          .then(() => {
            router.push('/login');
          })
          .catch(() => {
            router.push('/login');
          });
        router.push('/login');
      }
    } else {
      next();
    }
  }
);
export default router;

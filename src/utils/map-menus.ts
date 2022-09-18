import { RouteRecordRaw } from 'vue-router';
import { formatUrl } from './formatUrl';
import formatRouterName from './formatRouterName';
function mapMenusToRouters(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];

  // 获取到了所有的组件
  const modules = import.meta.glob('../view/**/*/Index.vue');
  // 根据动态菜单来匹配组件
  userMenus.forEach((item, index) => {
    for (let child of item.children) {
      const routeItem: RouteRecordRaw = {
        path: `/main/${formatUrl(child.url)}`,
        component: modules[`../view/${formatUrl(child.url)}/Index.vue`],
        name: formatRouterName(child.url),
      };
      routes.push(routeItem);
    }
  });

  return routes;
}

export default mapMenusToRouters;

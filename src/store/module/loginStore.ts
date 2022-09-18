import { defineStore } from 'pinia';
import router from '@/route';
import {
  IUserType,
  login,
  getUserInfoById,
  getUserMenuById,
} from '@/api/login/login';
import cache from '@/utils/cache';
import mapMenusToRouters from '@/utils/map-menus';

interface IStateType {
  userData: any;
  token: string | null;
  userMenu: any;
  Info: any;
}

const useLogin = defineStore('login', {
  state: (): IStateType => {
    return {
      userData: {},
      Info: {},
      userMenu: [],
      token: null,
    };
  },

  getters: {
    getUserMenu(state) {
      return state.userMenu;
    },
  },
  actions: {
    async loginActions(userInfo: IUserType) {
      try {
        const res = await login(userInfo);
        this.userData = res.data;

        cache.setLocal('userData', this.userData);

        this.token = res.data.token;
        // 将token存储到localStorage
        cache.setLocal('token', this.token);

        // 获取用户信息
        const user = await getUserInfoById(this.userData.id as number);
        this.Info = user.data;
        cache.setLocal('Info', this.Info);

        // 获取用户菜单
        const userMenu = await getUserMenuById(this.Info.role.id);
        this.userMenu = userMenu.data;
        const routes = mapMenusToRouters(this.userMenu);

        cache.setLocal('userMenu', this.userMenu);
        // 初始化动态路由
        routes.forEach((item) => {
          router.addRoute('main', item);
        });
      } catch (error) {
        console.log(error);
      }
    },
    isLogin(): boolean {
      if (this.token) {
        return true;
      } else {
        return false;
      }
    },

    setupLogin() {
      if (cache.has('token', 'local')) {
        this.userData = cache.getLocal('userData');
        this.userMenu = cache.getLocal('userMenu');
        this.token = cache.getLocal('token');
        this.Info = cache.getLocal('Info');
        const routes = mapMenusToRouters(this.userMenu);
        routes.forEach((item) => {
          router.addRoute('main', item);
        });
      }
    },
  },
});

export default useLogin;

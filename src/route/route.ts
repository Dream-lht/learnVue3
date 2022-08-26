const Login = () => import('@/view/Login/Login.vue');
const Main = () => import('@/view/Main/Main.vue');

const routes = [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/main',
    component: Main,
  },
];

export default routes;

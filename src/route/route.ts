const Login = () => import('@/view/Login/Login.vue');
const Main = () => import('@/view/Main/Main.vue');
const NotFound = () => import('@/view/notFound/NotFound.vue');

const routes = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/main',
    name: 'main',
    component: Main,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: NotFound,
  },
];

export default routes;

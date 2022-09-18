import cache from '@/utils/cache';
import { createApp, computed, watchEffect } from 'vue';
import App from './App.vue';
import store from './store';
import router from './route/';
import registerElement from './global/registerEl';
import 'normalize.css';
import useLogin from '@/store/module/loginStore';

const app = createApp(App);

app.use(store);

useLogin().setupLogin();

app.use(router);

registerElement(app);

app.mount('#app');

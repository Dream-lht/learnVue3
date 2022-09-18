import {
  BASE_URL,
  TIMEOUT,
  HEADER_X_REQUEST_WITH,
  CONTENT_TYPE,
  WITHCREDENTIALS,
  errorCode,
} from './request.config';
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus';
import { useLoading } from '@/hooks/useLoading';
import { EpPropMergeType } from 'element-plus/es/utils';
import { useToken } from '@/hooks/useIsToken';
import cache from '@/utils/cache';

type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'purge'
  | 'PURGE'
  | 'link'
  | 'LINK'
  | 'unlink'
  | 'UNLINK';

export interface IRequestConfig {
  url: string;
  timeout?: number;
  methods?: Method;
  contentType?: string;
  params?: any;
  data?: any;
  isLoding?: boolean;
  isToken?: boolean;
}

type messageType =
  | EpPropMergeType<
      StringConstructor,
      'success' | 'error' | 'warning' | 'info',
      unknown
    >
  | undefined;
interface IMessage {
  type: messageType;
  text: string;
}

// 维护load状态
const [loading, setLoading] = useLoading(false);

// 维护isToken状态
const [isToken, setIsToken] = useToken(true);

// 加载组件
let elLoad: any;

// 消息组件
const message: IMessage = {
  type: 'success',
  text: '',
};

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: { 'X-Requested-With': HEADER_X_REQUEST_WITH },
});

// 允许添加cookie
instance.defaults.withCredentials = WITHCREDENTIALS;

// 添加提交数据类型
instance.defaults.headers.post['Content-Type'] = CONTENT_TYPE;

// 请求拦截
instance.interceptors.request.use((config) => {
  // 检查是否需要token
  if (isToken.value) {
    // 判断token是否存在
    if (cache.has('token', 'local')) {
      if (config.headers) {
        config.headers['Authorization'] = cache.getLocal('token') as string;
      }
    }
  }
  // 显示loading
  if (loading.value) {
    elLoad = ElLoading.service({
      lock: true,
      text: 'Loading',
      background: 'rgba(255, 255, 255, 0.2)',
    });
  }

  return config;
});

// 响应拦截
instance.interceptors.response.use(
  (config) => {
    // 关闭弹窗
    if (loading.value) {
      elLoad.close();
    }
    const status = config.status || 200;
    const errorMessage =
      errorCode[status] || config.statusText || errorCode['default'];

    if (status === 401) {
      ElMessageBox.confirm(
        '登录状态已过期，您可以继续留在该页面，或者重新登录',
        '系统提示',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          location.href = '/login';
        })
        .catch(() => {});
    } else if (status === 500) {
      ElMessage({
        message: errorMessage,
        type: 'error',
      });
      return Promise.reject('error');
    } else {
      return Promise.resolve(config.data);
    }
  },
  (error) => {
    // 对请求错误进行处理
    let { message } = error;

    if (message == 'Network Error') {
      message = '后端接口连接异常';
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时';
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常';
    }
    ElMessage({
      message: message,
      type: 'error',
      duration: 5 * 1000,
    });
    if (loading.value) {
      elLoad.close();
    }
    return Promise.reject(error);
  }
);

export function request(config: IRequestConfig): Promise<any> {
  if (config.isLoding) {
    setLoading(config.isLoding);
  }

  if (config.isToken !== undefined) {
    setIsToken(config.isToken);
  } else {
    setIsToken(true);
  }

  return instance({
    timeout: config.timeout ? config.timeout : TIMEOUT,
    url: config.url,
    method: config.methods ? config.methods : 'POST',
    headers: {
      'content-type': config.contentType ? config.contentType : CONTENT_TYPE,
      Authorization: '',
    },
    params: config.params ? config.params : {},
    data: config.data ? config.data : {},
  });
}

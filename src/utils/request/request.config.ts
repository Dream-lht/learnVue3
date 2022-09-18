interface IErrorCode {
  [propName: number | string]: string;
}

// 请求地址
const BASE_URL: string = import.meta.env.VITE_BASE_URL;
// 超时时间
const TIMEOUT: number = 5000;
// 请求头信息
const HEADER_X_REQUEST_WITH: string = 'XMLHttpRequest';
// 请求数据类型
const CONTENT_TYPE = 'application/json';
// 是否允许血袋cookie
const WITHCREDENTIALS = true;

const errorCode: IErrorCode = {
  400: '密码错误',
  401: '登录状态已过期',
  500: '权限不足',
  default: '未知错误',
};
export {
  BASE_URL,
  TIMEOUT,
  HEADER_X_REQUEST_WITH,
  WITHCREDENTIALS,
  CONTENT_TYPE,
  errorCode,
};

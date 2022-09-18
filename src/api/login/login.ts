import { IRequestConfig, request } from '@/utils/request';

export interface IUserType {
  name: string;
  password: number;
}

export function login(config: IUserType): Promise<any> {
  return request({
    url: 'login',
    data: config,
    isLoding: true,
    isToken: false,
  });
}

export function getUserInfoById(id: number) {
  return request({
    url: `users/${id}`,
    methods: 'GET',
  });
}

export function getUserMenuById(id: number) {
  return request({
    url: `role/${id}/menu`,
    methods: 'get',
  });
}

<script setup lang="ts">
import Account, { IAccountType } from './components/Account.vue';
import Phone from './components/Phone.vue';
import useLogin from '@/store/module/loginStore';
import { IUserType } from '@/api/login/login';
import cache from '@/utils/cache';
import { useRouter } from 'vue-router';

const router = useRouter();
const handleLogin = (accountInfo: IAccountType): void => {
  const userInfo: IUserType = {
    name: accountInfo.name as string,
    password: accountInfo.password as number,
  };

  // 判断是否记住密码
  if (accountInfo.isRemember) {
    cache.setLocal<IUserType>('userInfo', userInfo);
  } else {
    cache.removeItem('userInfo', 'local');
  }
  const login = useLogin();
  login.loginActions(userInfo).then(() => {
    router.push('/main');
  });
};
</script>

<template>
  <div class="page">
    <el-tabs type="border-card" class="login_box" :stretch="true">
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><User /></el-icon>
            <span>Account</span>
          </span>
        </template>
        <Account @login="handleLogin"
      /></el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Iphone /></el-icon>
            <span>Phone</span>
          </span>
        </template>
        <Phone
      /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="less" scoped>
.page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: url('@/assets/image/login_bg.jpg') no-repeat;
  background-size: 100% 100%;

  :deep(.login_box) {
    width: 30%;
    height: 45%;
    background-color: rgba(255, 255, 255, 0.5);
    .el-tabs__header {
      .custom-tabs-label {
        .el-icon {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
          margin-left: 4px;
        }
      }
    }
    .el-tabs__content {
      padding: 2.5vw;
    }
  }
}
</style>

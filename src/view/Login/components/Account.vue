<script lang="ts">
export interface IAccountType {
  name: string | null;
  password: number | null;
  isRemember: boolean;
}
</script>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import cache from '@/utils/cache';

// 注册login事件
const emit = defineEmits(['login']);
// 定义表单实例
const formRef = ref<FormInstance>();
const cacheUserInfo = cache.getLocal('userInfo');

// 用户数据
const account = reactive<IAccountType>({
  name: cacheUserInfo ? cacheUserInfo?.name : null,
  password: cacheUserInfo ? cacheUserInfo?.password : null,
  isRemember: true,
});

// 正则表达式，校验用户名和密码
const reg = /^[a-z0-9]{5,10}$/;
// 校验用户名
const checkName = (rule: any, value: any, callback: any) => {
  if (value === '' || value === undefined || !value) {
    isName.value = false;
    callback(new Error('请输入用户名'));
  } else {
    if (reg.test(value)) {
      isName.value = true;
      callback();
    } else {
      isName.value = false;
      callback(new Error('请输入5-10位的数字或者字母'));
    }
  }
};
// 校验密码
const checkPassword = (rule: any, value: any, callback: any) => {
  if (value === '' || value === undefined || !value) {
    isPassword.value = false;
    callback(new Error('请输入密码'));
  } else {
    if (reg.test(value)) {
      isPassword.value = true;
      callback();
    } else {
      isPassword.value = false;
      callback(new Error('请输入5-10位的数字或者字母'));
    }
  }
};

// 校验规则定义
const rules = reactive<FormRules>({
  name: [{ validator: checkName, trigger: ['blur', 'change'] }],
  password: [{ validator: checkPassword, trigger: ['blur', 'change'] }],
});

const isName = ref<boolean>(false);
const isPassword = ref<boolean>(false);

// 判断登录按钮是否可以被点击
const isLogin = computed(() => {
  if (cacheUserInfo?.name && cacheUserInfo?.password) {
    formRef.value?.validate();
  }
  return isName.value && isPassword.value;
});

// 触发登录事件
const loginEmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      emit('login', account);
    } else {
      console.log('error');
    }
  });
};
</script>
<template>
  <el-form class="account_box" ref="formRef" :model="account" :rules="rules">
    <el-form-item label="" prop="name">
      <el-input
        placeholder="账户"
        type="text"
        v-model="account.name"
      ></el-input>
    </el-form-item>
    <el-form-item label="" prop="password"
      ><el-input
        :show-password="true"
        placeholder="密码"
        type="password"
        v-model="account.password"
      ></el-input
    ></el-form-item>
    <el-form-item class="buttons">
      <el-button type="primary" @click="loginEmit(formRef)" :disabled="!isLogin"
        >登录</el-button
      >
      <el-button>注册</el-button>
    </el-form-item>
    <el-form-item class="options">
      <el-checkbox placeholder="记住密码" v-model="account.isRemember"
        >记住密码</el-checkbox
      >
      <a href="javascript:;" class="foward">忘记密码</a>
    </el-form-item>
  </el-form>
</template>

<style lang="less" scoped>
.account_box {
  .el-form-item {
    margin-bottom: 25px;
  }
  .buttons {
    .el-form-item__content {
      .el-button {
        flex: 1;
      }
    }
  }

  .options {
    :deep(.el-form-item__content) {
      justify-content: space-between;

      .el-checkbox {
        color: #2e2e22;
      }
      .foward {
        color: #444;
      }

      .foward:hover {
        color: #2e2e22;
      }
    }
  }
}
</style>

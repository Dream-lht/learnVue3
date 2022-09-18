<script setup lang="ts">
import { ref } from 'vue';
import { IColLayout } from '@/components/customizeForm/configType';
import CustomizeForm from '@/components/customizeForm/CustomizeForm.vue';
import UserOptions from './form.config';
import { Search, RefreshRight } from '@element-plus/icons-vue';

const labelWidth = '110px';
const colLayout: IColLayout = {
  xl: 8,
  lg: 8,
  md: 12,
  sm: 24,
  xs: 24,
};

const value = ref({
  id: 15,
  userName: 'haha',
});
</script>

<template>
  <div class="headerForm">
    <CustomizeForm
      :options="UserOptions"
      :labelWidth="labelWidth"
      :col-layout="colLayout"
      v-model="value"
      class="customize_form"
    />
    <div class="buts">
      <el-button :icon="Search" type="primary">搜索</el-button>
      <el-button type="primary" :icon="RefreshRight">重置</el-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.headerForm {
  padding-top: 20px;
  :deep(.customize_form) {
    padding: 0 20px;
  }
  .buts {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  border-bottom: 1px solid #ccc;
}
</style>

<script setup lang="ts">
import { useLayout, IHistoryPage } from '@/store/module/layoutStore';
import Navigation from '@/components/navigation/Navigation.vue';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
const layout = useLayout();
const router = useRouter();
const isCollapse = computed(() => {
  return layout.isCollapse;
});

const historyPages = computed(() => {
  return layout.getHistoryPage;
});

console.log(historyPages.value);
const handleOpen = () => {
  layout.changeIsOpen(false);
};

const handleClose = () => {
  layout.changeIsOpen(true);
};

const handleNavClose = (id: string) => {
  console.log('header' + id);
  layout.removeHistoryItem(id);
};
const handleNavTo = (page: IHistoryPage) => {
  router.push(page.to);
};
</script>

<template>
  <el-header class="header">
    <div class="switch">
      <el-icon v-if="isCollapse">
        <Expand @click="handleOpen" />
      </el-icon>
      <el-icon v-else>
        <Fold @click="handleClose" />
      </el-icon>
    </div>
    <navigation
      :historyPages="historyPages"
      @to="handleNavTo"
      @close="handleNavClose"
    >
    </navigation>
  </el-header>
</template>

<style lang="less" scoped>
.header {
  width: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  .switch {
    .el-icon {
      width: 30px;
      height: 30px;
      svg {
        width: 100%;
        height: 100%;
      }
    }
  }

  :deep(.el-breadcrumb) {
    margin-left: 20px;
  }
}
</style>

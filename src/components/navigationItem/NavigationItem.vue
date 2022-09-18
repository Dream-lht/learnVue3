<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue';
import { IHistoryPage } from '@/store/module/layoutStore';
const props = defineProps<{
  page: IHistoryPage;
}>();
const emit = defineEmits(['to', 'close']);

const isShowClose = ref<boolean>(false);

const page = props.page;

const handleIsShow = (isShow: boolean) => {
  isShowClose.value = isShow;
};

const handleClose = (id: string) => {
  emit('close', id);
};
const handleTo = (page: IHistoryPage) => {
  emit('to', page);
};

const isActive = computed(() => {
  return isShowClose.value || page.isActive;
});
</script>
<template>
  <li
    class="navigation_item"
    @mousemove="handleIsShow(true)"
    @mouseleave="handleIsShow(false)"
    @click="handleTo(page)"
    :class="isActive ? 'active' : ''"
  >
    <span>{{ page.name }}</span>
    <i :class="isActive ? 'close' : ''" @click.stop="handleClose(page.id)"></i>
  </li>
</template>
<style>
.navigation_item {
  position: relative;
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.close::after {
  position: absolute;
  top: -7px;
  right: -8px;
  content: '';
  padding: 8px;
  background: url('@/assets/image/close.svg') no-repeat;
  background-size: 100% 100%;
}

.active {
  border: 1px solid #00c9b7;
}
</style>

<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue';
import NavigationItem from '@/components/navigationItem/NavigationItem.vue';
import { IHistoryPage } from '@/store/module/layoutStore';
const props = defineProps<{
  historyPages: IHistoryPage[];
}>();

const emit = defineEmits(['to', 'close']);
const historyPages = ref<IHistoryPage[]>();
// 默认激活ID为列表最后一个

const handleClose = (id: string) => {
  emit('close', id);
};
const handleTo = (page: IHistoryPage) => {
  emit('to', page);
};

watchEffect(
  () => {
    historyPages.value = props.historyPages;
  },
  {
    flush: 'sync',
  }
);

console.log(historyPages.value);
</script>

<template>
  <ul class="navigation">
    <template v-for="page in historyPages">
      <NavigationItem
        @to="handleTo"
        @close="handleClose"
        :page="page"
      ></NavigationItem>
    </template>
  </ul>
</template>

<style lang="less" scoped>
.navigation {
  display: flex;
  list-style: none;
  padding: 30px;
  cursor: pointer;
}
</style>

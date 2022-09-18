<script lang="ts" setup>
import { Ref, ref, watchEffect } from 'vue';
import {
  IOptionsItemType,
  IColLayout,
} from '@/components/customizeForm/configType';
import UniversalComponent from '@/components/universalComponent/UniversalComponent.vue';

const props = defineProps<{
  options: IOptionsItemType;
  colLayout?: IColLayout;
  modelValue?: any;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', data: Ref<any>): void;
}>();

const model = ref(props.modelValue);
const options = props.options;
const colLayout = props.colLayout
  ? props.colLayout
  : {
      xl: 8,
      lg: 8,
      md: 6,
      sm: 24,
      xs: 24,
    };
watchEffect(() => {
  emit('update:modelValue', model.value);
});
</script>

<template>
  <el-col v-bind="colLayout">
    <el-form-item
      :label="options.label"
      :prop="options.prop"
      :rules="options.rules"
    >
      <UniversalComponent :options="props.options" v-model="model" />
    </el-form-item>
  </el-col>
</template>

<style lang="less" scoped></style>

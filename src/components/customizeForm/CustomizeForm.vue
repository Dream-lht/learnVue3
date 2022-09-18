<script setup lang="ts">
import { Ref, ref, watchEffect } from 'vue';
import { IOptionsItemType, IColLayout } from './configType';
import CustomizeFormItem from '@/components/customizeFormItem/CustomizeFormItem.vue';
const props = defineProps<{
  options: IOptionsItemType[];
  labelWidth?: string;
  colLayout?: IColLayout;
  modelValue?: any;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', data: Ref<any>): void;
}>();

const model = ref({ ...props.modelValue });
const options = props.options;
const labelWidth = props.labelWidth ? props.labelWidth : '100px';

watchEffect(() => {
  emit('update:modelValue', model.value);
});
</script>

<template>
  <el-form :label-width="labelWidth">
    <el-row>
      <template v-for="child of options">
        <CustomizeFormItem
          :options="child"
          :col-layout="colLayout"
          v-model="model[child.prop ? child.prop : '']"
        ></CustomizeFormItem>
      </template>
    </el-row>
  </el-form>
</template>

<style lang="less"></style>

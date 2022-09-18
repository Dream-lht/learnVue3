<script setup lang="ts">
import { Ref, ref, watchEffect } from 'vue';
import { IOptionsItemType } from '@/components/customizeForm/configType';
const props = defineProps<{
  options: IOptionsItemType;
  modelValue?: any;
}>();

const model = ref(props.modelValue);
const emit = defineEmits<{
  (event: 'update:modelValue', data: Ref<any>): void;
}>();
const options = props.options;

watchEffect(() => {
  emit('update:modelValue', model.value);
});
</script>

<template>
  <template v-if="options.type === 'text' || options.type === 'password'">
    <el-input
      :placeholder="options.placeholder"
      :type="options.type"
      v-model="model"
      @change=""
    />
  </template>
  <template v-else-if="options.type === 'select'">
    <el-select
      :placeholder="options.placeholder"
      style="width: 100%"
      v-model="model"
    >
      <el-option
        v-for="item of options.selectOptions?.options"
        :key="
          item[options.selectOptions ? options.selectOptions.keyProp : 'value']
        "
        :label="
          item[
            options.selectOptions ? options.selectOptions.labelProp : 'label'
          ]
        "
        :value="
          item[
            options.selectOptions ? options.selectOptions.valueProp : 'value'
          ]
        "
      ></el-option
    ></el-select>
  </template>
  <template v-else-if="options.type === 'checkBox'" v-model="model">
    <el-checkbox></el-checkbox>
  </template>
  <template v-else-if="options.type === 'radio'" :model="model">
    <el-radio></el-radio>
  </template>
  <template v-else-if="options.type === 'datePicker'" v-model="model">
    <el-date-picker
      :type="options.dataPickerOptions?.type"
      :start-placeholder="options.dataPickerOptions?.startPlaceholder"
      :end-placeholder="options.dataPickerOptions?.endPlaceholder"
    ></el-date-picker>
  </template>
</template>

<style lang="less" scoped></style>

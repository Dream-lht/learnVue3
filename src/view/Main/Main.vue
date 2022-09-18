<script setup lang="ts">
import Aside from '@/layout/Aside.vue';
import Header from '@/layout/Header.vue';
import Content from '@/layout/Content.vue';
</script>

<template>
  <div class="common-layout">
    <el-container>
      <Aside></Aside>
      <el-container class="right">
        <Header></Header>
        <Content></Content>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.common-layout {
  background-color: #f3f3f3;
  .right {
    flex-wrap: wrap;
    align-content: flex-start;
    padding: 0 20px;
  }
}
</style>

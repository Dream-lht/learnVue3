<script setup lang="ts">
import { computed } from 'vue';
import useLogin from '@/store/module/loginStore';
import { useRouter } from 'vue-router';
import { useLayout } from '@/store/module/layoutStore';
import formatRouterName from '@/utils/formatRouterName';
const userMenu = computed(() => {
  const login = useLogin();
  return login.getUserMenu;
});

const layout = useLayout();

const isCollapse = computed(() => {
  return layout.isCollapse;
});

const router = useRouter();

const handleIcon = (icon: string): string => {
  // 将字符串进行分割
  let iconChar = icon.split('-');
  iconChar = iconChar.slice(2);
  // 返回首字母大写
  const result = iconChar.map((item, index) => {
    return item[0].toUpperCase() + item.substring(1);
  });

  // 拼接
  const resultIcon = result.reduce((pre, cur) => {
    return pre + cur;
  });
  return resultIcon;
};

// 处理菜单激活
const handleSelect = (index: string, indexPath: string[], item: any) => {
  const selectMenu = userMenu.value
    .filter((item: any, index: number) => {
      if (item.id == indexPath[0]) {
        return true;
      }
    })[0]
    .children.filter((item: any, index: number) => {
      if (item.id == indexPath[1]) {
        return true;
      }
    });

  router
    .push({
      name: formatRouterName(selectMenu[0].url),
    })
    .then(() => {
      layout.addHistory({
        to: selectMenu[0].url,
        id: selectMenu[0].id,
        name: selectMenu[0].name,
        isActive: true,
      });
    });
};
</script>

<template>
  <el-aside :width="isCollapse ? '70px' : '210px'" class="aside">
    <div class="title">
      <img src="~@/assets/vue.svg" class="img" />
      <span class="text" v-show="!isCollapse">后台管理系统</span>
    </div>
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="root-menu"
      text-color="#fff"
      default-active="39"
      @select="handleSelect"
      :collapse="isCollapse"
    >
      <template v-for="menuItem of userMenu" :key="menuItem.id">
        <template v-if="menuItem.type === 1">
          <el-sub-menu :index="`${menuItem.id}`">
            <template #title>
              <el-icon>
                <component :is="handleIcon(menuItem.icon)"></component>
              </el-icon>
              <span>{{ menuItem.name }}</span>
            </template>
            <template
              v-for="childMenu of menuItem.children"
              :key="childMenu.id"
            >
              <el-menu-item :index="`${childMenu.id}`">{{
                childMenu.name
              }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else="menuItem.type === 2">
          <el-menu-item>
            <template #title>
              <el-icon>
                <component :is="handleIcon(menuItem.icon)"></component>
              </el-icon>
              <span>{{ menuItem.name }}</span>
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </el-aside>
</template>

<style lang="less" scoped>
.aside::-webkit-scrollbar {
  /*改变纵向滚动条宽度*/
  width: 3px;
}

.aside::-webkit-scrollbar-track {
  /*改变滚动条轨道颜色*/
  background-color: #ccc;
  // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.aside {
  background-color: rgb(84, 92, 100);
  height: 100vh;
  transition: width 0.5s ease-in-out;
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 8vh;

    .img {
      margin-right: 10px;
    }
    .text {
      font-size: 18px;
      color: #fff;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .root-menu {
    overflow-y: hidden;
    border-right: 0px;
  }
}
</style>

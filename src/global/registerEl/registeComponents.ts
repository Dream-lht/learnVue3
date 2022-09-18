import { App } from 'vue';
// 注册组件
import {
  ElButton,
  ElCheckbox,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElTabPane,
  ElTabs,
  ElIcon,
  ElAside,
  ElHeader,
  ElMain,
  ElContainer,
  ElRow,
  ElCol,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElMenuItemGroup,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElSelect,
  ElDatePicker,
  ElOption,
} from 'element-plus';
import 'element-plus/dist/index.css';

const components = [
  ElButton,
  ElInput,
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElRadio,
  ElCheckbox,
  ElIcon,
  ElAside,
  ElHeader,
  ElMain,
  ElContainer,
  ElRow,
  ElCol,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElMenuItemGroup,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElSelect,
  ElDatePicker,
  ElOption,
];

function registerComponent(app: App): void {
  for (let ElItem of components) {
    app.component(ElItem.name, ElItem);
  }
}

export default registerComponent;

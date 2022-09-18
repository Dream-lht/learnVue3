import {
  Calendar,
  ChatLineRound,
  Expand,
  Fold,
  Goods,
  Iphone,
  Monitor,
  Setting,
  User,
  ArrowRight,
  Search,
} from '@element-plus/icons-vue';
import { App } from 'vue';

const ElIcons = [
  Calendar,
  User,
  Iphone,
  Monitor,
  Setting,
  Goods,
  ChatLineRound,
  Expand,
  Fold,
  ArrowRight,
  Search,
];

export default function registerElIcon(app: App) {
  for (let Icon of ElIcons) {
    app.component(Icon.name, Icon);
  }
}

import { App } from 'vue';
import registerComponent from './registeComponents';
import registerElIcon from './registeIcon';

export default function registeElement(app: App) {
  registerComponent(app);
  registerElIcon(app);
}

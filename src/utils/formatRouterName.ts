import { formatUrl } from './formatUrl';

function formatRouterName(url: string) {
  return formatUrl(url).split('/').slice(-1).join();
}

export default formatRouterName;

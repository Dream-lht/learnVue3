import { ElLoading } from 'element-plus';
import { Ref, ref } from 'vue';

interface IUseLoading {
  (load: boolean): void;
}

const defaultLoading = false;

export function useLoading(isLoad?: boolean): [Ref<boolean>, IUseLoading] {
  const loading = ref<boolean>(isLoad ? isLoad : defaultLoading);

  const setLoading: IUseLoading = (load: boolean) => {
    loading.value = load;
  };

  return [loading, setLoading];
}

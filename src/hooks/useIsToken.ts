import { Ref, ref } from 'vue';

interface ISetIsToken {
  (token: boolean): void;
}
export function useToken(isToken: boolean = true): [Ref<boolean>, ISetIsToken] {
  const tokenRef = ref<boolean>(isToken);

  const setIsToken: ISetIsToken = (token: boolean) => {
    tokenRef.value = token;
  };
  return [tokenRef, setIsToken];
}

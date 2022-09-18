// 处理Url
export function formatUrl(url: string) {
  let urlChar = url.split('/');
  urlChar = urlChar.slice(2);
  const resultUrl = urlChar.join('/');
  return resultUrl;
}

export interface ProxyGroup {
  id: string;
  name: string;
  type: 'select' | 'url-test' | 'fallback' | 'load-balance';
  proxies: string[];
  strategy?: string;
  url?: string;
  interval?: number;
  tolerance?: number;
}
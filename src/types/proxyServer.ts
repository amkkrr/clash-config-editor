interface ProxyServerBase {
  id: string;
  name: string;
  type: 'ss' | 'vmess' | 'trojan';
  server: string;
  port: number;
}

interface ShadowsocksConfig extends ProxyServerBase {
  type: 'ss';
  password: string;
  method: string;
}

interface VMessConfig extends ProxyServerBase {
  type: 'vmess';
  uuid: string;
  alterId: number;
  security: 'auto' | 'aes-128-gcm' | 'chacha20-poly1305' | 'none';
}

interface TrojanConfig extends ProxyServerBase {
  type: 'trojan';
  password: string;
  skipCertVerify: boolean;
}

export type ProxyServerConfig = ShadowsocksConfig | VMessConfig | TrojanConfig;

export interface ProxyServer extends ProxyServerBase {
  password?: string;
  method?: string;
  uuid?: string;
  alterId?: number;
  security?: 'auto' | 'aes-128-gcm' | 'chacha20-poly1305' | 'none';
  skipCertVerify?: boolean;
}

export {};
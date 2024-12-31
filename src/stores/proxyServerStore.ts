import { create } from 'zustand';
import { ProxyServerConfig } from '../types/proxyServer';

interface ProxyServerStore {
  servers: ProxyServerConfig[];
  addServer: (server: Omit<ProxyServerConfig, 'id'>) => void;
  updateServer: (id: string, server: Partial<ProxyServerConfig>) => void;
  deleteServer: (id: string) => void;
  getServer: (id: string) => ProxyServerConfig | undefined;
}

const useProxyServerStore = create<ProxyServerStore>((set, get) => ({
  servers: [],

  addServer: (server) => {
    const newServer = {
      ...server,
      id: Math.random().toString(36).substr(2, 9),
    } as ProxyServerConfig;
    set((state) => ({ servers: [...state.servers, newServer] }));
  },

  updateServer: (id, server) => {
    set((state) => ({
      servers: state.servers.map((s) =>
        s.id === id ? { ...s, ...server } : s
      ) as ProxyServerConfig[],
    }));
  },

  deleteServer: (id) => {
    set((state) => ({
      servers: state.servers.filter((s) => s.id !== id),
    }));
  },

  getServer: (id) => {
    return get().servers.find((s) => s.id === id);
  },
}));

export default useProxyServerStore;
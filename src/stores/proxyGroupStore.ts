import { create } from 'zustand';
import { ProxyGroup } from '../types/proxyGroup';

interface ProxyGroupStore {
  groups: ProxyGroup[];
  addGroup: (group: ProxyGroup) => void;
  updateGroup: (id: string, group: Partial<ProxyGroup>) => void;
  removeGroup: (id: string) => void;
}

const useProxyGroupStore = create<ProxyGroupStore>((set) => ({
  groups: [],
  addGroup: (group) => set((state) => ({ groups: [...state.groups, group] })),
  updateGroup: (id, group) =>
    set((state) => ({
      groups: state.groups.map((g) => (g.id === id ? { ...g, ...group } : g)),
    })),
  removeGroup: (id) =>
    set((state) => ({ groups: state.groups.filter((g) => g.id !== id) })),
}));

export default useProxyGroupStore;

export type { ProxyGroupStore };
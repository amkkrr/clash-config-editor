import { create } from 'zustand';
import { ProxyGroup } from '../types/proxyGroup';

interface ProxyGroupStore {
  groups: ProxyGroup[];
  addGroup: (group: ProxyGroup) => void;
  updateGroup: (id: string, group: Partial<ProxyGroup>) => void;
  removeGroup: (id: string) => void;
  reorderGroups: (dragIndex: number, hoverIndex: number) => void;
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
  reorderGroups: (dragIndex, hoverIndex) =>
    set((state) => {
      const newGroups = [...state.groups];
      const [removed] = newGroups.splice(dragIndex, 1);
      newGroups.splice(hoverIndex, 0, removed);
      return { groups: newGroups };
    }),
}));

export default useProxyGroupStore;

export type { ProxyGroupStore };
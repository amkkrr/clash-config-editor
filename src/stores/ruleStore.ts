import { create } from 'zustand';
import type { Rule } from '../types/rule';

interface RuleStore {
  rules: Rule[];
  addRule: (rule: Omit<Rule, 'id'>) => void;
  updateRule: (id: string, rule: Partial<Rule>) => void;
  removeRule: (id: string) => void;
}

const useRuleStore = create<RuleStore>((set) => ({
  rules: [],
  addRule: (rule) => 
    set((state) => ({
      rules: [...state.rules, { ...rule, id: Date.now().toString() }]
    })),
  updateRule: (id, rule) =>
    set((state) => ({
      rules: state.rules.map((r) => 
        r.id === id ? { ...r, ...rule } : r
      )
    })),
  removeRule: (id) =>
    set((state) => ({
      rules: state.rules.filter((r) => r.id !== id)
    })),
}));

export default useRuleStore;
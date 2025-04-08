// stores/searchStore.ts
import { create } from "zustand";

interface SearchStore {
  query: string;
  inputQuery: string;
  triggerSearch: boolean;
  setInputQuery: (value: string) => void;
  setQuery: (value: string) => void;
  setTriggerSearch: (value: boolean) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  query: "",
  inputQuery: "",
  triggerSearch: false,
  setQuery: (value) => set({ query: value }),
  setInputQuery: (value) => set({ inputQuery: value }),
  setTriggerSearch: (value) => set({ triggerSearch: value }),
}));

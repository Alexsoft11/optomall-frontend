import { create } from 'zustand';

interface SearchState {
  products: any[];
  hasMore: boolean;
  activeSort: string;
  scrollPosition: number;
  setProducts: (products: any[]) => void;
  appendProducts: (newProducts: any[]) => void;
  setHasMore: (hasMore: boolean) => void;
  setActiveSort: (sortType: string) => void;
  setScrollPosition: (position: number) => void; // Existing method
  isBack: boolean;
  setIsBack: (value: boolean) => void
}

const useSearchStore = create<SearchState>((set) => ({
  products: [],
  hasMore: true,
  activeSort: "",
  scrollPosition: 0,
  setProducts: (products) => set(() => ({ products })),
  appendProducts: (newProducts) =>
    set((state) => ({ products: [...state.products, ...newProducts] })),
  setHasMore: (hasMore) => set(() => ({ hasMore })),
  setActiveSort: (sortType) => set(() => ({ activeSort: sortType })),
  setScrollPosition: (position) => set(() => ({ scrollPosition: position })),
  isBack: false,
  setIsBack: (value) => set(() => ({ isBack: value })),
}));

export default useSearchStore;
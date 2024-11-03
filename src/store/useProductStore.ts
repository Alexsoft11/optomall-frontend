import { CategoryInterface } from '@/interfaces';
import { create } from 'zustand';

interface ProductState {
  products: any[];
  homeProducts: any[];
  hasMore: boolean;
  activeSort: string;
  scrollPosition: number;
  isBack: boolean;
  categories: CategoryInterface[];
  setProducts: (products: any[]) => void;
  setHomeProducts: (products: any[]) => void;
  appendProducts: (newProducts: any[]) => void;
  setHasMore: (hasMore: boolean) => void;
  setActiveSort: (sortType: string) => void;
  setScrollPosition: (position: number) => void;
  setCategory: (categories: any[]) => void;
  setIsBack: (value: boolean) => void;
}

const useProductStore = create<ProductState>((set) => ({
  products: [],
  homeProducts: [],
  hasMore: true,
  activeSort: '',
  scrollPosition: 0,
  isBack: false,
  categories: [],
  setProducts: (products) => set(() => ({ products })),
  setHomeProducts: (homeProducts) => set(() => ({ homeProducts })),
  appendProducts: (newProducts) =>
    set((state) => ({ products: [...state.products, ...newProducts] })),
  setHasMore: (hasMore) => set(() => ({ hasMore })),
  setActiveSort: (sortType) => set(() => ({ activeSort: sortType })),
  setScrollPosition: (position) => set(() => ({ scrollPosition: position })),
  setCategory: (categories) => set(() => ({ categories: categories })),
  setIsBack: (value) => set(() => ({ isBack: value })),
}));

export default useProductStore;

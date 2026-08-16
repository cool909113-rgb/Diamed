import { create } from 'zustand';
import { AnalysisItem } from '@/data/mockData';

interface CartState {
  items: AnalysisItem[];
  addAnalysis: (analysis: AnalysisItem) => void;
  removeAnalysis: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getMaxTime: () => number;
  getCombinedPrepRules: () => string[];
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  
  addAnalysis: (analysis) => {
    set((state) => {
      // Prevent duplicates
      if (state.items.find((item) => item.id === analysis.id)) {
        return state;
      }
      return { items: [...state.items, analysis] };
    });
  },
  
  removeAnalysis: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },
  
  clearCart: () => {
    set({ items: [] });
  },
  
  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + item.price, 0);
  },
  
  getMaxTime: () => {
    const items = get().items;
    if (items.length === 0) return 0;
    
    return Math.max(...items.map(item => item.turnaroundTimeDays));
  },
  
  getCombinedPrepRules: () => {
    const items = get().items;
    const rulesSet = new Set<string>();
    
    items.forEach((item) => {
      if (item.preparation) {
        rulesSet.add(item.preparation);
      }
    });
    
    return Array.from(rulesSet);
  }
}));

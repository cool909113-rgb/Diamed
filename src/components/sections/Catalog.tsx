"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Info, Plus, Check } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { mockAnalyses, CATEGORIES, AnalysisItem } from "@/data/mockData";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Modal } from "../ui/Modal";

export function Catalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisItem | null>(null);
  
  const { items, addAnalysis, removeAnalysis } = useCartStore();

  const filteredAnalyses = useMemo(() => {
    let result = mockAnalyses;
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a => 
        a.name.toLowerCase().includes(q) || 
        a.whatItShows.toLowerCase().includes(q) ||
        a.purpose.toLowerCase().includes(q)
      );
    } else if (activeCategory !== 'all') {
      result = result.filter(a => a.category === activeCategory);
    }
    
    return result;
  }, [searchQuery, activeCategory]);

  const isInCart = (id: string) => items.some(item => item.id === id);

  return (
    <section id="catalog" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Умный каталог анализов</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Выберите необходимые анализы, узнайте правила подготовки и рассчитайте общую стоимость заказа со скидкой.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-10 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Поиск по названию или симптому (например: ТТГ, слабость, витамины)" 
            className="w-full bg-slate-50 border border-slate-200 rounded-full py-4 pl-12 pr-6 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-shadow"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories (only show if not searching) */}
        {!searchQuery && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.id 
                    ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20" 
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredAnalyses.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full text-center py-12 text-slate-500"
              >
                Ничего не найдено по вашему запросу
              </motion.div>
            ) : (
              filteredAnalyses.map((analysis, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "100px" }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeOut", delay: (idx % 6) * 0.04 }}
                  whileHover={{ y: -5 }}
                  key={analysis.id}
                  className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
                >
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <h3 className="font-semibold text-slate-900 leading-tight flex-1">
                      {analysis.name}
                    </h3>
                    <button 
                      onClick={() => setSelectedAnalysis(analysis)}
                      className="text-slate-400 hover:text-brand-primary transition-colors flex-shrink-0"
                      title="Подробнее"
                    >
                      <Info className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary">{analysis.turnaroundTimeDays} {analysis.turnaroundTimeDays === 1 ? 'день' : 'дня'}</Badge>
                    <Badge variant="outline" className="border-slate-200 text-slate-500">{analysis.biomaterial}</Badge>
                  </div>
                  
                  <p className="text-sm text-slate-500 mb-6 line-clamp-2 flex-1">
                    {analysis.purpose}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                    <div className="font-bold text-lg text-slate-900">{analysis.price} TJS</div>
                    {isInCart(analysis.id) ? (
                      <Button variant="secondary" className="gap-2" onClick={() => removeAnalysis(analysis.id)}>
                        <Check className="w-4 h-4" /> В корзине
                      </Button>
                    ) : (
                      <Button variant="default" className="gap-2" onClick={() => addAnalysis(analysis)}>
                        <Plus className="w-4 h-4" /> Добавить
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Detail Modal */}
      <Modal 
        isOpen={!!selectedAnalysis} 
        onClose={() => setSelectedAnalysis(null)}
        title={selectedAnalysis?.name}
      >
        {selectedAnalysis && (
          <div className="space-y-6">
            <div className="flex gap-3 pb-4 border-b border-slate-100">
              <div className="bg-slate-100 px-3 py-1.5 rounded-md text-sm font-medium">
                Срок: {selectedAnalysis.turnaroundTimeDays} {selectedAnalysis.turnaroundTimeDays === 1 ? 'день' : 'дня'}
              </div>
              <div className="bg-slate-100 px-3 py-1.5 rounded-md text-sm font-medium">
                Биоматериал: {selectedAnalysis.biomaterial}
              </div>
              <div className="bg-brand-primary/10 text-brand-primary px-3 py-1.5 rounded-md text-sm font-bold">
                {selectedAnalysis.price} TJS
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Для чего сдавать?</h4>
              <p className="text-slate-600 text-sm">{selectedAnalysis.purpose}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Что покажет анализ?</h4>
              <p className="text-slate-600 text-sm">{selectedAnalysis.whatItShows}</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Как подготовиться?</h4>
              <p className="text-sm text-blue-800">{selectedAnalysis.preparation}</p>
            </div>

            <div className="pt-4 flex justify-end">
              {isInCart(selectedAnalysis.id) ? (
                <Button variant="secondary" className="w-full sm:w-auto" onClick={() => {
                  removeAnalysis(selectedAnalysis.id);
                  setSelectedAnalysis(null);
                }}>
                  Убрать из корзины
                </Button>
              ) : (
                <Button variant="default" className="w-full sm:w-auto" onClick={() => {
                  addAnalysis(selectedAnalysis);
                  setSelectedAnalysis(null);
                  // Optional: trigger cart open
                  document.dispatchEvent(new CustomEvent('toggleCart'));
                }}>
                  Добавить в корзину
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}

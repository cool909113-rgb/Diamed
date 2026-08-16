"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShoppingCart, Percent } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { mockCheckups, mockAnalyses } from "@/data/mockData";
import { Button } from "../ui/Button";

export function Checkups() {
  const { items, addAnalysis } = useCartStore();

  const handleAddCheckup = (checkupId: string) => {
    const checkup = mockCheckups.find(c => c.id === checkupId);
    if (!checkup) return;
    
    // In a real app, a checkup might be its own cart item type.
    // For this demo, we add the included analyses if they match mock data names, 
    // or just add a special checkup item. Let's create a special analysis on the fly to represent the checkup.
    
    const checkupItem = {
      id: checkup.id,
      category: "Комплексы",
      name: checkup.title,
      price: checkup.price,
      turnaroundTimeDays: checkup.turnaroundTimeDays,
      biomaterial: "Венозная кровь",
      purpose: checkup.description,
      whatItShows: `Включает: ${checkup.analysesIncluded.join(', ')}`,
      preparation: "Натощак (8-12 часов).",
    };
    
    addAnalysis(checkupItem);
    document.dispatchEvent(new CustomEvent('toggleCart'));
  };

  return (
    <section id="checkups" className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="success">Выгода до 30%</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Комплексные программы (Check-up)</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Готовые наборы анализов для полной проверки здоровья. Сдавать комплексом — выгоднее и информативнее.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {mockCheckups.map((checkup, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ duration: 0.3, ease: "easeOut", delay: (idx % 3) * 0.05 }}
              key={checkup.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-200 overflow-hidden flex flex-col"
            >
              <div className="p-6 bg-gradient-to-br from-brand-primary/5 to-transparent border-b border-slate-100 relative">
                {checkup.oldPrice && (
                  <div className="absolute top-4 right-4 bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs font-bold flex items-center">
                    <Percent className="w-3 h-3 mr-1" /> Экономия
                  </div>
                )}
                <h3 className="text-xl font-bold text-slate-900 mb-2 pr-16">{checkup.title}</h3>
                <p className="text-slate-600 text-sm">{checkup.description}</p>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h4 className="font-semibold text-sm text-slate-900 mb-3">Состав комплекса:</h4>
                <ul className="space-y-2 mb-6 flex-1">
                  {checkup.analysesIncluded.map((analysis, i) => (
                    <li key={i} className="flex items-start text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-brand-primary mr-2 flex-shrink-0 mt-0.5" />
                      {analysis}
                    </li>
                  ))}
                </ul>
                
                <div className="pt-4 border-t border-slate-100 flex items-end justify-between mt-auto">
                  <div>
                    {checkup.oldPrice && (
                      <div className="text-sm text-slate-400 line-through mb-0.5">{checkup.oldPrice} TJS</div>
                    )}
                    <div className="text-2xl font-bold text-slate-900">{checkup.price} TJS</div>
                  </div>
                  <Button onClick={() => handleAddCheckup(checkup.id)}>
                    В корзину
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Needed because we reference Badge here but it wasn't imported.
import { Badge } from "../ui/Badge";

"use client";

import { motion } from "framer-motion";
import { Microscope, Award, Users, Activity } from "lucide-react";
import Image from "next/image";

export function AboutLab() {
  const stats = [
    { icon: <Microscope className="w-8 h-8" />, value: "1000+", label: "Видов анализов" },
    { icon: <Users className="w-8 h-8" />, value: "50 000+", label: "Пациентов в год" },
    { icon: <Award className="w-8 h-8" />, value: "100%", label: "Точность (EQAS)" },
    { icon: <Activity className="w-8 h-8" />, value: "24/7", label: "Контроль качества" },
  ];

  const equipment = [
    { name: "Roche Cobas", brand: "Швейцария", desc: "Иммунохимия и биохимия", color: "bg-blue-100 text-blue-800" },
    { name: "Sysmex", brand: "Япония", desc: "Гематология", color: "bg-red-100 text-red-800" },
    { name: "Abbott", brand: "США", desc: "Инфекционная диагностика", color: "bg-green-100 text-green-800" },
    { name: "Mindray", brand: "Китай", desc: "Общеклинические исследования", color: "bg-purple-100 text-purple-800" },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Лаборатория европейского уровня в Душанбе</h2>
            <p className="text-slate-600 mb-6 text-lg">
              Eurolab — это современный диагностический центр, оснащенный оборудованием последнего поколения от мировых лидеров медицинской техники.
            </p>
            <p className="text-slate-600 mb-8">
              Мы участвуем в международных программах внешней оценки качества (EQAS, RIQAS), что гарантирует абсолютную точность каждого выданного результата.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                    <div className="text-sm text-slate-500">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-50 p-8 rounded-3xl border border-slate-100 relative shadow-sm"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Наше оборудование</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {equipment.map((item, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "100px" }}
                  transition={{ duration: 0.3, ease: "easeOut", delay: (i % 4) * 0.05 }}
                  key={i} 
                  className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-slate-900 text-lg">{item.name}</span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${item.color}`}>
                      {item.brand}
                    </span>
                  </div>
                  <span className="text-sm text-slate-500">{item.desc}</span>
                </motion.div>
              ))}
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-primary/10 rounded-full blur-2xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-brand-secondary/10 rounded-full blur-2xl -z-10"></div>
          </motion.div>
          
        </div>

        {/* Photo Gallery Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-[400px]"
        >
          <div className="relative w-full h-64 md:h-full rounded-2xl overflow-hidden shadow-md group">
            <Image 
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80" 
              alt="Микроскопия и анализы" 
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white font-bold text-lg">Высокоточная микроскопия</p>
            </div>
          </div>
          <div className="grid grid-rows-2 gap-4 h-[500px] md:h-full">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-md group">
              <Image 
                src="https://images.unsplash.com/photo-1583912267670-6575ad472688?auto=format&fit=crop&w=800&q=80" 
                alt="Автоматические анализаторы" 
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-md group bg-brand-primary flex items-center justify-center p-6 text-center">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
               <div className="relative z-10 text-white">
                 <h3 className="text-2xl font-bold mb-2">Инновации</h3>
                 <p className="text-brand-primary-100">Полностью автоматизированный процесс для исключения человеческого фактора</p>
               </div>
            </div>
          </div>
          <div className="relative w-full h-64 md:h-full rounded-2xl overflow-hidden shadow-md group">
            <Image 
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80" 
              alt="Процедурный кабинет" 
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white font-bold text-lg">Стерильные условия</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

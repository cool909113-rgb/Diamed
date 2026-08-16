"use client";

import { motion } from "framer-motion";
import { Search, Clock, Home, FileText } from "lucide-react";
import { Button } from "../ui/Button";
import Image from "next/image";

export function Hero() {
  return (
    <section id="hero" className="relative pt-20 pb-32 overflow-hidden flex items-center min-h-[90vh]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1920&q=80"
          alt="Лаборатория Eurolab"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-[#F8FAFC] backdrop-blur-[2px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight mb-6 drop-shadow-sm"
          >
            Точные медицинские анализы <br className="hidden md:block" />
            <span className="text-brand-primary">европейского качества</span> в Душанбе
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-slate-700 mb-10 font-medium"
          >
            Сдавайте анализы без очередей. Быстрые результаты онлайн. Выезд медсестры на дом за 30 минут.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative max-w-2xl mx-auto mb-16"
          >
            <div className="flex items-center bg-white/90 backdrop-blur-md rounded-full shadow-xl border border-white/60 p-2 pl-6 focus-within:ring-2 focus-within:ring-brand-primary/50 transition-all">
              <Search className="w-5 h-5 text-slate-500" />
              <input 
                type="text" 
                placeholder="Поиск анализа по названию или симптому..." 
                className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-slate-800 placeholder:text-slate-500 font-medium"
                onClick={() => {
                  const catalog = document.getElementById("catalog");
                  if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
                }}
              />
              <Button size="lg" className="rounded-full px-8 shadow-md">Найти</Button>
            </div>
          </motion.div>

          {/* Quick Action Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-xl shadow-teal-900/5 border border-white/60 flex flex-col items-center text-center hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Clock className="w-7 h-7 text-orange-500" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Срочные анализы</h3>
              <p className="text-sm text-slate-600 font-medium">Результат от 2 часов. Идеально для экстренных ситуаций.</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-xl shadow-teal-900/5 border border-white/60 flex flex-col items-center text-center hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Home className="w-7 h-7 text-blue-500" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Выезд на дом</h3>
              <p className="text-sm text-slate-600 font-medium">Приедем за 30 минут. Безопасный забор крови у детей и взрослых.</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-xl shadow-teal-900/5 border border-white/60 flex flex-col items-center text-center hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-7 h-7 text-brand-primary" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Результаты онлайн</h3>
              <p className="text-sm text-slate-600 font-medium">Официальный PDF бланк с печатью в личном кабинете или по SMS.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

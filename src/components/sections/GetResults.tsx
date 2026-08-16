"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileDown, Lock, Search, Eye, Download, X } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

export function GetResults() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  const MockPdfPreview = () => (
    <div className="bg-white text-slate-900 w-full max-w-4xl mx-auto border border-slate-200 shadow-2xl p-8 md:p-12 relative overflow-y-auto max-h-[80vh]">
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-brand-primary pb-6 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-brand-primary">EUROLAB</h2>
          <p className="text-sm text-slate-500 mt-1">Медицинская лаборатория мирового класса</p>
          <p className="text-xs text-slate-400 mt-2">г. Душанбе, ул. Айни 46<br/>+992 93 110 9901 | info@eurolab.tj</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold">ОФИЦИАЛЬНОЕ ЗАКЛЮЧЕНИЕ</p>
          <p className="text-sm mt-1">Заказ № <span className="font-mono">{orderId || "7891011"}</span></p>
          <p className="text-sm">Дата: <span className="font-mono">{new Date().toLocaleDateString('ru-RU')}</span></p>
        </div>
      </div>

      {/* Patient Info */}
      <div className="grid grid-cols-2 gap-4 mb-8 bg-slate-50 p-4 rounded-lg text-sm border border-slate-100">
        <div>
          <p><span className="text-slate-500">Пациент:</span> <span className="font-semibold">Иванов Иван Иванович</span></p>
          <p><span className="text-slate-500">Возраст/Пол:</span> <span className="font-semibold">35 лет / Мужской</span></p>
        </div>
        <div>
          <p><span className="text-slate-500">Врач:</span> <span className="font-semibold">Самообращение</span></p>
          <p><span className="text-slate-500">Биоматериал:</span> <span className="font-semibold">Венозная кровь</span></p>
        </div>
      </div>

      {/* Results Table */}
      <div className="mb-12">
        <h3 className="font-bold text-lg mb-4 text-slate-800">Общеклинические исследования</h3>
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-brand-primary/10 text-brand-primary border-b border-brand-primary/20">
              <th className="py-3 px-4 font-semibold">Исследование</th>
              <th className="py-3 px-4 font-semibold">Результат</th>
              <th className="py-3 px-4 font-semibold">Ед. изм.</th>
              <th className="py-3 px-4 font-semibold">Референсные значения</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="py-3 px-4">Гемоглобин (Hb)</td>
              <td className="py-3 px-4 font-bold text-slate-900">145.0</td>
              <td className="py-3 px-4 text-slate-500">г/л</td>
              <td className="py-3 px-4 text-slate-500">130.0 - 160.0</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-3 px-4">Эритроциты (RBC)</td>
              <td className="py-3 px-4 font-bold text-slate-900">4.8</td>
              <td className="py-3 px-4 text-slate-500">10^12/л</td>
              <td className="py-3 px-4 text-slate-500">4.0 - 5.0</td>
            </tr>
            <tr className="border-b border-slate-100 bg-red-50">
              <td className="py-3 px-4 text-red-900 font-medium flex items-center">
                Холестерин общий <span className="ml-2 text-xs bg-red-200 text-red-800 px-1.5 py-0.5 rounded">ВЫСОКИЙ</span>
              </td>
              <td className="py-3 px-4 font-bold text-red-600">6.2 ↑</td>
              <td className="py-3 px-4 text-red-700">ммоль/л</td>
              <td className="py-3 px-4 text-red-700">0.0 - 5.2</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-3 px-4">Глюкоза</td>
              <td className="py-3 px-4 font-bold text-slate-900">4.5</td>
              <td className="py-3 px-4 text-slate-500">ммоль/л</td>
              <td className="py-3 px-4 text-slate-500">4.1 - 5.9</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer / Signatures */}
      <div className="flex justify-between items-end mt-20 pt-8 border-t border-slate-200">
        <div className="text-sm">
          <p className="mb-4 text-slate-500">Врач клинической лабораторной диагностики:</p>
          <div className="flex items-end gap-4">
            <div className="w-32 border-b border-slate-800"></div>
            <span>/ Аминова С. Р. /</span>
          </div>
        </div>
        
        {/* Mock Stamp */}
        <div className="relative">
          <div className="absolute -inset-4 border-2 border-brand-primary/30 rounded-full w-24 h-24 flex items-center justify-center -rotate-12 opacity-80 pointer-events-none mix-blend-multiply">
            <div className="border border-brand-primary/40 rounded-full w-20 h-20 flex flex-col items-center justify-center text-[8px] text-brand-primary/80 font-bold uppercase text-center leading-tight">
              <span>Eurolab</span>
              <span>Tajikistan</span>
              <span>Для документов</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <h2 className="text-9xl font-black -rotate-45">EUROLAB</h2>
      </div>
    </div>
  );

  return (
    <section id="results" className="py-20 bg-brand-primary text-white overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
        <svg width="600" height="600" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#ffffff" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.6,-46.3C91.4,-33.5,98,-18,97.7,-2.4C97.4,13.2,90.2,28.6,80.1,41.5C70,54.4,57,64.8,42.5,72.4C28.1,80.1,12.2,85.1,-3.5,89.2C-19.1,93.4,-34.5,96.8,-47.9,91.3C-61.3,85.8,-72.7,71.4,-81.2,55.4C-89.7,39.4,-95.3,21.8,-95.5,4.1C-95.7,-13.6,-90.5,-31.5,-80.6,-46.2C-70.7,-60.9,-56.1,-72.4,-40.7,-78.9C-25.3,-85.4,-9.1,-86.9,3.7,-91.3C16.5,-95.7,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100) scale(1.1)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Получить результаты онлайн</h2>
            <p className="text-brand-primary-100 text-lg mb-8 opacity-90">
              Введите номер заказа из чека и номер телефона, чтобы скачать официальный PDF-бланк с результатами анализов и печатью лаборатории.
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-white/90">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-4">
                  <Lock className="w-4 h-4" />
                </div>
                Надежная защита медицинских данных
              </li>
              <li className="flex items-center text-white/90">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-4">
                  <FileDown className="w-4 h-4" />
                </div>
                PDF-бланк с электронной подписью
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-2xl text-slate-900"
          >
            {isSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileDown className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Результаты найдены!</h3>
                <p className="text-slate-600 mb-6">Ваши результаты анализов готовы к просмотру.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="outline" onClick={() => setShowPdfModal(true)} className="flex items-center justify-center">
                    <Eye className="w-4 h-4 mr-2" />
                    Предпросмотр
                  </Button>
                  <Button onClick={() => setShowPdfModal(true)} className="flex items-center justify-center">
                    <Download className="w-4 h-4 mr-2" />
                    Скачать PDF
                  </Button>
                </div>
                <button 
                  onClick={() => { setIsSuccess(false); setOrderId(""); setPhone(""); }}
                  className="mt-6 text-sm text-slate-400 hover:text-slate-600 underline underline-offset-4"
                >
                  Проверить другой заказ
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Номер заказа (ID)</label>
                  <Input 
                    type="text" 
                    placeholder="Например: 12345678" 
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Номер телефона</label>
                  <Input 
                    type="tel" 
                    placeholder="+992 93 110 9901" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full mt-4" size="lg" disabled={isLoading}>
                  {isLoading ? "Поиск..." : (
                    <>
                      <Search className="w-4 h-4 mr-2" /> Найти результаты
                    </>
                  )}
                </Button>
                <p className="text-xs text-center text-slate-500 mt-4">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* PDF Modal Overlay */}
      <AnimatePresence>
        {showPdfModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
              onClick={() => setShowPdfModal(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] flex flex-col z-10"
            >
              {/* Toolbar */}
              <div className="bg-slate-800 text-white p-4 flex justify-between items-center rounded-t-xl">
                <div className="flex items-center gap-2">
                  <FileDown className="w-5 h-5 text-brand-primary-200" />
                  <span className="font-medium">Результаты_заказа_{orderId || "7891011"}.pdf</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="default" size="sm" onClick={() => alert("Скачивание PDF...")}>
                    <Download className="w-4 h-4 mr-2" /> Скачать
                  </Button>
                  <button onClick={() => setShowPdfModal(false)} className="p-2 hover:bg-slate-700 rounded-full transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Document Container */}
              <div className="bg-slate-200 flex-1 overflow-y-auto p-4 md:p-8 rounded-b-xl">
                <MockPdfPreview />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

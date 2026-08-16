"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import { Button } from "../ui/Button";
import Image from "next/image";

const branches = [
  {
    id: "somoni",
    name: "Главный филиал (И. Сомони)",
    address: "г. Душанбе, пр. Исмоила Сомони, 14",
    phone: "+992 93 110 9901",
    workHours: "Пн-Сб: 07:30 - 18:00\nВс: 08:00 - 13:00",
    status: "Открыто",
    mapUrl: "https://yandex.ru/map-widget/v1/?ll=68.784405%2C38.583097&z=16&pt=68.784405,38.583097,pm2vlm",
    yandexLink: "https://yandex.ru/maps/-/CDu~502",
    imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "sino",
    name: "Филиал Сино (Профсоюзы)",
    address: "г. Душанбе, ул. Н. Махсум, 74",
    phone: "+992 93 110 9901",
    workHours: "Пн-Сб: 07:30 - 18:00\nВс: Выходной",
    status: "Открыто",
    mapUrl: "https://yandex.ru/map-widget/v1/?ll=68.746067%2C38.586202&z=16&pt=68.746067,38.586202,pm2vlm",
    yandexLink: "https://yandex.ru/maps/-/CDu~58T",
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "firdavsi",
    name: "Филиал Фирдавси",
    address: "г. Душанбе, ул. Н. Карабаева, 56",
    phone: "+992 93 110 9901",
    workHours: "Пн-Сб: 07:30 - 18:00\nВс: Выходной",
    status: "Открыто",
    mapUrl: "https://yandex.ru/map-widget/v1/?ll=68.761002%2C38.528434&z=16&pt=68.761002,38.528434,pm2vlm",
    yandexLink: "https://yandex.ru/maps/-/CDu~5-X",
    imageUrl: "https://images.unsplash.com/photo-1583912267670-6575ad472688?auto=format&fit=crop&w=800&q=80"
  }
];

export function Branches() {
  const [activeBranchId, setActiveBranchId] = useState(branches[0].id);
  const activeBranch = branches.find(b => b.id === activeBranchId) || branches[0];

  return (
    <section id="branches" className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Наши филиалы</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Найдите ближайшее отделение Eurolab в Душанбе. Во всех филиалах соблюдаются единые высокие стандарты качества и обслуживания.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Tabs Column */}
          <div className="w-full lg:w-1/3 flex flex-col gap-3">
            {branches.map((branch) => (
              <button
                key={branch.id}
                onClick={() => setActiveBranchId(branch.id)}
                className={`text-left p-5 rounded-2xl transition-all duration-300 border ${
                  activeBranchId === branch.id 
                    ? "bg-white border-brand-primary shadow-md ring-1 ring-brand-primary/20" 
                    : "bg-white/50 border-slate-200 hover:bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`font-bold ${activeBranchId === branch.id ? 'text-brand-primary' : 'text-slate-900'}`}>
                    {branch.name}
                  </h3>
                  {activeBranchId === branch.id && (
                    <span className="bg-green-100 text-green-700 text-[10px] uppercase font-bold px-2 py-1 rounded">
                      Выбран
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500 mb-3">{branch.address}</p>
                <div className="flex items-center text-xs text-slate-400 gap-4">
                  <span className="flex items-center"><Phone className="w-3 h-3 mr-1" /> {branch.phone.split(" ")[1]}</span>
                  <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> До 18:00</span>
                </div>
              </button>
            ))}
          </div>

          {/* Details & Map Column */}
          <div className="w-full lg:w-2/3 bg-white rounded-3xl p-4 md:p-8 shadow-sm border border-slate-200 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBranch.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full"
              >
                {/* Branch Image Banner */}
                <div className="w-full h-48 md:h-64 relative rounded-2xl overflow-hidden mb-8 shadow-sm">
                  <Image 
                    src={activeBranch.imageUrl}
                    alt={activeBranch.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-6">
                    <h3 className="text-2xl font-bold text-white shadow-sm">{activeBranch.name}</h3>
                    <p className="text-white/90 text-sm">{activeBranch.status}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-5">
                    <div className="flex items-start gap-4 text-slate-600">
                      <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-brand-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 mb-1">Адрес</p>
                        <p className="text-sm">{activeBranch.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 text-slate-600">
                      <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-brand-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 mb-1">Телефон</p>
                        <p className="text-sm">{activeBranch.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-start gap-4 text-slate-600">
                      <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-brand-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 mb-1">Режим работы</p>
                        <p className="text-sm whitespace-pre-line">{activeBranch.workHours}</p>
                      </div>
                    </div>

                    <div className="pt-4">
                      <a href={activeBranch.yandexLink} target="_blank" rel="noopener noreferrer" className="block">
                        <Button variant="outline" className="w-full flex items-center justify-center">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Открыть в Яндекс.Картах
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Map Iframe */}
                <div className="flex-1 min-h-[350px] w-full bg-slate-100 rounded-2xl overflow-hidden relative border border-slate-200">
                  <iframe 
                    src={activeBranch.mapUrl} 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, position: 'absolute', top: 0, left: 0 }} 
                    allowFullScreen={true}
                    loading="lazy"
                    className="w-full h-full"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

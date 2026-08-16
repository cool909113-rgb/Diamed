import { Hero } from "@/components/sections/Hero";
import { Catalog } from "@/components/sections/Catalog";
import { Checkups } from "@/components/sections/Checkups";
import { GetResults } from "@/components/sections/GetResults";
import { AboutLab } from "@/components/sections/AboutLab";
import { Branches } from "@/components/sections/Branches";

export default function Home() {
  return (
    <>
      <Hero />
      <Catalog />
      <Checkups />
      <GetResults />
      <AboutLab />
      <Branches />
      
      {/* Simple Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center text-white font-bold text-xl">
                  E
                </div>
                <span className="text-xl font-bold text-white tracking-tight">Eurolab</span>
              </div>
              <p className="max-w-sm mb-4">
                Точные медицинские анализы европейского качества в Душанбе. Инновационное оборудование и квалифицированный персонал.
              </p>
              <div className="text-sm">
                &copy; {new Date().getFullYear()} Eurolab.tj. Все права защищены.
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Навигация</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#catalog" className="hover:text-white transition-colors">Каталог анализов</a></li>
                <li><a href="#checkups" className="hover:text-white transition-colors">Комплексы</a></li>
                <li><a href="#results" className="hover:text-white transition-colors">Получить результаты</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">О лаборатории</a></li>
                <li><a href="#branches" className="hover:text-white transition-colors">Контакты</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm">
                <li>Горячая линия:</li>
                <li><a href="tel:+992931109901" className="text-white text-lg font-medium hover:text-brand-primary transition-colors">+992 93 110 9901</a></li>
                <li className="mt-4">Email:</li>
                <li><a href="mailto:info@eurolab.tj" className="hover:text-white transition-colors">info@eurolab.tj</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

"use client";

import { useState } from "react";
import { ShoppingCart, Phone, Menu, X, MapPin } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  const navLinks = [
    { name: "Каталог анализов", href: "#catalog" },
    { name: "Комплексы (Check-up)", href: "#checkups" },
    { name: "Выезд на дом", href: "#hero" }, // Will scroll to hero or a specific section
    { name: "Филиалы", href: "#branches" },
    { name: "Получить результаты", href: "#results" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center text-white font-bold text-xl">
            E
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">Eurolab</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <MapPin className="w-4 h-4 text-brand-primary" />
            <span>Душанбе</span>
          </div>
          
          <div className="h-6 w-px bg-slate-200"></div>
          
          <a href="tel:+992931109901" className="flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-brand-primary transition-colors">
            <Phone className="w-4 h-4 text-brand-primary" />
            +992 93 110 9901
          </a>
          
          <Button variant="default" className="relative group" onClick={() => document.dispatchEvent(new CustomEvent('toggleCart'))}>
            <ShoppingCart className="w-4 h-4 mr-2" />
            <span>Корзина</span>
            {items.length > 0 && (
              <Badge variant="secondary" className="ml-2 bg-white/20 text-white group-hover:bg-white/30">
                {items.length}
              </Badge>
            )}
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <Button variant="outline" size="sm" onClick={() => document.dispatchEvent(new CustomEvent('toggleCart'))}>
            <ShoppingCart className="w-4 h-4" />
            {items.length > 0 && (
              <span className="ml-1 text-xs font-bold">{items.length}</span>
            )}
          </Button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-900">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-200 py-4 px-4 shadow-lg flex flex-col gap-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-base font-medium text-slate-700 py-2 border-b border-slate-100"
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center gap-2 text-slate-600 py-2">
            <MapPin className="w-5 h-5 text-brand-primary" />
            <span>Душанбе</span>
          </div>
          <a href="tel:+992931109901" className="flex items-center gap-2 text-base font-semibold text-slate-900 py-2">
            <Phone className="w-5 h-5 text-brand-primary" />
            +992 93 110 9901
          </a>
        </div>
      )}
    </header>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Clock, AlertCircle, ArrowLeft, CheckCircle2, Loader2, MapPin, Phone, User } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "../ui/Button";

type Step = "cart" | "checkout" | "success";
type DeliveryType = "branch" | "home";

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>("cart");
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("branch");
  
  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+992 ");
  const [address, setAddress] = useState("");
  const [time, setTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState("");

  const { items, removeAnalysis, clearCart, getTotalPrice, getMaxTime, getCombinedPrepRules } = useCartStore();

  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => {
      if (!prev) {
        setStep("cart");
        setOrderId("");
      }
      return !prev;
    });
    document.addEventListener("toggleCart", handleToggle);
    return () => document.removeEventListener("toggleCart", handleToggle);
  }, []);

  const handleCheckoutClick = (type: DeliveryType) => {
    setDeliveryType(type);
    setStep("checkout");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          deliveryType,
          address,
          time,
          items,
          total: getTotalPrice(),
          maxTime: getMaxTime()
        })
      });

      const data = await res.json();
      if (data.success) {
        setOrderId(data.orderId);
        setStep("success");
        clearCart();
      } else {
        alert("Произошла ошибка при оформлении заявки. Попробуйте еще раз.");
      }
    } catch (err) {
      alert("Ошибка сети. Пожалуйста, проверьте подключение.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-3">
                {step === "checkout" && (
                  <button onClick={() => setStep("cart")} className="p-1.5 -ml-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                )}
                <h2 className="text-lg font-bold text-slate-900">
                  {step === "cart" ? "Ваш заказ" : step === "checkout" ? "Оформление" : "Заявка принята"}
                </h2>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content: Cart Step */}
            {step === "cart" && (
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center text-slate-500">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                      <X className="w-8 h-8 text-slate-300" />
                    </div>
                    <p className="text-lg font-medium">Корзина пуста</p>
                    <p className="text-sm mt-1">Добавьте анализы из каталога</p>
                    <Button variant="outline" className="mt-6" onClick={() => setIsOpen(false)}>
                      Перейти в каталог
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-600">Выбрано: {items.length} анализов</span>
                      <button onClick={clearCart} className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center">
                        <Trash2 className="w-3 h-3 mr-1" /> Очистить
                      </button>
                    </div>

                    <div className="flex flex-col gap-3">
                      {items.map((item, idx) => (
                        <motion.div 
                          key={item.id} 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, ease: "easeOut", delay: (idx % 10) * 0.03 }}
                          className="p-3 border border-slate-200 rounded-lg bg-white relative group hover:border-brand-primary/30 transition-colors"
                        >
                          <div className="pr-8">
                            <h4 className="text-sm font-semibold text-slate-900 leading-snug">{item.name}</h4>
                            <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                              <span>{item.price} TJS</span>
                              <span className="flex items-center"><Clock className="w-3 h-3 mr-1"/> {item.turnaroundTimeDays} {item.turnaroundTimeDays === 1 ? 'день' : 'дня'}</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => removeAnalysis(item.id)}
                            className="absolute top-3 right-3 text-slate-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </motion.div>
                      ))}
                    </div>

                    {items.length > 0 && getCombinedPrepRules().length > 0 && (
                      <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                        <h4 className="flex items-center font-semibold text-blue-900 text-sm mb-2">
                          <AlertCircle className="w-4 h-4 mr-2" />
                          Правила подготовки
                        </h4>
                        <ul className="list-disc pl-5 text-xs text-blue-800 space-y-1">
                          {getCombinedPrepRules().map((rule, idx) => (
                            <li key={idx}>{rule}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Content: Checkout Step */}
            {step === "checkout" && (
              <motion.form 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                id="checkout-form" 
                onSubmit={handleSubmit} 
                className="flex-1 overflow-y-auto p-5 flex flex-col gap-5"
              >
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-slate-500">Сумма заказа:</span>
                    <span className="text-lg font-bold text-slate-900">{getTotalPrice()} TJS</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Способ:</span>
                    <span className="text-sm font-medium text-brand-primary">
                      {deliveryType === "branch" ? "В филиале" : "Выезд на дом"}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Ваше имя</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-4 w-4 text-slate-400" />
                      </div>
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                        placeholder="Иван Иванов"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Номер телефона</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-4 w-4 text-slate-400" />
                      </div>
                      <input 
                        type="tel" 
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                        placeholder="+992 93 110 9901"
                      />
                    </div>
                  </div>

                  {deliveryType === "home" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Адрес выезда</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-4 w-4 text-slate-400" />
                          </div>
                          <input 
                            type="text" 
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                            placeholder="ул. Айни, д. 45, кв. 12"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Желаемое время</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Clock className="h-4 w-4 text-slate-400" />
                          </div>
                          <input 
                            type="text"
                            required
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                            placeholder="Завтра утром, с 8:00 до 10:00"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </motion.form>
            )}

            {/* Content: Success Step */}
            {step === "success" && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Заявка принята!</h3>
                <p className="text-slate-600 mb-6">
                  Ваш номер заказа: <br/>
                  <span className="text-brand-primary font-bold text-xl inline-block mt-2">{orderId}</span>
                </p>
                <p className="text-sm text-slate-500 mb-8 bg-slate-50 p-4 rounded-lg">
                  В ближайшее время с вами свяжется наш оператор для подтверждения деталей.
                </p>
                <Button className="w-full" onClick={() => setIsOpen(false)}>
                  Вернуться на сайт
                </Button>
              </motion.div>
            )}

            {/* Footer */}
            {step === "cart" && items.length > 0 && (
              <div className="p-4 border-t border-slate-100 bg-white">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-500">Общая стоимость:</span>
                  <span className="text-2xl font-bold text-slate-900">{getTotalPrice()} TJS</span>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm text-slate-500">Срок готовности:</span>
                  <span className="text-sm font-medium text-slate-900">{getMaxTime()} {getMaxTime() === 1 ? 'день' : 'дня'}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full" onClick={() => handleCheckoutClick("branch")}>
                    Сдать в филиале
                  </Button>
                  <Button variant="default" className="w-full" onClick={() => handleCheckoutClick("home")}>
                    Вызвать на дом
                  </Button>
                </div>
              </div>
            )}

            {step === "checkout" && (
              <div className="p-4 border-t border-slate-100 bg-white">
                <Button type="submit" form="checkout-form" className="w-full h-12 text-base" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Отправка заявки...
                    </>
                  ) : (
                    "Подтвердить заказ"
                  )}
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

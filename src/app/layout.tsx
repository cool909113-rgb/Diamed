import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["cyrillic", "latin"],
});

export const metadata: Metadata = {
  title: "Eurolab Душанбе — Медицинская лаборатория | Анализы европейского качества",
  description: "Сдавайте медицинские анализы без очередей в Душанбе. Более 200+ исследований, выезд медсестры на дом, точные результаты онлайн за 24 часа. Официальный прайс-лист в сомони.",
  openGraph: {
    title: "Eurolab Душанбе — Медицинская лаборатория",
    description: "Сдавайте медицинские анализы без очередей в Душанбе. Точные результаты онлайн за 24 часа.",
    url: "https://eurolab.tj",
    siteName: "Eurolab Душанбе",
    images: [
      {
        url: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Лаборатория Eurolab",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧪</text></svg>",
  },
};

import { Header } from "@/components/layout/Header";
import { CartDrawer } from "@/components/layout/CartDrawer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <CartDrawer />
      </body>
    </html>
  );
}

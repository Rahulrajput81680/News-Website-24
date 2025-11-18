"use client";

import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import ScrollToTop from "@/components/ScrollToTop";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <PageLoader />
      <ScrollToTop />
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </LanguageProvider>
  );
}

import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trendhandy - News Website",
  description: "Breaking news, latest updates, and in-depth coverage of politics, business, technology, sports, and more.",
  keywords: "news, breaking news, latest news, india news, world news, politics, business, technology, sports",
  authors: [{ name: "Trendhandy" }],
  openGraph: {
    title: "Trendhandy - News Website",
    description: "Breaking news and latest updates",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <PageLoader />
          <ScrollToTop />
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

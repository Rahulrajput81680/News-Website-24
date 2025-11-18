"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FiSearch, FiMenu, FiX, FiSun, FiMoon, FiGrid, FiLogOut } from "react-icons/fi";
import { useTheme } from "next-themes";
import { categories, allCategories } from "@/lib/types";
import { isAuthenticated, logout } from "@/lib/auth";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, [pathname]);

  // Close category menu when route changes
  useEffect(() => {
    setIsCategoriesOpen(false);
    setIsMenuOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-background border-b border-gray-200 dark:border-border shadow-sm">
      {/* Top Bar */}
      <div className="bg-[#dc143c] text-white py-1">
        <div className="container-custom flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-primary">
              Trendhandy
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link href="/" className="hover:text-primary transition-colors font-semibold">
              Home
            </Link>
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="hover:text-primary transition-colors"
              >
                {category.name}
              </Link>
            ))}
            <button
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              className="flex items-center gap-1 hover:text-primary transition-colors font-semibold"
            >
              <FiGrid className="w-4 h-4" />
              All Categories
            </button>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Only show Dashboard/Logout on /admin pages */}
            {pathname?.startsWith('/admin') && isLoggedIn ? (
              <>
                <Link
                  href="/admin"
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-semibold"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsLoggedIn(false);
                    router.push("/");
                  }}
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-semibold"
                  title="Logout"
                >
                  <FiLogOut className="w-4 h-4" />
                </button>
              </>
            ) : null}
            
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-white dark:bg-background-card rounded-full transition-colors"
              aria-label="Search"
            >
              <FiSearch className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 hover:bg-white dark:bg-background-card rounded-full transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-white dark:bg-background-card rounded-full transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="mt-4">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search news..."
                  className="w-full px-4 py-2 pr-10 border border-gray-200 dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-background-card"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:text-primary"
                >
                  <FiSearch className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Categories Mega Menu */}
      {isCategoriesOpen && (
        <div className="border-t border-gray-200 dark:border-border bg-white dark:bg-background shadow-lg">
          <div className="container-custom py-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold font-serif">All Categories</h3>
              <button
                onClick={() => setIsCategoriesOpen(false)}
                className="p-1 hover:bg-white dark:bg-background-card rounded"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {allCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  onClick={() => setIsCategoriesOpen(false)}
                  className="flex flex-col items-center p-4 bg-white dark:bg-background-card rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors group"
                >
                  <span className="text-3xl mb-2">{category.icon}</span>
                  <span className="text-sm font-medium text-center group-hover:text-primary">
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-border bg-white dark:bg-background">
          <nav className="container-custom py-4 flex flex-col space-y-3">
            <Link href="/" className="py-2 hover:text-primary transition-colors font-semibold">
              Home
            </Link>
            {/* Only show Dashboard/Logout in mobile menu on /admin pages */}
            {pathname?.startsWith('/admin') && isLoggedIn && (
              <>
                <Link href="/admin" className="py-2 hover:text-primary transition-colors font-semibold">
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsLoggedIn(false);
                    router.push("/");
                    setIsMenuOpen(false);
                  }}
                  className="py-2 hover:text-primary transition-colors font-semibold text-left"
                >
                  Logout
                </button>
              </>
            )}
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="py-2 hover:text-primary transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

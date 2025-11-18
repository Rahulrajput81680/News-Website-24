"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchArticles, fetchCategories } from "@/lib/api";
import { allCategories as fallbackCategories } from "@/lib/types";
import type { Article } from "@/lib/types";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const ARTICLES_PER_PAGE = 9;

export default function CategoryPage({ params }: CategoryPageProps) {
  const [categorySlug, setCategorySlug] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState(fallbackCategories);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    async function loadData() {
      const resolvedParams = await params;
      setCategorySlug(resolvedParams.slug);
      
      // Load articles from API with cache busting
      let fetchedArticles = await fetchArticles();
      setAllArticles(fetchedArticles);
      
      // Load categories from API
      const fetchedCategories = await fetchCategories();
      if (fetchedCategories.length > 0) {
        const categoriesData = fetchedCategories.map(name => {
          const existing = fallbackCategories.find(c => c.name.toLowerCase() === name.toLowerCase());
          return existing || {
            name,
            slug: name.toLowerCase().replace(/\s+/g, '-'),
            icon: '📰',
            description: `Latest ${name} news`
          };
        });
        setCategories(categoriesData);
      }
      
      setMounted(true);
    }
    
    loadData();
  }, [params]);

  if (!mounted) {
    return null;
  }

  const category = categories.find(c => c.slug === categorySlug);

  if (!category) {
    notFound();
  }

  const categoryArticles = allArticles.filter(
    a => a.category.toLowerCase() === category.name.toLowerCase()
  );

  // Pagination
  const totalPages = Math.ceil(categoryArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const currentArticles = categoryArticles.slice(startIndex, endIndex);
  const featuredArticle = categoryArticles[0];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white dark:bg-background min-h-screen">
      <div className="bg-[#dc143c] text-white py-12">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-3 hover:text-white transition-colors">
            {category.name}
          </h1>
          <p className="text-lg opacity-90">
            Latest news and updates in {category.name.toLowerCase()}
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        {categoryArticles.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 dark:text-text-secondary">
              No articles found in this category yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - 2 columns */}
            <div className="lg:col-span-2">
              {/* Featured Article */}
              {featuredArticle && currentPage === 1 && (
                <Link href={`/article/${featuredArticle.slug}`}>
                  <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white dark:bg-background-card rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="relative h-64 overflow-hidden rounded-lg">
                      <Image
                        src={featuredArticle.image}
                        alt={featuredArticle.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="inline-block w-fit px-3 py-1 bg-primary text-white text-xs font-semibold uppercase mb-3 rounded">
                        Featured
                      </span>
                      <h2 className="text-2xl font-bold font-serif mb-3 hover:text-primary transition-colors">
                        {featuredArticle.title}
                      </h2>
                      <p className="text-gray-600 dark:text-text-secondary mb-3 leading-relaxed text-sm line-clamp-3">
                        {featuredArticle.excerpt}
                      </p>
                      <div className="flex items-center text-sm text-gray-600 dark:text-text-secondary">
                        <Image
                          src={featuredArticle.author.avatar}
                          alt={featuredArticle.author.name}
                          width={28}
                          height={28}
                          className="rounded-full mr-2"
                        />
                        <span className="text-xs">{featuredArticle.author.name}</span>
                        <span className="mx-2">•</span>
                        <span className="text-xs">{new Date(featuredArticle.publishedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Article Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(currentPage === 1 ? currentArticles.slice(1) : currentArticles).map((article) => (
                  <Link key={article.id} href={`/article/${article.slug}`}>
                    <article className="group cursor-pointer h-full flex flex-col bg-white dark:bg-background-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <h3 className="text-lg font-bold font-serif mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 dark:text-text-secondary text-sm line-clamp-2 mb-3 flex-grow">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center text-xs text-gray-600 dark:text-text-secondary mt-auto pt-3 border-t border-gray-200 dark:border-border">
                          <span>{article.author.name}</span>
                          <span className="mx-2">•</span>
                          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-white dark:bg-background-card rounded-lg hover:bg-white dark:bg-background-card transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                          currentPage === page
                            ? "bg-primary text-white"
                            : "bg-white dark:bg-background-card hover:bg-white dark:bg-background-card"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-white dark:bg-background-card rounded-lg hover:bg-white dark:bg-background-card transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - 1 column */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-8">
                {/* Trending News */}
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 p-6 rounded-lg">
                  <h3 className="text-xl font-bold font-serif mb-4 flex items-center">
                    <span className="w-1 h-6 bg-primary mr-3"></span>
                    Trending Now
                  </h3>
                  <div className="space-y-4">
                    {allArticles.filter(a => a.trending).slice(0, 5).map((article, index) => (
                      <Link key={article.id} href={`/article/${article.slug}`}>
                        <div className="group cursor-pointer pb-4 border-b border-gray-200 dark:border-border last:border-0 last:pb-0">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl font-bold text-primary/30 font-serif flex-shrink-0">
                              {index + 1}
                            </span>
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2 mb-1">
                                {article.title}
                              </h4>
                              <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-text-secondary">
                                <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs">
                                  {article.category}
                                </span>
                                <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Recent News from Other Categories */}
                <div className="bg-white dark:bg-background-card p-6 rounded-lg shadow">
                  <h3 className="text-xl font-bold font-serif mb-4 flex items-center">
                    <span className="w-1 h-6 bg-primary mr-3"></span>
                    Recent Updates
                  </h3>
                  <div className="space-y-4">
                    {allArticles
                      .filter(a => a.category.toLowerCase() !== category.name.toLowerCase())
                      .slice(0, 6)
                      .map((article) => (
                        <Link key={article.id} href={`/article/${article.slug}`}>
                          <div className="group cursor-pointer flex gap-3 pb-4 border-b border-gray-200 dark:border-border last:border-0 last:pb-0">
                            <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded">
                              <Image
                                src={article.image}
                                alt={article.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2 mb-1">
                                {article.title}
                              </h4>
                              <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-text-secondary">
                                <span className="px-2 py-0.5 bg-white dark:bg-background-card rounded text-xs">
                                  {article.category}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>

                {/* Categories Widget */}
                <div className="bg-white dark:bg-background-card p-6 rounded-lg shadow">
                  <h3 className="text-xl font-bold font-serif mb-4 flex items-center">
                    <span className="w-1 h-6 bg-primary mr-3"></span>
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((cat) => {
                      const count = allArticles.filter(a => a.category.toLowerCase() === cat.name.toLowerCase()).length;
                      return (
                        <Link key={cat.slug} href={`/category/${cat.slug}`}>
                          <div className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                            cat.slug === categorySlug 
                              ? 'bg-primary text-white' 
                              : 'hover:bg-primary hover:text-white'
                          }`}>
                            <span className="font-medium text-sm">{cat.icon} {cat.name}</span>
                            <span className={`text-xs px-2 py-1 rounded ${
                              cat.slug === categorySlug
                                ? 'bg-white/20'
                                : 'bg-background-card'
                            }`}>
                              {count}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

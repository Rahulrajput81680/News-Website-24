"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { searchArticles } from "@/lib/api";
import type { Article } from "@/lib/types";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams?.get("q") || "";
  const [results, setResults] = useState<Article[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    async function performSearch() {
      if (query) {
        // Search using API
        let searchResults = await searchArticles(query);
        setResults(searchResults);
      }
      setMounted(true);
    }
    
    performSearch();
  }, [query]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-background min-h-screen">
      <div className="bg-[#dc143c] text-white py-12">
        <div className="container-custom">
          <div className="flex items-center gap-3 mb-3">
            <FiSearch className="w-8 h-8" />
            <h1 className="text-4xl font-bold font-serif hover:text-white transition-colors">Search Results</h1>
          </div>
          <p className="text-lg opacity-90">
            Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        {results.length === 0 ? (
          <div className="text-center py-16">
            <FiSearch className="w-16 h-16 mx-auto mb-4 text-gray-500 dark:text-text-muted" />
            <h2 className="text-2xl font-bold mb-2">No results found</h2>
            <p className="text-gray-600 dark:text-text-secondary">
              Try searching with different keywords or browse our categories
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((article) => (
              <Link key={article.id} href={`/article/${article.slug}`}>
                <article className="group cursor-pointer h-full flex flex-col bg-white dark:bg-background-card rounded-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200 dark:border-border">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-primary text-white text-xs font-bold uppercase rounded">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold font-serif mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 dark:text-text-secondary text-sm line-clamp-3 mb-3 flex-grow">
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
        )}
      </div>
    </div>
  );
}

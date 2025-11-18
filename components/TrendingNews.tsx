"use client";

import Link from "next/link";
import { FiTrendingUp } from "react-icons/fi";
import { Article } from "@/lib/types";

interface TrendingNewsProps {
  articles: Article[];
}

export default function TrendingNews({ articles }: TrendingNewsProps) {
  
  return (
    <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 p-6 rounded-lg">
      <div className="flex items-center mb-4">
        <FiTrendingUp className="w-6 h-6 text-primary mr-2" />
        <h3 className="text-xl font-bold font-serif">Trending Now</h3>
      </div>
      
      <div className="space-y-4">
        {articles.map((article, index) => (
          <Link key={article.id} href={`/article/${article.slug}`}>
            <div className="group cursor-pointer pb-4 border-b border-gray-200 dark:border-border last:border-0 last:pb-0">
              <div className="flex items-start">
                <span className="text-3xl font-bold text-primary/30 mr-3 font-serif">
                  {index + 1}
                </span>
                <div>
                  <h4 className="font-semibold group-hover:text-primary transition-colors line-clamp-2 mb-1">
                    {article.title}
                  </h4>
                  <span className="text-xs text-gray-600 dark:text-text-secondary">
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

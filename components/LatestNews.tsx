"use client";

import Link from "next/link";
import Image from "next/image";
import { Article } from "@/lib/types";

interface LatestNewsProps {
  articles: Article[];
}

export default function LatestNews({ articles }: LatestNewsProps) {
  
  return (
    <section className="mb-12">
      <div className="border-b-2 border-gray-200 dark:border-border dark:border-gray-200 dark:border-border mb-6 pb-2">
        <h2 className="text-3xl font-bold font-serif">Latest News</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <Link key={article.id} href={`/article/${article.slug}`}>
            <article className="group cursor-pointer">
              <div className="relative h-48 mb-3 overflow-hidden rounded-lg">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="inline-block px-2 py-1 bg-white dark:bg-background-card text-xs font-semibold uppercase mb-2 rounded">
                {article.category}
              </span>
              <h3 className="text-xl font-bold font-serif mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="text-gray-600 dark:text-text-secondary text-sm line-clamp-2">
                {article.excerpt}
              </p>
              <div className="flex items-center mt-3 text-xs text-gray-600 dark:text-text-secondary">
                <span>{article.author.name}</span>
                <span className="mx-2">•</span>
                <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { Article } from "@/lib/types";

interface CategorySectionProps {
  title: string;
  articles: Article[];
  category: string;
}

export default function CategorySection({ title, articles, category }: CategorySectionProps) {
  if (articles.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between border-b-2 border-gray-200 dark:border-border dark:border-gray-200 dark:border-border mb-6 pb-2">
        <h2 className="text-3xl font-bold font-serif">{title}</h2>
        <Link 
          href={`/category/${category}`}
          className="flex items-center text-primary hover:underline font-semibold"
        >
          View All <FiArrowRight className="ml-1" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <Link key={article.id} href={`/article/${article.slug}`}>
            <article className="group cursor-pointer flex gap-4">
              <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold font-serif mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 dark:text-text-secondary text-sm line-clamp-2 mb-2">
                  {article.excerpt}
                </p>
                <div className="text-xs text-gray-600 dark:text-text-secondary">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

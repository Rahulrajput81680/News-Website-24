"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Article } from "@/lib/types";

interface HeroSectionProps {
  articles: Article[];
}

export default function HeroSection({ articles }: HeroSectionProps) {
  const mainArticle = articles[0];
  const sideArticles = articles.slice(1, 4);

  return (
    <div className="bg-gradient-to-b from-background-elevated to-background border-b-4 border-primary">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Featured Article - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-2"
          >
            <Link href={`/article/${mainArticle.slug}`}>
              <div className="group relative h-[600px] overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={mainArticle.image}
                  alt={mainArticle.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority
                />
                {/* Dark Bottom Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                
                {/* Content - Bottom Left */}
                <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-4 py-1.5 bg-primary text-white text-xs font-bold uppercase rounded-full shadow-lg">
                      {mainArticle.category}
                    </span>
                    {mainArticle.trending && (
                      <span className="px-4 py-1.5 bg-red-600 text-white text-xs font-bold uppercase rounded-full animate-pulse shadow-lg">
                        🔥 Trending
                      </span>
                    )}
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold font-serif mb-4 leading-tight group-hover:text-primary transition-colors">
                    {mainArticle.title}
                  </h2>
                  <p className="text-white text-lg mb-6 line-clamp-2 leading-relaxed">
                    {mainArticle.excerpt}
                  </p>
                  <div className="flex items-center gap-4">
                    <Image
                      src={mainArticle.author.avatar}
                      alt={mainArticle.author.name}
                      width={48}
                      height={48}
                      className="rounded-full border-2 border-white shadow-md"
                    />
                    <div>
                      <p className="font-semibold text-lg">{mainArticle.author.name}</p>
                      <p className="text-sm text-gray-300">
                        {new Date(mainArticle.publishedAt).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Side Articles - Takes 1 column */}
          <div className="flex flex-col gap-6">
            {sideArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: "easeOut" }}
              >
                <Link href={`/article/${article.slug}`}>
                  <div className="group relative h-[180px] overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <span className="inline-block px-3 py-1 bg-primary/90 text-white text-xs font-bold uppercase rounded-full mb-2 shadow-md">
                        {article.category}
                      </span>
                      <h3 className="font-bold font-serif text-base leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

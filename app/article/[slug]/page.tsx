import { fetchArticleBySlug, fetchArticles } from "@/lib/api";
import ArticleClientPage from "./ArticleClient";
import type { Metadata } from "next";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Fetch article from API
  let article = await fetchArticleBySlug(slug);
  
  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${article.title} - Trendhandy`,
    description: article.excerpt,
    keywords: article.tags.join(", "),
    authors: [{ name: article.author.name }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      images: [{ url: article.image }],
    },
  };
}

export async function generateStaticParams() {
  // Fetch articles from API
  let articles = await fetchArticles();
  
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticlePage() {
  return <ArticleClientPage />;
}


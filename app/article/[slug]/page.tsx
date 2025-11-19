import { fetchArticleBySlug, fetchArticles } from "@/lib/api";
import ArticleClientPage from "./ArticleClient";
import type { Metadata } from "next";

// Generate pages dynamically on-demand instead of at build time
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  // Skip during build if MongoDB not configured
  if (!process.env.MONGODB_URI) {
    return {
      title: "Article - Trendhandy",
    };
  }
  
  const { slug } = await params;
  
  try {
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
  } catch (error) {
    return {
      title: "Article - Trendhandy",
    };
  }
}

export default function ArticlePage() {
  return <ArticleClientPage />;
}


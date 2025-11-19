import { MetadataRoute } from 'next'
import type { Article } from '@/lib/types'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use Vercel URL in production, fallback for local dev
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003'
  
  // Fetch articles from MongoDB - skip if no MongoDB URI (during build)
  let articles: Article[] = [];
  
  if (process.env.MONGODB_URI) {
    try {
      const apiUrl = process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}/api/articles`
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003'}/api/articles`;
      
      const response = await fetch(apiUrl, {
        cache: 'no-store'
      });
      const result = await response.json();
      articles = result.data || [];
    } catch (error) {
      console.error('Error fetching articles for sitemap:', error);
    }
  }
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ]

  // Category pages
  const categoryPages = [
    'politics',
    'business',
    'technology',
    'sports',
    'world',
    'entertainment',
    'editorial',
  ].map(category => ({
    url: `${baseUrl}/category/${category}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  // Article pages
  const articlePages = articles.map((article: Article) => ({
    url: `${baseUrl}/article/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...categoryPages, ...articlePages]
}

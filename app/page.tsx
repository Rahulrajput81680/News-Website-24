import HeroSection from "@/components/HeroSection";
import LatestNews from "@/components/LatestNews";
import TrendingNews from "@/components/TrendingNews";
import CategorySection from "@/components/CategorySection";
import { fetchArticles } from "@/lib/api";
import type { Article } from "@/lib/types";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // Fetch articles from API with error handling for build time
  let articles: Article[] = [];
  try {
    articles = await fetchArticles();
  } catch (error) {
    console.log('⚠️ Could not fetch articles:', error instanceof Error ? error.message : 'Unknown error');
    // Return empty page during build, will work at runtime when MongoDB is configured
    articles = [];
  }

  const featuredArticles = articles.filter(a => a.featured || a.trending).slice(0, 4);
  const latestArticles = articles.slice(0, 8);
  const trendingArticles = articles.filter(a => a.trending).slice(0, 5);

  return (
    <div className="bg-white dark:bg-background">
      {featuredArticles.length > 0 && <HeroSection articles={featuredArticles} />}
      
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <LatestNews articles={latestArticles} />
            
            <CategorySection 
              title="Politics" 
              articles={articles.filter(a => a.category === "Politics").slice(0, 4)} 
              category="politics"
            />
            
            <CategorySection 
              title="Business" 
              articles={articles.filter(a => a.category === "Business").slice(0, 4)} 
              category="business"
            />
            
            <CategorySection 
              title="Technology" 
              articles={articles.filter(a => a.category === "Technology").slice(0, 4)} 
              category="technology"
            />
            
            <CategorySection 
              title="Sports" 
              articles={articles.filter(a => a.category === "Sports").slice(0, 4)} 
              category="sports"
            />
          </div>
          
          <div className="lg:col-span-1">
            <TrendingNews articles={trendingArticles} />
            
            <div className="mt-8 p-6 bg-white dark:bg-background-card rounded-lg">
              <h3 className="text-lg font-bold mb-4 font-serif">Advertisement</h3>
              <div className="h-64 bg-white dark:bg-background-card flex items-center justify-center text-gray-600 dark:text-text-secondary">
                Ad Placeholder
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="text-lg font-bold mb-4 font-serif">Weather</h3>
              <div className="space-y-2">
                <p className="text-sm">New Delhi: 28°C</p>
                <p className="text-sm">Mumbai: 32°C</p>
                <p className="text-sm">Bangalore: 24°C</p>
                <p className="text-sm">Chennai: 30°C</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

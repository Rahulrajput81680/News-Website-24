// TypeScript interfaces and types for the application

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  videoUrl?: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  publishedAt: string;
  featured?: boolean;
  trending?: boolean;
  tags: string[];
}

export interface Category {
  name: string;
  slug: string;
  icon?: string;
  description?: string;
}

// Category definitions
export const allCategories: Category[] = [
  { name: "National", slug: "national", icon: "🇮🇳", description: "National news and updates" },
  { name: "International", slug: "international", icon: "🌍", description: "Global news and events" },
  { name: "Politics", slug: "politics", icon: "🏛️", description: "Political developments" },
  { name: "Business", slug: "business", icon: "💼", description: "Business and economy" },
  { name: "Technology", slug: "technology", icon: "💻", description: "Tech news and innovations" },
  { name: "Sports", slug: "sports", icon: "⚽", description: "Sports updates and scores" },
  { name: "Entertainment", slug: "entertainment", icon: "🎬", description: "Entertainment news" },
  { name: "Bollywood", slug: "bollywood", icon: "🎭", description: "Bollywood updates" },
  { name: "Health", slug: "health", icon: "🏥", description: "Health and wellness" },
  { name: "Food", slug: "food", icon: "🍽️", description: "Food and recipes" },
  { name: "Lifestyle", slug: "lifestyle", icon: "✨", description: "Lifestyle and fashion" },
  { name: "Science", slug: "science", icon: "🔬", description: "Science and research" },
  { name: "Education", slug: "education", icon: "📚", description: "Education news" },
  { name: "Environment", slug: "environment", icon: "🌱", description: "Environmental issues" },
  { name: "Opinion", slug: "opinion", icon: "💭", description: "Opinion pieces" },
  { name: "World", slug: "world", icon: "🌐", description: "World news" },
];

export const categories = [
  { name: "Politics", slug: "politics" },
  { name: "Business", slug: "business" },
  { name: "Technology", slug: "technology" },
  { name: "Sports", slug: "sports" },
  { name: "World", slug: "world" },
  { name: "Entertainment", slug: "entertainment" },
  { name: "Editorial", slug: "editorial" },
];

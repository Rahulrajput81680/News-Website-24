// API Service for fetching articles from backend
const getBaseUrl = () => {
  // Server-side: use Vercel URL or localhost
  if (typeof window === 'undefined') {
    // In production (Vercel), use the deployment URL
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
    // Fallback to custom domain or localhost
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003';
  }
  // Client-side: use relative path
  return '';
};

const API_BASE_URL = '/api';

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

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
  error?: string;
}

// Fetch all articles with optional filters
export async function fetchArticles(params?: {
  category?: string;
  featured?: boolean;
  trending?: boolean;
  limit?: number;
  skip?: number;
}): Promise<Article[]> {
  try {
    const queryParams = new URLSearchParams();
    
    if (params?.category) queryParams.append('category', params.category);
    if (params?.featured) queryParams.append('featured', 'true');
    if (params?.trending) queryParams.append('trending', 'true');
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.skip) queryParams.append('skip', params.skip.toString());

    const baseUrl = getBaseUrl();
    const url = `${baseUrl}${API_BASE_URL}/articles${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    const response = await fetch(url, {
      cache: 'no-store', // Always get fresh data
    });

    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }

    const result: ApiResponse<Article[]> = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

// Fetch single article by slug
export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}${API_BASE_URL}/articles/${slug}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const result: ApiResponse<Article> = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

// Fetch all categories
export async function fetchCategories(): Promise<string[]> {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}${API_BASE_URL}/categories`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const result: ApiResponse<string[]> = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Search articles
export async function searchArticles(query: string): Promise<Article[]> {
  try {
    if (!query) return [];

    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}${API_BASE_URL}/search?q=${encodeURIComponent(query)}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to search articles');
    }

    const result: ApiResponse<Article[]> = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Error searching articles:', error);
    return [];
  }
}

// Create new article
export async function createArticle(article: Partial<Article>): Promise<Article | null> {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}${API_BASE_URL}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(article),
    });

    if (!response.ok) {
      throw new Error('Failed to create article');
    }

    const result: ApiResponse<Article> = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error creating article:', error);
    return null;
  }
}

// Update article
export async function updateArticle(slug: string, article: Partial<Article>): Promise<Article | null> {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}${API_BASE_URL}/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(article),
    });

    if (!response.ok) {
      throw new Error('Failed to update article');
    }

    const result: ApiResponse<Article> = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error updating article:', error);
    return null;
  }
}

// Delete article
export async function deleteArticle(slug: string): Promise<boolean> {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}${API_BASE_URL}/articles/${slug}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete article');
    }

    return true;
  } catch (error) {
    console.error('Error deleting article:', error);
    return false;
  }
}

// Seed database with initial data
export async function seedDatabase(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/seed`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Failed to seed database');
    }

    return true;
  } catch (error) {
    console.error('Error seeding database:', error);
    return false;
  }
}

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';

// Disable caching for this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Add response caching headers
const getCacheHeaders = () => ({
  'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=59',
});

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const trending = searchParams.get('trending');
    const limit = searchParams.get('limit');
    const skip = searchParams.get('skip');

    let query: any = {};

    if (category) {
      query.category = category;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (trending === 'true') {
      query.trending = true;
    }

    let articlesQuery = Article.find(query).sort({ publishedAt: -1 });

    if (limit) {
      articlesQuery = articlesQuery.limit(parseInt(limit));
    }

    if (skip) {
      articlesQuery = articlesQuery.skip(parseInt(skip));
    }

    const articles = await articlesQuery.lean();

    return NextResponse.json(
      {
        success: true,
        data: articles,
        count: articles.length,
      },
      {
        headers: getCacheHeaders(),
      }
    );
  } catch (error: any) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Generate slug from title if not provided
    if (!body.slug) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    // Generate unique ID if not provided
    if (!body.id) {
      // Get all articles and find the highest numeric ID
      const allArticles = await Article.find({}, { id: 1 }).lean();
      const maxId = allArticles.reduce((max, article) => {
        const numId = parseInt(article.id);
        return numId > max ? numId : max;
      }, 0);
      body.id = String(maxId + 1);
    }

    const article = await Article.create(body);

    return NextResponse.json({
      success: true,
      data: article,
      message: 'Article created successfully',
    });
  } catch (error: any) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

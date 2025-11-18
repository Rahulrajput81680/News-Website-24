# MongoDB Backend Setup Guide

## 🚀 Quick Start

Your news website now uses MongoDB with Mongoose for dynamic data storage. This improves performance and scalability.

## 📦 What's Installed

- **Mongoose**: MongoDB ODM for Node.js
- **API Routes**: RESTful endpoints for CRUD operations
- **Database Connection**: Optimized connection pooling

## 🗂️ New Files Created

### Database Configuration

- `lib/mongodb.ts` - MongoDB connection handler with caching
- `models/Article.ts` - Mongoose schema for articles
- `.env.local` - Environment variables

### API Routes (app/api/)

- `articles/route.ts` - GET all articles, POST new article
- `articles/[slug]/route.ts` - GET/PUT/DELETE single article
- `categories/route.ts` - GET all categories
- `search/route.ts` - Search articles
- `seed/route.ts` - Seed database with initial data

### Helper

- `lib/api.ts` - Frontend API service functions

## ⚙️ Setup Instructions

### Option 1: Local MongoDB (Recommended for Development)

1. **Install MongoDB**

   - Download from: https://www.mongodb.com/try/download/community
   - Install and start MongoDB service

2. **Verify Connection String**

   - Open `.env.local`
   - Default: `MONGODB_URI=mongodb://localhost:27017/trendhandy`

3. **Seed Database**
   - Navigate to: http://localhost:3001/api/seed (POST request)
   - Or use this PowerShell command:
   ```powershell
   Invoke-WebRequest -Uri "http://localhost:3001/api/seed" -Method POST
   ```

### Option 2: MongoDB Atlas (Cloud - Recommended for Production)

1. **Create Free Account**

   - Go to: https://www.mongodb.com/cloud/atlas
   - Click "Try Free" and sign up

2. **Create Cluster**

   - Choose FREE tier (M0)
   - Select region closest to you
   - Click "Create Cluster"

3. **Setup Database Access**

   - Go to "Database Access"
   - Click "Add New Database User"
   - Create username and password
   - Save credentials securely

4. **Setup Network Access**

   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**

   - Go to "Databases"
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

6. **Update .env.local**

   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/trendhandy?retryWrites=true&w=majority
   ```

7. **Seed Database**
   - Navigate to: http://localhost:3001/api/seed
   - Or use PowerShell:
   ```powershell
   Invoke-WebRequest -Uri "http://localhost:3001/api/seed" -Method POST
   ```

## 🔌 API Endpoints

### Articles

- `GET /api/articles` - Get all articles
  - Query params: `?category=Politics&featured=true&trending=true&limit=10&skip=0`
- `POST /api/articles` - Create new article
- `GET /api/articles/[slug]` - Get single article
- `PUT /api/articles/[slug]` - Update article
- `DELETE /api/articles/[slug]` - Delete article

### Categories

- `GET /api/categories` - Get all unique categories

### Search

- `GET /api/search?q=keyword` - Search articles

### Seed

- `POST /api/seed` - Seed database with initial data

## 📊 Performance Benefits

✅ **Faster Load Times**: Data served from optimized database with indexes
✅ **Scalability**: Handle thousands of articles without bloating code
✅ **Dynamic Updates**: Add/edit/delete articles without redeploying
✅ **Better SEO**: Server-side rendering with fresh data
✅ **Query Optimization**: Filter by category, featured, trending, etc.

## 🛠️ Using the API in Your Code

```typescript
import { fetchArticles, fetchArticleBySlug } from "@/lib/api";

// Get all articles
const articles = await fetchArticles();

// Get filtered articles
const featured = await fetchArticles({ featured: true, limit: 5 });

// Get category articles
const politics = await fetchArticles({ category: "Politics" });

// Get single article
const article = await fetchArticleBySlug("some-article-slug");
```

## 🔄 Migration Status

The homepage (`app/page.tsx`) has been updated to use the API. Other pages still need updating:

### To Update

- `app/article/[slug]/page.tsx` - Article detail page
- `app/category/[slug]/page.tsx` - Category page
- `app/search/page.tsx` - Search page
- `app/admin/page.tsx` - Admin dashboard

Example migration:

```typescript
// Old way
import { articles } from "@/lib/data";

// New way
import { fetchArticles } from "@/lib/api";
const articles = await fetchArticles();
```

## 🧪 Testing

1. **Check Database Connection**

   ```powershell
   curl http://localhost:3001/api/articles
   ```

2. **Seed Database**

   ```powershell
   Invoke-WebRequest -Uri "http://localhost:3001/api/seed" -Method POST
   ```

3. **Verify Data**
   - Visit: http://localhost:3001/
   - Should see articles from database

## 🐛 Troubleshooting

### "MongoServerError: Authentication failed"

- Check username/password in connection string
- Verify database user exists in Atlas

### "MongooseServerSelectionError"

- Check network access settings in Atlas
- Verify IP address is whitelisted
- Check if MongoDB service is running (local)

### "No articles showing"

- Run seed endpoint: POST /api/seed
- Check browser console for errors
- Verify MongoDB connection string

### "Cannot find module 'mongoose'"

- Run: `npm install mongoose`
- Restart dev server

## 📈 Next Steps

1. ✅ Setup MongoDB (local or Atlas)
2. ✅ Update `.env.local` with connection string
3. ✅ Seed database with initial data
4. 🔄 Update remaining pages to use API
5. 🔄 Build admin interface for CRUD operations
6. 🔄 Add pagination for large datasets
7. 🔄 Implement caching strategy

## 💡 Pro Tips

- Use MongoDB Atlas for production
- Enable database backups in Atlas
- Add indexes for frequently queried fields (already done)
- Monitor database performance in Atlas dashboard
- Use connection pooling (already configured)
- Implement rate limiting for API routes

## 📚 Resources

- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- Mongoose Docs: https://mongoosejs.com/
- Next.js API Routes: https://nextjs.org/docs/app/building-your-application/routing/route-handlers

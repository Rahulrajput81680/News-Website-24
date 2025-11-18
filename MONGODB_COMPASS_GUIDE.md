# MongoDB Compass Setup Guide

## 📊 How to View Data in MongoDB Compass

### Step 1: Download MongoDB Compass

1. Go to: https://www.mongodb.com/try/download/compass
2. Download the installer for Windows
3. Install MongoDB Compass (free GUI tool)

### Step 2: Connect to Your Database

#### For Local MongoDB:

1. Open MongoDB Compass
2. In the connection string field, paste:
   ```
   mongodb://localhost:27017
   ```
3. Click **Connect**

#### For MongoDB Atlas (Cloud):

1. Open MongoDB Compass
2. Get your connection string from `.env.local`
3. Paste it in the connection field (example):
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/
   ```
4. Click **Connect**

### Step 3: View Your Database

1. After connecting, you'll see all databases on the left sidebar
2. Click on **`trendhandy`** database
3. You'll see the **`articles`** collection
4. Click on **`articles`** to view all news articles

### Step 4: Browse Your Data

- **Documents tab**: See all 50 articles in a visual format
- **Schema tab**: View the data structure
- **Indexes tab**: See database indexes for performance
- **Validation tab**: See schema validation rules

### Step 5: Search and Filter

In the filter bar at the top, you can search:

```javascript
// Find all Politics articles
{
  category: "Politics";
}

// Find featured articles
{
  featured: true;
}

// Find articles by title
{
  title: /Government/;
}

// Find trending articles
{
  trending: true;
}
```

## 🔧 Common Operations in Compass

### View Specific Article

```javascript
{
  slug: "government-announces-new-policy-for-farmers";
}
```

### Count Articles by Category

1. Click on **Aggregations** tab
2. Add stage: `{ $group: { _id: "$category", count: { $sum: 1 } } }`

### Edit an Article

1. Find the article in Documents tab
2. Hover over the document
3. Click the **pencil icon** (edit)
4. Modify fields
5. Click **Update**

### Delete an Article

1. Find the article in Documents tab
2. Hover over the document
3. Click the **trash icon** (delete)
4. Confirm deletion

## 📸 What You'll See

After seeding the database, you should see:

- **Database Name**: `trendhandy`
- **Collection**: `articles`
- **Document Count**: 50 articles
- **Fields per document**:
  - `_id`: Auto-generated MongoDB ID
  - `id`: Article ID (1-50)
  - `title`: Article headline
  - `slug`: URL-friendly title
  - `excerpt`: Short description
  - `content`: Full article HTML
  - `image`: Image URL
  - `category`: Politics, Business, Technology, etc.
  - `author`: Name, avatar, bio
  - `publishedAt`: Date/time
  - `featured`: true/false
  - `trending`: true/false
  - `tags`: Array of keywords
  - `createdAt`: MongoDB timestamp
  - `updatedAt`: MongoDB timestamp

## 🎯 Quick Tips

### 1. Search by Multiple Criteria

```javascript
{
  category: "Technology",
  featured: true,
  trending: true
}
```

### 2. Text Search

```javascript
{
  $text: {
    $search: "AI tools";
  }
}
```

### 3. Date Range

```javascript
{
  publishedAt: {
    $gte: "2025-11-01T00:00:00Z";
  }
}
```

### 4. Sort Results

Click on column headers in the Documents tab to sort

### 5. Export Data

1. Click **Export** button in Documents tab
2. Choose JSON or CSV format
3. Save to file

## 🚀 After Seeding Database

Once you click "Seed Database" button in admin dashboard:

1. Refresh MongoDB Compass (F5)
2. Click on `trendhandy` → `articles`
3. You should see exactly 50 documents
4. Each document represents one news article

## 🔍 Verify Data is Working

### Test 1: Count Documents

In Compass, look at the top - it should show: **50 documents**

### Test 2: Check Categories

Filter by category:

```javascript
{
  category: "Politics";
}
```

Should show ~6 articles

### Test 3: Check Featured

```javascript
{
  featured: true;
}
```

Should show ~15 articles

### Test 4: Check Trending

```javascript
{
  trending: true;
}
```

Should show ~10 articles

## ⚠️ Troubleshooting

### "No database named trendhandy"

- You haven't seeded the database yet
- Go to admin dashboard and click "Seed Database"

### "Connection refused"

- MongoDB service is not running
- For local: Start MongoDB service
- For Atlas: Check internet connection

### "Authentication failed"

- Check username/password in connection string
- For Atlas: Verify database user exists

### "Empty collection"

- Database was created but not seeded
- Click "Seed Database" in admin panel

## 📱 Mobile Access (Optional)

MongoDB Atlas users can also use:

- MongoDB Atlas mobile app (iOS/Android)
- Web interface at cloud.mongodb.com

## 🎨 Interface Overview

```
┌─────────────────────────────────────────┐
│  MongoDB Compass                        │
├─────────────────────────────────────────┤
│ Connections                             │
│  └─ localhost:27017                     │
│     └─ trendhandy                       │
│        └─ articles (50)  ←── Click here │
├─────────────────────────────────────────┤
│ Documents | Schema | Indexes | ...     │
├─────────────────────────────────────────┤
│ Filter: { category: "Politics" }       │
├─────────────────────────────────────────┤
│ Document 1                              │
│ {                                       │
│   _id: ObjectId("..."),                │
│   id: "1",                             │
│   title: "Government Announces...",     │
│   category: "Politics",                 │
│   ...                                   │
│ }                                       │
└─────────────────────────────────────────┘
```

## ✅ What's Changed in Your Website

### Before (Without Admin Visibility Fix):

❌ Login/Dashboard buttons visible on home page
❌ Admin links showing to all users

### After (With Admin Visibility Fix):

✅ Dashboard/Logout buttons only show on `/admin/*` pages
✅ Home page is clean - no admin buttons
✅ Users must go to `/admin` to see login
✅ After login, Dashboard/Logout appear only in admin area

### How to Access Admin:

1. Go to: `http://localhost:3001/admin`
2. You'll be redirected to login page
3. Enter credentials:
   - Email: `rahulrajput81680@gmail.com`
   - Password: `Rahul@00`
4. After login, you'll see the admin dashboard
5. Dashboard/Logout buttons only visible in admin section

### How Users Access:

1. Regular users visit: `http://localhost:3001/`
2. They only see: Home, Categories, Search, Theme toggle
3. No admin buttons visible
4. Clean, professional interface

## 🎉 Summary

**MongoDB Compass allows you to:**

- ✅ Visually browse all 50 articles
- ✅ Search and filter data easily
- ✅ Edit articles directly
- ✅ Delete articles
- ✅ Export data to JSON/CSV
- ✅ Monitor database performance
- ✅ Create indexes
- ✅ Run aggregation queries

**Admin Visibility Fix:**

- ✅ Dashboard/Login/Logout buttons only on `/admin` pages
- ✅ Home page stays clean
- ✅ Professional user experience
- ✅ Secure admin access

Download MongoDB Compass and connect to see your data visually!

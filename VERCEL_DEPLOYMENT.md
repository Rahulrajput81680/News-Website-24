# Vercel Deployment Checklist ✅

## 🚨 CRITICAL: MongoDB Configuration

Your app is not fetching data because **MongoDB is not configured on Vercel**.

### Step 1: Set Up MongoDB Atlas (FREE)

1. **Go to MongoDB Atlas**: https://www.mongodb.com/cloud/atlas/register
2. **Create a FREE account** (no credit card required)
3. **Create a cluster**:

   - Choose AWS
   - Select region closest to you
   - Select M0 (FREE tier)
   - Click "Create Cluster"

4. **Create Database User**:

   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `trendhandy`
   - Password: Create a strong password (save it!)
   - Database User Privileges: "Atlas admin"
   - Click "Add User"

5. **Whitelist IP Address**:

   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

6. **Get Connection String**:

   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string (looks like this):

   ```
   mongodb+srv://trendhandy:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

   - Replace `<password>` with your actual password
   - Add database name at the end: `/trendhandy`

   **Final format:**

   ```
   mongodb+srv://trendhandy:YourPassword123@cluster0.xxxxx.mongodb.net/trendhandy?retryWrites=true&w=majority
   ```

### Step 2: Add to Vercel Environment Variables

1. **Go to your Vercel project**:

   - Visit: https://vercel.com/dashboard
   - Select your `News-Website-24` project

2. **Add Environment Variable**:

   - Go to "Settings" → "Environment Variables"
   - Click "Add New"
   - **Name**: `MONGODB_URI`
   - **Value**: Paste your MongoDB connection string from Step 1
   - **Environment**: Select all (Production, Preview, Development)
   - Click "Save"

3. **Redeploy**:
   - Go to "Deployments"
   - Click the three dots ⋯ on the latest deployment
   - Click "Redeploy"
   - Wait 2-3 minutes

### Step 3: Seed Your Database

After successful deployment:

1. **Login to Admin**: `https://your-site.vercel.app/admin/login`

   - Email: `rahulrajput81680@gmail.com`
   - Password: `Rahul@00`

2. **Create Articles**:
   - Click "Create New Article"
   - Fill in article details
   - Click "Create Article"
   - Repeat to add more articles

## 🔍 Troubleshooting

### Problem: "Failed to connect to MongoDB"

**Solution**:

1. Check MONGODB_URI is added in Vercel
2. Verify connection string format is correct
3. Ensure password doesn't contain special characters (use alphanumeric)
4. Check Network Access allows 0.0.0.0/0 in MongoDB Atlas

### Problem: "No articles showing on homepage"

**Solution**:

1. Database is empty - add articles via admin panel
2. Check Vercel deployment logs for errors
3. Verify MONGODB_URI environment variable is set

### Problem: "Internal Server Error 500"

**Solution**:

1. Check Vercel Function Logs:
   - Go to Vercel Dashboard → Deployments → Click deployment → Functions tab
2. Look for MongoDB connection errors
3. Verify database user has correct permissions in MongoDB Atlas

## 📊 Verify Everything Works

After deployment and MongoDB setup:

✅ Homepage loads without errors
✅ Categories page shows articles
✅ Search functionality works
✅ Admin login works
✅ Can create new articles
✅ Articles appear on frontend

## 🔐 Security (Important!)

### Change Admin Password

1. Update `lib/auth.ts` with new credentials
2. Commit and push to GitHub
3. Vercel will auto-deploy

### Recommended Changes:

- Use environment variables for admin credentials
- Set up proper authentication (NextAuth.js)
- Enable 2FA on MongoDB Atlas
- Use secrets management for sensitive data

## 📝 Environment Variables Summary

Add these to Vercel:

| Variable      | Required | Example                                                  |
| ------------- | -------- | -------------------------------------------------------- |
| `MONGODB_URI` | ✅ Yes   | `mongodb+srv://user:pass@cluster.mongodb.net/trendhandy` |

## 🚀 Local Development

To run locally with MongoDB Atlas:

1. Copy `.env.example` to `.env.local`
2. Update `MONGODB_URI` with your MongoDB Atlas connection string
3. Run `npm run dev`

---

**Need Help?**

- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs

# TrendHandy - Modern News Website

A complete, modern news website built with Next.js 15, TypeScript, MongoDB, and Tailwind CSS. Professional newspaper-style layout with full CRUD functionality and admin dashboard.

![Next.js](https://img.shields.io/badge/Next.js-15.5-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green)

## 🚀 Live Demo

- **GitHub**: [News-Website-24](https://github.com/Rahulrajput81680/News-Website-24)
- **Deploy on Vercel**: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/Rahulrajput81680/News-Website-24)

## ✨ Features

### 🏠 Homepage

- **Hero Section**: Large featured news story banner with image
- **Grid Layout**: Organized news sections (Latest, Politics, Business, Technology, Sports)
- **Sidebar Widgets**: Trending news, weather widget, ad placeholders
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices

### 📰 Article Pages

- **Newspaper-Style Layout**: Classic, professional article presentation
- **Rich Content**: Featured images, author bio, publish dates
- **Social Sharing**: Facebook, Twitter, LinkedIn, Email buttons
- **Related Articles**: Contextual article suggestions
- **Comment Section**: Reader engagement with comment form
- **SEO Optimized**: Meta tags, Open Graph, structured data

### 📂 Category Pages

- **Dynamic Categories**: Politics, Business, Technology, Sports, World, Entertainment, Editorial
- **Featured Articles**: Highlighted top story per category
- **Grid Display**: Clean article grid with pagination
- **Category Navigation**: Easy browsing between topics

### 🎨 Design & UI

- **Light/Dark Mode**: Seamless theme switching with persistence
- **Typography**: Serif headlines + sans-serif body for readability
- **Color Scheme**: Professional white/black/grey with maroon accent
- **Newspaper Aesthetics**: Classic layout with modern touches
- **Sticky Navigation**: Always accessible menu bar

### 👨‍💼 Admin Panel

- **Dashboard**: Overview statistics for articles
- **Article Management**: Create, edit, delete articles
- **Rich Editor**: Text area for content with HTML support
- **Category Selection**: Organize articles by topic
- **Featured/Trending**: Toggle special article status
- **Author Management**: Assign authors with bio

### 🔍 SEO & Performance

- **Sitemap**: Auto-generated XML sitemap
- **Robots.txt**: Proper search engine indexing
- **Meta Tags**: Complete SEO metadata on all pages
- **Static Generation**: Pre-rendered pages for speed
- **Image Optimization**: Next.js Image component
- **Fast Loading**: Optimized build with code splitting

### 📄 Additional Pages

- About Us
- Contact Us (with form)
- Privacy Policy
- Terms of Service
- 404 Not Found page

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository** (or navigate to the project folder)

```bash
cd News-Website
```

2. **Install dependencies**

```bash
npm install
```

3. **Run development server**

```bash
npm run dev
```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🌐 Deploy to Vercel

### Step-by-Step Deployment

1. **Push to GitHub** ✅ (Already done!)

2. **Import to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Click **"Add New Project"**
   - Select **"Import Git Repository"**
   - Choose `News-Website-24` from your GitHub repos

3. **Configure Project**

   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Add Environment Variables** (CRITICAL!)

   Click "Environment Variables" and add:

   | Name          | Value                          |
   | ------------- | ------------------------------ |
   | `MONGODB_URI` | Your MongoDB connection string |

   **For MongoDB Atlas (Recommended):**

   - Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Create a **FREE** cluster
   - Click "Connect" → "Connect your application"
   - Copy the connection string (looks like `mongodb+srv://...`)
   - Replace `<password>` with your database password
   - Use this in Vercel: `mongodb+srv://username:password@cluster.xxxxx.mongodb.net/trendhandy`

5. **Deploy!**
   - Click **"Deploy"**
   - Wait 2-3 minutes for build
   - Your site is live! 🎉

### Post-Deployment

- **Custom Domain**: Add your domain in Vercel dashboard
- **Analytics**: Enable Vercel Analytics for insights
- **Monitor**: Check deployment logs if issues occur

### Troubleshooting Vercel Deployment

**Build fails?**

- Check environment variables are set correctly
- Ensure `MONGODB_URI` is added
- Check build logs in Vercel dashboard

**Database connection errors?**

- Whitelist `0.0.0.0/0` in MongoDB Atlas Network Access
- Verify connection string format
- Check database user permissions

## 📁 Project Structure

```
News-Website/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with header/footer
│   ├── page.tsx             # Homepage
│   ├── globals.css          # Global styles
│   ├── article/[slug]/      # Dynamic article pages
│   ├── category/[slug]/     # Dynamic category pages
│   ├── admin/               # Admin dashboard
│   │   ├── page.tsx        # Article list
│   │   └── create/         # Create article form
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   ├── privacy/            # Privacy policy
│   ├── terms/              # Terms of service
│   ├── sitemap.ts          # Auto-generated sitemap
│   ├── robots.ts           # Robots.txt config
│   └── not-found.tsx       # 404 page
├── components/              # React components
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Site footer
│   ├── HeroSection.tsx     # Featured article banner
│   ├── LatestNews.tsx      # Latest news grid
│   ├── TrendingNews.tsx    # Trending sidebar
│   ├── CategorySection.tsx # Category article lists
│   └── ThemeProvider.tsx   # Dark mode provider
├── lib/                     # Utilities and data
│   ├── data.ts             # Sample articles & categories
│   └── utils.ts            # Helper functions
├── public/                  # Static assets
├── .github/                 # GitHub configuration
│   └── copilot-instructions.md
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── next.config.js           # Next.js configuration
└── package.json             # Dependencies
```

## 🎯 Key Technologies

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **React Icons**: Icon library
- **Next Themes**: Dark mode support

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎨 Color Palette

```css
/* Primary Colors */
--primary: #8B0000 (Maroon)
--primary-dark: #6B0000
--primary-light: #A52A2A

/* Neutrals */
--white: #FFFFFF
--black: #000000
--gray-50: #F9FAFB
--gray-100: #F3F4F6
--gray-900: #111827
```

## 📝 Content Management

### Adding New Articles

1. Navigate to `/admin`
2. Click "Create New Article"
3. Fill in the form:
   - Title
   - Excerpt
   - Category
   - Image URL
   - Content (HTML supported)
   - Author details
   - Tags
   - Featured/Trending status
4. Click "Publish Article"

### Modifying Sample Data

Edit `lib/data.ts` to:

- Add/remove articles
- Modify categories
- Update author information

## 🔧 Configuration

### Environment Variables (Optional)

Create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

### Tailwind Customization

Modify `tailwind.config.ts` to change:

- Colors
- Fonts
- Spacing
- Breakpoints

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Other Platforms

Build the static site:

```bash
npm run build
```

Deploy the `.next` folder to any Node.js hosting.

## 📊 Features Checklist

✅ Homepage with hero section  
✅ Multiple news categories  
✅ Article pages with full content  
✅ Category pages with filtering  
✅ Admin dashboard  
✅ Article creation form  
✅ Light/Dark mode  
✅ Responsive design  
✅ SEO optimization  
✅ Sitemap & robots.txt  
✅ Social sharing  
✅ Comment section  
✅ Related articles  
✅ About/Contact pages  
✅ Privacy/Terms pages  
✅ 404 error page  
✅ Trending sidebar  
✅ Weather widget placeholder  
✅ Ad placeholders

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev)

## 🤝 Contributing

This is a template project. Feel free to:

- Add more features
- Improve styling
- Enhance accessibility
- Optimize performance
- Add backend integration

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 💡 Tips for Customization

1. **Branding**: Update logo, colors, and fonts in components
2. **Content**: Replace sample data in `lib/data.ts`
3. **Images**: Use your own image URLs or local assets
4. **Categories**: Add/remove categories as needed
5. **Backend**: Integrate with CMS like Strapi, Contentful, or Sanity
6. **Database**: Connect to MongoDB, PostgreSQL, or Firebase
7. **Authentication**: Add user login for comments/admin
8. **Analytics**: Integrate Google Analytics or Plausible

## 🐛 Troubleshooting

### Build Errors

```bash
rm -rf .next node_modules
npm install
npm run build
```

### TypeScript Errors

Check `tsconfig.json` and ensure all types are properly defined

### Style Issues

Clear Tailwind cache:

```bash
npm run build
```

## 📞 Support

For issues or questions:

- Check the documentation
- Review error messages carefully
- Ensure all dependencies are installed
- Verify Node.js version (18+)

## 🎉 Acknowledgments

Design inspired by The Hindu newspaper and modern news portals.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**

Enjoy your modern news website! 🚀📰
#   N e w s - W e b s i t e - 2 4 
 
 

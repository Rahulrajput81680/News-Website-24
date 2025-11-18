// Translation system for Hindi and English
export type Language = 'en' | 'hi';

export const translations = {
  en: {
    // Header
    home: 'Home',
    about: 'About',
    contact: 'Contact',
    dashboard: 'Dashboard',
    login: 'Login',
    logout: 'Logout',
    search: 'Search',
    searchPlaceholder: 'Search news...',
    allCategories: 'All Categories',
    
    // Categories
    national: 'National',
    international: 'International',
    politics: 'Politics',
    business: 'Business',
    technology: 'Technology',
    sports: 'Sports',
    entertainment: 'Entertainment',
    health: 'Health',
    science: 'Science',
    education: 'Education',
    environment: 'Environment',
    lifestyle: 'Lifestyle',
    opinion: 'Opinion',
    world: 'World',
    
    // Common
    readMore: 'Read More',
    viewAll: 'View All',
    latestNews: 'Latest News',
    trending: 'Trending',
    trendingNow: 'Trending Now',
    featured: 'Featured',
    breaking: 'Breaking News',
    categories: 'Categories',
    tags: 'Tags',
    author: 'Author',
    publishedOn: 'Published on',
    relatedArticles: 'Related Articles',
    
    // Article Page
    shareArticle: 'Share Article',
    readingTime: 'min read',
    
    // Admin Dashboard
    adminDashboard: 'Admin Dashboard',
    totalArticles: 'Total Articles',
    featuredArticles: 'Featured Articles',
    trendingArticles: 'Trending Articles',
    totalCategories: 'Total Categories',
    createArticle: 'Create Article',
    editArticle: 'Edit Article',
    deleteArticle: 'Delete Article',
    manageArticles: 'Manage Articles',
    articleTitle: 'Article Title',
    excerpt: 'Excerpt',
    content: 'Content',
    category: 'Category',
    image: 'Image',
    video: 'Video',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    
    // Admin Login
    adminLogin: 'Admin Login',
    signIn: 'Sign In',
    signingIn: 'Signing in...',
    emailAddress: 'Email Address',
    password: 'Password',
    invalidCredentials: 'Invalid email or password',
    protectedArea: 'Protected Area - Authorized Access Only',
    
    // Admin Create/Edit
    createNewArticle: 'Create New Article',
    editExistingArticle: 'Edit Article',
    enterTitle: 'Enter article title',
    enterExcerpt: 'Enter a brief excerpt',
    selectCategory: 'Select category',
    imageUrl: 'Image URL',
    enterImageUrl: 'Enter image URL',
    videoUrl: 'Video URL (Optional)',
    enterVideoUrl: 'Enter YouTube video URL',
    articleContent: 'Article Content',
    writeContent: 'Write your article content here...',
    authorName: 'Author Name',
    enterAuthorName: 'Enter author name',
    authorBio: 'Author Bio',
    enterAuthorBio: 'Enter author bio',
    articleTags: 'Tags (comma separated)',
    enterTags: 'Enter tags separated by commas',
    markAsFeatured: 'Mark as Featured',
    markAsTrending: 'Mark as Trending',
    saveArticle: 'Save Article',
    savingArticle: 'Saving...',
    
    // Footer
    quickLinks: 'Quick Links',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    followUs: 'Follow Us',
    aboutUs: 'About Us',
    contactUs: 'Contact Us',
    allRightsReserved: 'All rights reserved',
    
    // Search Page
    searchResults: 'Search Results',
    searchFor: 'Search for',
    noResults: 'No results found',
    tryDifferentKeywords: 'Try different keywords',
    resultsFound: 'results found',
    
    // Category Page
    latestNewsIn: 'Latest news and updates in',
    noArticlesFound: 'No articles found in this category yet.',
    
    // About Page
    aboutTitle: 'About Us',
    aboutDescription: 'Your trusted source for news and information',
    
    // Contact Page
    contactTitle: 'Contact Us',
    contactDescription: 'Get in touch with us',
    yourName: 'Your Name',
    yourEmail: 'Your Email',
    subject: 'Subject',
    message: 'Message',
    sendMessage: 'Send Message',
    
    // Privacy Page
    privacyTitle: 'Privacy Policy',
    
    // Terms Page
    termsTitle: 'Terms of Service',
    
    // 404 Page
    pageNotFound: 'Page Not Found',
    pageNotFoundDescription: 'The page you are looking for does not exist',
    backToHome: 'Back to Home',
    
    // Pagination
    previous: 'Previous',
    next: 'Next',
    page: 'Page',
    of: 'of',
    
    // Time
    today: 'Today',
    yesterday: 'Yesterday',
    daysAgo: 'days ago',
    hoursAgo: 'hours ago',
    minutesAgo: 'minutes ago',
    justNow: 'Just now',
  },
  hi: {
    // Header
    home: 'होम',
    about: 'हमारे बारे में',
    contact: 'संपर्क करें',
    dashboard: 'डैशबोर्ड',
    login: 'लॉगिन',
    logout: 'लॉगआउट',
    search: 'खोजें',
    searchPlaceholder: 'समाचार खोजें...',
    allCategories: 'सभी श्रेणियां',
    
    // Categories
    national: 'राष्ट्रीय',
    international: 'अंतर्राष्ट्रीय',
    politics: 'राजनीति',
    business: 'व्यापार',
    technology: 'तकनीक',
    sports: 'खेल',
    entertainment: 'मनोरंजन',
    health: 'स्वास्थ्य',
    science: 'विज्ञान',
    education: 'शिक्षा',
    environment: 'पर्यावरण',
    lifestyle: 'जीवनशैली',
    opinion: 'राय',
    world: 'विश्व',
    
    // Common
    readMore: 'और पढ़ें',
    viewAll: 'सभी देखें',
    latestNews: 'ताज़ा समाचार',
    trending: 'ट्रेंडिंग',
    trendingNow: 'अभी ट्रेंड में',
    featured: 'फीचर्ड',
    breaking: 'ब्रेकिंग न्यूज़',
    categories: 'श्रेणियां',
    tags: 'टैग',
    author: 'लेखक',
    publishedOn: 'प्रकाशित',
    relatedArticles: 'संबंधित लेख',
    
    // Article Page
    shareArticle: 'लेख साझा करें',
    readingTime: 'मिनट पढ़ें',
    
    // Admin Dashboard
    adminDashboard: 'एडमिन डैशबोर्ड',
    totalArticles: 'कुल लेख',
    featuredArticles: 'फीचर्ड लेख',
    trendingArticles: 'ट्रेंडिंग लेख',
    totalCategories: 'कुल श्रेणियां',
    createArticle: 'लेख बनाएं',
    editArticle: 'लेख संपादित करें',
    deleteArticle: 'लेख हटाएं',
    manageArticles: 'लेख प्रबंधित करें',
    articleTitle: 'लेख का शीर्षक',
    excerpt: 'संक्षिप्त विवरण',
    content: 'सामग्री',
    category: 'श्रेणी',
    image: 'चित्र',
    video: 'वीडियो',
    save: 'सहेजें',
    cancel: 'रद्द करें',
    delete: 'हटाएं',
    edit: 'संपादित करें',
    view: 'देखें',
    
    // Admin Login
    adminLogin: 'एडमिन लॉगिन',
    signIn: 'साइन इन करें',
    signingIn: 'साइन इन हो रहा है...',
    emailAddress: 'ईमेल पता',
    password: 'पासवर्ड',
    invalidCredentials: 'अमान्य ईमेल या पासवर्ड',
    protectedArea: 'संरक्षित क्षेत्र - केवल अधिकृत पहुंच',
    
    // Admin Create/Edit
    createNewArticle: 'नया लेख बनाएं',
    editExistingArticle: 'लेख संपादित करें',
    enterTitle: 'लेख का शीर्षक दर्ज करें',
    enterExcerpt: 'संक्षिप्त विवरण दर्ज करें',
    selectCategory: 'श्रेणी चुनें',
    imageUrl: 'चित्र URL',
    enterImageUrl: 'चित्र URL दर्ज करें',
    videoUrl: 'वीडियो URL (वैकल्पिक)',
    enterVideoUrl: 'YouTube वीडियो URL दर्ज करें',
    articleContent: 'लेख सामग्री',
    writeContent: 'यहां अपनी लेख सामग्री लिखें...',
    authorName: 'लेखक का नाम',
    enterAuthorName: 'लेखक का नाम दर्ज करें',
    authorBio: 'लेखक जीवनी',
    enterAuthorBio: 'लेखक जीवनी दर्ज करें',
    articleTags: 'टैग (अल्पविराम से अलग)',
    enterTags: 'अल्पविराम से अलग टैग दर्ज करें',
    markAsFeatured: 'फीचर्ड के रूप में चिह्नित करें',
    markAsTrending: 'ट्रेंडिंग के रूप में चिह्नित करें',
    saveArticle: 'लेख सहेजें',
    savingArticle: 'सहेजा जा रहा है...',
    
    // Footer
    quickLinks: 'त्वरित लिंक',
    privacyPolicy: 'गोपनीयता नीति',
    termsOfService: 'सेवा की शर्तें',
    followUs: 'हमें फॉलो करें',
    aboutUs: 'हमारे बारे में',
    contactUs: 'संपर्क करें',
    allRightsReserved: 'सर्वाधिकार सुरक्षित',
    
    // Search Page
    searchResults: 'खोज परिणाम',
    searchFor: 'के लिए खोजें',
    noResults: 'कोई परिणाम नहीं मिला',
    tryDifferentKeywords: 'विभिन्न कीवर्ड का प्रयास करें',
    resultsFound: 'परिणाम मिले',
    
    // Category Page
    latestNewsIn: 'में नवीनतम समाचार और अपडेट',
    noArticlesFound: 'इस श्रेणी में अभी तक कोई लेख नहीं मिला।',
    
    // About Page
    aboutTitle: 'हमारे बारे में',
    aboutDescription: 'समाचार और जानकारी के लिए आपका विश्वसनीय स्रोत',
    
    // Contact Page
    contactTitle: 'संपर्क करें',
    contactDescription: 'हमसे संपर्क करें',
    yourName: 'आपका नाम',
    yourEmail: 'आपका ईमेल',
    subject: 'विषय',
    message: 'संदेश',
    sendMessage: 'संदेश भेजें',
    
    // Privacy Page
    privacyTitle: 'गोपनीयता नीति',
    
    // Terms Page
    termsTitle: 'सेवा की शर्तें',
    
    // 404 Page
    pageNotFound: 'पृष्ठ नहीं मिला',
    pageNotFoundDescription: 'आप जो पृष्ठ खोज रहे हैं वह मौजूद नहीं है',
    backToHome: 'होम पर वापस जाएं',
    
    // Pagination
    previous: 'पिछला',
    next: 'अगला',
    page: 'पृष्ठ',
    of: 'का',
    
    // Time
    today: 'आज',
    yesterday: 'कल',
    daysAgo: 'दिन पहले',
    hoursAgo: 'घंटे पहले',
    minutesAgo: 'मिनट पहले',
    justNow: 'अभी-अभी',
  }
};

// Language utility functions
export function getCurrentLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  const saved = localStorage.getItem('language');
  return (saved === 'hi' ? 'hi' : 'en') as Language;
}

export function setLanguage(lang: Language): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('language', lang);
}

export function toggleLanguage(): Language {
  const current = getCurrentLanguage();
  const newLang = current === 'en' ? 'hi' : 'en';
  setLanguage(newLang);
  return newLang;
}

export function translate(key: string, lang?: Language): string {
  const currentLang = lang || getCurrentLanguage();
  const keys = key.split('.');
  let value: any = translations[currentLang];
  
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }
  
  return typeof value === 'string' ? value : key;
}

// Translate category name
export function translateCategory(categoryName: string, lang?: Language): string {
  const currentLang = lang || getCurrentLanguage();
  const key = categoryName.toLowerCase().replace(/\s+/g, '');
  const trans: any = translations[currentLang];
  return trans[key] || categoryName;
}

// React hook for translations
export function useTranslation() {
  const getCurrentLanguage = (): Language => {
    if (typeof window === 'undefined') return 'en';
    const saved = localStorage.getItem('language');
    return (saved === 'hi' ? 'hi' : 'en') as Language;
  };

  return {
    t: (key: string) => translate(key),
    language: getCurrentLanguage(),
  };
}

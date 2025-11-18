"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { fetchArticles, fetchCategories, deleteArticle as deleteArticleAPI } from "@/lib/api";
import { allCategories as fallbackCategories } from "@/lib/types";
import { isAuthenticated } from "@/lib/auth";
import type { Article } from "@/lib/types";

export default function AdminPage() {
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [mounted, setMounted] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState(fallbackCategories);
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      // Check authentication
      if (!isAuthenticated()) {
        router.push("/admin/login");
        return;
      }

      // Load articles from API
      let fetchedArticles = await fetchArticles();
      setArticleList(fetchedArticles);

      // Load categories from API
      const fetchedCategories = await fetchCategories();
      if (fetchedCategories.length > 0) {
        const categoriesData = fetchedCategories.map(name => {
          const existing = fallbackCategories.find(c => c.name.toLowerCase() === name.toLowerCase());
          return existing || {
            name,
            slug: name.toLowerCase().replace(/\s+/g, '-'),
            icon: '📰',
            description: `Latest ${name} news`
          };
        });
        setCategories(categoriesData);
        // Expand all categories by default
        setExpandedCategories(categoriesData.map(cat => cat.slug));
      } else {
        setExpandedCategories(fallbackCategories.map(cat => cat.slug));
      }
      
      setMounted(true);
    }
    
    loadData();
  }, [router]);

  const filteredArticles = articleList.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group articles by category
  const articlesByCategory = categories.map(category => {
    const categoryArticles = filteredArticles.filter(
      article => article.category.toLowerCase() === category.name.toLowerCase()
    );
    return {
      ...category,
      articles: categoryArticles,
      count: categoryArticles.length
    };
  });

  const handleDelete = async (slug: string) => {
    if (confirm("Are you sure you want to delete this article?")) {
      const success = await deleteArticleAPI(slug);
      if (success) {
        setArticleList(prev => prev.filter(a => a.slug !== slug));
      } else {
        alert("Failed to delete article. Please try again.");
      }
    }
  };



  const toggleCategory = (slug: string) => {
    setExpandedCategories(prev =>
      prev.includes(slug)
        ? prev.filter(s => s !== slug)
        : [...prev, slug]
    );
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="bg-white dark:bg-background min-h-screen">
      <div className="bg-[#dc143c] text-white py-8">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold font-serif mb-2">
            Admin Dashboard
          </h1>
          <p className="text-lg opacity-90">
            Manage your news articles
          </p>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {articleList.length}
            </div>
            <div className="text-sm font-semibold text-blue-900 dark:text-blue-200">Total Articles</div>
          </div>
          <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {articleList.filter(a => a.featured).length}
            </div>
            <div className="text-sm font-semibold text-green-900 dark:text-green-200">Featured</div>
          </div>
          <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {articleList.filter(a => a.trending).length}
            </div>
            <div className="text-sm font-semibold text-purple-900 dark:text-purple-200">Trending</div>
          </div>
          <div className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              {categories.length}
            </div>
            <div className="text-sm font-semibold text-orange-900 dark:text-orange-200">Categories</div>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-96 px-4 py-2 border border-gray-200 dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-background-card"
          />
          <div className="flex gap-3">
            <Link
              href="/admin/create"
              className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold"
            >
              <FiPlus /> Create New Article
            </Link>
          </div>
        </div>

        {/* Articles by Category */}
        <div className="space-y-6">
          {articlesByCategory.map((category) => (
            <div key={category.slug} className="bg-white dark:bg-background-card rounded-lg shadow overflow-hidden">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.slug)}
                className="w-full px-6 py-4 flex items-center justify-between bg-white dark:bg-background-card hover:bg-white dark:bg-background-card transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <h2 className="text-xl font-bold">{category.name}</h2>
                  <span className="px-3 py-1 bg-primary/10 text-primary dark:bg-primary/20 rounded-full text-sm font-semibold">
                    {category.count} {category.count === 1 ? 'article' : 'articles'}
                  </span>
                </div>
                {expandedCategories.includes(category.slug) ? (
                  <FiChevronUp className="w-5 h-5" />
                ) : (
                  <FiChevronDown className="w-5 h-5" />
                )}
              </button>

              {/* Category Articles */}
              {expandedCategories.includes(category.slug) && (
                <div className="overflow-x-auto">
                  {category.articles.length > 0 ? (
                    <table className="w-full">
                      <thead className="bg-white dark:bg-background-card">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-text-secondary uppercase tracking-wider">
                            Title
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-text-secondary uppercase tracking-wider">
                            Author
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-text-secondary uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-text-secondary uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 dark:text-text-secondary uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {category.articles.map((article) => (
                          <tr key={article.id} className="hover:bg-background-card/50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="font-semibold text-black dark:text-text-primary line-clamp-1">
                                {article.title}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-text-secondary">
                              {article.author.name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-text-secondary">
                              {new Date(article.publishedAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-1">
                                {article.featured && (
                                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-xs rounded">
                                    Featured
                                  </span>
                                )}
                                {article.trending && (
                                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs rounded">
                                    Trending
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex justify-end gap-2">
                                <Link
                                  href={`/article/${article.slug}`}
                                  className="p-2 hover:bg-white dark:bg-background-card rounded transition-colors"
                                  title="View"
                                >
                                  <FiEye className="w-4 h-4" />
                                </Link>
                                <Link
                                  href={`/admin/edit/${article.id}`}
                                  className="p-2 hover:bg-white dark:bg-background-card rounded transition-colors"
                                  title="Edit"
                                >
                                  <FiEdit2 className="w-4 h-4" />
                                </Link>
                                <button
                                  onClick={() => handleDelete(article.slug)}
                                  className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 rounded transition-colors"
                                  title="Delete"
                                >
                                  <FiTrash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-center py-8 text-gray-600 dark:text-text-secondary">
                      No articles in this category yet.
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && searchTerm && (
          <div className="text-center py-12 text-gray-600 dark:text-text-secondary">
            No articles found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}

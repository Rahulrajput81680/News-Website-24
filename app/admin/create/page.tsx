"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiSave, FiX } from "react-icons/fi";
import { allCategories } from "@/lib/types";
import { createArticle } from "@/lib/api";
import { isAuthenticated } from "@/lib/auth";
import type { Article } from "@/lib/types";

export default function CreateArticlePage() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/admin/login");
    }
  }, [router]);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "National",
    image: "",
    videoUrl: "",
    content: "",
    authorName: "",
    authorBio: "",
    tags: "",
    featured: false,
    trending: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newArticle = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: `<div class="article-content"><p>${formData.content.replace(/\n/g, '</p><p>')}</p></div>`,
        image: formData.image || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=500&fit=crop",
        videoUrl: formData.videoUrl || undefined,
        category: formData.category,
        author: {
          name: formData.authorName || "TrendHandy Staff",
          avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
          bio: formData.authorBio || "Professional journalist at TrendHandy",
        },
        publishedAt: new Date().toISOString(),
        featured: formData.featured,
        trending: formData.trending,
        tags: formData.tags.split(",").map(tag => tag.trim()).filter(Boolean),
      };

      const result = await createArticle(newArticle);
      
      if (result) {
        alert("Article created successfully!");
        router.push("/admin");
        router.refresh();
      } else {
        alert("Failed to create article. Please try again.");
      }
    } catch (error) {
      console.error("Error creating article:", error);
      alert("An error occurred while creating the article.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="bg-white dark:bg-background min-h-screen">
      <div className="bg-primary text-white py-8">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold font-serif mb-2">
            Create New Article
          </h1>
          <p className="text-lg opacity-90">
            Fill in the details to publish a new article
          </p>
        </div>
      </div>

      <div className="container-custom py-8">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-background-card rounded-lg shadow p-6 md:p-8">
            {/* Title */}
            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-semibold mb-2">
                Article Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-background-card text-lg font-semibold"
                placeholder="Enter article title"
              />
            </div>

            {/* Excerpt */}
            <div className="mb-6">
              <label htmlFor="excerpt" className="block text-sm font-semibold mb-2">
                Excerpt *
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                required
                rows={3}
                value={formData.excerpt}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-background-card"
                placeholder="Brief summary of the article"
              />
            </div>

            {/* Category and Image URL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="category" className="block text-sm font-semibold mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-background-card"
                >
                  {allCategories.map((cat) => (
                    <option key={cat.slug} value={cat.name}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-semibold mb-2">
                  Featured Image URL *
                </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  required
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-background-card"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            {/* Video URL */}
            <div className="mb-6">
              <label htmlFor="videoUrl" className="block text-sm font-semibold mb-2">
                Video URL (Optional - YouTube, Vimeo, etc.)
              </label>
              <input
                type="url"
                id="videoUrl"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-background-card"
                placeholder="https://www.youtube.com/watch?v=..."
              />
              <p className="text-xs text-gray-600 dark:text-text-secondary mt-2">
                Add a YouTube or other video URL to embed in the article
              </p>
            </div>

            {/* Content */}
            <div className="mb-6">
              <label htmlFor="content" className="block text-sm font-semibold mb-2">
                Article Content *
              </label>
              <textarea
                id="content"
                name="content"
                required
                rows={15}
                value={formData.content}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-background-card font-mono text-sm"
                placeholder="Write your article content here. You can use HTML tags for formatting."
              />
              <p className="text-xs text-gray-600 dark:text-text-secondary mt-2">
                Tip: You can use HTML tags like &lt;p&gt;, &lt;h2&gt;, &lt;h3&gt; for formatting
              </p>
            </div>

            {/* Author Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="authorName" className="block text-sm font-semibold mb-2">
                  Author Name *
                </label>
                <input
                  type="text"
                  id="authorName"
                  name="authorName"
                  required
                  value={formData.authorName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-background-card"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="authorBio" className="block text-sm font-semibold mb-2">
                  Author Bio *
                </label>
                <input
                  type="text"
                  id="authorBio"
                  name="authorBio"
                  required
                  value={formData.authorBio}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-background-card"
                  placeholder="Senior Correspondent"
                />
              </div>
            </div>

            {/* Tags */}
            <div className="mb-6">
              <label htmlFor="tags" className="block text-sm font-semibold mb-2">
                Tags (comma-separated) *
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                required
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-background-card"
                placeholder="politics, government, policy"
              />
            </div>

            {/* Checkboxes */}
            <div className="flex gap-6 mb-8">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-5 h-5 text-primary border-gray-200 dark:border-border rounded focus:ring-primary mr-2"
                />
                <span className="text-sm font-semibold">Mark as Featured</span>
              </label>

              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="trending"
                  checked={formData.trending}
                  onChange={handleChange}
                  className="w-5 h-5 text-primary border-gray-200 dark:border-border rounded focus:ring-primary mr-2"
                />
                <span className="text-sm font-semibold">Mark as Trending</span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiSave /> {isSubmitting ? "Creating..." : "Publish Article"}
              </button>
              <button
                type="button"
                onClick={() => router.push("/admin")}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-background-card text-gray-600 dark:text-text-secondary rounded-lg hover:bg-white dark:bg-background-card transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiX /> Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

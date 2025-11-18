"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiFacebook, FiTwitter, FiLinkedin, FiMail, FiClock } from "react-icons/fi";
import { fetchArticleBySlug, fetchArticles } from "@/lib/api";
import type { Article } from "@/lib/types";

interface Comment {
  id: string;
  name: string;
  email: string;
  text: string;
  timestamp: string;
  avatar: string;
}

export default function ArticleClientPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [mounted, setMounted] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentForm, setCommentForm] = useState({ name: '', email: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadArticle() {
      // Fetch article from API
      let foundArticle = await fetchArticleBySlug(slug);
      
      setArticle(foundArticle || null);
      
      if (foundArticle) {
        // Fetch all articles for related articles
        let allArticles = await fetchArticles();
        
        const related = allArticles
          .filter(a => a.category === foundArticle.category && a.id !== foundArticle.id)
          .slice(0, 3);
        setRelatedArticles(related);
        
        // Load comments from localStorage
        const storedComments = localStorage.getItem(`comments-${slug}`);
        if (storedComments) {
          setComments(JSON.parse(storedComments));
        } else {
          // Add a default comment
          setComments([{
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            text: 'Great article! Very informative and well-written. Looking forward to more updates on this topic.',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            avatar: 'https://i.pravatar.cc/150?img=30'
          }]);
        }
      }
      
      setMounted(true);
    }
    
    loadArticle();
  }, [slug]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentForm.name || !commentForm.email || !commentForm.text) {
      alert('Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);
    
    const newComment: Comment = {
      id: Date.now().toString(),
      name: commentForm.name,
      email: commentForm.email,
      text: commentForm.text,
      timestamp: new Date().toISOString(),
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
    };
    
    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    
    // Save to localStorage
    localStorage.setItem(`comments-${slug}`, JSON.stringify(updatedComments));
    
    // Reset form
    setCommentForm({ name: '', email: '', text: '' });
    setIsSubmitting(false);
    
    alert('Comment posted successfully!');
  };
  
  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const commentTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - commentTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  if (!mounted) {
    return (
      <div className="bg-white dark:bg-background min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!article) {
    notFound();
  }

  const shareUrl = `https://thehindu.com/article/${article.slug}`;

  return (
    <div className="bg-white dark:bg-background">
      <article className="container-custom py-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6 text-gray-600 dark:text-text-secondary">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/category/${article.category.toLowerCase()}`} className="hover:text-primary">
            {article.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-black dark:text-text-primary">{article.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Category Badge */}
            <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-semibold uppercase mb-4 rounded">
              {article.category}
            </span>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-bold font-serif mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 dark:text-text-secondary mb-6 leading-relaxed font-serif italic border-l-4 border-primary pl-4">
              {article.excerpt}
            </p>

            {/* Author & Date */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200 dark:border-border">
              <div className="flex items-center">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold text-black dark:text-text-primary">
                    {article.author.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-text-secondary">
                    {article.author.bio}
                  </p>
                </div>
              </div>
              <div className="flex items-center text-gray-600 dark:text-text-secondary text-sm">
                <FiClock className="mr-2" />
                {new Date(article.publishedAt).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Video Section */}
            {article.videoUrl && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold font-serif mb-4">Watch Video</h3>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-white dark:bg-background-card">
                  {(() => {
                    // Extract YouTube video ID
                    if (article.videoUrl.includes('youtube.com') || article.videoUrl.includes('youtu.be')) {
                      let videoId = '';
                      if (article.videoUrl.includes('youtube.com/watch?v=')) {
                        videoId = article.videoUrl.split('watch?v=')[1]?.split('&')[0] || '';
                      } else if (article.videoUrl.includes('youtu.be/')) {
                        videoId = article.videoUrl.split('youtu.be/')[1]?.split('?')[0] || '';
                      } else if (article.videoUrl.includes('youtube.com/embed/')) {
                        videoId = article.videoUrl.split('embed/')[1]?.split('?')[0] || '';
                      } else if (article.videoUrl.includes('youtube.com/shorts/')) {
                        videoId = article.videoUrl.split('shorts/')[1]?.split('?')[0] || '';
                      }
                      
                      if (!videoId) return null;
                      
                      return (
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
                          title="YouTube video player"
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          loading="lazy"
                        />
                      );
                    }
                    // Extract Vimeo video ID
                    else if (article.videoUrl.includes('vimeo.com')) {
                      const videoId = article.videoUrl.split('vimeo.com/')[1]?.split('/')[0]?.split('?')[0] || '';
                      if (!videoId) return null;
                      
                      return (
                        <iframe
                          src={`https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0`}
                          title="Vimeo video player"
                          className="w-full h-full border-0"
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                        />
                      );
                    }
                    // Direct video file
                    else {
                      return (
                        <video
                          src={article.videoUrl}
                          controls
                          className="w-full h-full"
                          preload="metadata"
                        >
                          Your browser does not support the video tag.
                        </video>
                      );
                    }
                  })()}
                </div>
              </div>
            )}

            {/* Article Content */}
            <div 
              className="prose prose-lg dark:prose-invert max-w-none mb-8 text-black dark:text-white"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-text-secondary mb-3">TAGS</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white dark:bg-background-card text-sm rounded-full hover:bg-white dark:bg-background-card transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share Buttons */}
            <div className="mb-12 p-6 bg-white dark:bg-background-card rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Share this article</h3>
              <div className="flex gap-3 flex-wrap">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FiFacebook /> Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${article.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                >
                  <FiTwitter /> Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                  <FiLinkedin /> LinkedIn
                </a>
                <a
                  href={`mailto:?subject=${article.title}&body=${shareUrl}`}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-background-card text-white rounded-lg hover:bg-white dark:bg-background-card transition-colors"
                >
                  <FiMail /> Email
                </a>
              </div>
            </div>

            {/* Comment Section */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold font-serif mb-6">Comments</h3>
              
              {/* Comment Form */}
              <div className="mb-8 p-6 bg-white dark:bg-background-card rounded-lg">
                <h4 className="font-semibold mb-4">Leave a Comment</h4>
                <form onSubmit={handleCommentSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={commentForm.name}
                      onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                      required
                      className="px-4 py-2 border border-gray-200 dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-background-card"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={commentForm.email}
                      onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })}
                      required
                      className="px-4 py-2 border border-gray-200 dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-background-card"
                    />
                  </div>
                  <textarea
                    rows={4}
                    placeholder="Your Comment"
                    value={commentForm.text}
                    onChange={(e) => setCommentForm({ ...commentForm, text: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-200 dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-background-card"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Posting...' : 'Post Comment'}
                  </button>
                </form>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.length === 0 ? (
                  <p className="text-gray-600 dark:text-text-secondary text-center py-8">
                    No comments yet. Be the first to comment!
                  </p>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="p-4 border border-gray-200 dark:border-border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <Image
                          src={comment.avatar}
                          alt={comment.name}
                          width={40}
                          height={40}
                          className="rounded-full mr-3"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold">{comment.name}</p>
                            <span className="text-xs text-gray-600 dark:text-text-secondary">
                              {getTimeAgo(comment.timestamp)}
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-text-secondary">
                            {comment.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Author Bio */}
            <div className="mb-8 p-6 bg-white dark:bg-background-card rounded-lg">
              <h3 className="text-lg font-bold font-serif mb-4">About the Author</h3>
              <div className="flex items-start mb-4">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  width={60}
                  height={60}
                  className="rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold mb-1">{article.author.name}</p>
                  <p className="text-sm text-gray-600 dark:text-text-secondary">
                    {article.author.bio}
                  </p>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="mb-8 p-6 bg-white dark:bg-background-card rounded-lg">
                <h3 className="text-lg font-bold font-serif mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {relatedArticles.map((related) => (
                    <Link key={related.id} href={`/article/${related.slug}`}>
                      <div className="group cursor-pointer">
                        <div className="relative h-32 mb-2 overflow-hidden rounded-lg">
                          <Image
                            src={related.image}
                            alt={related.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="font-semibold group-hover:text-primary transition-colors line-clamp-2 text-sm">
                          {related.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-text-secondary mt-1">
                          {new Date(related.publishedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Advertisement */}
            <div className="p-6 bg-white dark:bg-background-card rounded-lg">
              <h3 className="text-sm font-bold mb-4 font-serif">Advertisement</h3>
              <div className="h-64 bg-white dark:bg-background-card flex items-center justify-center text-gray-600 dark:text-text-secondary">
                Ad Placeholder
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

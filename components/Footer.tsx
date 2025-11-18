"use client";

import { useState } from "react";
import Link from "next/link";
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMail } from "react-icons/fi";
import { categories } from "@/lib/types";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    
    setIsSubscribing(true);
    
    // Simulate subscription
    setTimeout(() => {
      alert(`Thank you for subscribing! Newsletter will be sent to ${email}`);
      setEmail('');
      setIsSubscribing(false);
    }, 500);
  };

  return (
    <footer className="bg-black dark:bg-black text-gray-400 dark:text-text-secondary pt-12 pb-6">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-white text-xl font-bold font-serif mb-4">Trendhandy</h3>
            <p className="text-sm leading-relaxed mb-4">
              Your trusted source for breaking news, in-depth analysis, and comprehensive coverage of events that matter.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="YouTube">
                <FiYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              {categories.slice(0, 6).map((category) => (
                <li key={category.slug}>
                  <Link href={`/category/${category.slug}`} className="hover:text-white transition-colors">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Newsletter</h4>
            <p className="text-sm mb-4">Subscribe to get the latest news delivered to your inbox.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-3 py-2 bg-white dark:bg-background-card border border-gray-200 dark:border-border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <button 
                type="submit"
                disabled={isSubscribing}
                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-r-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiMail className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-200 dark:border-border text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Trendhandy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

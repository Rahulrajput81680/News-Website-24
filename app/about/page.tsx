import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us - Trendhandy",
  description: "Learn about Trendhandy - your trusted source for breaking news and in-depth journalism.",
};

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-background min-h-screen">
      <div className="bg-primary text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-3">
            About Trendhandy
          </h1>
          <p className="text-lg opacity-90">
            Your trusted source for credible journalism
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2>Our Mission</h2>
            <p>
              Trendhandy is committed to providing readers with accurate, unbiased, and comprehensive news coverage. 
              We are dedicated to upholding the highest standards of journalism, serving as 
              a beacon of truth and integrity in the media landscape.
            </p>

            <h2>Our History</h2>
            <p>
              Trendhandy has grown into one of the most respected 
              news platforms. Throughout our journey, we have remained committed to our core values: independence, 
              credibility, and fairness in reporting.
            </p>

            <h2>Editorial Values</h2>
            <ul>
              <li>
                <strong>Independence:</strong> We maintain editorial independence, free from political or commercial influence.
              </li>
              <li>
                <strong>Accuracy:</strong> Every story is thoroughly fact-checked and verified before publication.
              </li>
              <li>
                <strong>Fairness:</strong> We present multiple perspectives and give voice to all sides of a story.
              </li>
              <li>
                <strong>Public Interest:</strong> We prioritize stories that matter to our readers and society at large.
              </li>
            </ul>

            <h2>Our Coverage</h2>
            <p>
              From politics and business to technology and sports, Trendhandy provides comprehensive coverage across 
              all major categories. Our team of experienced journalists and correspondents work around the clock to 
              bring you the latest news from around the world.
            </p>

            <h2>Contact Information</h2>
            <p>
              For editorial inquiries, please visit our <Link href="/contact" className="text-primary hover:underline">Contact page</Link>.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white dark:bg-background-card rounded-lg">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-gray-600 dark:text-text-secondary">News Coverage</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-background-card rounded-lg">
              <div className="text-4xl font-bold text-primary mb-2">50M+</div>
              <div className="text-gray-600 dark:text-text-secondary">Monthly Readers</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-background-card rounded-lg">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-600 dark:text-text-secondary">Journalists</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Contact Us - Trendhandy",
  description: "Get in touch with Trendhandy newsroom. We'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <div className="bg-white dark:bg-background min-h-screen">
      <div className="bg-primary text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-3">
            Contact Us
          </h1>
          <p className="text-lg opacity-90">
            We&apos;d love to hear from you
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold font-serif mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 border border-gray-200 dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-background-card"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 border border-gray-200 dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-background-card"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    className="w-full px-4 py-3 border border-gray-200 dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-background-card"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-gray-200 dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-background-card"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold font-serif mb-6">Get in Touch</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="p-3 bg-primary/10 rounded-lg mr-4">
                    <FiMapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-gray-600 dark:text-text-secondary">
                      Trendhandy Media Centre<br />
                      Digital News Plaza<br />
                      123 Media Street<br />
                      New Delhi - 110001, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-3 bg-primary/10 rounded-lg mr-4">
                    <FiPhone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-gray-600 dark:text-text-secondary">
                      +91-11-12345678
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-3 bg-primary/10 rounded-lg mr-4">
                    <FiMail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-600 dark:text-text-secondary">
                      editorial@trendhandy.com<br />
                      letters@thehindu.co.in
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white dark:bg-background-card rounded-lg">
                <h3 className="font-semibold mb-3">Editorial Department</h3>
                <p className="text-sm text-gray-600 dark:text-text-secondary mb-4">
                  For news tips, story ideas, or editorial inquiries, please contact our newsroom directly.
                </p>
                <h3 className="font-semibold mb-3">Advertising</h3>
                <p className="text-sm text-gray-600 dark:text-text-secondary">
                  For advertising inquiries, please email: ads@thehindu.co.in
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Trendhandy",
  description: "Read our privacy policy to understand how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-white dark:bg-background min-h-screen">
      <div className="bg-primary text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-3">
            Privacy Policy
          </h1>
          <p className="text-lg opacity-90">
            Last updated: November 17, 2025
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
          <h2>Introduction</h2>
          <p>
            Trendhandy (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains 
            how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>

          <h2>Information We Collect</h2>
          <h3>Personal Information</h3>
          <p>
            We may collect personal information that you voluntarily provide to us when you:
          </p>
          <ul>
            <li>Subscribe to our newsletter</li>
            <li>Create an account</li>
            <li>Post comments on articles</li>
            <li>Contact us through forms</li>
            <li>Participate in surveys or contests</li>
          </ul>

          <h3>Automatically Collected Information</h3>
          <p>
            When you visit our website, we automatically collect certain information about your device, including:
          </p>
          <ul>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Referring URLs</li>
            <li>Pages viewed and time spent on pages</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our services</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, and features</li>
            <li>Communicate with you for customer service and updates</li>
            <li>Send you newsletters and marketing communications (with your consent)</li>
            <li>Prevent fraud and ensure security</li>
          </ul>

          <h2>Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our website and store certain 
            information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            We may employ third-party companies and individuals to facilitate our services, provide services on our 
            behalf, or assist us in analyzing how our service is used. These third parties have access to your 
            personal information only to perform specific tasks on our behalf.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your personal 
            information. However, no method of transmission over the internet is 100% secure, and we cannot 
            guarantee absolute security.
          </p>

          <h2>Your Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul>
            <li>The right to access your personal information</li>
            <li>The right to correct inaccurate information</li>
            <li>The right to request deletion of your information</li>
            <li>The right to object to processing of your information</li>
            <li>The right to data portability</li>
          </ul>

          <h2>Children&apos;s Privacy</h2>
          <p>
            Our service is not intended for children under 13 years of age. We do not knowingly collect personal 
            information from children under 13.
          </p>

          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the 
            new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at:
          </p>
          <ul>
            <li>Email: privacy@trendhandy.com</li>
            <li>Phone: +91-11-12345678</li>
            <li>Address: Trendhandy Media Centre, New Delhi - 110001, India</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

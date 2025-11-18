import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Trendhandy",
  description: "Read our terms of service to understand the rules and regulations for using our website.",
};

export default function TermsPage() {
  return (
    <div className="bg-white dark:bg-background min-h-screen">
      <div className="bg-primary text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-3">
            Terms of Service
          </h1>
          <p className="text-lg opacity-90">
            Last updated: November 17, 2025
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
          <h2>Agreement to Terms</h2>
          <p>
            By accessing and using Trendhandy website, you accept and agree to be bound by the terms and provisions 
            of this agreement. If you do not agree to these terms, please do not use our website.
          </p>

          <h2>Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials on Trendhandy&apos;s website for 
            personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
          </p>
          <p>Under this license, you may not:</p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>Attempt to decompile or reverse engineer any software on the website</li>
            <li>Remove any copyright or proprietary notations from the materials</li>
            <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server</li>
          </ul>

          <h2>Intellectual Property Rights</h2>
          <p>
            All content published on this website, including but not limited to text, graphics, logos, images, 
            audio clips, and software, is the property of Trendhandy or its content suppliers and is protected by 
            international copyright laws.
          </p>

          <h2>User Comments and Content</h2>
          <p>
            Users may post comments, reviews, and other content on our website. By posting content, you grant 
            Trendhandy a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, 
            and publish such content.
          </p>
          <p>
            You agree not to post content that:
          </p>
          <ul>
            <li>Is defamatory, obscene, or offensive</li>
            <li>Violates any party&apos;s intellectual property rights</li>
            <li>Contains viruses or malicious code</li>
            <li>Promotes illegal activities</li>
            <li>Violates any applicable laws or regulations</li>
          </ul>

          <h2>Disclaimer</h2>
          <p>
            The materials on Trendhandy&apos;s website are provided on an &apos;as is&apos; basis. Trendhandy makes no warranties, 
            expressed or implied, and hereby disclaims all other warranties including, without limitation, implied 
            warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement.
          </p>

          <h2>Limitations</h2>
          <p>
            In no event shall Trendhandy or its suppliers be liable for any damages (including, without limitation, 
            damages for loss of data or profit, or due to business interruption) arising out of the use or inability 
            to use the materials on Trendhandy&apos;s website.
          </p>

          <h2>Accuracy of Materials</h2>
          <p>
            While we strive for accuracy, the materials appearing on Trendhandy&apos;s website could include technical, 
            typographical, or photographic errors. We do not warrant that any of the materials on our website are 
            accurate, complete, or current.
          </p>

          <h2>Links to Third-Party Sites</h2>
          <p>
            Trendhandy has not reviewed all of the sites linked to our website and is not responsible for the 
            contents of any such linked site. The inclusion of any link does not imply endorsement by Trendhandy.
          </p>

          <h2>Modifications</h2>
          <p>
            Trendhandy may revise these terms of service at any time without notice. By using this website, you are 
            agreeing to be bound by the then-current version of these terms of service.
          </p>

          <h2>Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of India, and you 
            irrevocably submit to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu.
          </p>

          <h2>Account Termination</h2>
          <p>
            We reserve the right to terminate or suspend your account and access to our website immediately, 
            without prior notice or liability, for any reason whatsoever, including without limitation if you 
            breach the Terms.
          </p>

          <h2>Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <ul>
            <li>Email: legal@trendhandy.com</li>
            <li>Phone: +91-11-12345678</li>
            <li>Address: Trendhandy Media Centre, New Delhi - 110001, India</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

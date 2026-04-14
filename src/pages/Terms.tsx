import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

const sections = [
  { id: "terms", label: "Terms of Service" },
  { id: "privacy", label: "Privacy Policy" },
  { id: "billing", label: "Billing & Refunds" },
  { id: "ai", label: "AI Disclaimer" },
];

const Terms = () => {
  const [active, setActive] = useState("terms");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-20 max-w-5xl mx-auto px-6 lg:px-12">
        <h1 className="font-display text-3xl md:text-4xl font-extrabold text-ink mb-2">
          Terms & Conditions
        </h1>
        <p className="text-muted-foreground text-sm mb-8">
          Please review the following policies carefully before using WishlyAI.
        </p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-border pb-4">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                active === s.id
                  ? "bg-orange text-primary-foreground shadow-wishly-orange"
                  : "bg-secondary text-mid hover:bg-accent"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <article className="prose prose-sm max-w-none text-foreground [&_h2]:font-display [&_h2]:text-ink [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-ink [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:text-mid [&_p]:leading-relaxed [&_li]:text-mid [&_li]:leading-relaxed">
          {active === "terms" && <TermsContent />}
          {active === "privacy" && <PrivacyContent />}
          {active === "billing" && <BillingContent />}
          {active === "ai" && <AIContent />}
        </article>
      </main>

      <Footer />
    </div>
  );
};

const TermsContent = () => (
  <>
    <h2>Global Terms of Service</h2>
    <p className="text-xs text-muted-foreground">Last Updated: 28/01/2026</p>
    <p>These Global Terms of Service ("Terms") govern your access to and use of Wishly AI (the "Service"), a product offered under the brand AI Plus Labs.</p>
    <p>The Service is legally operated by TekCube LLC, a United States limited liability company, doing business as AI Plus Labs ("Company", "we", "us", or "our").</p>
    <p>By accessing or using the Service, creating an account, or purchasing a subscription, you agree to be bound by these Terms. If you do not agree, do not use the Service.</p>

    <h3>1. Eligibility</h3>
    <p>You must be at least 18 years old (or the age of majority in your jurisdiction) to use the Service. By using the Service, you represent and warrant that you meet this requirement and have the legal capacity to enter into these Terms.</p>

    <h3>2. Account Registration and Security</h3>
    <p>To access certain features, you may be required to create an account. You agree to provide accurate and complete information and to keep your account credentials secure. You are responsible for all activities that occur under your account.</p>

    <h3>3. Subscriptions, Billing, and Payments</h3>
    <p>The Service may be offered through paid subscription plans. Subscriptions are billed in advance on a recurring basis (monthly or annually, as selected). By purchasing a subscription, you authorize us (or our third-party payment processors) to charge your selected payment method. Fees are exclusive of applicable taxes unless stated otherwise. We reserve the right to change pricing with reasonable notice.</p>

    <h3>4. Cancellation and Refunds</h3>
    <p>You may cancel your subscription at any time through your account settings. Cancellation will take effect at the end of the current billing period. Except where required by law or expressly stated in our Billing & Refund Policy, payments are non-refundable.</p>

    <h3>5. Acceptable Use</h3>
    <p>You agree not to use the Service to:</p>
    <ul>
      <li>Violate any applicable law or regulation</li>
      <li>Infringe the rights of others</li>
      <li>Generate content that is unlawful, deceptive, defamatory, abusive, or misleading</li>
      <li>Impersonate any person or entity</li>
      <li>Reverse engineer, interfere with, or disrupt the Service</li>
    </ul>
    <p>We reserve the right to suspend or terminate access for violations of this section.</p>

    <h3>6. AI-Generated Content</h3>
    <p>The Service uses artificial intelligence to generate images, text, or other content. You acknowledge and agree that:</p>
    <ul>
      <li>Outputs are generated automatically and may be inaccurate or incomplete</li>
      <li>We do not guarantee accuracy, originality, or suitability for any purpose</li>
      <li>You are solely responsible for reviewing and using any generated content</li>
    </ul>

    <h3>7. Intellectual Property</h3>
    <p>The Service, including software, models, design, and underlying technology, is owned by the Company or its licensors. Subject to your compliance with these Terms, you are granted a limited, non-exclusive, revocable license to access and use the Service.</p>

    <h3>8. Third-Party Services</h3>
    <p>The Service may integrate with or rely on third-party services. We are not responsible for third-party products, services, or content, and your use of them is governed by their respective terms.</p>

    <h3>9. Termination</h3>
    <p>We may suspend or terminate your access to the Service at any time if you violate these Terms or if we discontinue the Service. Upon termination, your right to use the Service will immediately cease.</p>

    <h3>10. Disclaimer of Warranties</h3>
    <p>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>

    <h3>11. Limitation of Liability</h3>
    <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE COMPANY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE.</p>

    <h3>12. Indemnification</h3>
    <p>You agree to indemnify and hold harmless the Company from any claims, damages, liabilities, and expenses arising out of your use of the Service or violation of these Terms.</p>

    <h3>13. Governing Law and Dispute Resolution</h3>
    <p>These Terms are governed by the laws of the State of New Jersey, without regard to conflict of laws principles. Any dispute arising out of or relating to these Terms shall be resolved through binding arbitration on an individual basis, and you waive any right to participate in a class action.</p>

    <h3>14. Changes to These Terms</h3>
    <p>We may update these Terms from time to time. Continued use of the Service after changes become effective constitutes acceptance of the updated Terms.</p>

    <h3>15. Contact Information</h3>
    <p>For questions about these Terms, you may contact us at:<br />Email: <a href="mailto:wishlyai@aipluslabs.com" className="text-orange hover:underline">wishlyai@aipluslabs.com</a></p>
  </>
);

const PrivacyContent = () => (
  <>
    <h2>Global Privacy Policy</h2>
    <p className="text-xs text-muted-foreground">Last Updated: 28/01/2026</p>
    <p>This Global Privacy Policy ("Privacy Policy") explains how AI Plus Labs collects, uses, discloses, and protects personal information when you access or use Wishly AI (the "Service").</p>
    <p>AI Plus Labs is a brand operated by TekCube LLC, a United States limited liability company ("Company", "we", "us", or "our"). This Privacy Policy applies to users worldwide.</p>
    <p>By using the Service, you acknowledge that you have read and understood this Privacy Policy.</p>

    <h3>1. Information We Collect</h3>
    <p><strong>a. Information You Provide</strong></p>
    <ul>
      <li>Name, email address, and account credentials</li>
      <li>Billing-related information (processed by third-party payment providers)</li>
      <li>Communications sent to us (support requests, feedback)</li>
    </ul>
    <p><strong>b. Information Collected Automatically</strong></p>
    <ul>
      <li>Usage data (features used, actions taken)</li>
      <li>Device and browser information</li>
      <li>Log files, IP address, and timestamps</li>
    </ul>
    <p><strong>c. User-Generated Content</strong></p>
    <ul>
      <li>Prompts, inputs, and content submitted to the Service</li>
      <li>AI-generated outputs associated with your account</li>
    </ul>

    <h3>2. How We Use Information</h3>
    <p>We use personal information to:</p>
    <ul>
      <li>Provide, operate, and improve the Service</li>
      <li>Process subscriptions and payments</li>
      <li>Communicate with you about the Service</li>
    </ul>

    <h3>3. Legal Bases for Processing (Where Applicable)</h3>
    <p>Depending on your location, we process personal information based on:</p>
    <ul>
      <li>Your consent</li>
      <li>Performance of a contract</li>
      <li>Compliance with legal obligations</li>
      <li>Our legitimate business interests</li>
    </ul>

    <h3>4. Data Sharing and Disclosure</h3>
    <p>We may share information with:</p>
    <ul>
      <li>Service providers (hosting, analytics, customer support, payments)</li>
      <li>Professional advisors (legal, accounting)</li>
      <li>Authorities if required by law or to protect rights and safety</li>
    </ul>
    <p>We do not sell personal information.</p>

    <h3>5. International Data Transfers</h3>
    <p>The Service is operated from the United States. If you access the Service from outside the United States, your information may be transferred to, stored, and processed in the United States or other countries where our service providers operate. By using the Service, you consent to such transfers.</p>

    <h3>6. Data Retention</h3>
    <p>We retain personal information for as long as necessary to provide the Service, comply with legal obligations, resolve disputes, and enforce our agreements.</p>

    <h3>7. Data Security</h3>
    <p>We implement reasonable administrative, technical, and organizational measures designed to protect personal information. However, no method of transmission over the internet or electronic storage is 100% secure.</p>

    <h3>8. Your Rights and Choices</h3>
    <p>Depending on your jurisdiction, you may have rights to:</p>
    <ul>
      <li>Access, correct, or delete personal information</li>
      <li>Withdraw consent where processing is based on consent</li>
      <li>Opt out of marketing communications</li>
    </ul>
    <p>You may exercise these rights by contacting us at the email address below.</p>

    <h3>9. Children's Privacy</h3>
    <p>The Service is not intended for individuals under the age of 18. We do not knowingly collect personal information from children.</p>

    <h3>10. Third-Party Links and Services</h3>
    <p>The Service may contain links to third-party websites or services. We are not responsible for the privacy practices of those third parties.</p>

    <h3>11. Changes to This Privacy Policy</h3>
    <p>We may update this Privacy Policy from time to time. Changes will be effective when posted. Continued use of the Service after changes become effective constitutes acceptance of the updated Privacy Policy.</p>

    <h3>12. Contact Information</h3>
    <p>If you have questions or requests regarding this Privacy Policy, please contact us at:<br />Email: <a href="mailto:wishlyai@aipluslabs.com" className="text-orange hover:underline">wishlyai@aipluslabs.com</a></p>
  </>
);

const BillingContent = () => (
  <>
    <h2>Billing & Refunds</h2>
    <p className="text-xs text-muted-foreground">Last Updated: 28/01/2026</p>
    <p>This Billing & Refund Policy explains how subscriptions, payments, cancellations, and refunds work for Wishly AI, a product offered under the brand AI Plus Labs.</p>
    <p>Wishly AI is legally operated by TekCube LLC, a United States limited liability company, doing business as AI Plus Labs ("we", "us", or "our").</p>
    <p>By purchasing a subscription or making a payment, you agree to this Billing & Refund Policy in addition to our Terms of Service.</p>

    <h3>1. Subscription Plans</h3>
    <p>We offer multiple subscription tiers (e.g., Basic, Pro, Premium). Each plan includes specific features and usage limits as described on our pricing page. Plans are subject to change, and we will notify users of any significant changes.</p>

    <h3>2. Billing Cycle</h3>
    <p>Subscriptions are billed on a recurring basis, either monthly or annually, depending on the plan you select. Your billing cycle starts on the date of your first payment.</p>

    <h3>3. Payment Methods</h3>
    <p>We accept major credit cards, debit cards, and other payment methods as displayed at checkout. All payments are processed by third-party payment providers (e.g., Stripe, PayPal). We do not store your full payment details.</p>

    <h3>4. Auto-Renewal</h3>
    <p>All subscriptions automatically renew at the end of each billing cycle unless cancelled. You authorize us to charge your payment method for the renewal amount.</p>

    <h3>5. Cancellation</h3>
    <ul>
      <li>You may cancel your subscription at any time from your account settings.</li>
      <li>Cancellation takes effect at the end of the current billing period.</li>
      <li>You will retain access to subscription features until the end of the period.</li>
      <li>No partial refunds are issued for unused time within a billing period.</li>
    </ul>

    <h3>6. Refund Policy</h3>
    <p><strong>General Rule:</strong> Payments are non-refundable.</p>
    <p><strong>Exceptions:</strong></p>
    <ul>
      <li>If you were charged in error (e.g., duplicate billing), you may request a refund within 7 days of the charge.</li>
      <li>If required by applicable law (e.g., consumer protection laws in certain jurisdictions), refunds will be handled in accordance with those laws.</li>
    </ul>
    <p>To request a refund, please contact us at <a href="mailto:wishlyai@aipluslabs.com" className="text-orange hover:underline">wishlyai@aipluslabs.com</a> with your account email and transaction details.</p>

    <h3>7. Failed Payments</h3>
    <p>If a payment fails, we may attempt to charge your payment method again. If payment cannot be collected, your access to the Service may be suspended or downgraded.</p>

    <h3>8. Pricing Changes</h3>
    <p>We reserve the right to change subscription pricing. If you are an existing subscriber, we will provide at least 30 days' notice before any price increase takes effect. You may cancel before the new pricing applies.</p>

    <h3>9. Chargebacks</h3>
    <p>If you initiate a chargeback or dispute without contacting us first, we reserve the right to suspend your account. We encourage you to contact our support team before disputing any charge.</p>

    <h3>10. Contact Us</h3>
    <p>For billing inquiries, please contact:<br />Email: <a href="mailto:wishlyai@aipluslabs.com" className="text-orange hover:underline">wishlyai@aipluslabs.com</a></p>
  </>
);

const AIContent = () => (
  <>
    <h2>AI Disclaimer</h2>
    <p className="text-xs text-muted-foreground">Last Updated: 28/01/2026</p>
    <p>This AI Disclaimer explains the nature, limitations, and risks associated with the use of AI-generated content provided by Wishly AI, a product offered under the brand AI Plus Labs.</p>
    <p>Wishly AI is legally operated by TekCube LLC, a United States limited liability company, doing business as AI Plus Labs ("we", "us", or "our").</p>
    <p>By using the Service, you acknowledge and agree to this AI Disclaimer.</p>

    <h3>1. Use of Artificial Intelligence</h3>
    <p>Wishly AI uses generative artificial intelligence (AI) models to create images, text, and other content based on user prompts and inputs. These models are trained on large datasets and produce outputs automatically without human review.</p>

    <h3>2. No Guarantee of Accuracy or Suitability</h3>
    <p>AI-generated content may be:</p>
    <ul>
      <li>Inaccurate, incomplete, or misleading</li>
      <li>Inconsistent across different prompts</li>
      <li>Unsuitable for specific purposes</li>
    </ul>
    <p>We do not guarantee the accuracy, reliability, or appropriateness of any AI-generated content.</p>

    <h3>3. Content Review</h3>
    <p>You are solely responsible for reviewing, editing, and verifying any AI-generated content before using it. We recommend human oversight for all outputs, especially for professional, legal, medical, financial, or public-facing use cases.</p>

    <h3>4. Not Professional Advice</h3>
    <p>AI-generated content does not constitute legal, financial, medical, or professional advice. You should consult qualified professionals before making decisions based on any content generated through the Service.</p>

    <h3>5. Intellectual Property Considerations</h3>
    <p>While you may use the outputs generated through your use of the Service, AI-generated content may resemble existing works. You are responsible for ensuring that your use of outputs does not infringe third-party rights, including copyrights and trademarks.</p>

    <h3>6. Model Changes</h3>
    <p>The AI models used in the Service may be updated, replaced, or modified at any time. This may affect the style, quality, or consistency of generated outputs. We do not guarantee continuity or backward compatibility.</p>

    <h3>7. Limitation of Liability</h3>
    <p>TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL LIABILITY FOR ANY DAMAGES OR LOSSES ARISING FROM YOUR USE OF OR RELIANCE ON AI-GENERATED CONTENT, INCLUDING BUT NOT LIMITED TO DIRECT, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES.</p>

    <h3>8. Contact Us</h3>
    <p>For questions or concerns about AI-generated content or this disclaimer, please contact us at:<br />Email: <a href="mailto:wishlyai@aipluslabs.com" className="text-orange hover:underline">wishlyai@aipluslabs.com</a></p>
  </>
);

export default Terms;

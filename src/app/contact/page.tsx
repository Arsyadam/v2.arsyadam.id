import { Metadata } from "next";
import PageShell from "../components/PageShell";
import PageSection from "../components/PageSection";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Arsyad Ali Mahardika for AI projects, collaborations, and opportunities.",
};

const faqItems = [
  {
    question: "What services do you offer?",
    answer:
      "I specialize in AI engineering, machine learning, and software development — from smart mobility systems to enterprise automation and data-driven products.",
  },
  {
    question: "What is your typical response time?",
    answer:
      "I strive to respond to all inquiries within 24–48 hours. For urgent matters, please indicate so in your message subject.",
  },
  {
    question: "Do you take on international clients?",
    answer:
      "Yes, I work with clients globally and can accommodate different time zones for meetings and project discussions.",
  },
  {
    question: "How can we start working together?",
    answer:
      "Send a message through this contact form with details about your project, and I'll get back to you to discuss next steps.",
  },
];

export default function ContactPage() {
  return (
    <PageShell>
      <PageSection
        badge="Contact"
        title="Get in Touch"
        description="Have a question or want to collaborate? Reach out through the form below or connect with me on social media."
      >
        <ContactContent />
      </PageSection>

      <PageSection
        badge="FAQ"
        title="Frequently Asked Questions"
        className="bg-white/75"
      >
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {faqItems.map((item) => (
            <div
              key={item.question}
              className="rounded-xl border border-black/5 bg-white p-5"
              style={{
                boxShadow:
                  "0px 4px 6px -2px rgba(0,0,0,0.04), 0px 8px 12px -4px rgba(0,0,0,0.06)",
              }}
            >
              <h3 className="mb-2 text-[16px] font-medium text-neutral-800">
                {item.question}
              </h3>
              <p className="text-[14px] leading-relaxed text-neutral-500">{item.answer}</p>
            </div>
          ))}
        </div>
      </PageSection>
    </PageShell>
  );
}

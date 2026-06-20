"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Linkedin,
  Twitter,
  Github,
  Loader2,
} from "lucide-react";

const inputClassName =
  "w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none transition-colors focus:border-red-400 focus:ring-2 focus:ring-red-100";

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setSubmitError("There was an error submitting your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
  <div className="w-full">
    <div className="grid w-full gap-6 lg:grid-cols-2 lg:gap-8">
      <div className="rounded-2xl border border-neutral-200 bg-white/90 p-6 shadow-button-secondary md:p-8">
        <h2 className="mb-6 text-[20px] font-medium text-neutral-800">Contact Information</h2>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
              <Mail className="size-4" />
            </span>
            <div>
              <h3 className="text-[14px] font-medium text-neutral-800">Email</h3>
              <Link
                href="mailto:work@arsyadam.id"
                className="text-[14px] text-neutral-500 transition-colors hover:text-red-600"
              >
                work@arsyadam.id
              </Link>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
              <Phone className="size-4" />
            </span>
            <div>
              <h3 className="text-[14px] font-medium text-neutral-800">Phone</h3>
              <Link
                href="tel:+6282245676151"
                className="text-[14px] text-neutral-500 transition-colors hover:text-red-600"
              >
                +62 822 4567 7161
              </Link>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
              <MapPin className="size-4" />
            </span>
            <div>
              <h3 className="text-[14px] font-medium text-neutral-800">Location</h3>
              <p className="text-[14px] text-neutral-500">Malang, East Java, Indonesia</p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="mb-4 text-[14px] font-medium text-neutral-800">Connect on Social Media</h3>
          <div className="flex gap-3">
            {[
              { href: "https://linkedin.com/in/arsyadam", icon: Linkedin, label: "LinkedIn" },
              { href: "https://twitter.com/arsyadam", icon: Twitter, label: "Twitter" },
              { href: "https://github.com/arsyadam", icon: Github, label: "GitHub" },
            ].map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-10 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-600 shadow-button-secondary transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <Icon className="size-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white/90 p-6 shadow-button-secondary md:p-8">
        <h2 className="mb-6 text-[20px] font-medium text-neutral-800">Send Me a Message</h2>

        {submitSuccess ? (
          <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-6 text-center">
            <h3 className="mb-2 text-[16px] font-medium text-green-800">
              Message Sent Successfully!
            </h3>
            <p className="mb-4 text-[14px] text-green-700">
              Thank you for reaching out. I&apos;ll get back to you as soon as possible.
            </p>
            <button
              type="button"
              onClick={() => setSubmitSuccess(false)}
              className="inline-flex h-9 items-center rounded-[12px] bg-green-700 px-4 text-[14px] font-medium text-white transition-colors hover:bg-green-800"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {(["name", "email", "subject"] as const).map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="mb-1.5 block text-[13px] font-medium text-neutral-700"
                >
                  {field === "name"
                    ? "Your Name"
                    : field === "email"
                      ? "Email Address"
                      : "Subject"}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className={inputClassName}
                />
              </div>
            ))}

            <div>
              <label htmlFor="message" className="mb-1.5 block text-[13px] font-medium text-neutral-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className={inputClassName}
              />
            </div>

            {submitError && <p className="text-[13px] text-red-600">{submitError}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-[12px] bg-gradient-to-t from-neutral-900 to-neutral-600 text-[14px] font-medium text-white shadow-button transition-[filter,opacity] hover:from-neutral-950 hover:to-neutral-700 disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>

    <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 shadow-button-secondary">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126438.28618013024!2d112.54938065622335!3d-7.978637204758963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd62822063dc2fb%3A0x78879446481a4da2!2sMalang%2C%20Malang%20City%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1742722169793!5m2!1sen!2sid"
        width="100%"
        height="360"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Malang location map"
      />
    </div>
  </div>
  );
}

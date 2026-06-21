import { buildCvEmailHtml } from "../lib/cv-email-template";

export const metadata = {
  title: "CV Email Preview",
  robots: { index: false, follow: false },
};

export default function CvEmailPreviewPage() {
  const cvUrl =
    process.env.CV_GDOCS_URL ||
    "https://docs.google.com/document/d/example-cv-link/edit?usp=sharing";

  const html = buildCvEmailHtml({
    cvUrl,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://arsyadam.id",
  });

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#ffffff",
        backgroundImage: "radial-gradient(circle, #e5e5e5 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      <div className="border-b border-neutral-200 bg-white/90 px-4 py-3 backdrop-blur-sm">
        <p className="text-center text-sm text-neutral-500">
          CV email preview — matches landing page styling.
        </p>
      </div>
      <iframe
        title="CV email preview"
        srcDoc={html}
        className="mx-auto block min-h-[calc(100vh-49px)] w-full max-w-[600px] border-0 bg-transparent"
        sandbox="allow-same-origin"
      />
    </div>
  );
}

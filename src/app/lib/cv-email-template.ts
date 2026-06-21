type SocialLink = {
  label: string;
  href: string;
};

type CvEmailTemplateProps = {
  cvUrl: string;
  siteUrl?: string;
  socialLinks?: SocialLink[];
};

const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  { label: "LinkedIn", href: "https://linkedin.com/in/arsyadam" },
  { label: "GitHub", href: "https://github.com/arsyadam" },
  { label: "Twitter", href: "https://twitter.com/arsyadam" },
  { label: "Instagram", href: "https://instagram.com/arsyadam" },
];

const SPECIALTIES = [
  { label: "Machine Learning", color: "#9333ea", bg: "#faf5ff" },
  { label: "Smart Cities", color: "#2563eb", bg: "#eff6ff" },
  { label: "ITS", color: "#dc2626", bg: "#fef2f2" },
];

function renderSpecialtyPills(): string {
  return SPECIALTIES.map(
    (item) =>
      `<span style="display:inline-block;margin:0 6px 6px 0;padding:6px 10px;border:1px solid #e5e5e5;border-radius:8px;background-color:#ffffff;font-size:12px;font-weight:500;line-height:1;color:#262626;box-shadow:0 1px 2px rgba(0,0,0,0.04);">
        <span style="display:inline-block;width:6px;height:6px;margin-right:6px;border-radius:9999px;background-color:${item.color};vertical-align:middle;"></span>${item.label}
      </span>`
  ).join("");
}

function renderSocialPills(links: SocialLink[]): string {
  return links
    .map(
      (link) =>
        `<a href="${link.href}" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin:0 8px 8px 0;padding:8px 14px;border:1px solid #e5e5e5;border-radius:8px;background-color:#ffffff;font-size:13px;font-weight:500;line-height:1;color:#171717;text-decoration:none;box-shadow:0 1px 2px rgba(0,0,0,0.04);">${link.label}</a>`
    )
    .join("");
}

export function buildCvEmailHtml({
  cvUrl,
  siteUrl = "https://arsyadam.id",
  socialLinks = DEFAULT_SOCIAL_LINKS,
}: CvEmailTemplateProps): string {
  const siteHost = siteUrl.replace(/^https?:\/\//, "");
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CV — Arsyad Ali Mahardika</title>
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@600&display=swap" rel="stylesheet" />
  <!--<![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#ffffff;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#ffffff;background-image:radial-gradient(circle,#e5e5e5 1px,transparent 1px);background-size:20px 20px;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background-color:#ffffff;border:1px solid #e5e5e5;border-radius:16px;overflow:hidden;box-shadow:0 1px 2px rgba(0,0,0,0.05),0 1px 3px rgba(0,0,0,0.1);">
          <!-- Hero block -->
          <tr>
            <td style="padding:32px 32px 28px;background-color:#ffffff;background-image:radial-gradient(circle,#e5e5e5 1px,transparent 1px);background-size:20px 20px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <h1 style="margin:0 0 8px;font-family:'Fraunces',Georgia,'Times New Roman',serif;font-size:32px;font-weight:600;line-height:1.1;letter-spacing:-0.02em;color:#171717;">Arsyad Ali Mahardika</h1>
                    <p style="margin:0 0 18px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:15px;font-weight:500;line-height:1.5;letter-spacing:-0.01em;color:#737373;">Machine Learning &amp; Intelligent Transport Systems</p>
                    <div>${renderSpecialtyPills()}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:0 32px 28px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
              <p style="margin:0 0 16px;font-size:15px;line-height:1.65;letter-spacing:-0.005em;color:#404040;">Hi,</p>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.65;letter-spacing:-0.005em;color:#404040;">
                Thanks for stopping by. Here&rsquo;s my CV on Google Docs &mdash; view it online or save a copy from there.
              </p>

              <!-- CTA — matches ButtonLink -->
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 20px;">
                <tr>
                  <td style="border-radius:10px;background:linear-gradient(to top,#171717,#525252);box-shadow:0 1px 2px rgba(0,0,0,0.05),0 1px 3px rgba(0,0,0,0.1);">
                    <a href="${cvUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:10px 16px;font-size:13px;font-weight:500;line-height:1;letter-spacing:-0.005em;color:#ffffff;text-decoration:none;">Open CV &rarr;</a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 28px;font-size:13px;line-height:1.5;color:#737373;">
                Or copy: <a href="${cvUrl}" style="color:#dc2626;text-decoration:underline;word-break:break-all;">${cvUrl}</a>
              </p>

              <p style="margin:0 0 12px;font-size:13px;font-weight:500;line-height:1.5;letter-spacing:-0.005em;color:#525252;">Connect</p>
              <div style="margin:0 0 24px;line-height:0;font-size:0;">
                ${renderSocialPills(socialLinks)}
                <a href="${siteUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin:0 8px 8px 0;padding:8px 14px;border:1px solid #e5e5e5;border-radius:8px;background-color:#ffffff;font-size:13px;font-weight:500;line-height:1;color:#171717;text-decoration:none;box-shadow:0 1px 2px rgba(0,0,0,0.04);">${siteHost}</a>
              </div>

              <p style="margin:0;font-size:15px;line-height:1.65;color:#404040;">
                Cheers,<br />
                <span style="color:#171717;font-weight:500;">Arsyad</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px 24px;border-top:1px solid #e5e5e5;background-color:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
              <p style="margin:0 0 8px;font-size:15px;font-weight:600;letter-spacing:-0.01em;color:#262626;">Arsyad Ali Mahardika</p>
              <p style="margin:0;font-size:12px;line-height:1.5;letter-spacing:-0.005em;color:#737373;">
                &copy; ${year} &middot; Sent because you requested my CV from ${siteHost}.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildCvEmailSubject(): string {
  return "CV — Arsyad Ali Mahardika";
}

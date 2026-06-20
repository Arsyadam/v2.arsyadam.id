export function linkLabel(href: string): string {
  try {
    const url = new URL(href);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "drive.google.com") return "drive.google.com";
    if (host.includes("linkedin.com")) return "linkedin.com";

    return host;
  } catch {
    return "Visit";
  }
}

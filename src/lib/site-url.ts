export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();

  if (configuredUrl) {
    try {
      return new URL(configuredUrl);
    } catch {
      // Use the deployment URL when the configured value is malformed.
    }
  }

  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  return new URL(vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000");
}

export const SITE_NAME = "B.KOKOSZEWSKI";
export const SITE_TITLE = "B.KOKOSZEWSKI — Loud Work, Clean Code";
export const SITE_DESCRIPTION =
  "A fullstack dev who ships fast, sweats details, and builds systems that bite back.";

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

export function absoluteUrl(pathname: string) {
  return new URL(pathname, getSiteUrl()).toString();
}

export function localeName(locale: string) {
  return locale === "pl" ? "pl_PL" : "en_US";
}

export function localizedPath(locale: string, path: string) {
  if (locale === "en") {
    return path;
  }

  return `/${locale}${path}`;
}

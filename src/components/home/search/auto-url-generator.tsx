const SHORT_DOMAIN = "shor.ty";
const SHORT_CODE_CHARS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function normalizeUrlInput(input: string): string {
  return input.trim().replace(/^https?:\/\//i, "");
}

export function generateShortCode(source: string, length = 5): string {
  const normalized = normalizeUrlInput(source);

  if (!normalized) {
    return "-----";
  }

  let hash = 0;

  for (let index = 0; index < normalized.length; index += 1) {
    hash = (hash << 5) - hash + normalized.charCodeAt(index);
    hash |= 0;
  }

  let code = "";
  let rollingHash = Math.abs(hash);

  for (let index = 0; index < length; index += 1) {
    code += SHORT_CODE_CHARS[rollingHash % SHORT_CODE_CHARS.length];
    rollingHash = Math.floor(rollingHash / SHORT_CODE_CHARS.length);
    rollingHash += normalized.charCodeAt(index % normalized.length);
  }

  return code;
}

export function sanitizeCustomSlug(input: string): string {
  return input
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(new RegExp(`^${SHORT_DOMAIN}/?`, "i"), "")
    .replace(/[^a-zA-Z0-9-_/]/g, "")
    .replace(/^\/+|\/+$/g, "");
}

export function buildShortUrl(source: string, customSlug?: string): string {
  const slug = sanitizeCustomSlug(customSlug ?? "") || generateShortCode(source);
  return `${SHORT_DOMAIN}/${slug}`;
}

export function formatShortenLabel(source: string, customSlug?: string): string {
  const normalized = normalizeUrlInput(source);

  if (!normalized) {
    return "Shorten: —";
  }

  return `Shorten: ${buildShortUrl(normalized, customSlug)}`;
}

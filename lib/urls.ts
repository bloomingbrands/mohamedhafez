const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${BASE}${clean}`;
}

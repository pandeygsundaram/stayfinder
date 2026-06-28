import type { NextRequest } from "next/server";

// Helper to build a Next.js-compatible Request cast to NextRequest.
// Route handlers only use req.json() and req.url — NextRequest-specific
// fields (cookies, nextUrl) are not needed in tests since auth is mocked.
export function makeRequest(
  url: string,
  options?: RequestInit & { json?: unknown }
): NextRequest {
  const init: RequestInit = { ...options };
  if (options?.json !== undefined) {
    init.body = JSON.stringify(options.json);
    init.headers = { "Content-Type": "application/json", ...(options.headers ?? {}) };
  }
  return new Request(`http://localhost${url}`, init) as unknown as NextRequest;
}

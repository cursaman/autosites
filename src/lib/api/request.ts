import "server-only";

export async function readJsonObject(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (!contentType.includes("application/json") || contentLength > 32_768) return null;
  try {
    const body: unknown = await request.json();
    return body && typeof body === "object" && !Array.isArray(body) ? body as Record<string, unknown> : null;
  } catch {
    return null;
  }
}

export const textField = (body: Record<string, unknown>, key: string, max: number) =>
  typeof body[key] === "string" ? body[key].trim().slice(0, max) : "";

export const apiError = (message: string, status = 400) => Response.json({ error: message }, { status });

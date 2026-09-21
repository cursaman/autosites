import "dotenv/config";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import OpenAI from "openai";

const port = Number(process.env.PORT || 3000);
const publicDirectory = join(process.cwd(), "public");
const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
};

async function parseJson(request) {
  let body = "";
  for await (const chunk of request) body += chunk;
  return JSON.parse(body || "{}");
}

async function answerWithAi(request, response) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error(".env 파일에 OPENAI_API_KEY를 설정해 주세요.");
    }

    const { message } = await parseJson(request);
    if (typeof message !== "string" || !message.trim()) {
      response.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
      response.end(JSON.stringify({ error: "질문을 입력해 주세요." }));
      return;
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const result = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5-mini",
      instructions: "초보자가 이해하기 쉬운 한국어로 짧고 친절하게 답하세요.",
      input: message.trim(),
    });

    response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({ answer: result.output_text }));
  } catch (error) {
    console.error(error);
    response.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({ error: error instanceof Error ? error.message : "요청 처리에 실패했습니다." }));
  }
}

async function serveFile(request, response) {
  const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;
  const relativePath = pathname === "/" ? "index.html" : pathname.slice(1);

  if (relativePath.includes("..")) {
    response.writeHead(400);
    response.end("잘못된 요청입니다.");
    return;
  }

  try {
    const file = await readFile(join(publicDirectory, relativePath));
    response.writeHead(200, { "Content-Type": contentTypes[extname(relativePath)] || "application/octet-stream" });
    response.end(file);
  } catch {
    response.writeHead(404);
    response.end("파일을 찾을 수 없습니다.");
  }
}

createServer(async (request, response) => {
  if (request.method === "POST" && request.url === "/api/ask") {
    await answerWithAi(request, response);
    return;
  }

  await serveFile(request, response);
}).listen(port, () => {
  console.log(`AI API 샘플 실행 중: http://localhost:${port}`);
});

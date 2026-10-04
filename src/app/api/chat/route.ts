import { createOpenAI } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import { assistantPrompt } from "@/lib/assistant-prompt";

export const maxDuration = 30;

const windowMs = 10 * 60 * 1000;
const maxHits = 20;
const hits = new Map<string, number[]>();

function clientAddress(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function allowed(address: string) {
  const now = Date.now();
  const recent = (hits.get(address) ?? []).filter((time) => now - time < windowMs);
  if (recent.length >= maxHits) {
    hits.set(address, recent);
    return false;
  }
  recent.push(now);
  hits.set(address, recent);
  return true;
}

function readMessages(value: unknown): UIMessage[] | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > 16) return null;

  const messages: UIMessage[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") return null;
    const role = "role" in item ? item.role : undefined;
    if (role !== "user" && role !== "assistant") return null;
    const parts = "parts" in item ? item.parts : undefined;
    if (!Array.isArray(parts)) return null;

    const text = parts
      .filter(
        (part): part is { type: "text"; text: string } =>
          !!part &&
          typeof part === "object" &&
          "type" in part &&
          part.type === "text" &&
          "text" in part &&
          typeof part.text === "string",
      )
      .map((part) => part.text)
      .join("")
      .trim();

    if (text.length === 0 || text.length > 1000) return null;
    const id = "id" in item && typeof item.id === "string" ? item.id : crypto.randomUUID();
    messages.push({ id, role, parts: [{ type: "text", text }] });
  }

  const last = messages.at(-1);
  if (!last || last.role !== "user") return null;
  return messages;
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Assistant indisponible." }, { status: 503 });
  }
  if (!allowed(clientAddress(request))) {
    return Response.json({ error: "Trop de questions. Réessayez dans quelques minutes." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Message illisible." }, { status: 400 });
  }

  const record = body && typeof body === "object" ? body : null;
  const messages = readMessages(record && "messages" in record ? record.messages : undefined);
  if (!messages) {
    return Response.json({ error: "Message refusé." }, { status: 400 });
  }

  const locale = record && "locale" in record && record.locale === "en" ? "en" : "fr";
  const openai = createOpenAI({ apiKey });
  const result = streamText({
    model: openai("gpt-5.4-mini"),
    system: assistantPrompt(locale),
    messages: await convertToModelMessages(messages),
    abortSignal: request.signal,
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      onError: () => "Réponse indisponible.",
    }),
  });
}

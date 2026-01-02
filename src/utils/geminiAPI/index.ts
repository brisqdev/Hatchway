// deno-lint-ignore-file no-explicit-any
import { serve } from "https://deno.land/std@0.203.0/http/server.ts";

// --- Configuration ---
const KEY_ENV = Deno.env.get("API_KEYS") || "";
const API_KEYS: string[] = KEY_ENV.startsWith("[")
  ? JSON.parse(KEY_ENV)
  : KEY_ENV.split(",").map(k => k.trim()).filter(k => k);

const DEFAULT_BASE = "https://generativelanguage.googleapis.com/v1beta2";
const API_BASE_URL = Deno.env.get("GEMINI_API_BASE_URL") || DEFAULT_BASE;

const ACCESS_TOKEN = Deno.env.get("ACCESS_TOKEN");

let currentKeyIndex = 0;
interface KeyState { exhaustedUntil?: number; }
const keyStates: KeyState[] = API_KEYS.map(() => ({}));

function getNextKeyIndex(): number | null {
  const now = Date.now();
  for (let i = 0; i < API_KEYS.length; i++) {
    const idx = (currentKeyIndex + i) % API_KEYS.length;
    const state = keyStates[idx];
    if (!state.exhaustedUntil || state.exhaustedUntil < now) {
      currentKeyIndex = (idx + 1) % API_KEYS.length;
      return idx;
    }
  }
  return null;
}

serve(async (req: Request) => {
  try {
    if (ACCESS_TOKEN) {
      const provided = req.headers.get("X-Access-Token");
      if (provided !== ACCESS_TOKEN) {
        return new Response("Unauthorized", { status: 401 });
      }
    }

    const reqUrl = new URL(req.url);
    const targetUrl = new URL(reqUrl.pathname + reqUrl.search, API_BASE_URL);
    let keyIndex = getNextKeyIndex();
    if (keyIndex === null) {
      console.error("All API keys are exhausted – cannot fulfill request");
      return new Response(`All API keys exhausted (quota exceeded).`, { status: 429 });
    }
    let apiKey = API_KEYS[keyIndex];
    targetUrl.searchParams.set("key", apiKey);

    const forwardHeaders = new Headers();
    for (const [h, v] of req.headers) {
      const lower = h.toLowerCase();
      if (["host", "cookie", "authorization"].includes(lower)) continue;
      forwardHeaders.set(h, v);
    }
    if (!forwardHeaders.has("content-type") && req.headers.has("content-type")) {
      forwardHeaders.set("content-type", req.headers.get("content-type")!);
    }

    let response = await fetch(targetUrl.toString(), {
      method: req.method,
      headers: forwardHeaders,
      body: req.body,
    });

    let attemptCount = 1;
    while ([401, 403, 429].includes(response.status) && attemptCount < API_KEYS.length) {
      console.warn(`Key ${keyIndex} returned status ${response.status}. Switching API key...`);
      keyStates[keyIndex] = { exhaustedUntil: Date.now() + 60 * 60 * 1000 };
      keyIndex = getNextKeyIndex();
      if (keyIndex === null) break;
      apiKey = API_KEYS[keyIndex];
      targetUrl.searchParams.set("key", apiKey);
      attemptCount++;
      response = await fetch(targetUrl.toString(), {
        method: req.method,
        headers: forwardHeaders,
        body: req.body,
      });
    }

    if ([401, 403, 429].includes(response.status)) {
      console.error("All API keys exhausted or invalid. Returning error to client.");
      return new Response(`Error: All API keys exhausted or invalid. (${response.status})`, { status: 429 });
    }

    const resHeaders = new Headers(response.headers);
    resHeaders.set("Access-Control-Allow-Origin", "*");
    return new Response(response.body, {
      status: response.status,
      headers: resHeaders
    });
  } catch (err: any) {
    console.error("Edge function error:", err);
    return new Response("Internal error in key rotator", { status: 500 });
  }
});
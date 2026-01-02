import { GoogleGenerativeAI } from "npm:@google/generative-ai";
import type {
  GenerateContentResponse,
  GenerateContentStreamResult,
} from "npm:@google/generative-ai";

// Load API key from environment
const API_KEY = Deno.env.get("GEMINI_API_KEY");
if (!API_KEY) throw new Error("Missing GEMINI_API_KEY");

// Initialize Gemini client
const ai = new GoogleGenerativeAI(API_KEY);

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  // Parse JSON body
  const { prompt, latitude, longitude } = await req.json();

  if (!prompt || latitude == null || longitude == null) {
    return new Response(
      JSON.stringify({ error: "Missing prompt, latitude, or longitude" }),
      { status: 400 }
    );
  }

  // Configure model with search + maps grounding
  const model = ai.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: { temperature: 1.0 },
    tools: [
      { googleSearch: {} },
      { googleMaps: { enableWidget: true } },
    ],
    toolConfig: {
      retrievalConfig: { latLng: { latitude, longitude } },
    },
  });

  // Generate streaming content
  const result: GenerateContentStreamResult = await model.generateContentStream({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { temperature: 1.0 },
  });

  let fullText = "";

  // Create a stream to send partial responses to the client
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of result.stream) {
        const text = chunk.text();
        if (text) {
          fullText += text;
          controller.enqueue(new TextEncoder().encode(text));
        }
      }
      controller.close();
    },
  });

  // Optional: get final response metadata
  const finalResponse: GenerateContentResponse = await result.response;
  const grounding = finalResponse.candidates?.[0]?.groundingMetadata;

  if (grounding?.groundingChunks?.length) {
    console.log("Sources:");
    console.log("-".repeat(40));
    for (const chunk of grounding.groundingChunks) {
      if (chunk.web) console.log(`- ${chunk.web.title}: ${chunk.web.uri}`);
      if (chunk.maps) console.log(`- ${chunk.maps.title}: ${chunk.maps.uri}`);
    }
  }

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}
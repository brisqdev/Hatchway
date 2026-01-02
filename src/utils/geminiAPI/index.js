import { GoogleGenerativeAI } from "npm:@google/generative-ai";

const API_KEY = Deno.env.get("GEMINI_API_KEY");
if (!API_KEY) throw new Error("Missing GEMINI_API_KEY");

const ai = new GoogleGenerativeAI(API_KEY);

async function generateContentWithSearchAndMapsGrounding(
  prompt,
  latitude,
  longitude,
  streamController
) {
  const model = ai.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      temperature: 1.0,
    },
    tools: [
      { googleSearch: {} },
      { googleMaps: { enableWidget: true } },
    ],
    toolConfig: {
      retrievalConfig: {
        latLng: {
          latitude,
          longitude,
        },
      },
    },
  });

  const result = await model.generateContentStream({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 1.0,
    },
  });

  let fullText = "";

  for await (const chunk of result.stream) {
    const text = chunk.text();
    if (text) {
      fullText += text;
      streamController.enqueue(new TextEncoder().encode(text));
    }
  }

  // Final aggregated response (metadata)
  const finalResponse = await result.response;
  const grounding = finalResponse.candidates?.[0]?.groundingMetadata;

  if (grounding?.groundingChunks?.length) {
    console.log("Sources:");
    console.log("-".repeat(40));
    for (const chunk of grounding.groundingChunks) {
      if (chunk.web) console.log(`- ${chunk.web.title}: ${chunk.web.uri}`);
      if (chunk.maps) console.log(`- ${chunk.maps.title}: ${chunk.maps.uri}`);
    }
  }

  return fullText;
}

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const { prompt, latitude, longitude } = await req.json();

  if (!prompt || latitude == null || longitude == null) {
    return new Response(
      JSON.stringify({ error: "Missing prompt, latitude, or longitude" }),
      { status: 400 }
    );
  }

  const stream = new ReadableStream({
    async start(controller) {
      await generateContentWithSearchAndMapsGrounding(
        prompt,
        latitude,
        longitude,
        controller
      );
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}
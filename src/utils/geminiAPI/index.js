import {GoogleGenerativeAI} from "npm:@google/generative-ai";

const API_KEY = Deno.env.get("GEMINI_API_KEY");
if (!API_KEY) {
  throw new Error("Missing GEMINI_API_KEY");
}

const ai = new GoogleGenerativeAI(API_KEY);

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const { prompt, latitude, longitude } = body;

  if (!prompt || latitude == null || longitude == null) {
    return new Response(
      JSON.stringify({ error: "prompt, latitude, longitude required" }),
      { status: 400 }
    );
  }

  try {
    const model = ai.getGenerativeModel({
      model: "gemini-2.5-flash",
      tools: [
        { googleSearch: {} },
        { googleMaps: { enableWidget: true } }
      ],
      toolConfig: {
        retrievalConfig: {
          latLng: { latitude, longitude }
        }
      }
    });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 1.0 }
    });

    const text =
      result.response.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    const grounding =
      result.response.candidates?.[0]?.groundingMetadata ?? null;

    return new Response(
      JSON.stringify({
        text,
        grounding
      }),
      {
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
});

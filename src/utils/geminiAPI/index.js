const API_KEY = Deno.env.get("GEMINI_API_KEY");
if (!API_KEY) throw new Error("Missing GEMINI_API_KEY");

async function generateContentWithSearchAndMapsGrounding(prompt, latitude, longitude) {
  // Use the Generative Language REST API so this runs on Deno Deploy / Deno edge functions.
  // Note: tool grounding (googleSearch/googleMaps) via the SDK may not be available via REST.
  // If you need grounded tools, consider a server runtime that supports the official SDK, or
  // implement your own retrieval step and pass results into the prompt.

  const url =
    "https://generativelanguage.googleapis.com/v1beta2/models/gemini-2.5-flash:generateMessage";

  const body = {
    // Keep the request simple and compatible with REST API surface.
    // If your API expects a different shape, adapt accordingly.
    messages: [{ role: "user", content: [{ text: prompt }] }],
    temperature: 1.0,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Generative API error: ${res.status} ${text}`);
  }

  const data = await res.json();

  // Attempt to extract text from common response shapes. Adjust if your API responds differently.
  const text =
    data.candidates?.[0]?.content?.[0]?.text ||
    data.output?.[0]?.content?.text ||
    data.candidates?.[0]?.message?.content?.[0]?.text ||
    JSON.stringify(data);

  return text;
}

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  let payload;
  try {
    payload = await req.json();
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }

  const { prompt, latitude, longitude } = payload;
  if (!prompt || latitude == null || longitude == null) {
    return new Response(JSON.stringify({ error: "Missing prompt, latitude, or longitude" }), {
      status: 400,
    });
  }

  try {
    const text = await generateContentWithSearchAndMapsGrounding(prompt, latitude, longitude);
    return new Response(text, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message || "Internal error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
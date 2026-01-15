import {
  "deploy": {
    "org": "brisqdev",
    "app": "hatchway"
  } GoogleGenerativeAI
} from "npm:@google/generative-ai";

const API_KEY = Deno.env.get("GEMINI_API_KEY");
if (!API_KEY) {
  throw new Error("Missing GEMINI_API_KEY");
}

const ai = new GoogleGenerativeAI(API_KEY);

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: CORS_HEADERS
    });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: CORS_HEADERS
    });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", {
      status: 400,
      headers: CORS_HEADERS
    });
  }

  const { appName, appDescription, city } = body;

  if (!appName || !appDescription || !city) {
    return new Response(
      JSON.stringify({
        error: "appName, appDescription, and city are required"
      }),
      {
        status: 400,
        headers: {
          ...CORS_HEADERS,
          "Content-Type": "application/json"
        }
      }
    );
  }

  const prompt = `
You are powering a founder discovery platform that connects startup founders
to investors, early adopters, partners, and pitching opportunities.

INPUT CONTEXT
-------------
App Name: "${appName}"
App Description: "${appDescription}"
Founder's Closest Large City: "${city}"

TASK
----
Identify exactly 12 real-world founder opportunities that are a strong strategic
match for this startup.

Opportunities may include:
- Conferences
- Founder or startup meetups
- Pitch events / demo days
- Investor networking sessions
- Public accelerator or VC events

GROUNDING REQUIREMENTS (MANDATORY)
----------------------------------
- Use real, verifiable events where possible
- Use Google Search grounding to validate existence and relevance
- Use geographic reasoning to ensure proximity to "${city}"
- Events must occur within the next 12 months
- Prefer nearer dates and higher relevance
- Avoid high-friction or invite-only programs

OUTPUT RULES
------------
- Output ONLY valid JSON
- No markdown, no comments, no explanations
- Do NOT mention grounding, search, or tools
- Sort results by:
  1. Highest matchScore
  2. Soonest upcoming date

JSON SCHEMA - OUTPUT FORMATTING
-----------
{
  "results": [
    {
      "typeLabel": "Conference | Founder Meetup | Pitch Event | Demo Day | Investor Office Hours | Networking Event",
      "title": "Opportunity name",
      "city": "City, Country",
      "matchScore": "X.X / 10 Match",
      "imageURL": "Stock-style image URL (no logos, no event branding)",
      "dateRange": "Human-readable date range within the next year",
      "slotDetails": "Short founder-focused description emphasizing pitching, exposure, or networking"
    }
  ]
}

Return exactly 12 results.
`;

  try {
    const model = ai.getGenerativeModel({
      model: "gemini-2.5-flash",
      tools: [
        { googleSearch: {} },
        { googleMaps: { enableWidget: false } }
      ]
    });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.6 }
    });

    const text =
      result.response.candidates?.[0]?.content?.parts?.[0]?.text;

    return new Response(text, {
      headers: {
        ...CORS_HEADERS,
        "Content-Type": "application/json"
      }
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      {
        status: 500,
        headers: {
          ...CORS_HEADERS,
          "Content-Type": "application/json"
        }
      }
    );
  }
});
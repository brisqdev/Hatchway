import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "";
if (!API_KEY) throw new Error("Missing GEMINI_API_KEY");

const ai = new GoogleGenerativeAI(API_KEY);

async function generateContentWithSearchAndMapsGrounding(
  prompt: Request,
  latitude: Number,
  longitude: Number
) {
  const model = ai.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
     temperature: 1.0,
    },
    tools: [
      { googleSearch: {} },
      { googleMaps: { enableWidget: true } }
    ],
    toolConfig: {
      retrievalConfig: {
        latLng: {
          latitude,
          longitude
        }
      }
    }
  });

  const result = await model.generateContentStream({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 1.0
    }
  });

  console.log("\n--- STREAMING RESPONSE ---\n");

  let fullText = "";

  for await (const chunk of result.stream) {
    const text = chunk.text();
    if (text) {
      process.stdout.write(text);
      fullText += text;
    }
  }

  console.log("\n\n--- STREAM COMPLETE ---\n");

  // Final aggregated response (includes metadata)
  const finalResponse = await result.response;

  const grounding = finalResponse.candidates?.[0]?.groundingMetadata;

  if (grounding?.groundingChunks?.length) {
    console.log("Sources:");
    console.log("-".repeat(40));

    for (const chunk of grounding.groundingChunks) {
      if (chunk.web) {
        console.log(`- ${chunk.web.title}: ${chunk.web.uri}`);
      }
      if (chunk.maps) {
        console.log(`- ${chunk.maps.title}: ${chunk.maps.uri}`);
      }
    }
  }

//  if (grounding?.googleMapsWidgetContextToken) {
//    console.log("\nGoogle Maps widget token available (frontend renderable).");
//  }

  return fullText;
}

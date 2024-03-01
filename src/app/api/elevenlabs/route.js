import { config } from "dotenv";
config();
export async function POST(request) {
  const body = await request.json();
  let { textInput } = body;
  // let voice_id = "21m00Tcm4TlvDq8ikWAM"; 
  //Change the value to the available voice ID you prefer.

  // List of available voice IDs
const voiceIds = [
  "3xOBUOUSquAIOvsVxH0Z",
  "6lSwMAeTD2TCaFXCMSWU",
  "BLSDtZwIRiV1FVhis6cU",
  "H0rnUeGZ1IFcv0ROxwxf",
  "MlnA3dLF2wZ33JYK25mZ",
  "NRR01x1lRVTYGGQqtK56",
  "O7HNgx9I591EsRwS19F1",
  "Z43fBCjBeSdRPsyabFq1",
  "bxQ2o0F0ScIV8uthTwSH",
  "cVhBseGYr8jnndXgTUU6",
  "e6pxWhGzYT1DGGlYqLwU",
  "eGC9XoCukvKysoJgzSsz",
  "qZ5I8qmV8M1Rw5hvfpA7",
  "sH3y5WMkYUlsh2EG25Vr",
  "svVIOVZXuRIGPhgdEuuL",
  "wVFF7bF0kGp2fty0pwug",
  "xs1eM4k2fnhlRPw8dVPN"
];

// Function to randomly select a voice ID
function getRandomVoiceId(voiceIds) {
  const randomIndex = Math.floor(Math.random() * voiceIds.length);
  return voiceIds[randomIndex];
}

// Use the randomly selected voice ID in the API URL
let voice_id = getRandomVoiceId(voiceIds); // Randomly selected voice ID
const url = `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`;

console.log(url); // This will print the API URL with a randomly selected voice ID



  const headers = {
    Accept: "audio/mpeg",
    "xi-api-key": process.env.ELEVENLABS_API_KEY,
    "Content-Type": "application/json",
  };
  const reqBody = JSON.stringify({
    text: textInput,
    model_id: "eleven_monolingual_v1",
    voice_settings: {
      stability: 0.5,
      similarity_boost: 0.5,
    },
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: reqBody,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      return new Response(buffer);
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }));
  }
}
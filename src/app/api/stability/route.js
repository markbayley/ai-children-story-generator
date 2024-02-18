import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { story } = body;
  let allImages = [];
  const prompts = await getPrompts(story);

  console.log("story-prompts", prompts);

  for (let i = 0; i < prompts.length; i++) {
    const text_prompts = [{ text: prompts[i] }];
    const response = await fetch(
      "https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
        },
        body: JSON.stringify({ text_prompts }),
      }
    );
    const images = await response.json();

    allImages.push(images.artifacts[0].base64);

  }
  return NextResponse.json({ images: allImages });
}
//|a boy playing with a cute friendly pet dinosaur, ${style}
//a castle high on mountain touching the clouds, ${style}|a boy playing on a bright sunny day at the park, ${style}|
//|a red canoe drifting on a peacefull lake, ${style}
async function getPrompts(story) {
  const OpenAI = require("openai");
  const style = "Art by Maurice Brazil Prendergast, Charline von Heyl, Michael Leunig, Edward Okun, Anna Dittmann, Kazumasa Nagai, Desmond Morris. Intricate, beautiful, cute. Beautiful and strange creatures, magical night. Watercolor and ink, impasto, volumetric lighting, spectacular, intricate, beautiful, fantastic view, extremely detailed"
  const openai = new OpenAI(process.env.OPENAI_API_KEY);
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `Your job is to generate two image prompts for the following story.
                  Use ${style} for all two prompts.
                  Each prompt should be a descriptive sentence.
                  Avoid including words like "mystical", "shimmering", and "glimmering" in prompts.
                  Please list the two prompts, separated by a "|" symbol.
                  For example:"a black cat near a dark spooky old house at night, ${style}|a beautifull woman crossing a bustling city street, ${style}".`,
      },
      {
        role: "user",
        content: `story: ${story}\n`,
      },
    ],
  });
  const prompts =
    response.choices[0]?.message?.content?.trim().split("|") || "";
    console.log("story-prompts", prompts);
  return prompts;
}
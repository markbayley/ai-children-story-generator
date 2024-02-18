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
      "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
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
async function getPrompts(story) {
  const OpenAI = require("openai");
  const style = "children's story book illustrations"
  const openai = new OpenAI(process.env.OPENAI_API_KEY);
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-16k",
    messages: [
      {
        role: "system",
        content: `Your job is to generate five image prompts for the following story.
                  Use ${style} for all five prompts.
                  Each prompt should be a descriptive sentence.
                  Avoid including words like "mystical", "shimmering", and "glimmering" in prompts.
                  Please list all five prompts, separated by a "|" symbol.
                  For example:"a castle high on mountain touching the clouds, ${style}|a boy playing on a bright sunny day at the park, ${style}|a black cat near a dark spooky old house at night, ${style}|a beautifull woman crossing a bustling city street, ${style}|a red canoe drifting on a peacefull lake, ${style}".`,
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
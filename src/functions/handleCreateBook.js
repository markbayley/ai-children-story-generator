//  CREATING A BOOK //
export const createBook = async (
  event,
  setMessage,
  resetStory,
  userPrompt,
  setUserPrompt,
  setLoading,
  setStoryUnsaved,
  user,
  theme,
  setImagesUnsaved,
  extractTitleFromStory,
  setOpen,
  setAudioUrl,
  setUnsaved
) => {
  event.preventDefault();
  // If insufficient prompt
  if (!userPrompt) {
    setMessage({ text: "Enter Prompt", type: "create" });
    return;
  }
  if (userPrompt.length < 10) {
    setMessage({ text: "Longer Prompt", type: "create" });
    return;
  }
  resetStory();
  //setTheme("Spooky")
  // const theme = "Spooky"
  const inputPrompt = userPrompt + ", " + theme + " story theme";
  console.log("inputPrompt", inputPrompt);
  setUserPrompt(inputPrompt);
  try {
    setMessage({ text: "Writing Story...", type: "create" });

    setLoading(true);
    // Fetching story text
    const hero = user?.displayName || " chosen randomly.";
    const storyData = await fetchStory(inputPrompt, hero);
    setMessage({ text: "Story Created!", type: "create" });
    setStoryUnsaved(storyData.story);

    // Extracting Title
    const storyTitle = extractTitleFromStory(storyData.story);
    console.log("storyTitle", storyTitle);
    setOpen(true);

    setMessage({ text: "Creating Images...", type: "create" });

    // Fetching images
    const allImages = await fetchImagesTwice(storyData.story);
    setImagesUnsaved(allImages);

    setMessage({ text: "Generating Audio", type: "create" });

    // Fetching audio
    const audioResponse = await fetch("/api/elevenlabs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ textInput: storyData.story }),
    });
    // Converting audio
    const arrayBuffer = await audioResponse.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
    const blobUrl = URL.createObjectURL(blob);
    setAudioUrl(blobUrl);

    setMessage({ text: "Save Story", type: "save" });
    setLoading(false);
    setUnsaved(true);
    setUserPrompt("");
    audioRef?.current.play();

    // Catch errors
  } catch (error) {
    console.error("Error:", error);
    setMessage({ text: "No Credits!", type: "error" });
    setLoading(false);
  }
};

async function fetchImagesTwice(story) {
  // Make three concurrent requests to fetch images
  const fetchPromise1 = fetchImages(story);
  const fetchPromise2 = fetchImages(story);
  const fetchPromise3 = fetchImages(story);
  setMessage({ text: "Retrieving Images...", type: "create" });
  // Wait for all promises to resolve
  const results = await Promise.all([
    fetchPromise1,
    fetchPromise2,
    fetchPromise3,
  ]);

  // Combine the images from results
  const allImages = [
    ...results[0].images,
    ...results[1].images,
    ...results[2].images,
  ];

  return allImages;
}

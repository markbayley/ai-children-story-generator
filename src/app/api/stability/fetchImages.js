// Get the input prompt from the user - prompt + style
// Get the story text from OpenAI using the input - fetchStory(inputPrompt)
// Get six image prompts from OpenAI using the story - getPrompts(storyText)
// Get the imageData from StabilityAI using the image prompts - fetchImages(imagePrompts)
export const fetchImages = async (storyText) => {
    //console.log("themeFI", theme)
    try {
        const response = await fetch("/api/stability", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ story: storyText }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const imageData = await response.json();
     
        return imageData;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
};
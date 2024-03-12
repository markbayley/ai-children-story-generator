export const fetchAudio = async (storyText) => {
  
    try {
        const response = await fetch("/api/elevenlabs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ textInput: storyText }),
          });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const audioData = await response.json();
     
        return audioData;
    } catch (error) {
        console.error('Error fetching audio:', error);
        throw error;
    }
};
export const extractTitleFromStory = (storyText) => {
    const titleEndIndex = storyText?.indexOf("Once upon a time");
    if (titleEndIndex === -1) {
      // Handle the case where the phrase is not found
      return "Untitled Story";
    }
    // Extract the first three words as the title
    let title = storyText
      ?.substring(0, titleEndIndex)
      .trim()
      .split(" ")
      //.slice(0, 6)
      .join(" ");

    if (title == "") {
      return prompt;
    } else {
      return title;
    }
  };
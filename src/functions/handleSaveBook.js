import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../app/firebase/config";
import { useEffect } from "react";

  // SAVING A BOOK //
  export const saveBook = async (userId, setSelectedBook, setUnsaved, storyUnsaved, setProcessing, setDismiss, setMessage, imagesUnsaved, allBooks, useFetchAllBooks ) => {
  
    // Set maximum books that can be saved
    const myBooks = [...allBooks].filter((book) => book?.userId == userId)
    if (myBooks.length >= 12) {
      setMessage({ text: "Maximum Books!", type: "save" });
      return;
    }
    // if (myBooks.id)
    setProcessing(true);
    setDismiss(true);
    setMessage({ text: "Saving Images...", type: "save" });

    try {
      // Filter out undefined or null images
      const validImages = imagesUnsaved.filter((image) => image != null);
      const convertedImages = validImages.map((base64Image) =>
        base64ToBlob(base64Image, "image/jpeg")
      );

      const { bookId, imageUrls } = await uploadImages(convertedImages, userId);
      // Upload the audio and get its URL
      setMessage({ text: "Saving Audio...", type: "save" });
      // Convert the blob URL to a blob if necessary
      const audioBlob = await fetch(audio).then((r) => r.blob());
      const audioUrl = await uploadAudio(audioBlob, userId, bookId);
      setMessage({ text: "Finishing Up...", type: "save" });
      // Use bookId and imageUrls to save the book's data
      await saveBookToFirestore(
        userId,
        storyUnsaved,
        imageUrls,
        audioUrl,
        bookId
      );
      // After saving the book, refetch the books list
      useFetchAllBooks();
      const book = myBooks.find((b) => b.id === bookId);

      if (book) {
        setSelectedBook(book);
      }
      setMessage({ text: "Book Saved!", type: "create" });
      setUnsaved(false);
      setProcessing(false);
    } catch (error) {
      setMessage({ text: "Error Saving!", type: "save" });
      setProcessing(false);
    }
  };

  // Data saved called in the function above
  const saveBookToFirestore = async (
    userId,
    storyUnsaved,
    imageUrls,
    audioUrl
  ) => {
    const db = getFirestore();
    const creatorName = user.displayName;
    const creatorPhotoURL = user.photoURL;
    const story = storyUnsaved;
    const likedBy = [];
    const likes = 0;
    const sharedBy = [];
    const shares = 0;
    const viewedBy = [];
    const views = 0;
    const book = {
      userId,
      likes,
      likedBy,
      shares,
      sharedBy,
      views,
      viewedBy,
      story,
      audioUrl,
      imageUrls,
      creatorName,
      creatorPhotoURL,
      createdAt: new Date(),
    };

    setMessage({ text: "Storing Book...", type: "save" });
    await addDoc(collection(db, "books"), book);
  };

  // Convert images called in handleSubmit
  const base64ToBlob = (base64, mimeType = "image/jpeg") => {
    if (!base64) {
      console.error(
        "base64ToBlob was called with an undefined or null argument."
      );
      return null;
    }
    setMessage({ text: "Converting Images...", type: "save" });
    const byteString = atob(base64);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeType });
  };


    // Generate a unique book ID
    const generateBookId = () => {
      return `book_${new Date().getTime()}`;
    };
  
    // Uploading images
    const uploadImages = async (imagesUnsaved, userId) => {
      setMessage({ text: "Uploading Images...", type: "create" });
      const storage = getStorage();
      setMessage({ text: "Creating Book Id...", type: "save" });
      const bookId = generateBookId();
      let imageUrls = [];
      // Ensure unique ID for each image
      for (const image of imagesUnsaved) {
        const uniqueImageId = `${bookId}_${Date.now()}`;
        const imageRef = ref(
          storage,
          `images/${userId}/${bookId}/${uniqueImageId}`
        );
        setMessage({ text: "Saving Book...", type: "save" });
        // Ensure the image is awaited
        await uploadBytes(imageRef, image);
        const url = await getDownloadURL(imageRef);
        imageUrls.push(url);
      }
  
      return { bookId, imageUrls };
    };
  
    // Uploading audio
    const uploadAudio = async (audioBlob, userId, bookId) => {
      setMessage({ text: "Uploading Audio...", type: "save" });
      const storage = getStorage();
      const audioRef = ref(
        storage,
        `audioUrl/${userId}/${bookId}/storyAudio.mp3`
      );
      await uploadBytes(audioRef, audioBlob);
      const url = await getDownloadURL(audioRef);
      return url;
    };
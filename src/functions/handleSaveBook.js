import React from 'react'

export const handleSaveBook = async (myBooks) => {
    if (myBooks.length >= 12) {
      setMessage({ text: "Maximum Books Saved!", type: "save" });
      return;
    }
    // if (myBooks.id)
    setProcessing(true);
    setDismiss(true);
    setMessage({ text: "Saving Storybook...", type: "save" });
    try {
      const validImages = imagesUnsaved.filter((image) => image != null); // Filter out undefined or null images
      const convertedImages = validImages.map((base64Image) =>
        base64ToBlob(base64Image, "image/jpeg")
      );
      //console.log("Converted images for upload:", convertedImages);
      const { bookId, imageUrls } = await uploadImages(convertedImages, userId);

      // Now use bookId and imageUrls to save the book's data to Firestore
      await saveBookToFirestore(userId, storyUnsaved, imageUrls, bookId);
      // After saving the book, refetch the books list
      fetchUserBooks();
    } catch (error) {
      setMessage({ text: "Error Saving Book!", type: "save" });
      setProcessing(false);
    }
    setProcessing(false);
    setMessage({ text: "Storybook Saved!", type: "create" });
    setUnsaved(false);
  };

  const saveBookToFirestore = async (userId, storyUnsaved, imageUrls) => {
    const db = getFirestore();
    const creatorName = user.displayName;
    const creatorPhotoURL = user.photoURL;
    const story = storyUnsaved;
    const likedBy = [];
    const likes = 0;
    const book = {
      userId,
      likes,
      likedBy,
      story,
      imageUrls,
      creatorName,
      creatorPhotoURL,
      createdAt: new Date(),
    };
    //console.log("Saving book with image URLs:", imageUrls);
    await addDoc(collection(db, "books"), book);
  };

  const base64ToBlob = (base64, mimeType = "image/jpeg") => {
    if (!base64) {
      console.error(
        "base64ToBlob was called with an undefined or null argument."
      );
      return null;
    }

    const byteString = atob(base64);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeType });
  };

  // Function to generate a unique book ID
  const generateBookId = () => {
    return `book_${new Date().getTime()}`;
  };

  // Function to upload images
  const uploadImages = async (imagesUnsaved, userId) => {
    const storage = getStorage();
    const bookId = generateBookId();
    let imageUrls = [];

    for (const image of imagesUnsaved) {
      const uniqueImageId = `${bookId}_${Date.now()}`; // Ensure unique ID for each image
      const imageRef = ref(
        storage,
        `images/${userId}/${bookId}/${uniqueImageId}`
      );
      setMessage({ text: "Saving Images...", type: "save" });
      await uploadBytes(imageRef, image); // Ensure the image is awaited
      const url = await getDownloadURL(imageRef);
      imageUrls.push(url);
    }

    return { bookId, imageUrls };
  };

  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      setUserId(user.uid);
    }
  }, [user]);

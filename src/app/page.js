"use client";
import "./globals.css";
import { useEffect, useRef, useState } from "react";
import { fetchStory } from "./api/openai/fetchStory";
import { fetchImages } from "./api/stability/fetchImages";
import { StatusBar } from "./components/StatusBar";
import { StoryForm } from "./components/StoryForm";
import { StoryDisplay } from "./components/StoryDisplay";
import { StorySelector } from "./components/StorySelector";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  increment,
  doc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../app/firebase/config";
import { FooterNav } from "./components/FooterNav";
import React from "react";

export default function StoryPage() {
  // Book Auth
  const [userId, setUserId] = useState();

  // Book Creation
  const [theme, setTheme] = useState("");
  const [userPrompt, setUserPrompt] = useState("");
  const [storyUnsaved, setStoryUnsaved] = useState("");
  const [imagesUnsaved, setImagesUnsaved] = useState([]);

  // Book Audio
  const [page, setPage] = useState(0);
  //const [audioUrl, setAudioUrl] = useState("");
  const audioRef = useRef(null);
  const [audioPages, setAudioPages] = useState(0);
  const [audioPage, setAudioPage] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audio, setAudio] = useState("");
  const [playing, setPlaying] = useState(false);
  const [lastPage, setLastPage] = useState(5);

  const resetStory = () => {
    setShow(false);
    setOpen(false);

    setTheme("");
    setUserPrompt("");
    setStoryUnsaved("");
    setImagesUnsaved([]);

    setPage(0);
    //setAudioUrl("");
    //AudioRef
    setAudioPages(0);
    setAudioPage(0);
    setAudioDuration(0);
    //setAudio(0);
    setPlaying(false);
    setLastPage(0);

    setMessage({ text: "", type: "" });

    setLoading(false);
    setProcessing(false);
    setDismiss(false);
    setUnsaved(false);
    setShared(false);
    setDeleting(false);

    setTime(false);

    setSelectedBook(null);
  };

  // Book States
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [dismiss, setDismiss] = useState(false);
  const [unsaved, setUnsaved] = useState(false);
  const [shared, setShared] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [show, setShow] = useState(false);
  const [time, setTime] = useState(5);
  const [message, setMessage] = useState({ text: `Welcome`, type: "share" });

  // Book Collections
  const [myBooks, setMyBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [myStoriesSelected, setMyStoriesSelected] = useState(false);
  const [currentSliceIndex, setCurrentSliceIndex] = useState(0);

  // Fetch books when userId changes
  useEffect(() => {
    fetchUserBooks();
    fetchAllBooks();
  }, [userId]);



  //  CREATING A BOOK //
  const handleSubmit = async (event) => {
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
      setUnsaved(true);

      // Fetching images
      setMessage({ text: "Creating Images...", type: "create" });
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

 setAudio(blobUrl);
 console.log("blobUrlHS", blobUrl );
 console.log("audioHS", audio );
//  if (audioRef.current) {
//   console.log("audioRefHS", audioRef.current );
//   audioRef.current.src = blobUrl;
//   console.log("audioRefHS", audioRef.current.src );
//   audioRef.current.load();
//   audioRef.current.play();
// }

   
      //setAudioUrl(blobUrl);
      
     // audioRef?.current?.play();
     
     
      setMessage({ text: "Save Story", type: "save" });
     
      setUserPrompt("");
      setLoading(false);
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

  const extractTitleFromStory = (storyText) => {
    const titleEndIndex = storyText.indexOf("Once upon a time");
    if (titleEndIndex === -1) {
      // Handle the case where the phrase is not found
      return "Untitled Story";
    }
    // Extract the first three words as the title
    let title = storyText
      .substring(0, titleEndIndex)
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

  // SAVING A BOOK //
  const [user] = useAuthState(auth);
  // Get urrent user
  useEffect(() => {
    if (user) {
      setUserId(user.uid);
    }
  }, [user]);

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
    const audioRef = ref(storage, `audio/${userId}/${bookId}/storyAudio.mp3`);
    await uploadBytes(audioRef, audioBlob);
    const url = await getDownloadURL(audioRef);
    return url;
  };

  const handleSaveBook = async () => {
    // Set maximum books that can be saved
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
      fetchUserBooks();
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

  // RETRIEVING BOOKS //
  const fetchUserBooks = async () => {
    // Get current user's books
    if (userId) {
      //setMessage({ text: "Fetching Books...", type: "save" });
      const fetchedBooks = await getBooksForUser(userId);
      setMyBooks(fetchedBooks);
    }
  };

  // Called in function above
  const getBooksForUser = async (userId) => {
    const db = getFirestore();
    const q = query(collection(db, "books"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    let myBooks = [];
    querySnapshot.forEach((doc) => {
      myBooks.push({
        id: doc.id,
        ...doc.data(),
        creatorPhotoURL: user.photoURL,
      });
    });
    return myBooks;
  };

  // Get all the books
  const fetchAllBooks = async () => {
    setLoading(true);
    const fetchedBooks = await getAllBooks(userId);
    setAllBooks(fetchedBooks);
    setLoading(false);
    //setMessage({text: "All Books Fetched", type: "success"});
  };

  // Called in function above
  const getAllBooks = async () => {
    const db = getFirestore();
    const q = query(collection(db, "books"));
    const querySnapshot = await getDocs(q);
    let allBooks = [];
    querySnapshot.forEach((doc) => {
      allBooks.push({ id: doc.id, ...doc.data() });
    });
    return allBooks;
  };

  // SHARING A BOOK //
  const handleShareBook = async (bookId, userId) => {
    try {
      await fetchBookToShare(bookId, userId); // Now passing userId

      // UI logic as previously described
    } catch (error) {
      setMessage(setMessage({ text: "Shared Already!", type: "like" }));
      console.error("Error sharing book: ", error);
    }
    fetchAllBooks();
  };

  const fetchBookToShare = async (bookId, userId) => {
    const db = getFirestore();
    const bookRef = doc(db, "books", bookId);

    const docSnap = await getDoc(bookRef);
    if (docSnap.exists()) {
      const bookData = docSnap.data();

      // Check if the user has already liked the book
      if (bookData.sharedBy && !bookData.sharedBy.includes(userId)) {
        // Update the document to add the user to the likedBy array and increment likes
        setSelectedBook({
          ...selectedBook,
          shares: (selectedBook.shares || 0) + 1,
          sharedBy: [...(selectedBook.sharedBy || []), userId], // Also optimistically update the likedBy array
        });
        await updateDoc(bookRef, {
          sharedBy: arrayUnion(userId),
          shares: increment(1),
        });
        setMessage({ text: "Book Shared!", type: "share" });
      } else {
        setMessage({ text: "Already Shared!", type: "share" });
        // Optionally handle this case in the UI, e.g., by showing a message
      }
    } else {
      console.log("No such document!");
    }
  };

  // LIKING A BOOK //
  const handleLikeBook = async (bookId, userId) => {
    if (userId === selectedBook?.userId) {
      setMessage({ text: "Its Your Book!", type: "like" });
      return;
    }

    try {
      await fetchBookById(bookId, userId); // Now passing userId
      // Assuming likes are directly updated in the UI without refetching from Firestore

      // UI logic as previously described
    } catch (error) {
      setMessage({ text: "Liked Already!", type: "like" });
      console.error("Error liking book: ", error);
    }
    fetchAllBooks();
  };

  const fetchBookById = async (bookId, userId) => {
    const db = getFirestore();
    const bookRef = doc(db, "books", bookId);

    const docSnap = await getDoc(bookRef);
    if (docSnap.exists()) {
      const bookData = docSnap.data();

      // Check if the user has already liked the book
      if (bookData.likedBy && !bookData.likedBy.includes(userId)) {
        // Update the document to add the user to the likedBy array and increment likes
        setSelectedBook({
          ...selectedBook,
          likes: (selectedBook.likes || 0) + 1,
          likedBy: [...(selectedBook.likedBy || []), userId], // Also optimistically update the likedBy array
        });
        await updateDoc(bookRef, {
          likedBy: arrayUnion(userId),
          likes: increment(1),
        });
        setMessage({ text: "Book Liked!", type: "like" });
      } else {
        setMessage({ text: "Already Liked!", type: "like" });
        // Optionally handle this case in the UI, e.g., by showing a message
      }
    } else {
      console.log("No such document!");
    }
  };

  // DELETING A BOOK //
  const handleDeleteBook = async (bookId) => {
    setMessage({ text: "Deleting Book...", type: "delete" });
    setDeleting(true);
    try {
      await deleteBookFromFirestore(bookId);

      // Remove the book from the local state to update the UI
      const updatedBooks = myBooks.filter((book) => book.id !== bookId);
      setMyBooks(updatedBooks);
    } catch (error) {
      setMessage({ text: "Delete Failed!", type: "delete" });
      setDeleting(false);
      // Optionally handle the error, e.g., show an error message to the user
    }
    setMessage({ text: "Book Deleted", type: "delete" });
  };

  const deleteBookFromFirestore = async (bookId) => {
    const db = getFirestore();

    // Get a reference to the book document
    const bookRef = doc(db, "books", bookId);

    console.log("Deleting book with ID:", bookId);

    // Delete the document
    await deleteDoc(bookRef);
  };

  // VIEWING BOOKS //
  const handlePreviewMine = (bookId) => {
    const book = myBooks.find((b) => b.id === bookId);
    if (book) {
      setSelectedBook(book);
    }
    setPlaying(true);
    audioRef?.current?.play();
    //setAudio(selectedBook?.audioUrl)
    setMessage("");
    setOpen(true);
    //setPage(0);
  };

  const handlePreviewAll = (bookId) => {
    const book = allBooks.find((b) => b.id === bookId);
    if (book) {
      setSelectedBook(book);
      // if (audioRef && audioRef?.current != null) {
      //   setPlaying(true)
      // }
    }
    setPlaying(true);
    audioRef?.current?.play();
    //setAudio(selectedBook?.audioUrl)
    setMessage("");
    setOpen(true);
    //setPage(0);
  };

  const handleOpen = () => {
    setSelectedBook(storyUnsaved, imagesUnsaved);
    setOpen(true);
    setDismiss(false);
  };

    // useEffect(() => {
  //   if (audio && audioRef.current) {
  //     audioRef.current.play();
  //   }
  // }, [audio]);

  // Load & Play audio
  useEffect(() => {
    const audioCurrent = audioRef.current;
    console.log("audioRef.currentUESP", audioRef?.current);
    console.log("audioCurrentUESP", audioCurrent);

    if (!audioCurrent) return;

    const playAudio = () => {
      audioCurrent
        .play()
        .catch((error) => console.error("Audio playback failed:", error));
    };

    if (open && (selectedBook?.audioUrl || audio)) {
      audioCurrent.src = selectedBook?.audioUrl || audio; // Use audioRef.current instead of audio
      audioCurrent.load();

      audioCurrent.removeEventListener("loadeddata", playAudio);

      audioCurrent.addEventListener("loadeddata", playAudio);
    }

    return () => {
      audioCurrent.removeEventListener("loadeddata", playAudio);
    };
  }, [open, audio, loading]);

  console.log("selectedBookSP", selectedBook);

  return (
    <div className="bg-[url('../../public/background5.png')] bg-cover bg-fixed flex flex-col min-h-screen overflow-hidden no-scroll">
      <main className="flex-grow">
        <StatusBar
          message={message}
          resetStory={resetStory}
          setMyBooks={setMyBooks}
          setUserId={setUserId}
          setMyStoriesSelected={setMyStoriesSelected}
          setMessage={setMessage}
          show={show}
          setShow={setShow}
          setShared={setShared}
          handleShareBook={handleShareBook}
          selectedBook={selectedBook}
          userId={userId}
          loading={loading}
          time={time}
          setTime={setTime}
          audio={audio}
          audioPages={audioPages}
          audioPage={audioPage}
          playing={playing}
          open={open}
          page={page}
        />

        <div className="mx-0 md:mx-[10%] no-scroll pt-16">
          {!open ? (
            <>
              <StoryForm
                loading={loading}
                userPrompt={userPrompt}
                setUserPrompt={setUserPrompt}
                handleSubmit={handleSubmit}
                handleOpen={handleOpen}
                setMessage={setMessage}
                storyUnsaved={storyUnsaved}
                theme={theme}
                setTheme={setTheme}
              />

              <StorySelector
                myBooks={myBooks}
                allBooks={allBooks}
                extractTitleFromStory={extractTitleFromStory}
                handlePreviewMine={handlePreviewMine}
                handlePreviewAll={handlePreviewAll}
                myStoriesSelected={myStoriesSelected}
                setMyStoriesSelected={setMyStoriesSelected}
                handleLikeBook={handleLikeBook}
                userId={userId}
                handleDeleteBook={handleDeleteBook}
                setMessage={setMessage}
                currentSliceIndex={currentSliceIndex}
                setCurrentSliceIndex={setCurrentSliceIndex}
                selectedBook={selectedBook}
                user={user}
                loading={loading}
                playing={playing}
                setPlaying={setPlaying}
              />
            </>
          ) : (
            <StoryDisplay
              storyUnsaved={storyUnsaved}
              imagesUnsaved={imagesUnsaved}
              storySelected={selectedBook?.story}
              imagesSelected={selectedBook?.imageUrls}
              page={page}
              setPage={setPage}
              audio={audio} 
              audioRef={audioRef}
              setOpen={setOpen}
              handleSaveBook={handleSaveBook}
              processing={processing}
              myBooks={myBooks}
              dismiss={dismiss}
              setDismiss={setDismiss}
              handleLikeBook={handleLikeBook}
              selectedBook={selectedBook}
              userId={userId}
              setMessage={setMessage}
              extractTitleFromStory={extractTitleFromStory}
              loading={loading}
              handleDeleteBook={handleDeleteBook}
              message={message}
              unsaved={unsaved}
              shared={shared}
              setShared={setShared}
              show={show}
              setShow={setShow}
              userPrompt={userPrompt}
              theme={theme}
              deleting={deleting}
              playing={playing}
              setPlaying={setPlaying}
              setAudioPages={setAudioPages}
              setAudioPage={setAudioPage}
              audioPages={audioPages}
              audioDuration={audioDuration}
              setAudioDuration={setAudioDuration}
              handleShareBook={handleShareBook}
              lastPage={lastPage}
              setLastPage={setLastPage}
              resetStory={resetStory}
              //setAudioUrl={setAudioUrl}
              setAudio={setAudio}
              audioPage={audioPage}
              //onLoadedMetadata={onLoadedMetadata}
            />
          )}
        </div>
      </main>
      <footer>
        {!open && (
          <FooterNav
            message={message}
            resetStory={resetStory}
            setMyBooks={setMyBooks}
            setUserId={setUserId}
            setMyStoriesSelected={setMyStoriesSelected}
            setMessage={setMessage}
            show={show}
            setShow={setShow}
          />
        )}
      </footer>
    </div>
  );
}

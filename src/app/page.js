"use client";
import React, { useEffect, useRef, useState } from "react";
import { fetchStory } from "./api/openai/fetchStory";
import { fetchImages } from "./api/stability/fetchImages";
import { fetchAudio } from "./api/elevenlabs/fetchAudio";
import { NavIndex } from "./components/nav/NavIndex";
import { FormIndex } from "./components/main/forms/FormIndex";
import { BookIndex } from "./components/book/BookIndex";
import { SelectorIndex } from "./components/main/SelectorIndex";
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
  orderBy,
  limit,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../app/firebase/config";
import { FooterNav } from "./components/nav/features/FooterNav";
// import { Stars } from "./components/Stars";

export default function StoryPage() {
  const [user] = useAuthState(auth);
  // Get urrent user
  useEffect(() => {
    if (user) {
      setUserId(user.uid);
    }
  }, [user]);

  // Book Creation
  const [unsavedTitle, setUnsavedTitle] = useState("");
  const [unsavedTheme, setUnsavedTheme] = useState("");
  console.log("unsavedThemeSP", unsavedTheme);
  const [userPrompt, setUserPrompt] = useState("");
  const [storyUnsaved, setStoryUnsaved] = useState("");
  const [imagesUnsaved, setImagesUnsaved] = useState([]);
  const [createWithAudio, setCreateWithAudio] = useState(false);
  console.log("createWithAudioSP", createWithAudio);

  // Book Audio
  const [page, setPage] = useState(0);
  const audioRef = useRef(null);
  const [audioPages, setAudioPages] = useState(0);
  const [audioPage, setAudioPage] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audio, setAudio] = useState("");
  const [playing, setPlaying] = useState(false);
  const [lastPage, setLastPage] = useState(5);

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
  //const [search, setSearch] = useState("");
  const [showCreators, setShowCreators] = useState(false);

  // Book Collections
  const [myBooks, setMyBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [myStoriesSelected, setMyStoriesSelected] = useState(false);
  const [currentSliceIndex, setCurrentSliceIndex] = useState(0);
  const [tabSelected, setTabSelected] = useState("Explore");

  const [fetched, setFetched] = useState(false);
  const [bookId, setBookId] = useState("");


  const [showForm, setShowForm] = useState(true);

  // Book Auth
  const [userId, setUserId] = useState();
  // console.log("userId", userId);

  // Fetch books when userId changes
  useEffect(() => {
    if (!fetched) {
    
      setMessage({ text: "Loading...", type: "info" });
      fetchAllBooks();
      setFetched(true);
    }
  }, [userId]);

  // RETRIEVING BOOKS //
  // const fetchAllBooks = async () => {
  //   // Called in function below
  //   const getAllBooks = async () => {
  //     const db = getFirestore();
  //     const q = query(collection(db, "books"));
  //     const querySnapshot = await getDocs(q);
  //     let allBooks = [];
  //     querySnapshot.forEach((doc) => {
  //       allBooks.push({ id: doc.id, ...doc.data() });
  //     });
  //     return allBooks;
  //   };
  //   setLoading(true);
  //   try {
  //     const fetchedBooks = await getAllBooks(userId);
  //     console.log("fetchBooksFA", fetchedBooks);
  //     setAllBooks(fetchedBooks);
  //     console.log("allBooksFA", allBooks);
  //     const userBooks = fetchedBooks.filter((book) => book?.userId == userId);
  //     console.log("userBooksFA", userBooks);
  //     setMyBooks(userBooks);
  //     console.log("myBooksFA", myBooks);

  //     setMessage({ text: "Books Fetched", type: "success" });
  //     setLoading(false);
  //   } catch (error) {
  //     setMessage({ text: "Quota Exceeded", type: "error" });
  //     console.log(error)
  //     setLoading(false);
  //   }
  // };
  const fetchAllBooks = async () => {
    setLoading(true);
    try {
      const db = getFirestore();
      const q = query(
        collection(db, "books"),
        orderBy("createdAt", "desc"), // Order by createdAt field in descending order
        limit(60) // Limit the results to the last 20 books
      );
      const querySnapshot = await getDocs(q);

      let fetchedBooks = [];
      querySnapshot.forEach((doc) => {
        fetchedBooks.push({ id: doc.id, ...doc.data() });
      });

      console.log("fetchBooksFA", fetchedBooks);
      setAllBooks(fetchedBooks);

      const userBooks = fetchedBooks.filter((book) => book.userId === userId);
      console.log("userBooksFA", userBooks);
      setMyBooks(userBooks);

      setMessage({ text: "Books Fetched", type: "success" });
      setLoading(false);
    } catch (error) {
      setMessage({ text: "Quota Exceeded", type: "error" });
      console.log(error);
      setLoading(false);
    }
  };

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
    setUnsavedTheme(unsavedTheme);
    // const theme = "Spooky"
    console.log("unsavedThemeHS", unsavedTheme);
    const inputPrompt = userPrompt + ", " + unsavedTheme + " story theme";
    setUserPrompt(inputPrompt);
    try {
      setMessage({ text: "Writing Story...", type: "create" });
      // setLoading(true);

      // Fetching story text
      //const hero = user?.displayName || " chosen randomly.";
      const storyData = await fetchStory(inputPrompt);
      setMessage({ text: "Story Created!", type: "create" });
      setStoryUnsaved(storyData.story);

      // Extracting Title
      const storyTitle = extractTitleFromStory(storyData.story);
      console.log("storyTitle", storyTitle);
      setUnsavedTitle(storyTitle);
      setOpen(true);
      setLoading(true);
      // Fetching images
      setMessage({ text: "Creating Images...", type: "create" });
      const allImages = await fetchImagesTwice(storyData.story);
      setImagesUnsaved(allImages);

      // Fetching audio
      if (createWithAudio) {
     
        setMessage({ text: "Generating Audio", type: "audio" });

        const audioResponse = await fetch("/api/elevenlabs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ textInput: storyData.story }),
        });

        setMessage({ text: "Finishing Up...", type: "audio" });
        // Converting audio
        const arrayBuffer = await audioResponse.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
        const blobUrl = URL.createObjectURL(blob);
        setAudio(blobUrl);
        console.log("blobUrlHS", blobUrl);
        console.log("audioHS", audio);
        setMessage({ text: "Generated Audio...", type: "audio" });
      }
      setUnsaved(true);

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
    const titleEndIndex = storyText?.indexOf("Once upon a time");
    if (titleEndIndex === -1) {
      // Handle the case where the phrase is not found
      return "Untitled Story";
    }
    // Extract the first three words as the title
    let title = storyText?.substring(0, titleEndIndex)
      .trim()
      .split(" ")
      .join(" ");

    // if (title == "") {
    //   return "Storybook";
    // } else {
    return title;
  };

  // SAVING A BOOK //
  const handleSaveBook = async () => {
    // Set maximum books that can be saved
    // if (myBooks.length >= 12) {
    //   setMessage({ text: "Maximum Books!", type: "save" });
    //   return;
    // }
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

     if (createWithAudio == true) {
        // Upload the audio and get its URL
        setMessage({ text: "Saving Audio...", type: "save" });
        // Convert the blob URL to a blob if necessary
        const audioBlob = await fetch(audio).then((r) => r.blob());
        const audioUrl = await uploadAudio(audioBlob, userId, bookId);
        setMessage({ text: "Finishing Up...", type: "save" });
        // Use bookId and imageUrls to save the book's data
     }
        await saveBookToFirestore(
          userId,
          storyUnsaved,
          imageUrls,
          audioUrl,
          bookId
        );
      // } else {
      //   const audioUrl = ""
      //   await saveBookToFirestore(
      //     userId,
      //     storyUnsaved,
      //     imageUrls,
      //     audioUrl,
      //     bookId
      //   );
      // }

    
      // After saving the book, refetch the books list
      await fetchAllBooks();

      // .then(() => {
      //   const book = allBooks.find((b) => b.bookId === bookId);
      //   if (book) {
      //     console.log("selecting Book", book);
      //     setSelectedBook(book);
      //     console.log("selectedBookUE", selectedBook);
      //   }
      // });

      setPlaying(false);
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
    audioUrl,
    bookId
  ) => {
    const db = getFirestore();
    const creatorName = user.displayName;
    const creatorPhotoURL = user.photoURL;
    const title = unsavedTitle;
    const story = storyUnsaved;
    const theme = unsavedTheme;
    const likedBy = [];
    const likes = 0;
    const sharedBy = [];
    const shares = 0;
    const viewedBy = [];
    const views = 0;
    const book = {
      userId,
      bookId,
      likes,
      likedBy,
      shares,
      sharedBy,
      views,
      viewedBy,
      story,
      title,
      theme,
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
    setBookId(bookId);
    console.log("bookIdUI", bookId);
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
  // Updating and saving audio only
  const handleAudio = async (story, bookId) => {
    const db = getFirestore();
    const bookRef = doc(db, "books", bookId);
    setProcessing(true);
    try {
      const audioData = await fetchAudio(story);

      setAudio(audioData);
      console.log("blobUrlHA", audioData);
      console.log("audioHA", audio);
      setProcessing(false);

      // Upload the audio and get its URL
      setMessage({ text: "Saving Audio...", type: "save" });
      // Convert the blob URL to a blob if necessary
      const audioBlob = await fetch(audio).then((r) => r.blob());
      const audioUrl = await uploadAudio(audioBlob, userId, selectedBook.id);
      setMessage({ text: "Finishing Up...", type: "save" });

      // Update the document in Firestore with the new audio URL
      await updateDoc(bookRef, {
        audioUrl: audioUrl,
      });

      setMessage({ text: "Audio Updated!", type: "update" });

      // Update the selectedBook state with the new audio URL
      setSelectedBook({
        ...selectedBook,
        audioUrl: audioUrl,
        id: bookId,
      });

      setMessage({ text: "Generated Audio", type: "create" });
    } catch (error) {
      console.error("Error:", error);
      setMessage({ text: "Error Audio!", type: "save" });
      setProcessing(false);
    }
  };
  // Generate audio
  async function fetchAudio(story) {
    setMessage({ text: "Generating Audio", type: "create" });

    const audioResponse = await fetch("/api/elevenlabs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ textInput: story }),
    });
    // // Converting audio
    const arrayBuffer = await audioResponse.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
    const blobUrl = URL.createObjectURL(blob);
    return blobUrl;
  }

  // LIKE SHARE VIEW DELETE BOOK //
  const handleLikeBook = async (bookId, userId) => {
    setMessage({ text: "Book Liked!", type: "like" });
    try {
      await fetchBookById(bookId, userId, "like");
    } catch (error) {
      setMessage({ text: "Liked Already!", type: "like" });
      console.error("Error liking book: ", error);
    }
  };
  const handleShareBook = async (bookId, userId) => {
    // setMessage({ text: "Book Shared!", type: "like" });
    try {
      await fetchBookById(bookId, userId, "share");
    } catch (error) {
      setMessage({ text: "Already Shared!", type: "share" });
      console.error("Error sharing book: ", error);
    }
  };
  const handleViewBook = async (bookId, userId) => {
    console.log("viewBook", bookId, userId)
    try {
      await fetchBookById(bookId, userId, "view");
    } catch (error) {
      setMessage({ text: "Already Viewed!", type: "view" });
      console.error("Error updating book views: ", error);
    }
  };
  const handleDeleteBook = async (bookId, userId) => {
    try {
      await fetchBookById(bookId, userId, "delete");
    } catch (error) {
      setMessage({ text: "Already Deleted!", type: "delete" });
      console.error("Error deleting book: ", error);
    }
  };
  const fetchBookById = async (bookId, userId, action) => {
    const db = getFirestore();
    const bookRef = doc(db, "books", bookId);

    const docSnap = await getDoc(bookRef);
    if (docSnap.exists()) {
      const bookData = docSnap.data();
      console.log("bookData:", bookData);

      // Determine the action and update the corresponding fields
      let updatedBookData = {};
      let updateData = {};
      let messageText = "";

      switch (action) {
        case "like":
          if (bookData.likedBy && !bookData.likedBy.includes(userId)) {
            updatedBookData = {
              ...bookData,
              likes: (bookData.likes || 0) + 1,
              likedBy: [...(bookData.likedBy || []), userId],
              id: bookId,
            };

            // Update the document in Firestore
            updateData = {
              likedBy: arrayUnion(userId),
              likes: increment(1),
            };
            messageText = "Book Liked!";
          } else {
            messageText = "Already Liked!";
          }
          break;
        case "share":
          if (bookData.sharedBy && !bookData.sharedBy.includes(userId)) {
            updatedBookData = {
              ...bookData,
              shares: (bookData.shares || 0) + 1,
              sharedBy: [...(bookData.sharedBy || []), userId],
              id: bookId,
            };
            updateData = {
              sharedBy: arrayUnion(userId),
              shares: increment(1),
            };
            messageText = "Book Shared!";
          } else {
            messageText = "Already Shared!";
          }
          break;
        case "view":
          // if (bookData.viewedBy && !bookData.viewedBy.includes(userId)) {
            updatedBookData = {
              ...bookData,
              views: (bookData.views || 0) + 1,
              viewedBy: [...(bookData.viewedBy || []), userId],
              id: bookId,
            };
            updateData = {
              viewedBy: arrayUnion(userId),
              views: increment(1),
            };
            messageText = "Book Viewed";
          // } else {
          //   messageText = "Already Viewed!";
          // }
          break;
        case "delete":
          if (userId == bookData.userId) {
            console.log("Deleting book with ID:", bookId);

            // Delete the document
            await deleteDoc(bookRef);

            messageText = "Book Deleted!";
          } else {
            messageText = "Delete Failed!";
          }
          break;
        default:
          break;
      }

      console.log("updatedBookData:", updatedBookData);
      // Update the selectedBook state
      setSelectedBook(updatedBookData);

      // Update the allBooks array by filtering out the deleted book
      if (action == "delete") {
        const updatedAllBooks = allBooks.filter((book) => book.id !== bookId);
        setAllBooks(updatedAllBooks);
      } else {
        const updatedAllBooks = allBooks.map((book) =>
          book.id === bookId ? updatedBookData : book
        );
        setAllBooks(updatedAllBooks);
      }

      // Update the document in Firestore if there are changes
      if (Object.keys(updatedBookData).length > 0) {
        await updateDoc(bookRef, updatedBookData);
        setMessage({ text: messageText, type: action });
      } else {
        console.log("No such document!");
      }
    }
  };

  // SELECTING BOOKS //
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
      //handleViewBook(bookId, userId)
      setSelectedBook(book);
      // if (audioRef && audioRef?.current != null) {
      //   setPlaying(true)
      // }
      setMessage({ text: "", type: "" })
      
    }
    setPlaying(true);
    audioRef?.current?.play();
    //setAudio(selectedBook?.audioUrl)
    // isNaN(audioRef?.current?.duration)
    //   ? setMessage({ text: "No Audio", type: "error" })
    //   : setMessage({ text: "Audio Book", type: "info" });

    setOpen(true);
    //setMessage({ text: "Book Opened", type: "create" });
    //setPage(0);
  };
  const handleOpen = () => {
    setSelectedBook(storyUnsaved, imagesUnsaved);
    setOpen(true);
    setDismiss(false);
  };
  const resetStory = () => {
    setShow(false);
    setOpen(false);
    setUnsavedTitle("");
    setUnsavedTheme("");
    setUserPrompt("");
    setStoryUnsaved("");
    setImagesUnsaved([]);

    setPage(0);
    setAudioPages(0);
    setAudioPage(0);
    setAudioDuration(0);
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

  // FETCH PROFILES //

  // Function to fetch user data from Firestore
  // const fetchUserData = async () => {
  //   const db = getFirestore();
  //   const usersCollection = collection(db, "users");
  //   const querySnapshot = await getDocs(usersCollection);
  //  console.log("userCollection", usersCollection)
  //   // Array to store user data
  //   const userData = [];

  //   // Iterate through each user document
  //   querySnapshot.forEach((doc) => {
  //     const user = doc.data();
  //     // Add user data to the array
  //     userData.push({
  //       userId: doc.id,
  //       displayName: user.displayName,
  //       // Add other user properties as needed
  //     });
  //   });
  // console.log("userData", userData)
  //   return userData;
  // };

  // // Function to fetch profile image URLs from Firebase Storage
  // const fetchProfileImageUrls = async (userData) => {
  //   const storage = getStorage();
  //   const profileImageUrls = [];

  //   // Iterate through each user and fetch their profile image URL
  //   userData.forEach(async (user) => {
  //     try {
  //       const imageUrl = await getDownloadURL(ref(storage, `profileImages/${auth.currentUser.uid}/profile7.jpg`));
  //       profileImageUrls.push({ userId: user.userId, imageUrl });
  //     } catch (error) {
  //       // Handle errors (e.g., user profile image not found)
  //       console.error("Error fetching profile image:", error);
  //     }
  //   });
  // console.log("profileImageUrls", profileImageUrls)
  //   return profileImageUrls;
  // };

  // // Function to fetch user data along with profile image URLs
  // const fetchUserDataWithProfileImages = async () => {
  //   const userData = await fetchUserData(); // Fetch user data
  //   const profileImageUrls = await fetchProfileImageUrls(userData); // Pass userData to fetchProfileImageUrls

  //   // Combine user data with profile image URLs
  //   const userDataWithProfileImages = userData.map((user) => {
  //     const profileImageUrl = profileImageUrls.find((item) => item.userId === user.userId)?.imageUrl;
  //     return { ...user, profileImageUrl };
  //   });
  // console.log("userDataWithProfileImages", userDataWithProfileImages)
  //   return userDataWithProfileImages;
  // };

  // // Usage
  // fetchUserDataWithProfileImages().then((userDataWithProfileImages) => {
  //   console.log("fetchUser", userDataWithProfileImages);
  // });

  useEffect(() => {
    const audioCurrent = audioRef.current;
    //console.log("audioRef.currentUESP", audioRef?.current);
    //console.log("audioCurrentUESP", audioCurrent);

    if (!audioCurrent) return;

    const playAudio = () => {
      setPlaying(true);
      audioCurrent
        .play()
        .catch((error) => console.error("Audio playback failed:", error));
    };

    if (open && (selectedBook?.audioUrl || audio)) {
      audioCurrent.src = selectedBook?.audioUrl || audio;
      audioCurrent.load();

      audioCurrent.removeEventListener("loadeddata", playAudio);

      audioCurrent.addEventListener("loadeddata", playAudio);
    }

    return () => {
      audioCurrent.removeEventListener("loadeddata", playAudio);
    };
  }, [open, audio, loading]);

  useEffect(() => {
    // console.log("bookidUEE", bookId);
    // console.log("allBooksUEE", allBooks);
    const book = allBooks.find((b) => b.bookId === bookId);
    if (book) {
      // console.log("selecting Book", book);
      setSelectedBook(book);
      // console.log("selectedBookUE", selectedBook);
    }
  }, [allBooks]);

  // SEARCH & FILTER //
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showWithAudio, setShowWithAudio] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState([]);
  const [selectedCreator, setSelectedCreator] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault();
    const searchedBooks = searchBooks(searchQuery);
    setSearchResults(searchedBooks);
  };

  const searchBooks = (query) => {
    return allBooks.filter((book) => {
      const titleMatches = book?.title
        ?.toLowerCase()
        .includes(query.toLowerCase());

      return titleMatches;
    });
  };

  const filterResults = allBooks.filter((book) => {
    // Check if any filters are applied
    const hasFilters =
      showWithAudio || selectedTheme?.length > 0 || selectedCreator?.length > 0;

    if (hasFilters) {
      // Filter books with audio if showWithAudio is true
      if (showWithAudio && !book?.audioUrl) {
        return false;
      }
      // Filter books by selected themes
      if (selectedTheme?.length > 0 && !selectedTheme?.includes(book.theme)) {
        return false;
      }
      // Filter books with the selected creator
      if (
        selectedCreator?.length > 0 &&
        !selectedCreator?.includes(book.creatorName)
      ) {
        return false;
      }
      return true; // Show books that pass all filters
    } else {
      // No filters applied, return no books
      return false;
    }
  });

  //console.log("searchResults", searchResults)
  //console.log("selectedBook", selectedBook)
  console.log("tabSelected", tabSelected)
  return (
    <div className="bg-[url('../../public/background5.png')] bg-cover bg-fixed  z-10 flex flex-col justify-center min-h-screen overflow-hidden no-scroll">
      {/* <Stars /> */}

      <main className="flex-grow z-10">
        {/* { !open && */}
        <NavIndex
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
          audioRef={audioRef}
          setSearchQuery={setSearchQuery}
          //search={search}
         // setSearch={setSearch}
          setTabSelected={setTabSelected}
          tabSelected={tabSelected}
        />
        {/* } */}

        <div className="mx-0 md:mx-[8%] no-scroll pt-16 3xl:pt-20  ">
          {!open ? (
            <div className="">
              <FormIndex
                loading={loading}
                userPrompt={userPrompt}
                setUserPrompt={setUserPrompt}
                handleSubmit={handleSubmit}
                handleOpen={handleOpen}
                setMessage={setMessage}
                storyUnsaved={storyUnsaved}
                unsavedTheme={unsavedTheme}
                setUnsavedTheme={setUnsavedTheme}
               // search={search}
               // setSearch={setSearch}
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
                handleSearch={handleSearch}
                setShowCreators={setShowCreators}
                showCreators={showCreators}
                allBooks={allBooks}
                showWithAudio={showWithAudio}
                setShowWithAudio={setShowWithAudio}
                selectedTheme={selectedTheme}
                setSelectedTheme={setSelectedTheme}
                setTabSelected={setTabSelected}
                setSearchResults={setSearchResults}
                selectedCreator={selectedCreator}
                setSelectedCreator={setSelectedCreator}
                createWithAudio={createWithAudio}
                setCreateWithAudio={setCreateWithAudio}
                tabSelected={tabSelected}

                showForm={showForm}
                setShowForm={setShowForm}
              />

              <SelectorIndex
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
                tabSelected={tabSelected}
                setTabSelected={setTabSelected}
                searchResults={searchResults}
                //setSearch={setSearch}
                searchQuery={searchQuery}
                handleSearch={handleSearch}
                setSearchQuery={setSearchQuery}
               // search={search}
                showCreators={showCreators}
                filterResults={filterResults}
                showWithAudio={showWithAudio}
                selectedTheme={selectedTheme}
                selectedCreator={selectedCreator}

                showForm={showForm}
                setShowForm={setShowForm}
              />
            </div>
          ) : (
            <BookIndex
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
              unsavedTitle={unsavedTitle}
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
              unsavedTheme={unsavedTheme}
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
              setAudio={setAudio}
              audioPage={audioPage}
              handleViewBook={handleViewBook}
              setFetched={setFetched}
              handleAudio={handleAudio}
              setSelectedBook={setSelectedBook}
              user={user}
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

 "use client";
import { useEffect, useRef, useState } from "react";
import { fetchStory } from "./api/openai/fetchStory";
import { fetchImages } from "./api/stability/fetchImages";
import { StatusBar } from "../components/StatusBar";
import { StoryForm } from "../components/StoryForm";
import { StoryDisplay } from "../components/StoryDisplay";
import { StorySelector } from "../components/StorySelector";
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
import { auth } from "@/app/firebase/config";
import { FooterNav } from "@/components/FooterNav";

export default function StoryPage() {
  const [userId, setUserId] = useState();

  const [userPrompt, setUserPrompt] = useState("");
  const [storyUnsaved, setStoryUnsaved] = useState("");
  const [imagesUnsaved, setImagesUnsaved] = useState([]);
  const [audio, setAudio] = useState("");
  const [message, setMessage] = useState({ text: `Welcome`, type: "like" });

  const [page, setPage] = useState(0);
  const audioRef = useRef(null);
  

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [dismiss, setDismiss] = useState(false);
  const [unsaved, setUnsaved] = useState(false);
  const [shared, setShared] = useState(false);

  const [myBooks, setMyBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const [myStoriesSelected, setMyStoriesSelected] = useState(false);
  const [currentSliceIndex, setCurrentSliceIndex] = useState(0);

  const [show, setShow] = useState(true);
  const [theme, setTheme] = useState("Spooky");
  const [time, setTime] = useState(5);
  

  useEffect(() => {
    fetchUserBooks();
    fetchAllBooks();
    // fetchAllUsers();
  }, [userId]); // Fetch books on component mount or when userId changes

  // useEffect(() => {
  //   if (audio || selectedBook?.audioURL) {
  //     audioRef.current.play();
  //   }
  // }, [audio, selectedBook]);


 

  ////////////// CREATE BOOK ///////////////////

  const handleSubmit = async (event) => {
    event.preventDefault();

     console.log("themeHS", theme)

    if (!userPrompt) {
      setMessage({ text: "Enter Prompt", type: "info" });
      return;
    }
    if (userPrompt.length < 10) {
      setMessage({ text: "Longer Prompt", type: "info" });
      return;
    }
    resetStory();
    //setTheme("Spooky")
    // const theme = "Spooky"
    const inputPrompt = userPrompt + ", " + theme + " story theme"
    console.log("inputPrompt", inputPrompt)
    setUserPrompt(inputPrompt);
    try {
      setMessage({ text: "Writing Story...", type: "create" });

      setLoading(true);
      const storyData = await fetchStory(inputPrompt);
      setMessage({ text: "Story Created!", type: "create" });
      setStoryUnsaved(storyData.story);
    
      const storyTitle = extractTitleFromStory(storyData.story);
      console.log("storyTitle", storyTitle);
      setOpen(true);

      setMessage({ text: "Creating Images...", type: "create" });


      // const imageData = await fetchImages(storyData.story);
      // setImagesUnsaved(imageData.images);
      // Fetch images twice and combine the results

 
 
  const allImages = await fetchImagesTwice(storyData.story);
  setImagesUnsaved(allImages);
  
      setMessage({ text: "Images Finished!", type: "create" });

      // Uncomment if you want to fetch audio
      // const audioUrl = await fetchAudio(storyData.story);
      // setAudio(audioUrl);

        // Fetching audio based on the story
    const audioResponse = await fetch("/api/elevenlabs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ textInput: storyData.story }),
    });

    const arrayBuffer = await audioResponse.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
    const blobUrl = URL.createObjectURL(blob);
    setAudio(blobUrl);
      //setUnsavedBook([storyData.story, imageData.images, storyTitle]);
      //console.log("UnsavedBook", unsavedBook);



      setMessage({ text: "Save Story", type: "save" });
      setLoading(false);
      setUnsaved(true);
    } catch (error) {
      console.error("Error:", error);
      setMessage({ text: "No Credits!", type: "error" });
      setLoading(false);
    }
  };

  // First, define an async function to fetch images based on the story
async function fetchImagesTwice(story) {
  //console.log("themePageGIT", theme)
  // Make two concurrent requests to fetch images
  const fetchPromise1 = fetchImages(story);
  const fetchPromise2 = fetchImages(story);
  const fetchPromise3 = fetchImages(story);

  // Wait for both promises to resolve
  const results = await Promise.all([fetchPromise1, fetchPromise2, fetchPromise3]);

  // Combine the images from both results
  const allImages = [...results[0].images, ...results[1].images, ...results[2].images];

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

  // const extractTitleFromStory = (storyText) => {
  //   const titleEndIndex = storyText.indexOf("Once upon a time");
  //   if (titleEndIndex === -1) {
  //     // Handle the case where the phrase is not found
  //     return "Untitled_" + new Date().getTime();
  //   }
  //   // Extract the first three words as the title
  //   return storyText
  //     .substring(0, titleEndIndex)
  //     .trim()
  //     .split(" ")
  //     .slice(0, 4)
  //     .join(" ");
  // };

  ///////////////// SAVE BOOK //////////////////

  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      setUserId(user.uid);
    }
  }, [user]);

  // Function to generate a unique book ID
  const generateBookId = () => {
    return `book_${new Date().getTime()}`;
  };

  // Function to upload images
  const uploadImages = async (imagesUnsaved, userId) => {
    const storage = getStorage();
    setMessage({ text: "Creating Book Id...", type: "save" });
    const bookId = generateBookId();
    let imageUrls = [];

    for (const image of imagesUnsaved) {
      const uniqueImageId = `${bookId}_${Date.now()}`; // Ensure unique ID for each image
      const imageRef = ref(
        storage,
        `images/${userId}/${bookId}/${uniqueImageId}`
      );
      setMessage({ text: "Saving Book...", type: "save" });
      await uploadBytes(imageRef, image); // Ensure the image is awaited
      const url = await getDownloadURL(imageRef);
      imageUrls.push(url);
    }

    return { bookId, imageUrls };
  };

  // Function to upload audio
const uploadAudio = async (audioBlob, userId, bookId) => {
  setMessage({ text: "Saving Audio...", type: "save" });
  const storage = getStorage();
  const audioRef = ref(storage, `audio/${userId}/${bookId}/storyAudio.mp3`);
  await uploadBytes(audioRef, audioBlob);
  const url = await getDownloadURL(audioRef);
  return url;
};


  const handleSaveBook = async () => {
    if (myBooks.length >= 12) {
      setMessage({ text: "Maximum Books!", type: "save" });
      return;
    }
    // if (myBooks.id)
    setProcessing(true);
    setDismiss(true);
    setMessage({ text: "Saving Book...", type: "save" });
    try {
      const validImages = imagesUnsaved.filter((image) => image != null); // Filter out undefined or null images
      const convertedImages = validImages.map((base64Image) =>
        base64ToBlob(base64Image, "image/jpeg")
      );
      //console.log("Converted images for upload:", convertedImages);
      const { bookId, imageUrls } = await uploadImages(convertedImages, userId);

       // New: Upload the audio and get its URL
    // const audioUrl = await uploadAudio(blob, userId, bookId);
      // Assuming 'audio' state holds the blob URL of the audio
    // Convert the blob URL to a blob if necessary or directly upload if it's already a Blob
    const audioBlob = await fetch(audio).then(r => r.blob());
    const audioUrl = await uploadAudio(audioBlob, userId, bookId);
    setMessage({ text: "Finishing Up...", type: "save" });
      // Now use bookId and imageUrls to save the book's data to Firestore
      await saveBookToFirestore(userId, storyUnsaved, imageUrls, audioUrl, bookId);
      // After saving the book, refetch the books list
      fetchUserBooks();
    } catch (error) {
      setMessage({ text: "Error Saving!", type: "save" });
      setProcessing(false);
    }
    setProcessing(false);
    setMessage({ text: "Book Saved!", type: "create" });
    setUnsaved(false);
  };

  const saveBookToFirestore = async (userId, storyUnsaved, imageUrls, audioUrl) => {
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
      audioUrl, 
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

  ///////////// RETRIEVE BOOKS /////////////////

  const fetchUserBooks = async () => {
    if (userId) {
      const fetchedBooks = await getBooksForUser(userId);
      setMyBooks(fetchedBooks);
      //setMessage({text: "My Books Fetched!", type: "success"});
    }
  };

  const getBooksForUser = async (userId) => {
    const db = getFirestore();
    const q = query(collection(db, "books"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    let myBooks = [];
    querySnapshot.forEach((doc) => {
      myBooks.push({ id: doc.id, ...doc.data(), creatorPhotoURL: user.photoURL });
    });
    return myBooks;
  };

  const fetchAllBooks = async () => {
    const fetchedBooks = await getAllBooks(userId);
    setAllBooks(fetchedBooks);
    //setMessage({text: "All Books Fetched", type: "success"});
  };

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


  ///////////////// GET USERS /////////////////////
// const [ allUsers, setAllUsers ] = useState([])

//   const fetchAllUsers = async () => {
//     const fetchedUsers = await getAllUsers(userId);
//     setAllUsers(fetchedUsers);
//     setMessage({text: "All Users Fetched", type: "success"});
//     console.log("allUsers", allUsers)
//   };


//   const getAllUsers = async () => {
//     const db = getFirestore();
//     const q = query(collection(db, "users"));
//     const querySnapshot = await getDocs(q);
//     let allUsers = [];
//     querySnapshot.forEach((doc) => {
//       allUsers.push({ id: doc.id, ...doc.data() });
//     });
//     return allUsers;
//   };

const handleShareBook = async (bookId, userId) => {
  // if (userId === selectedBook?.userId) {
  //   setMessage({ text: "Can't Share Own Book!", type: "like" });
  //   return;
  // }

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




  /////////////// LIKE UPDATE BOOK
  //|| myBooks[0]?.userId
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

  //////////////// REMOVE BOOK ///////////////

  const handleDeleteBook = async (bookId) => {
    setMessage({ text: "Deleting Book...", type: "delete" });
    setDismiss(true);
    try {
      await deleteBookFromFirestore(bookId);

      // Remove the book from the local state to update the UI
      const updatedBooks = myBooks.filter((book) => book.id !== bookId);
      setMyBooks(updatedBooks);
    } catch (error) {
      setMessage({ text: "Delete Failed!", type: "delete" });
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

  //////////////// VIEWING BOOKS /////////////////

  const handlePreviewMine = (bookId) => {
    const book = myBooks.find((b) => b.id === bookId);
    if (book) {
      setSelectedBook(book);
    }
    setAudio(selectedBook?.audioUrl)
    setMessage("");
    setOpen(true);
    setPage(0);
  };

  const handlePreviewAll = (bookId) => {
    const book = allBooks.find((b) => b.id === bookId);
    if (book) {
      setSelectedBook(book);
    }
    setAudio(selectedBook?.audioUrl)
    setMessage("");
    setOpen(true);
    setPage(0);
  };

  const handleOpen = () => {
    setSelectedBook(storyUnsaved, imagesUnsaved);
    setOpen(true);
    setDismiss(false);
  };

  const resetStory = () => {
    setStoryUnsaved("");
    setImagesUnsaved([]);
    setAudio("");
    setUserPrompt("");
    setMessage("");
    setOpen(false);
    setLoading(false);
    setProcessing(false);
    setPage(0);
    setSelectedBook(null);
    setDismiss(false);
  };

  console.log("audio", audio)
  console.log("selectedBook", selectedBook)
// console.log("themePage.js", theme)

useEffect(() => {
  // Ensure the ref is attached and the source is available
  if (audioRef.current && (selectedBook?.audioUrl || audio)) {
    audioRef.current.src = selectedBook.audioUrl;
    audioRef.current.load(); // Load the new source
    audioRef.current.play().catch(error => console.error("Audio playback failed:", error));
  }
}, [selectedBook?.audioUrl, audio, audioRef]);




console.log(audioRef.current); // Debugging line

  return (
    <>
      <div className="bg-[url('../../public/background5.png')] bg-cover bg-fixed min-h-screen overflow-hidden no-scroll ">
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
         
        />

        <div className="mx-0 md:mx-[10%] no-scroll pt-16 ">
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
            />
          )}
        </div>
        { !open &&
        <FooterNav
                message={message}
                resetStory={resetStory}
                setMyBooks={setMyBooks}
                setUserId={setUserId}
                setMyStoriesSelected={setMyStoriesSelected}
                setMessage={setMessage}
              />
        }
    
      </div>
    </>
  );
}

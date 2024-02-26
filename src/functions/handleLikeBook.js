import {
  getFirestore,
  updateDoc,
  increment,
  doc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";

// LIKING A BOOK //
export const likeBook = async (
  bookId,
  userId,
  setMessage,
  useFetchAllBooks,
  setSelectedBook,
  selectedBook
) => {
  if (userId === selectedBook?.userId) {
    setMessage({ text: "Its Your Book!", type: "like" });
    return;
  }

  try {
    await fetchBookById(bookId, userId, setSelectedBook, selectedBook, setMessage); // Now passing userId
    // Assuming likes are directly updated in the UI without refetching from Firestore

    // UI logic as previously described
  } catch (error) {
    setMessage({ text: "Liked Already!", type: "like" });
    console.error("Error liking book: ", error);
  }
  useFetchAllBooks();
};

const fetchBookById = async (bookId, userId, setSelectedBook, selectedBook, setMessage) => {
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

import {
  arrayUnion,
  doc,
  getDoc,
  getFirestore,
  increment,
  updateDoc,
  useFetchAllBooks,
} from "firebase/firestore";

// SHARING A BOOK //
export const shareBook = async (
  bookId,
  userId,
  setSelectedBook,
  selectedBook,
  setMessage,
) => {
  try {
    await fetchBookToShare(bookId, userId, setSelectedBook, selectedBook, setMessage); // Now passing userId

    // UI logic as previously described
  } catch (error) {
    setMessage(setMessage({ text: "Shared Already!", type: "like" }));
    console.error("Error sharing book: ", error);
  }
  useFetchAllBooks();
};

const fetchBookToShare = async (
  bookId,
  userId,
  setSelectedBook,
  selectedBook,
  setMessage
) => {
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

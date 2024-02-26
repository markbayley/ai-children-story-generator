import {
  getFirestore,
  deleteDoc,
  doc,
} from "firebase/firestore";
 
 
 // DELETING A BOOK //
export const deleteBook = async (bookId, setMessage, setDeleting, allBooks, setAllBooks) => {
  setMessage({ text: "Deleting Book...", type: "delete" });
  setDeleting(true);
  try {
    await deleteBookFromFirestore(bookId);

    // Remove the book from the local state to update the UI
    const updatedBooks = allBooks.filter((book) => book.id !== bookId);
    setAllBooks(updatedBooks);
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
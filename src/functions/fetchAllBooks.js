// hooks/useFetchAllBooks.js
import { getFirestore, collection, query, getDocs } from "firebase/firestore";

export const useFetchAllBooks = async () => {
  const getAllBooks = async () => {
    const db = getFirestore();
    const q = query(collection(db, "books"));
    const querySnapshot = await getDocs(q);
    const allBooks = [];
    querySnapshot.forEach((doc) => {
      allBooks.push({ id: doc.id, ...doc.data() });
    });
    return allBooks;
  };

  return getAllBooks();
};


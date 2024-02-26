 // VIEWING BOOKS //
//  export const handlePreviewMine = (bookId, myBooks, setPlaying, audioRef, setOpen, setPage, setMessage, setSelectedBook) => {
//     const book = myBooks.find((b) => b.id === bookId);
//     if (book) {
//       setSelectedBook(book);
//     }
//     setPlaying(true);
//     audioRef?.current?.play();
//     //setAudio(selectedBook?.audioUrl)
//     setMessage("");
//     setOpen(true);
//     setPage(0);
//   };

 export const viewBook = (bookId, allBooks, audioRef, setSelectedBook, setPlaying, setMessage, setOpen, setPage) => {
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
    setPage(0);
  };

 export const openBook = (setSelectedBook, setOpen, setDismiss, storyUnsaved, imagesUnsaved) => {
    setSelectedBook(storyUnsaved, imagesUnsaved);
    setOpen(true);
    setDismiss(false);
  };
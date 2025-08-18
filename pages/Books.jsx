import { BookEdit } from "../cmps/BookEdit.jsx";
import { BookFilter } from "../cmps/BookFilter.jsx";
import { BookList } from "../cmps/BookList.jsx";
import { bookService } from "../services/book.service.js";
const { useState, useEffect } = React;

export function Books() {
  const [addBook,setAddBook] = useState(false);

  const [filterBy, setfilterBy] = useState({
    txt: "",
    priceRange: 0,
    availability: "",
  });

  function onHandleAddBook(){
    setAddBook(prev=>!prev);
  }

  useEffect(() => {
    bookService.query(filterBy)
  }, [filterBy]);




  return (
    <section className="books-page">
      <BookFilter
        setfilterBy={setfilterBy}
        filterBy={filterBy}
      />
      <h1>Books</h1>
      <BookList
      filterBy = {filterBy}/>
      <button onClick={onHandleAddBook}>Add new Book</button>
      {addBook&&
      <BookEdit
      onHandleAddBook = {onHandleAddBook}
      />
      }
    </section>
  );
}

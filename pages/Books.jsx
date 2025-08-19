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


  return (
    <section className="books-page">
      <BookFilter
        setfilterBy={setfilterBy}
        filterBy={filterBy}
      />
      <h1>Books</h1>
      <button onClick={onHandleAddBook}>Add new Book</button>
      <BookList
      filterBy = {filterBy}/>
      {addBook&&
      <BookEdit
      onHandleAddBook = {onHandleAddBook}
      />
      }
    </section>
  );
}

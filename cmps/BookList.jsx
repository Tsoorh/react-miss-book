const { useState,useEffect } = React;
import { bookService } from "../services/book.service.js";
import { BookPreview } from "./BookPreview.jsx";

export function BookList(props) {
  const [books, setBooks] = useState([]);

  useEffect(()=>{
    bookService
    .query(props.filterBy)
    .then((booksObj) => {
      return setBooks(booksObj);
    })
    .catch((err) => {
      return console.log("Error trying to query from book service :", err);
    });
  },[props.filterBy]);

  return (
    <section className="books-index-container">
      {books.map((book) => {
        return (
                <BookPreview
                key ={book.id}
                book = {book}
                />
        );
      })}
    </section>
  );
}

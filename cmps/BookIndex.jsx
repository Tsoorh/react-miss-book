const { useState,useEffect } = React;
import { bookService } from "../services/book.service.js";

export function BookIndex(props) {
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
          <div key={book.id} className="book-div">
            <h3>{book.title}</h3>
            <p>
              {book.listPrice.amount} {book.listPrice.currencyCode}
            </p>
            <p>{book.listPrice.isOnSale ? "In stock" : "Sold out"} </p>
          </div>
        );
      })}
    </section>
  );
}

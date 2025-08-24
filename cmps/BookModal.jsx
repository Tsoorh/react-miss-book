const {useState} = React
import { LongTxt } from "./LongTxt.jsx";

export function BookModal({ book, onHandleClick }) {
  // part1 ex
  // return <section className="modal-preview">
  //     <button className="modal-btn" onClick={onHandleClick}> X </button>
  //       <h3>{book.title}</h3>
  //       <p>{book.listPrice.amount} {book.listPrice.currencyCode}</p>
  //       <p>{book.description}</p>
  //       <p>{book.listPrice.isOnSale?"In stock":"Sold out"}</p>
  //   </section>
  
  //pt2 ex
  const [imageLoad, setImageLoad] = useState(false)

  function onImageLoad(){
    setImageLoad(true)
  }






  return (
    <section className="modal-preview">
      
      <button className="modal-btn" onClick={onHandleClick}>
        {" "}
        X{" "}
      </button>
      <div className="flex-container">
      <div className="border-book">
      <h3>{book.title}</h3>
      <h4>{book.subtitle}</h4>
      <p>        
        Authors:
        {book.authors.map((author) => {
          return <span key={author}>{author} </span>;
        })}
      </p>
      {(new Date().getFullYear()-book.publishedDate ) >= 10 && <p>Vintage</p>}
      {(new Date().getFullYear() - book.publishedDate) <= 1 && <p>New</p>}
      {(book.pageCount > 500)&&<p>Serious Reading</p>}
      {(book.pageCount < 500 && book.pageCount>200)&&<p>Descent Reading</p>}
      {(book.pageCount < 100)&&<p>Light Reading</p>}
      
      <p>
        Categories:
        {book.categories.map((category) => {
          return <span key={category}>{category}</span>;
        })}
      </p>
      <p>
        <span className={book.listPrice.amount>150&&"red" || book.listPrice.amount<20&&"green" || ""}>{book.listPrice.amount}</span> {book.listPrice.currencyCode}
      </p>

      <p>Language: {book.language}</p>
      <LongTxt
      txt = {book.description}
      />
      {/* <p>{book.description}</p> */}
      {book.listPrice.isOnSale ? <div> <p>In stock!</p> <img src="../assets/img/for-sale.svg"/></div> : <p>Sold out</p>}
      </div>
      {!imageLoad &&<h2 className="loading-h2">Loading photo...</h2>}
      <img src={book.thumbnail} onLoad={onImageLoad} alt="img-book" />
      </div>
    </section>
  );
}

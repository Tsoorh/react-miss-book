const {useState}= React;
import { BookModal } from "./BookModal.jsx";

export function BookPreview(props) {
  const [previewBook,setPreviewBook] = useState(false);


  function onHandleClick(){
    setPreviewBook(prev=>!prev);
  }
  

  return (
    <div key={props.book.id} className="book-div">
      <h3>{props.book.title}</h3>
      <p>
        {props.book.listPrice.amount} {props.book.listPrice.currencyCode}
      </p>
      <p>{props.book.listPrice.isOnSale ? "In stock" : "Sold out"} </p>
      <button id={props.book.id} onClick={onHandleClick}>Details</button>
      {previewBook&&
      <BookModal 
      book = {props.book}
      onHandleClick = {onHandleClick}/>
      }
    </div>
  );
}
